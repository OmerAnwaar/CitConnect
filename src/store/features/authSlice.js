import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const initialState = {
  isLoggedIn: false,
  userType: null,
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (model, thunkAPI) => {
    try {
      const res = await setDoc(doc(db, "Users", model.uid), model);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export async function ifUserExists(uid) {
  try {
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);
    console.log("GET DOC", docSnap);
    if (!docSnap.exists) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
export const getUser = createAsyncThunk(
  "customer/getUser",
  async (uid, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "Users", uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists) {
        return rejectWithValue(errors.DOCUMENT_DOESNT_EXIST);
      }
      return docSnap.data();
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin: (state, { payload }) => {
      state.isLoggedIn = true;
      state.userType = payload;
    },
    onLogout: (state) => {
      state.isLoggedIn = false;
      state.userType = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const { onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
