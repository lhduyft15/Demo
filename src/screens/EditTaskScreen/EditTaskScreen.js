import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {styles} from './_style';

import imgHeader from '../../img/header.png';
import imgBack from '../../img/back.png';
import LinearGradient from 'react-native-linear-gradient';
export default function EditTaskScreen({navigation, route}) {
  const [name, setName] = useState('');
  const [des, setDes] = useState('');
  const [heightDesInput, setHeightDesInput] = useState(40);
  const width = Dimensions.get('screen').width;

  useEffect(() => {
    const {params} = route;
    if (params?.selectedTask) {
      setName(params?.selectedTask?.name);
      setDes(params?.selectedTask?.des);
    }
  }, []);

  const onSubmit = () => {
    const {params} = route;
    const updatedTask = {
      id: params?.selectedTask?.id,
      name,
      des,
    };
    navigation.navigate({
      name: 'Home',
      params: {updatedTask},
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          source={imgHeader}
          style={styles.imageBackground}
          resizeMode="contain">
          <Text style={styles.title}>EDIT TASK</Text>
        </ImageBackground>
      </View>

      <View
        style={{alignItems: 'flex-end', height: width * 0.2, marginRight: 30}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#009245', '#8cc631']}
          style={styles.buttonBack}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{paddingHorizontal: 10, alignItems: 'center'}}>
            <Image
              source={imgBack}
              style={{width: 25, height: 25, tintColor: 'white'}}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <ScrollView style={styles.body}>
        <Text style={styles.name}>Task name :</Text>
        <TextInput
          style={{
            height: 40,
            backgroundColor: 'azure',
            fontSize: 16,
            marginTop: 10,
          }}
          placeholder="What's your task name?"
          defaultValue={name}
          onChangeText={text => setName(text)}
        />

        <Text style={styles.name}>Description :</Text>
        <TextInput
          style={{
            height: heightDesInput,
            backgroundColor: 'azure',
            fontSize: 16,
            marginTop: 10,
          }}
          placeholder="How would you do it?"
          defaultValue={des}
          multiline={true}
          onChangeText={text => setDes(text)}
          editable={true}
          onContentSizeChange={e =>
            setHeightDesInput(e.nativeEvent.contentSize.height)
          }
        />

        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#009245', '#8cc631']}
          style={styles.button}>
          <TouchableOpacity onPress={onSubmit}>
            <Text style={styles.textSave}>S A V E</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}
