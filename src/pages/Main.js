import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Constants from 'expo-constants'
const Main = ({ navigation }) => {
  //essa const armazena as tarefas recuperadas
  const [tasks, setTasks] = useState([])

  // Recarregando a lista de tarefas toda vez que a tela Main voltar a ter foco e recuperando os dados do bd e setando os dados recuperados na Flatlist
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('dataTasks').then(data => {
        const tasks = JSON.parse(data)
        setTasks(tasks)
      })
    })
    return unsubscribe
  }, [navigation])

  //Função para passar os parametros id e isEdit pelo navigate
  const onTaskEdit = taskId => {
    const task = tasks.find(item => item.id === taskId)
    navigation.navigate('Task', { taskGet: task, isEdit: true })
  }

  //Função para passar os parametros id e isEdit vazios pois na pagina Task se espera que esses parametros sejam sempre passados
  const onNewTask = () => {
    const task = { id: 0, task: '', description: '' }
    navigation.navigate('Task', { taskGet: task, isEdit: false })
  }
  //Função para apagar a tarefa do bd
  const onTaskDelete = async taskId => {
    Alert.alert(
      'Deseja apagar essa tarefa?',
      '',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            const newTasks = tasks.filter(item => item.id !== taskId)
            await AsyncStorage.setItem('dataTasks', JSON.stringify(newTasks))
            setTasks(newTasks)
          },
          style: 'destructive'
        }
      ],
      { cancelable: true }
    )
  }
  //Função para alterar o conclud da tarefa no bd
  const onTaskConclud = async taskId => {
    const newTasks = tasks.map(item => {
      if (item.id === taskId) {
        item.conclud = !item.conclud
      }
      return item
    })
    await AsyncStorage.setItem('dataTasks', JSON.stringify(newTasks))
    setTasks(newTasks)
  }
  return (
    <View style={styles.container}>
      <View style={styles.toolBox}>
        <Text style={styles.title}>Lista de Tarefas</Text>
        <TouchableOpacity style={styles.toolBoxButton} onPress={onNewTask}>
          <Icon name="add" size={35} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        //Renderizando os itens recuperados do bd
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemsContainer}>
            <TouchableOpacity
              style={styles.itemButton}
              onPress={() => onTaskConclud(item.id)}
            >
              <Text
                style={[
                  styles.itemText,
                  item.conclud ? styles.itemConlcud : ''
                ]}
              >
                {item.task}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => onTaskEdit(item.id)}
            >
              <Icon name="create" size={35} color="#2ecc71" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onTaskDelete(item.id)}
            >
              <Icon name="delete" size={35} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: Constants.statusBarHeight - 20,
    backgroundColor: '#f0ee87'
  },
  toolBox: {
    flexDirection: 'row',
    marginBottom: 5,
    marginRight: 5
  },
  title: {
    flex: 1,
    color: '#3498db',
    fontSize: 40
  },
  toolBoxButton: {
    borderRadius: 50,
    backgroundColor: '#3498db',
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#d7dd75'
  },
  itemButton: {
    flex: 1
  },
  editButton: {
    paddingRight: 2
  },
  itemText: {
    fontSize: 35
  },
  deleteButton: {
    paddingRight: 2
  },
  itemConlcud: {
    textDecorationLine: 'line-through',
    color: '#95a5a6'
  }
})
export default Main
