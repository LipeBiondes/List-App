import * as React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
//import Icon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/Ionicons';
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={style.container}>
      <View style={style.background}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Text style={style.title}> Seja bem-vindo!</Text>
          <Text style={style.subtitle}>
            Para começar bem o seu dia, comece organizando as suas tarefas!
          </Text>
          {/* <Icon name="fa-laugh-beam" size={35} color="#fff" style={style.icon} /> */}
          <Icon name="ios-rocket" size={35} color="#CE5959" style={style.icon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    zIndex: 1,
  },
  background: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  subtitle: {
    fontSize: 20,
    color: '#4F4F4F',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    fontStyle: 'italic'
  },
  icon: {
    textAlign: 'center',
    marginTop: 10
  }
})

export default WelcomeScreen
