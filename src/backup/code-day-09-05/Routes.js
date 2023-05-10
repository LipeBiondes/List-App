import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Main from './pages/Main'
import Task from './pages/Task'
import WelcomeScreen from './pages/WelcomeScreen'

const Stack = createNativeStackNavigator()

/*<Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{}}
        /> */

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: 'Tela Inicial'
          }}
        />
        <Stack.Screen
          name="Task"
          component={Task}
          options={{
            headerShown: true,
            headerTitle: 'Área de tarefas',
            headerStyle: {
              backgroundColor: '#ffffff'
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
