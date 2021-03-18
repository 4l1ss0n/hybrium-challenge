import {Dimensions, StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfdfdf',
    alignItems: 'center',
    width: '100%'
  },
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fafafa',
    marginBottom: 20
  },
  imgAndName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5
  },
  name: {
    fontSize: 20
  },
  ocupationAndDefaultTime: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  companyTextBlue: {
    fontSize: 20,
    color: '#006bff',
    fontWeight: 'bold'
  },
  companyText: {
    fontSize: 20,
    fontWeight: '600',
  },
  markTime: {
    width: Dimensions.get('window').width - 60,
    height: 40,
    backgroundColor: '#006bff',
    marginBottom: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  markTimeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },


  popupCreateTimeView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  popupView: {
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#777',
    borderWidth: 2,
    width: Dimensions.get('window').width / 1.3,
    height: Dimensions.get('window').width / 1.7,
    justifyContent: 'space-between',
    position: 'relative'
  },
  popupOpnions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popupOpnionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10
  },
  btnSubmit: {
    backgroundColor: '#006bff',
    width: '80%',
    alignSelf: 'center',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  btnSubmitText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  popupCloseButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ff2a00',
    borderRadius: 20,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Styles;
