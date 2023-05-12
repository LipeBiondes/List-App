import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native'
import ValidationAlertButton from '../components/ValidationAlertButton'
//import Icon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/Ionicons'

/** Estrutura do banco
 * id: int
 * task: string
 * description: string
 * conclud: boolean
 * {"conclud": false, "description": "descrição", "id": "1", "task": "tarefa 1"}
 */

const Task = ({ navigation, route }) => {
  //Recebendo os parametros da pagina Main e setando eles para as variaves abaixo
  const { taskGet, isEdit } = route.params

  //A constante tasks recebe todas as tarefas do banco
  const [tasks, setTasks] = useState([])

  // Constantes que armazenam os valores digitados pelo usuário
  const [task, setTask] = useState(taskGet.task)
  const [description, setDescription] = useState(taskGet.description)
  const [conclud, setConclud] = useState(taskGet.conclud)
  const [showAlert, setShowAlert] = useState(false)
  const handlePress = () => {
    setShowAlert(true)
  }

  const handleClose = () => {
    setShowAlert(false)
  }
  //Esse useEffect recupera as tarefas do banco e coloca o objeto task no array tasks para que possamos usar o metodo tasks.push no onSave
  useEffect(() => {
    AsyncStorage.getItem('dataTasks').then(data => {
      const tasks = JSON.parse(data)
      if (data == null) {
        setTasks([
          {
            conclud: false,
            description: '',
            id: '1',
            task: ''
          }
        ])
      } else {
        setTasks(tasks)
      }
    })
  }, [])

  //Função para validar os campos
  const isValid = () => {
    if (task !== undefined && task !== '' && task !== null) {
      return true
    }
    return false
  }

  //Função para salvar os dados no banco
  const onSave = async () => {
    if (isValid()) {
      if (isEdit) {
        //Editando uma tarefa existente
        //Variável temporaria para receber todas as listas de atividades
        let newTasks = tasks
        newTasks.map(item => {
          //usamos a função map onde o id seja o mesmo passado pele navigate para alterar o titulo da task e a descrição
          if (item.id === taskGet.id) {
            item.task = task
            item.description = description
            item.conclud = conclud
          }
          return item
        })
        //Mandando para o bd a lista de tarefas atualizadas
        await AsyncStorage.setItem('dataTasks', JSON.stringify(newTasks))
      } else {
        //Adicionando uma nova tarefa
        const conclud = false

        // Função para gerar ids aleatórios
        let d = new Date()
        const id = d.getTime().toString()

        // Criando a "classe" de task: data, para receber os valores da task
        const data = {
          id,
          task,
          description,
          conclud,
          icon: 'square-o'
        }
        // Removendo a tarefa com o campo task igual a ''
        const updatedTasks = tasks.filter(task => task.task !== '')

        // Adicionando a nova task ao final da lista
        updatedTasks.push(data)

        // gravando a tarefa nova no banco
        await AsyncStorage.setItem('dataTasks', JSON.stringify(updatedTasks))
      }
      navigation.navigate('Main')
    } else {
      handlePress()
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.paddingBorder}>
        <View style={styles.boxInputs}>
          <Text style={styles.pageTitle}>
            {isEdit ? 'Altere sua Tarefa' : 'Crie sua Tarefa'}
          </Text>
          <View style={styles.iconTextInput}>
            <Icon
              name="ios-checkmark-circle"
              size={32}
              color="#000"
              style={styles.iconList}
            />
            <TextInput
              placeholder="Adicione uma tarefa..."
              style={styles.input}
              value={task}
              onChangeText={text => {
                setTask(text)
              }}
            />
          </View>

          <View style={styles.iconTextDesc}>
            <Icon
              name="ios-clipboard"
              size={32}
              color="#000"
              style={styles.iconDesc}
            />
            <TextInput
              placeholder="Adicone uma descrição..."
              style={styles.inputDesc}
              multiline={true}
              numberOfLines={1}
              value={description}
              onChangeText={text => {
                setDescription(text)
              }}
            />
          </View>
        </View>
        <View style={styles.boxButtons}>
          <TouchableOpacity
            //Botão de Cancelar
            style={styles.cancelButton}
            onPress={() => navigation.navigate('Main')}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            //Botão de Cadastrar
            style={[
              styles.saveButton,
              isValid() ? '' : styles.saveButtonInvalid
            ]}
            //chamando a função de gravar no banco onSave
            onPress={onSave}
          >
            <ValidationAlertButton
              isVisible={showAlert}
              title="Error"
              message="Erro ao salvar, não deixe campos vazios!"
              onClose={handleClose}
            />
            <Text style={styles.saveButtonText}>
              {isEdit ? 'Atualizar' : 'Cadastrar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#DDDDDD'
  },
  paddingBorder: {
    padding: 22
  },
  iconTextInput: {
    flexDirection: 'row',
    marginRight: 10
  },
  iconTextDesc: {
    flexDirection: 'row',
    marginRight: 10
  },
  boxInputs: {
    alignItems: 'stretch'
  },
  boxButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    paddingTop: 16
  },
  pageTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 50
  },
  iconList: {
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 10,
    width: 40
  },
  iconDesc: {
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 20,
    width: 40
  },
  input: {
    height: 50,
    fontSize: 25,
    marginBottom: 20,
    borderRadius: 4,
    marginLeft: 4,
    width: 320,
    backgroundColor: '#FFF'
  },
  inputDesc: {
    height: 80,
    borderRadius: 4,
    fontSize: 25,
    marginBottom: 20,
    marginLeft: 4,
    width: 320,
    backgroundColor: '#FFF'
  },
  inputInvalid: {
    borderColor: '#FF0000'
  },
  saveButton: {
    backgroundColor: '#CE5959',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center'
  },
  saveButtonInvalid: {
    opacity: 0.5
  },
  saveButtonText: {
    color: '#FFFBF5',
    fontSize: 26,
    fontWeight: '500',
    alignSelf: 'center'
  },
  cancelButton: {
    borderColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#000'
  },
  cancelButtonText: {
    fontSize: 26,
    color: '#FFFBF5',
    alignSelf: 'center',
    fontWeight: '500'
  }
})
export default Task
