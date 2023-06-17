import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import PinAuth from './PinAuth';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('expo-local-authentication', () => ({
  hasHardwareAsync: jest.fn(() => Promise.resolve(true)),
  supportedAuthenticationTypesAsync: jest.fn(() => Promise.resolve([])),
  authenticateAsync: jest.fn(() => Promise.resolve({ success: true, pin: '1234' })),
  isEnrolledAsync: jest.fn(() => Promise.resolve(true)),
}));

describe('PinAuth', () => {
  it('should render PinAuth component', () => {
    const handleAuthStatusChange = jest.fn();

    useNavigation.mockReturnValue({
      setOptions: jest.fn(),
    });

    render(
      <NavigationContainer>
        <PinAuth handleAuthStatusChange={handleAuthStatusChange} />
      </NavigationContainer>
    );
  });

  it('should call authenticate function on button press', async () => {
    const handleAuthStatusChange = jest.fn();

    const setOptionsMock = jest.fn();

    useNavigation.mockReturnValue({
      setOptions: setOptionsMock,
    });

    const { getByTestId } = render(
      <NavigationContainer>
        <PinAuth handleAuthStatusChange={handleAuthStatusChange} />
      </NavigationContainer>
    );

    fireEvent.press(getByTestId('auth-button')); // mock button press

    expect(setOptionsMock).toHaveBeenCalled();

    act(() => {
      setOptionsMock.mock.calls[0][0].handleAuthStatusChange(true); // Calling handleAuthStatusChange function

      // Check if handleAuthStatusChange function has been called
      expect(handleAuthStatusChange).toHaveBeenCalled();
    });
  });
});
