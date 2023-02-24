import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import Ionicons from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import Referral from '../../screens/Main/Referral';
import { onLogout } from '../../store/features/authSlice';
import { getAuth, signOut } from 'firebase/auth';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  function handleLogout() {
    Alert.alert('Logout!', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          if (!user.isGuest) {
            const auth = getAuth();
            signOut(auth);
          }

          dispatch(onLogout());
        },
      },
    ]);
  }

  return (
    <Stack.Navigator initialRouteName={'Referral'}>
      <Stack.Screen
        name={'Referral Information'}
        component={Referral}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout}>
              <Ionicons
                name='logout'
                size={26}
                color='orange'
                style={{ paddingEnd: '7%' }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
