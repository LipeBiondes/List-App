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
import AlertConcludTask from '../components/AlertConcludTask'
import AlertErroEditTask from '../components/AlertErroEditTask'
import AlertDescriptionTask from '../components/AlertDescriptionTask'
const Main = ({ navigation }) => {
  //essa const armazena as tarefas recuperadas
  const [tasks, setTasks] = useState([])
  //essa const seta os modais como false para não aparecer
  const [showAlertDeleteButton, setShowAlertDeleteButton] = useState(false)
  const [showAlertConcludTask, setShowAlertConcludTask] = useState(false)
  const [showAlertErrorEditTask, setShowAlertErrorEditTask] = useState(false)
  const [showAlertDescriptionTask, setShowAlertDescriptionTask] =
    useState(false)
  //essa const armazena o id da tarefa quando o usuario clica em deletar
  const [idButtonDelete, setIdButtonDelete] = useState('')
  const [messageTaskDeleteButton, setMessageTaskDeleteButton] = useState('')
  const [messageTaskConcludTask, setMessageTaskConcludTask] = useState('')
  const [onClicktAlertTask, setOnClickAlertTask] = useState('')
  const [onClickAlertDescription, setOnClickAlertDescription] = useState('')
  const [taskCheck, setTaskCheck] = useState('')

  const onHandlePressMessage = async idTask => {
    const messageTask = tasks.find(item => item.id === idTask)
    setMessageTaskDeleteButton(`Excluir essa tarefa: ${messageTask.task} ?`)
  }

  //Exibe o modal Tarefa concluida
  const handlePressConcludTask = () => {
    setShowAlertConcludTask(true)
  }
  //Fecha o modal
  const handleCloseConcludTask = () => {
    setShowAlertConcludTask(false)
  }
  const handlePressDescriptionTask = () => {
    setShowAlertDescriptionTask(true)
  }
  const handleCloseDescriptionTask = () => {
    setShowAlertDescriptionTask(false)
  }
  //Exibe o modal AlertErroEditTask
  const handlePressEditTask = () => {
    setShowAlertErrorEditTask(true)
  }
  //Fecha o modal
  const handleCloseAlertErrorEditTask = () => {
    setShowAlertErrorEditTask(false)
  }
  //Exibe o modal AlertDeleteButton
  const handlePressDeleteButton = id => {
    setIdButtonDelete(id)
    onHandlePressMessage(id)
    setShowAlertDeleteButton(true)
  }

  //Fecha o modal
  const handleCloseDeleteButton = () => {
    setShowAlertDeleteButton(false)
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
      setTaskCheck(task.task)
      handlePressEditTask()
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
    handleCloseDeleteButton()
  }
  //Função para alterar o conclud da tarefa no bd
  const onTaskConclud = async taskId => {
    const newTasks = tasks.map(item => {
      if (item.id === taskId) {
        item.conclud = !item.conclud
        setMessageTaskConcludTask(item.task)
        if (item.conclud) {
          handlePressConcludTask()
        }
      }
      if (item.conclud) {
        item.icon = 'check-square-o'
      } else {
        item.icon = 'square-o'
      }
      return item
    })
    await AsyncStorage.setItem('dataTasks', JSON.stringify(newTasks))
    setTasks(newTasks)
  }
  //Função para exibir a descrição da tarefa quando clicar nela.
  const onDisplayDescription = async (itemTask, itemDescription) => {
    setOnClickAlertTask(itemTask)
    setOnClickAlertDescription(itemDescription)
    handlePressDescriptionTask()
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleToolBox}>
        <TouchableOpacity style={styles.toolBox} onPress={onNewTask}>
          <Text style={styles.title}>Adicionar </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.taskArea}>
        <FlatList
          //Renderizando os itens recuperados do bd
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemsContainer}>
              <View style={styles.textBox}>
                <TouchableOpacity
                  onPress={async () =>
                    onDisplayDescription(item.task, item.description)
                  }
                >
                  <Text
                    style={[
                      styles.itemText,
                      item.conclud ? styles.itemConlcud : ''
                    ]}
                  >
                    {item.task}
                  </Text>
                  <AlertDescriptionTask
                    isVisible={showAlertDescriptionTask}
                    title={onClicktAlertTask}
                    description={onClickAlertDescription}
                    onClose={handleCloseDescriptionTask}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.boxButtons}>
                <TouchableOpacity
                  style={styles.checkButton}
                  onPress={() => onTaskConclud(item.id)}
                >
                  <Icon name={item.icon} size={38} color="#000" />
                  <AlertConcludTask
                    isVisible={showAlertConcludTask}
                    taskName={messageTaskConcludTask}
                    onClose={handleCloseConcludTask}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => onTaskEdit(item.id)}
                >
                  <Icon name="pencil" size={35} color="#000" />
                  <AlertErroEditTask
                    isVisible={showAlertErrorEditTask}
                    taskName={taskCheck}
                    onClose={handleCloseAlertErrorEditTask}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handlePressDeleteButton(item.id)}
                >
                  <AlertDeleteButton
                    isVisible={showAlertDeleteButton}
                    title="Alerta"
                    message={messageTaskDeleteButton}
                    onClose={handleCloseDeleteButton}
                    onConfirm={() => onTaskDelete()}
                  />
                  <Icon name="trash-o" size={35} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    cursor: 'pointer',
    flex: 1,
    flexDirection: 'column-reverse',
    padding: 5,
    paddingTop: Constants.statusBarHeight - 20,
    backgroundColor: '#F0F0F0'
  },
  titleToolBox: {
    flex: 1
  },
  taskArea: {
    flex: 9
  },
  textBox: {
    flex: 1,
    justifyContent: 'center'
  },
  boxButtons: {
    width: 120,
    height: 60,
    flexDirection: 'row',
    paddingRight: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 2,
    borderColor: '#95a5a6',
    borderRadius: 7,
    backgroundColor: '#fff',
    padding: 5
  },
  toolBox: {
    padding: 5,
    height: 55,
    flexDirection: 'row',
    marginBottom: 5,
    marginRight: 5,
    bottom: 3,
    backgroundColor: '#CE5959',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 2
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 28
  },
  toolBoxButton: {
    borderRadius: 50,
    backgroundColor: '#000',
    height: '35%',
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#95a5a6',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5
  },
  checkButton: {
    paddingRight: 4,
    paddingTop: 5
  },
  editButton: {
    paddingRight: 4
  },
  itemText: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'left'
  },
  deleteButton: {
    paddingRight: 4
  },
  itemConlcud: {
    textDecorationLine: 'line-through',
    color: '#95a5a6'
  }
})
export default Main
