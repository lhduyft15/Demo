import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('screen').width;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginTop: 10,
    position: 'absolute',
  },
  body: {
    flex: 1,
    marginTop: width * 0.3,
    paddingHorizontal: 30,
  },
  name: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 15,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    paddingVertical: 10,
    borderRadius: 100,
  },
  imageBackground: {
    width: width * 0.4,
    height: width * 0.4,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    marginTop: 25,
    fontWeight: 'bold',
    fontSize: 25,
  },
  textSave: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonBack: {
    width: 45,
    paddingVertical: 10,
    borderBottomLeftRadius: 100,
    borderTopLeftRadius: 100,
    marginTop: 40,
  },
});
