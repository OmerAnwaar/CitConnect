import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';

import CcButton from '../../../components/CcButton';
import CcTextInput from '../../../components/CcTextInput';
import icons from '../../../constants';
import styles from './styles';
import { resetPassword } from '../../../store/features/authSlice';
import { useNavigation } from '@react-navigation/native';

const initialValues = {
  email: '',
  password: '',
  globalErr: '',
};

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
  });

  const handleForgetPassword = async (values) => {
    try {
      setLoading(true);
      await dispatch(resetPassword(values.email.trim())).unwrap();
      navigation.goBack();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.longLogo}
        source={icons.LOGO}
        resizeMode={'contain'}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleForgetPassword}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
          handleSubmit,
        }) => (
          <>
            <CcTextInput
              label={'Email Address'}
              keyboardType='email-address'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              autoCapitalize='none'
              value={values.email}
              outlineColor={touched.email && errors.email ? 'red' : 'black'}
              right={null}
            />
            {touched.email && errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : (
              <View style={styles.divider} />
            )}
            {loading ? (
              <ActivityIndicator style={{ flex: 1 }} size={'large'} />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  paddingBottom: '10%',
                }}
              >
                <CcButton title={'Submit'} onPress={handleSubmit} />
              </View>
            )}
          </>
        )}
      </Formik>
    </View>
  );
};

export default ForgotPassword;
