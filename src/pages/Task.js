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
import Constants from 'expo-constants'
/** Estrutura do banco
 * id: int
 * task: string
 * description: string
 * conclud: boolean
 * {"conclud": false, "description": "descrição", "id": "1", "task": "tarefa 1"}
 */

const Task = ({ navigation, route }) => {
  const { taskGet, isEdit } = route.params

  //A constante tasks recebe todas as tarefas do banco
  const [tasks, setTasks] = useState([])

  // Constantes que armazenam os valores digitados pelo usuário
  const [task, setTask] = useState(taskGet.task)
  const [description, setDescription] = useState(taskGet.description)
  const [conclud, setConclud] = useState(taskGet.conclud)

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
          conclud
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
      alert('Por favor preencha os campos...')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>
        {isEdit ? 'Altere sua Tarefa' : 'Escreva uma nova tarefa...'}
      </Text>

      <TextInput
        placeholder="Nome da tarefa."
        style={styles.input}
        value={task}
        onChangeText={text => {
          setTask(text)
        }}
      />

      <TextInput
        placeholder="Detalhe sua tarefa aqui."
        style={styles.input}
        multiline={true}
        numberOfLines={5}
        value={description}
        onChangeText={text => {
          setDescription(text)
        }}
      />

      <TouchableOpacity
        //Botão de Cadastrar
        style={[styles.saveButton, isValid() ? '' : styles.saveButtonInvalid]}
        //chamando a função de gravar no banco onSave
        onPress={onSave}
      >
        <Text style={styles.saveButtonText}>
          {isEdit ? 'Atualizar' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        //Botão de Cancelar
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight - 20,
    margin: 5
  },
  containerButtons: {
    alignItems: 'center'
  },
  pageTitle: {
    textAlign: 'center',
    fontSize: 32,
    marginBottom: 25,
    marginTop: 5
  },
  input: {
    fontSize: 26,
    borderBottomColor: '#f39c12',
    borderBottomWidth: 1,
    marginBottom: 5
  },
  saveButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 22
  },
  saveButtonInvalid: {
    opacity: 0.6
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '500',
    alignSelf: 'center'
  },
  cancelButton: {},
  cancelButtonText: {
    fontSize: 26,
    color: '#95a5a6',
    alignSelf: 'center'
  }
})
export default Task
