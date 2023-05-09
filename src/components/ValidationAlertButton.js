import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/FontAwesome'

const ValidationAlertButton = ({ isVisible, title, message, onClose }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.alertContainer}>
          <View style={styles.titleContainer}>
            <Icon name="exclamation-triangle" size={35} color="red" />
            <Text style={styles.title}>{title}</Text>
          </View>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.okButton} onPress={onClose}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertContainer: {
    width: '100%'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10
  },
  message: {
    marginTop: 10,
    fontSize: 22
  },
  okButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    alignSelf: 'flex-end',
    width: 100,
    height: 50
  },
  okButtonText: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center'
  }
})

export default ValidationAlertButton
