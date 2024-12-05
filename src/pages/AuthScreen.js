import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authAction'; // Redux action to set user in the store
import { signIn, signUp } from '../features/firebase/auth'; // Firebase auth functions

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  const dispatch = useDispatch();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const user = isLogin ? await signIn(email, password) : await signUp(email, password);
      dispatch(login(user)); // Update Redux store with user data
    } catch (error) {
      Alert.alert('Authentication Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title={isLogin ? 'Login' : 'Sign Up'} onPress={handleAuth} />

      <Text style={styles.toggleText}>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <Text style={styles.toggleButton} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Login'}
        </Text>
      </Text>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  toggleText: {
    marginTop: 20,
    textAlign: 'center',
  },
  toggleButton: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
