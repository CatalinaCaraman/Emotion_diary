import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/component/HomeScreen'; 
import EmotionalState from './src/component/EmotionalState';
import Meditation from './src/component/Meditation';
import EmotionInfo from './src/component/EmotionInfo';

const Stack = createStackNavigator();

const App = () => {
  console.log("Its working");
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EmotionalState" component={EmotionalState} />
        <Stack.Screen name="Meditation" component={Meditation} />
        <Stack.Screen name="EmotionInfo" component={EmotionInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;