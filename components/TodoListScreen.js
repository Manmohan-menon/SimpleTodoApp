import React, { useState } from 'react';
import Constants from 'expo-constants';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const TodoListScreen = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);

  const addTodo = () => {
    if (input === '') return;
    if (editingIndex !== -1) {
      // Updating existing todo
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = input;
      setTodos(updatedTodos);
      setEditingIndex(-1);
    } else {
      // Adding new todo
      setTodos([...todos, input]);
    }
    setInput('');
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const startEditing = (index, todo) => {
    setEditingIndex(index);
    setInput(todo);
  };

  const cancelEditing = () => {
    setEditingIndex(-1);
    setInput('');
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
      backgroundColor:'#FFFF',
      borderRadius: 4,
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
      fontWeight: 'normal',
    },
    miniContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:'#FFFF',
      borderRadius: 4,
    },
    addButton: {
      backgroundColor: '#3498db',
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 4,
      marginTop: 2,
      alignItems: 'center',
      marginLeft: 8,
    },
    addButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        {todos.map((todo, index) => (
          <View key={index} style={styles.todoItem}>
            <TouchableOpacity onPress={() => startEditing(index, todo)} testID="edit-todo-button">
              <MaterialIcons name="edit" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.todoTextContainer}>
              {editingIndex === index ? (
                <TextInput
                  style={styles.todoText}
                  onChangeText={(text) => setInput(text)}
                  value={input}
                  testID={`edit-todo-input-${index}`} // Adding unique testID for each input field
                />
              ) : (
                <Text style={styles.todoText}>{todo}</Text>
              )}
            </View>
            <TouchableOpacity onPress={() => deleteTodo(index)}>
              <Text style={styles.removeLink}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.miniContainer}>
        <TextInput
          onChangeText={(text) => setInput(text)}
          value={input}
          style={[styles.todoText, { flex: 1 }]}
          testID="add-todo-input"
        />
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.addButton}>
            <Text style={styles.addButtonText}>{editingIndex !== -1 ? 'Update' : 'Add'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoListScreen;
