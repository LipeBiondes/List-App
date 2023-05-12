import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/FontAwesome'

const AlertErroEditTask = ({ isVisible, taskName, onClose }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.alertContainer}>
          <View style={styles.iconContainer}>
            <Icon name="exclamation-circle" size={42} color="red" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Erro ao editar a tarefa:</Text>
            <Text style={styles.taskName}>{`Tarefa: ${taskName}.`}</Text>
            <Text
              style={styles.taskName}
            >{`Motivo: A tarefa já foi concluida.`}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText} onPress={onClose}>
              Fechar
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  taskName: {
    fontSize: 18,
    textAlign: 'center'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#000',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20
  }
})

export default AlertErroEditTask
