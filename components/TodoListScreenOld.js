import React, { useState } from 'react';
import Constants from 'expo-constants';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TodoListOld = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [selectedTodoIndex, setSelectedTodoIndex] = useState(null);
  const [updatedTodo, setUpdatedTodo] = useState('');

  const addTodo = () => {
    if (input === '') return;
    setTodos([...todos, input]);
    setInput('');
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const updateTodo = (index) => {
    setSelectedTodoIndex(index);
    setUpdatedTodo(todos[index]);
  };

  const saveUpdatedTodo = () => {
    if (selectedTodoIndex !== null && updatedTodo !== '') {
      const updatedTodos = [...todos];
      updatedTodos[selectedTodoIndex] = updatedTodo;
      setTodos(updatedTodos);
      setSelectedTodoIndex(null);
      setUpdatedTodo('');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#FFFF',
      borderRadius: 6,
      marginBottom: 8,
    },
    todoTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginRight: 8,
    },
    todoText: {
      fontSize: 16,
    },
    removeLink: {
      color: '#2196F3',
    },
    paragraph: {
      margin: 5,
      fontSize: 18,
      fontWeight: 'normal',
      textAlign: 'center',
      color: '#ffff',
      backgroundColor: '#2196F3',
    },
  });

  return (
    <View style={styles.container}>      
      <ScrollView>
        {todos.map((todo, index) => (
          <View key={index} style={styles.todoItem}>
            <View style={styles.todoTextContainer}>
              <TouchableOpacity onPress={() => updateTodo(index)}>
                <MaterialIcons name="edit" size={24} color="black" />
              </TouchableOpacity>
              {selectedTodoIndex === index ? (
                <TextInput
                  onChangeText={(text) => setUpdatedTodo(text)}
                  value={updatedTodo}
                  style={styles.todoText}
                  autoFocus
                />
              ) : (
                <Text style={styles.todoText}>{todo}</Text>
              )}
            </View>
            {selectedTodoIndex === index ? (
              <TouchableOpacity onPress={saveUpdatedTodo}>
                <MaterialIcons name="done" size={24} color="green" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => deleteTodo(index)}>
                <Text style={styles.removeLink}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
      <TextInput
        onChangeText={(text) => setInput(text)}
        value={input}
        style={{ padding: 2, backgroundColor:'#dce0e1', borderRadius: 6 }}
      />
      <TouchableOpacity onPress={addTodo}>
        <Text style={styles.paragraph}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoListOld;