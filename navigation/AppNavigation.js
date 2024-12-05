import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthScreen from '../src/pages/AuthScreen';
import HomeScreen from '../src/pages/HomeScreen';
import ShoppingList from '../src/components/ShoppingList'; // Add your shopping list screen
import Colors from '../src/theme/colors';

// Create Stack Navigator
const Stack = createStackNavigator();

const AppNavigator = () => {
  // Select user from Redux store
  const user = useSelector((state) => state.auth.user);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {user ? (
          // Authenticated routes
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: 'TidyCart!' }}
            />
            <Stack.Screen 
              name="ShoppingList" 
              component={ShoppingList} 
              options={{ title: 'Shopping List' }}
            />
          </>
        ) : (
          // Unauthenticated routes
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ 
              headerShown: false,
              title: 'Authentication'
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;