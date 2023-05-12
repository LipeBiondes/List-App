import * as React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Image } from 'react-native'

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={style.container}>
      <View style={style.imageStyle}>
        <Image
          source={require('../assets/muie.jpg')}
          style={style.ImageItself}
        ></Image>
      </View>
      <View style={style.background}>
        <Text style={style.title}> Seja bem-vindo!</Text>
        <Text style={style.subtitle}>
          Para começar bem o seu dia, comece organizando as suas tarefas!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <View style={style.titleBackground}>
            <Text style={style.StartButton}>Começar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  background: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 120,
    borderRadius: 10
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
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
  titleBackground: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#CE5959'
  },

  StartButton: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 25
  },
  imageStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  ImageItself: {
    width: 300,
    height: 300,
    resizeMode: 'contain'
  },
  icon: {
    textAlign: 'center',
    marginTop: 10
  }
})

export default WelcomeScreen
