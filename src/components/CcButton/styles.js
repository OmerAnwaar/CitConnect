import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const height = Dimensions.get('screen').height;

export default StyleSheet.create({
  linearGradient: {
    borderRadius: 15,
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: RFValue(20, height),
    textAlign: 'center',
    color: 'white',
  },
});
