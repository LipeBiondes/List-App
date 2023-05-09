import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Constants from 'expo-constants'
import AlertDeleteButton from '../components/AlertDeleteButton'
const Main = ({ navigation }) => {
  //essa const armazena as tarefas recuperadas
  const [tasks, setTasks] = useState([])
  //essa const seta o modal como false para não aparecer
  const [showAlert, setShowAlert] = useState(false)
  //essa const armazena o id da tarefa quando o usuario clica em deletar
  const [idButtonDelete, setIdButtonDelete] = useState('')
  const [messageTaskDeleteButton, setMessageTaskDeleteButton] = useState('')

  const onHandlePressMessage = async idTask => {
    const messageTask = tasks.find(item => item.id === idTask)
    setMessageTaskDeleteButton(
      `Você deseja excluir essa tarefa: ${messageTask.task} ?`
    )
  }

  //Quando o usuário clica no botão de excluir o modal abre e o id é passado como parametro
  const handlePress = id => {
    setIdButtonDelete(id)
    onHandlePressMessage(id)
    setShowAlert(true)
  }

  //Quando o modal é fechado a visibilidade é setada como false
  const handleClose = () => {
    setShowAlert(false)
  }

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
    if (task.conclud) {
      alert('Essa tarefa já foi concluida!')
    } else {
      navigation.navigate('Task', { taskGet: task, isEdit: true })
    }
  }

  //Função para passar os parametros id e isEdit vazios pois na pagina Task se espera que esses parametros sejam sempre passados
  const onNewTask = () => {
    const task = { id: 0, task: '', description: '' }
    navigation.navigate('Task', { taskGet: task, isEdit: false })
  }
  //Função para apagar a tarefa do bd
  const onTaskDelete = async () => {
    const newTasks = tasks.filter(item => item.id !== idButtonDelete)
    await AsyncStorage.setItem('dataTasks', JSON.stringify(newTasks))
    setTasks(newTasks)
    handleClose()
  }
  //Função para alterar o conclud da tarefa no bd
  const onTaskConclud = async taskId => {
    const newTasks = tasks.map(item => {
      if (item.id === taskId) {
        item.conclud = !item.conclud
      }
      if (item.conclud) {
        item.icon = 'check-square-o'
        alert(`Parabens! você concluiu essa atividade: ${item.task}`)
      } else {
        item.icon = 'square-o'
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
          <Icon name="plus" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        //Renderizando os itens recuperados do bd
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemsContainer}>
            <View style={styles.textButton}>
              <Text
                style={[
                  styles.itemText,
                  item.conclud ? styles.itemConlcud : ''
                ]}
              >
                {item.task}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.checkButton}
              onPress={() => onTaskConclud(item.id)}
            >
              <Icon name={item.icon} size={35} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => onTaskEdit(item.id)}
            >
              <Icon name="pencil" size={35} color="#2ecc71" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handlePress(item.id)}
            >
              <AlertDeleteButton
                isVisible={showAlert}
                title="Alerta"
                message={messageTaskDeleteButton}
                onClose={handleClose}
                onConfirm={() => onTaskDelete()}
              />
              <Icon name="trash-o" size={35} color="red" />
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
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#d7dd75',
    alignItems: 'center',
    paddingRight: 2
  },
  checkButton: {
    flex: 1,
    alignSelf: 'center'
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
  },
  textButton: {
    flex: 9,
    flexDirection: 'row'
  }
})
export default Main
