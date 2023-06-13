import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PinAuth from './components/PinAuth';
import TodoListScreen from './components/TodoListScreen';

const Stack = createStackNavigator();

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleAuthStatusChange = (status) => {
    setAuthenticated(status);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!authenticated ? (
          <Stack.Screen
            name="PinAuth"
            component={PinAuth}
            options={{ headerShown: false }}
            initialParams={{ handleAuthStatusChange }}
          />
        ) : (
          <Stack.Screen name="TodoList" component={TodoListScreen} options={{ headerShown: true }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
