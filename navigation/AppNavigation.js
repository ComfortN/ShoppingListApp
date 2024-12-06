import React, { useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import SplashScreen from '../src/pages/SplashScreen';
import AuthScreen from '../src/pages/AuthScreen';
import HomeScreen from '../src/pages/HomeScreen';
import ShoppingList from '../src/components/ShoppingList';
import { ProfileScreen } from '../src/pages/ProfileScreen';
import { SettingsScreen } from '../src/pages/SettingsScreen';
import Colors from '../src/theme/colors';

// Create Stack Navigator
const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  // Select user from Redux store
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Simulate initial loading process
    const loadApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setIsLoading(false);
    };

    loadApp();
  }, []);

  // Show splash screen during loading
  if (isLoading) {
    return <SplashScreen />;
  }

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
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen} 
              options={{ title: 'Profile' }}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen} 
              options={{ title: 'Settings' }}
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