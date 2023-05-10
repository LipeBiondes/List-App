import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from 'react-native-modal'

const AlertConcludTask = ({ isVisible, taskName, onClose }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.container}>
        <View style={styles.alertContainer}>
          <View style={styles.iconContainer}>
            <Icon name="star" size={36} color="#f0ee00" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Parabéns, você concluiu a tarefa:</Text>
            <Text style={styles.taskName}>{taskName}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText} onPress={onClose}>
              Confirmar
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
    borderRadius: 10
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  taskName: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#000',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20
  }
})

export default AlertConcludTask
