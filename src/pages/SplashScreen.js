import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import Colors from '../theme/colors';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
    return (
        <View style={styles.container}>
        <Image 
            source={require('../../assets/my-cart.png')}
            style={styles.logo}
            resizeMode="contain"
        />
        <Text style={styles.appName}>TidyCart</Text>
        
        {/* Loading Indicator */}
        <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
  },
  loadingContainer: {
    marginTop: 20,
  },
  loadingText: {
    color: Colors.primary,
    fontSize: 18,
  },
});

export default SplashScreen;