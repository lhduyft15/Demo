import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const AddTaskScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [des, setDes] = useState('');

  const onSubmit = () => {
    const newTask = {
      name,
      des,
    };
    navigation.navigate({
      name: 'Home',
      params: {newTask},
      merge: true,
    });
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 20}}>
      <Text style={styles.name}>Task name :</Text>
      <TextInput
        style={{
          height: 40,
          backgroundColor: 'azure',
          fontSize: 16,
          marginTop: 10,
        }}
        placeholder="What's your task name?"
        onChangeText={text => setName(text)}
      />

      <Text style={styles.name}>Task description :</Text>
      <TextInput
        style={{
          height: 40,
          backgroundColor: 'azure',
          fontSize: 16,
          marginTop: 10,
        }}
        placeholder="How would you do it?"
        onChangeText={text => setDes(text)}
      />

      <TouchableOpacity
        onPress={onSubmit}
        style={{
          paddingHorizontal: 10,
          backgroundColor: 'green',
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 20,
          borderRadius: 20,
        }}>
        <Text style={styles.button}>S A V E</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  name: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 15,
  },
  button: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
  },
});
