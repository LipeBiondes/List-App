import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Main = ({ navigation }) => {
  //essa const armazena as tarefas recuperadas
  const [tasks, setTasks] = useState([])

  /*
  // Recuperando os dados do banco e setando os dados recuperados na Flatlist toda vez que a pagina é renderizada
  useEffect(() => {
    AsyncStorage.removeItem('dataTasks')
    AsyncStorage.getItem('dataTasks').then(data => {
      const tasks = JSON.parse(data)
      console.log('data: ', tasks)
      setTasks(tasks)
    })
  }, [])
*/

  // Recarregando a lista de tarefas toda vez que a tela Main voltar a ter foco
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('dataTasks').then(data => {
        const tasks = JSON.parse(data)
        console.log('data: ', tasks)
        setTasks(tasks)
      })
    })
    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.toolBox}>
        <Text style={styles.title}>Lista de Tarefas</Text>
        <TouchableOpacity
          style={styles.toolBoxButton}
          onPress={() => navigation.navigate('Task')}
        >
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        //Renderizando os itens recuperados do bd
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemButton}>
            <Text style={styles.itemText}>{item.task}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  toolBox: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 15,
    marginRight: 5
  },
  title: {
    flex: 1,
    color: '#3498db',
    fontSize: 32
  },
  toolBoxButton: {
    borderRadius: 50,
    backgroundColor: '#3498db',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemsContainer: {
    flexDirection: 'row'
  },
  itemButton: {
    flex: 1
  },
  editButton: {},
  itemText: {
    fontSize: 30
  },
  deleteButton: {},
  itemRead: {
    textDecorationLine: 'line-through',
    color: '#95a5a6'
  }
})
export default Main
