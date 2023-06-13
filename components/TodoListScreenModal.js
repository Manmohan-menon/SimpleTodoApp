import React, { useState } from 'react';
import Constants from 'expo-constants';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editTodo, setEditTodo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const addTodo = () => {
    if (input === '') return;
    setTodos([...todos, input]);
    setInput('');
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const updateTodo = (index) => {
    setEditIndex(index);
    setEditTodo(todos[index]);
    setModalVisible(true);
  };

  const saveTodo = () => {
    if (editTodo === '') return;
    const updatedTodos = [...todos];
    updatedTodos[editIndex] = editTodo;
    setTodos(updatedTodos);
    setEditIndex(-1);
    setEditTodo('');
    setModalVisible(false);
  };

  const cancelEdit = () => {
    setEditIndex(-1);
    setEditTodo('');
    setModalVisible(false);
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
      color: 'red',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 8,
      elevation: 4,
    },
    modalInput: {
      marginBottom: 8,
      padding: 8,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    modalButton: {
      marginLeft: 8,
      padding: 8,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => setInput(text)}
        value={input}
        style={{ padding: 5 }}
      />
      <TouchableOpacity onPress={addTodo}>
        <Text style={styles.paragraph}>Add</Text>
      </TouchableOpacity>
      <ScrollView>
        {todos.map((todo, index) => (
          <View key={index} style={styles.todoItem}>
            <TouchableOpacity onPress={() => updateTodo(index)}>
              <MaterialIcons name="edit" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.todoTextContainer}>
              <Text style={styles.todoText}>{todo}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteTodo(index)}>
              <Text style={styles.removeLink}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.modalInput}
              onChangeText={(text) => setEditTodo(text)}
              value={editTodo}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={cancelEdit}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={saveTodo}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TodoList;
