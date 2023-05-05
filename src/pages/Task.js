import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native'

/** Estrutura
 * task
 * description
 * conclud
 */

const Task = ({ navigation }) => {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')

  //Recuperando os dados do banco
  useEffect(() => {
    AsyncStorage.getItem('dataTasks').then(data => {
      const tasks = JSON.parse(data)
      console.log('data: ', tasks)
      if (data == null) {
        setTask([
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
      const conclud = false
      let d = new Date()
      const id = d.getTime().toString()
      const data = {
        id,
        task,
        description,
        conclud
      }
      console.log('Válido!')
      console.log(data)

      tasks.push(data)
      await AsyncStorage.setItem('dataTasks', JSON.stringify(tasks))
      navigation.navigate('Main')
    } else {
      console.log('Inválido!')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Escreva uma nova tarefa...</Text>

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
        alue={description}
        onChangeText={text => {
          setDescription(text)
        }}
      />

      <TouchableOpacity
        //Botão de Cadastrar
        style={[styles.saveButton, isValid() ? '' : styles.saveButtonInvalid]}
        onPress={onSave}
      >
        <Text style={styles.saveButtonText}>Cadastrar</Text>
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
    padding: 14,
    marginTop: 45
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
