import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { login } from '../redux/actions/authAction';
import { signIn, signUp } from '../features/firebase/auth';
import Colors from '../theme/colors';
import Logo from '../../assets/my-cart.png';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    try {
      const user = isLogin ? await signIn(email, password) : await signUp(email, password);
      dispatch(login(user));
    } catch (error) {
      Alert.alert('Authentication Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      
      <Text style={styles.header}>{isLogin ? 'Welcome Back!' : 'Create an Account'}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={Colors.textLight}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor={Colors.textLight}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity 
          style={styles.passwordVisibilityIcon} 
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons 
            name={showPassword ? 'eye-off' : 'eye'} 
            size={24} 
            color={Colors.textLight} 
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.authButton} 
        onPress={handleAuth} 
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={styles.authButtonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        )}
      </TouchableOpacity>

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
    backgroundColor: Colors.background,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary,
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: Colors.inputBackground,
    color: Colors.text,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: Colors.inputBackground,
    color: Colors.text,
  },
  passwordVisibilityIcon: {
    position: 'absolute',
    right: 10,
  },
  authButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleText: {
    marginTop: 20,
    textAlign: 'center',
    color: Colors.text,
  },
  toggleButton: {
    color: Colors.primary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});