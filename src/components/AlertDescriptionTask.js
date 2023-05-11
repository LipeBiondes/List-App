import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Modal from 'react-native-modal'

const AlertDescriptionTask = ({ isVisible, title, description, onClose }) => {
  if (description === '') {
    description = 'Sem descrição.'
  } 
  return (
    <Modal isVisible={isVisible} animationIn="zoomIn" animationOut="zoomOut">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.alertContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{`Tarefa: ${title}`}</Text>
              <Text
                style={styles.description}
              >{`Descrição: ${description}`}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>OK</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: 'auto'
  },
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20
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
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: 'stretch'
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})

export default AlertDescriptionTask
