import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../theme/colors';


const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to TidyCart!</Text>
      <Text style={styles.subText}>Manage your shopping lists with ease.</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Go to Shopping List" 
          onPress={() => navigation.navigate('ShoppingList')} 
          color={Colors.primary} // Use the primary color for buttons
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Logout" 
          onPress={handleLogout} 
          color={Colors.secondary} // Use the secondary color for the logout button
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Set the background color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});

export default HomeScreen;
