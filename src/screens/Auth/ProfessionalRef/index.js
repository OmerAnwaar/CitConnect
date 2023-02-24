import { useRoute } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import CcButton from '../../../components/CcButton';
import CcTextInput from '../../../components/CcTextInput';
import icons from '../../../constants';
import { createUser } from '../../../store/features/authSlice';
import styles from './styles';

const initialValues = {
  bussinessEIN: '',
  address: '',
  username: '',
  globalErr: '',
};

const ProfessionalRef = () => {
  const { params } = useRoute();
  const [isWeekly, setIsWeekly] = useState(false);
  const [isDirect, setIsDirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    { label: 'Zelle', value: 'zelle' },
    { label: 'Cashapp', value: 'cashapp' },
    { label: 'Paypal', value: 'paypal' },
    { label: 'Venmo', value: 'venmo' },
  ]);

  const validationSchema = yup.object().shape({
    bussinessEIN: yup.string().required(),
    address: isWeekly ? yup.string().required() : null,
    username: isDirect && value ? yup.string().required() : null,
  });

  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      if (!isWeekly && !isDirect) {
        Alert.alert('Please select payment method!');
        return;
      }
      if (isDirect && !value) {
        Alert.alert('Please select an option for Payments!');
        return;
      }
      setLoading(true);
      let payload;
      if (isWeekly) {
        payload = {
          ...params,
          businessEIN: values.bussinessEIN,
          address: values.address,
        };
      } else if (isDirect) {
        payload = {
          ...params,
          bushinessEIN: values.bussinessEIN,
          paymentType: value,
          paymentUser: values.username,
        };
      }
      await dispatch(createUser(payload)).unwrap();
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  function handleGeneral() {
    setIsWeekly(!isWeekly);
    setIsDirect((prevState) => (true ? false : true));
  }
  function handleProfessional() {
    setIsDirect(!isDirect);
    setIsWeekly((prevState) => (true ? false : true));
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.longLogo}
        source={icons.LOGO}
        resizeMode={'contain'}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
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
              label={'Bussiness EIN'}
              keyboardType='phone-number'
              onChangeText={handleChange('bussinessEIN')}
              onBlur={handleBlur('bussinessEIN')}
              value={values.bussinessEIN}
              outlineColor={
                touched.bussinessEIN && errors.bussinessEIN ? 'red' : 'gray'
              }
              right={null}
            />
            {touched.bussinessEIN && errors.bussinessEIN ? (
              <Text style={styles.errorText}>{errors.bussinessEIN}</Text>
            ) : (
              <View style={styles.divider} />
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox
                style={styles.checkbox}
                value={isWeekly}
                onValueChange={handleGeneral}
                color={isWeekly ? 'orange' : undefined}
              />
              <Text>Mail referral fee to bussiness address (2-3 weeks)</Text>
            </View>
            {isWeekly && (
              <>
                <CcTextInput
                  label={'Address'}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                  outlineColor={
                    touched.address && errors.address ? 'red' : 'gray'
                  }
                  right={null}
                />
                {touched.address && errors.address ? (
                  <Text style={styles.errorText}>{errors.address}</Text>
                ) : (
                  <View style={styles.divider} />
                )}
              </>
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: '4%',
              }}
            >
              <Checkbox
                style={styles.checkbox}
                value={isDirect}
                onValueChange={handleProfessional}
                color={isDirect ? 'orange' : undefined}
              />
              <Text>Mobile Payment</Text>
            </View>
            {isDirect && (
              <>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  itemSeparator={true}
                  itemSeparatorStyle={styles.pickerItemSeperatorStyle}
                  style={styles.pickerStyle}
                />
                {(value === 'cashapp' || value === 'venmo') && (
                  <>
                    <CcTextInput
                      label={'Username'}
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                      outlineColor={
                        touched.username && errors.username ? 'red' : 'gray'
                      }
                      right={null}
                    />
                    {touched.username && errors.username ? (
                      <Text style={styles.errorText}>{errors.username}</Text>
                    ) : (
                      <View style={styles.divider} />
                    )}
                  </>
                )}
                {value === 'zelle' && (
                  <>
                    <CcTextInput
                      label={'Phone Number or Email'}
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                      outlineColor={
                        touched.username && errors.username ? 'red' : 'gray'
                      }
                      right={null}
                    />
                    {touched.username && errors.username ? (
                      <Text style={styles.errorText}>{errors.username}</Text>
                    ) : (
                      <View style={styles.divider} />
                    )}
                  </>
                )}
                {value === 'paypal' && (
                  <>
                    <CcTextInput
                      label={'Username or email'}
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                      outlineColor={
                        touched.username && errors.username ? 'red' : 'gray'
                      }
                      right={null}
                    />
                    {touched.username && errors.username ? (
                      <Text style={styles.errorText}>{errors.username}</Text>
                    ) : (
                      <View style={styles.divider} />
                    )}
                  </>
                )}
              </>
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
                <CcButton title={'SUBMIT'} onPress={handleSubmit} />
              </View>
            )}
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default ProfessionalRef;
