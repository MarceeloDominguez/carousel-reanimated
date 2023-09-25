import {StatusBar} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar backgroundColor="#333333" barStyle="light-content" />
        <Navigation />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

export default App;
