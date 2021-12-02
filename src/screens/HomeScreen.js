import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DataDefault from '../DataDefault';
import imgAdd from '../img/plus.png';
import imgEdit from '../img/edit.png';
import imgDelete from '../img/delete.png';

const ItemSeparatorComponent = () => {
  return (
    <View
      style={{
        height: 10,
      }}
    />
  );
};

const HomeScreen = ({navigation, route}) => {
  const [taskList, setTaskList] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      setTaskList(JSON.parse(jsonValue) || DataDefault);
    } catch (e) {
      // error reading value
    }
  };

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    console.log('DATA');
    getData();
  }, []);

  useEffect(() => {
    if (route.params?.newTask) {
      const newTasKList = [...taskList];
      newTasKList.push({
        id: newTasKList.length,
        name: route.params?.newTask?.name,
        des: route.params?.newTask?.des,
      });
      storeData(newTasKList);
      setTaskList(newTasKList);
    }
  }, [route.params?.newTask]);

  useEffect(() => {
    const {params} = route;
    if (params?.updatedTask) {
      const tasKListTemp = [...taskList];

      tasKListTemp.forEach(item => {
        if (item.id === params?.updatedTask.id) {
          item.name = params?.updatedTask?.name;
          item.des = params?.updatedTask?.des;
        }
      });
      storeData(tasKListTemp);
      setTaskList(tasKListTemp);
    }
  }, [route.params?.updatedTask]);

  const navToEditTask = item => {
    const selectedTask = {
      id: item.id,
      name: item.name,
      des: item.des,
    };
    navigation.navigate({
      name: 'EditTask',
      params: {selectedTask},
      merge: true,
    });
  };

  const ItemBlock = ({item}) => {
    return (
      <LinearGradient
        colors={['#009245', '#8cc631']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={styles.item}>
        <View style={styles.content}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.name}>{item.des}</Text>
        </View>

        <View style={styles.contentButton}>
          <View style={styles.contentEdit}>
            <TouchableOpacity
              onPress={() => navToEditTask(item)}
              style={[styles.button, {marginRight: 10}]}>
              <Image
                source={imgEdit}
                style={{width: 15, height: 15, tintColor: 'gray'}}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Image
                source={imgDelete}
                style={{width: 18, height: 18, tintColor: 'red'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#009245', '#8cc631']}
        style={styles.buttonAdd}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTask')}
          style={{paddingHorizontal: 10, alignItems: 'center'}}>
          <Image
            source={imgAdd}
            style={{width: 25, height: 25, tintColor: 'white'}}
          />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.flatList}>
        <FlatList
          data={taskList}
          renderItem={ItemBlock}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  flatList: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    flex: 1,
    minHeight: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
  },
  content: {
    flex: 2,
    paddingHorizontal: 10,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonAdd: {
    width: 45,
    paddingVertical: 10,
    borderRadius: 100,
    marginLeft: 310,
    marginBottom: 10,
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentButton: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'flex-end',
  },
  contentEdit: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});
