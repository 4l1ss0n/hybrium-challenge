import {Dimensions, StyleSheet} from 'react-native';
import { ceil } from 'react-native-reanimated';

const Styles = StyleSheet.create({
  timeDetails: {
    width: Dimensions.get('window').width - 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    marginBottom: 15
  },
  date: {},
  dateDay: {
    fontWeight: 'bold',
    fontSize: 30
  },
  dateMonth: {
    fontSize: 20
  },
  textBlue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006bff'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textValue: {
    fontSize: 18,
  }
});

export default Styles;
