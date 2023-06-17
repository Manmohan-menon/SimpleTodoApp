import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import TodoListScreen from './TodoListScreen';

const longPressEvent = (element) => {
    fireEvent(element, new Event('longpress', { bubbles: true, cancelable: true }));
  };

describe('TodoList', () => {
  it('renders an empty todo list', () => {
    const { queryByText } = render(<TodoListScreen />);

    expect(queryByText('Remove')).toBeNull();
  });

  it('adds a new todo', () => {
    const { getByText, getByTestId } = render(<TodoListScreen />);
  
    const inputField = getByTestId('add-todo-input');
    fireEvent.changeText(inputField, 'New Todo');
  
    const addButton = getByText('Add');
    fireEvent.press(addButton);
  
    expect(getByText('New Todo')).toBeTruthy();
  });
  
  it('edits an existing todo', async () => {
    const { getByText, getAllByTestId, getByTestId, queryByText } = render(<TodoListScreen />);
  
    // Add a new todo
    const inputField = getByTestId('add-todo-input');
    fireEvent.changeText(inputField, 'Original Todo');
    const addButton = getByText('Add');
    fireEvent.press(addButton);
  
    // Find the TouchableOpacity for editing and click on it
    const editButtons = getAllByTestId('edit-todo-button');
    fireEvent.press(editButtons[0]);
  
    // Check if the Add button is replaced by the Update button
    expect(queryByText('Add')).toBeNull();
    const saveButton = getByText('Update');
  
    // Update the text input with the new todo content
    const editInputField = getByTestId('edit-todo-input-0');
    fireEvent.changeText(editInputField, 'Updated Todo');
  
    // Click on the Save button and verify that the todo has been updated
    fireEvent.press(saveButton);
    expect(getByText('Updated Todo')).toBeTruthy();
  });
  
  it('deletes a todo', () => {
    const { getByText, queryByText, getByTestId } = render(<TodoListScreen />);
  
    const inputField = getByTestId('add-todo-input');
    fireEvent.changeText(inputField, 'Todo to delete');
    const addButton = getByText('Add');
    fireEvent.press(addButton);
  
    const todoText = getByText('Todo to delete');
    fireEvent.press(todoText);
  
    const removeButton = getByText('Remove');
    fireEvent.press(removeButton);
  
    expect(queryByText('Todo to delete')).toBeNull();
  });

  it('does not add an empty todo', () => {
    const { getByText, queryByText } = render(<TodoListScreen />);

    const addButton = getByText('Add');
    fireEvent.press(addButton);

    expect(queryByText('Remove')).toBeNull();
  });
});
