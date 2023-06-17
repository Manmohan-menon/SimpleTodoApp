import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PinAuth from './components/PinAuth';
import TodoList from './components/TodoListScreen';

const Stack = createStackNavigator();

const App = () => {
  const [authStatus, setAuthStatus] = useState(false);

  const handleAuthStatusChange = (status) => {
    setAuthStatus(status);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authStatus ? (
          <Stack.Screen name="TodoList" component={TodoList} />
        ) : (
          <Stack.Screen
            name="PinAuth"
            options={{ headerShown: false }}
          >
            {(props) => <PinAuth {...props} handleAuthStatusChange={handleAuthStatusChange} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
