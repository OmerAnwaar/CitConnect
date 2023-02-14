import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

import uuid from 'react-native-uuid';

const initialState = {
  isLoggedIn: false,
  userType: null,
  user: null,
  isGuest: false,
};

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (model, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        model.email,
        model.password
      );
      delete model.password;
      await setDoc(doc(db, 'Users', user.uid), {
        ...model,
        uid: user.uid,
        role: 'user',
      });
      return {
        ...model,
        uid: user.uid,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async (model, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(
        auth,
        model.email,
        model.password
      );
      const docRef = doc(db, 'Users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:');
      } else {
        rejectWithValue(new Error('No such document!'));
      }

      return docSnap.data();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (email, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);

      return 'Email Sent';
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getUser = createAsyncThunk(
  'customer/getUser',
  async (uid, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'Users', uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists) {
        return rejectWithValue(errors.DOCUMENT_DOESNT_EXIST);
      }
      return docSnap.data();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const addReferralInfo = createAsyncThunk(
  'customer/addReferralInfo',
  async (data, { rejectWithValue }) => {
    try {
      const refId = uuid.v4();
      await setDoc(doc(db, 'Referrals', refId), data);
      return 'Referral Added!';
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin: (state, { payload }) => {
      state.isLoggedIn = true;
      state.userType = payload;
    },
    onLogout: (state) => {
      return initialState;
    },
    isGuest: (state) => {
      state.isGuest = true;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
      state.userType = payload.path;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
      state.userType = payload.path;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const { onLogin, onLogout, isGuest } = authSlice.actions;

export default authSlice.reducer;
