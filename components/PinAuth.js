import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, TextInput, StyleSheet, Platform, Alert, Animated } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';

const PinAuth = () => {
  const [pin, setPin] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { handleAuthStatusChange } = route.params;
  const [authStatus, setAuthStatus] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const supportedAuthTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const isPinSupported = supportedAuthTypes.includes(LocalAuthentication.AuthenticationType.PASSCODE);

    if (hasHardware && isPinSupported) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Enter your PIN',
        fallback: Platform.OS === 'android',
      });

      if (result.success) {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setAuthStatus(true);
          handleAuthStatusChange(true); // Update the authentication status in App.js
          navigation.navigate('TodoList'); // Navigate to the TodoList screen
        });
      } else {
        if (Platform.OS === 'android') {
          showCustomPinInput();
        } else {
          alert('Authentication failed');
        }
      }
    } else {
      showCustomPinInput();
    }
  };

  const showCustomPinInput = async () => {
    let enteredPin = '';

    if (Platform.OS === 'android') {
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Enter your screen lock PIN',
        });

        if (result.success) {
          enteredPin = result.pin; // Set the enteredPin value

          if (enteredPin === result.pin) {
            setAuthStatus(true);
            handleAuthStatusChange(true); // Update the authentication status in App.js
            navigation.navigate('TodoList'); // Navigate to the TodoList screen
          } else {
            alert('Authentication failed');
          }
        } else {
          alert('Authentication failed');
        }
      } else {
        alert('Screen lock PIN is not enrolled');
      }
    } else {
      Alert.prompt(
        'Enter your PIN manually',
        'Please enter your PIN',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: (enteredPin) => {
              if (enteredPin === '5691') {
                setAuthStatus(true);
                handleAuthStatusChange(true); // Update the authentication status in App.js
                navigation.navigate('TodoList'); // Navigate to the TodoList screen
              } else {
                alert('Authentication failed');
              }
            },
          },
        ],
        'secure-text',
        '',
        'numeric'
      );
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      opacity: fadeAnim,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput keyboardType="numeric" secureTextEntry onChangeText={(text) => setPin(text)} value={pin} />
      <Button title="Authenticate" onPress={authenticate} />
      <Animated.View style={[styles.paragraph, { opacity: fadeAnim }]}>
        {authStatus && <Text>Authenticated</Text>}
      </Animated.View>
    </View>
  );
};

export default PinAuth;
