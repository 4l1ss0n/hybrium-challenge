import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loginView: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  header: {
    marginTop: 30,
    marginBottom: 30
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 30
  },
  form: {
    marginBottom: 50
  },
  input: {
    width: '100%',
    height: 50,
    marginTop: 10,
    paddingLeft: 3,
    backgroundColor: '#0000',
    borderBottomColor: '#999',
    borderBottomWidth: 1
  },
  passwordView: {
    position: 'relative',
  },
  showPassword: {
    position: 'absolute',
    right: 5,
    top: 25,
  },
  pswForgot: {
    color: '#006bff',
    textAlign: 'right',
    marginTop: 4
  },
  btn: {
    marginBottom: 30,
    width: '100%',
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#006bff'
  },
  btnText: {
    color: '#fff',
    fontWeight: '600'
  }
});

export default Styles;