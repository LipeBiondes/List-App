import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/FontAwesome'

const AlertDeleteButton = ({
  isVisible,
  title,
  message,
  onClose,
  onConfirm
}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="exclamation-triangle" size={40} color="red" />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={onConfirm}
          >
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10
  },
  message: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold'
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  button: {
    borderRadius: 5,
    padding: 10
  },
  cancelButton: {
    backgroundColor: 'red',
    marginRight: 10
  },
  confirmButton: {
    backgroundColor: 'green'
  },
  buttonText: {
    color: 'white',
    fontSize: 22
  }
})

export default AlertDeleteButton
