import * as React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import Icon from 'react-native-vector-icons/FontAwesome'
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Text> Vamos Começar!</Text>
        <Icon name="fa-tasks" size={35} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: '#f0ee87'
  }
})
export default WelcomeScreen
