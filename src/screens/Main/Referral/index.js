import { Formik } from 'formik';
import React, { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from 'yup';

import CcButton from '../../../components/CcButton';
import CcTextInput from '../../../components/CcTextInput';
import icons from '../../../constants';
import { addReferralInfo } from '../../../store/features/authSlice';
import styles from './styles';

const initialValues = {
  bussinessName: '',
  bussinessNumber: '',
  bussinessAddress: '',
  contactName: '',
  contactEmail: '',
  contactNumber: '',
  globalErr: '',
};

const Referral = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    bussinessName: yup.string().required(),
    bussinessNumber: yup.string().required(),
    bussinessAddress: yup.string().required(),
    contactName: yup.string().required(),
    contactEmail: yup.string().email(),
    contactNumber: yup.string(),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const payload = {
        bussinessName: values.bussinessName,
        bussinessNumber: values.bussinessNumber,
        bussinessAddress: values.bussinessAddress,
        contactName: values.contactName,
        contactEmail: values.contactEmail,
        contactNumber: values.contactNumber,
        userId: user?.uid,
      };
      await dispatch(addReferralInfo(payload)).unwrap();
      Alert.alert('Form Submitted Successfully');
      resetForm();
      setLoading(false);
      console.log(payload);
    } catch (err) {
      setLoading(false);
      console.error(err.message);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Image
        style={styles.longLogo}
        source={icons.LOGO}
        resizeMode={'contain'}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
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
              label={'Bussiness Name'}
              onChangeText={handleChange('bussinessName')}
              onBlur={handleBlur('bussinessName')}
              value={values.bussinessName}
              outlineColor={
                touched.bussinessName && errors.bussinessName ? 'red' : 'gray'
              }
              right={null}
            />
            {touched.bussinessName && errors.bussinessName ? (
              <Text style={styles.errorText}>{errors.bussinessName}</Text>
            ) : (
              <View style={styles.divider} />
            )}
            <CcTextInput
              label={'Bussiness Phone Number'}
              keyboardType='phone-pad'
              onChangeText={handleChange('bussinessNumber')}
              onBlur={handleBlur('bussinessNumber')}
              value={values.bussinessNumber}
              outlineColor={
                touched.bussinessNumber && errors.bussinessNumber
                  ? 'red'
                  : 'gray'
              }
              right={null}
            />
            {touched.bussinessNumber && errors.bussinessNumber ? (
              <Text style={styles.errorText}>{errors.bussinessNumber}</Text>
            ) : (
              <View style={styles.divider} />
            )}
            <CcTextInput
              label={'Bussiness Address'}
              onChangeText={handleChange('bussinessAddress')}
              onBlur={handleBlur('bussinessAddress')}
              value={values.bussinessAddress}
              outlineColor={
                touched.bussinessAddress && errors.bussinessAddress
                  ? 'red'
                  : 'gray'
              }
              right={null}
            />
            {touched.bussinessAddress && errors.bussinessAddress ? (
              <Text style={styles.errorText}>{errors.bussinessAddress}</Text>
            ) : (
              <View style={styles.divider} />
            )}
            <CcTextInput
              label={'Contact Name'}
              onChangeText={handleChange('contactName')}
              onBlur={handleBlur('contactName')}
              value={values.contactName}
              outlineColor={
                touched.contactName && errors.contactName ? 'red' : 'gray'
              }
              right={null}
            />
            {touched.contactName && errors.contactName ? (
              <Text style={styles.errorText}>{errors.contactName}</Text>
            ) : (
              <View style={styles.divider} />
            )}
            <CcTextInput
              label={'Contact Email Address'}
              keyboardType='email-address'
              onChangeText={handleChange('contactEmail')}
              onBlur={handleBlur('contactEmail')}
              autoCapitalize='none'
              value={values.contactEmail}
              outlineColor={
                touched.contactEmail && errors.contactEmail ? 'red' : 'gray'
              }
              right={null}
            />
            {touched.contactEmail && errors.contactEmail ? (
              <Text style={styles.errorText}>{errors.contactEmail}</Text>
            ) : (
              <View style={styles.divider} />
            )}
            <CcTextInput
              label={'Contact  Phone Number'}
              keyboardType='phone-pad'
              onChangeText={handleChange('contactNumber')}
              onBlur={handleBlur('contactNumber')}
              value={values.contactNumber}
              autoCapitalize='none'
              outlineColor={errors.contactNumber ? 'red' : 'gray'}
              right={null}
            />
            {touched.contactNumber && errors.contactNumber ? (
              <Text style={styles.errorText}>{errors.contactNumber}</Text>
            ) : (
              <View style={styles.divider} />
            )}
            {loading ? (
              <ActivityIndicator style={{ flex: 1 }} size={'large'} />
            ) : (
              <CcButton title={'SUBMIT'} onPress={handleSubmit} />
            )}
            <View style={{ paddingBottom: '25%' }} />
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default Referral;
