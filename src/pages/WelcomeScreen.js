import * as React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

const WelcomeScreen = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Text> Vamos Começar!</Text>
      </TouchableOpacity>
    </View>
  )
}

export default WelcomeScreen
