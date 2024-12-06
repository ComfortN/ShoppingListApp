import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [dataSync, setDataSync] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);

  // Function to handle toggle settings with feedback
  const toggleSetting = async (settingName, currentValue, setter) => {
    try {
      const newValue = !currentValue;
      setter(newValue);
      
      // Store setting in AsyncStorage
      await AsyncStorage.setItem(settingName, JSON.stringify(newValue));
      
      // Provide user feedback
      Alert.alert(
        'Settings Updated', 
        `${settingName} has been ${newValue ? 'enabled' : 'disabled'}`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      // Error handling
      Alert.alert(
        'Error', 
        `Unable to update ${settingName}. Please try again.`,
        [{ text: 'OK' }]
      );
      // Revert the change if storage fails
      setter(currentValue);
    }
  };

  // Render a toggle setting item
  const renderToggleSetting = (label, icon, value, setter, settingName) => (
    <View style={styles.settingItem}>
      <View style={styles.settingItemLeft}>
        <Ionicons name={icon} size={24} color={colors.text} style={styles.settingIcon} />
        <Text style={styles.settingText}>{label}</Text>
      </View>
      <TouchableOpacity 
        onPress={() => toggleSetting(settingName, value, setter)}
        style={[
          styles.toggleSwitch, 
          value ? styles.toggleOn : styles.toggleOff
        ]}
      >
        <View style={styles.toggleHandle} />
      </TouchableOpacity>
    </View>
  );

  // Render a navigation setting item
  const renderNavigationSetting = (label, icon, navigateTo) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={() => navigation.navigate(navigateTo)}
    >
      <View style={styles.settingItemLeft}>
        <Ionicons name={icon} size={24} color={colors.text} style={styles.settingIcon} />
        <Text style={styles.settingText}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={colors.textMuted} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>App Settings</Text>

      {/* Notification Settings */}
      {renderToggleSetting(
        'Notifications', 
        'notifications-outline', 
        notifications, 
        setNotifications, 
        'Notifications'
      )}

      {/* Dark Mode Settings */}
      {renderToggleSetting(
        'Dark Mode', 
        'moon-outline', 
        darkMode, 
        setDarkMode, 
        'Dark Mode'
      )}

      {/* Data Sync Settings */}
      {renderToggleSetting(
        'Auto Data Sync', 
        'sync', 
        dataSync, 
        setDataSync, 
        'Data Sync'
      )}

      {/* Privacy Mode Settings */}
      {renderToggleSetting(
        'Privacy Mode', 
        'lock-closed-outline', 
        privacyMode, 
        setPrivacyMode, 
        'Privacy Mode'
      )}

      {/* Navigation Settings */}
      <Text style={styles.sectionTitle}>Account & Support</Text>

      {renderNavigationSetting(
        'Account Details', 
        'person-outline', 
        'Profile'
      )}

      {renderNavigationSetting(
        'Help & Support', 
        'help-circle-outline', 
        'Support'
      )}

      {/* Danger Zone */}
      <Text style={styles.sectionTitle}>Danger Zone</Text>
      <TouchableOpacity 
        style={[styles.settingItem, styles.dangerItem]}
        onPress={() => {
          Alert.alert(
            'Delete Account', 
            'Are you sure you want to delete your account? This action cannot be undone.',
            [
              { text: 'Cancel', style: 'cancel' },
              { 
                text: 'Delete', 
                style: 'destructive',
                onPress: () => {
                 
                  Alert.alert('Account Deletion', 'Account deletion is currently not available.');
                }
              }
            ]
          );
        }}
      >
        <View style={styles.settingItemLeft}>
          <Ionicons name="trash-outline" size={24} color={colors.error} style={styles.settingIcon} />
          <Text style={[styles.settingText, { color: 'white' }]}>Delete Account</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    profileHeader: {
      alignItems: 'center',
      marginBottom: 30,
    },
    nameText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 10,
    },
    emailText: {
      fontSize: 16,
      color: colors.textMuted,
    },
    actionContainer: {
      marginTop: 20,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },
    actionText: {
      marginLeft: 15,
      fontSize: 16,
      color: colors.text,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 20,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.surface,
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },
    settingText: {
      fontSize: 16,
      color: colors.text,
    },
    toggleSwitch: {
      width: 50,
      height: 25,
      borderRadius: 15,
      justifyContent: 'center',
    },
    toggleHandle: {
      width: 25,
      height: 25,
      borderRadius: 12.5,
      backgroundColor: 'white',
      alignSelf: 'flex-start',
    },
    toggleOn: {
      backgroundColor: colors.primary,
      alignSelf: 'flex-end',
    },
    toggleOff: {
      backgroundColor: colors.disabled,
      alignSelf: 'flex-start',
    },
  
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 15,
    color: '#c1121f'
  },
  dangerItem: {
    borderWidth: 1,
    padding: 5,
    borderColor: colors.error,
    backgroundColor: colors.primary,
  },
});

export default SettingsScreen;
// container: {
//       flex: 1,
//       backgroundColor: colors.background,
//       padding: 20,
//     },
//     profileHeader: {
//       alignItems: 'center',
//       marginBottom: 30,
//     },
//     nameText: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       color: colors.text,
//       marginTop: 10,
//     },
//     emailText: {
//       fontSize: 16,
//       color: colors.textMuted,
//     },
//     actionContainer: {
//       marginTop: 20,
//     },
//     actionButton: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       backgroundColor: colors.surface,
//       padding: 15,
//       borderRadius: 10,
//       marginBottom: 15,
//     },
//     actionText: {
//       marginLeft: 15,
//       fontSize: 16,
//       color: colors.text,
//     },
//     sectionTitle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       color: colors.text,
//       marginBottom: 20,
//     },
//     settingItem: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       backgroundColor: colors.surface,
//       padding: 15,
//       borderRadius: 10,
//       marginBottom: 15,
//     },
//     settingText: {
//       fontSize: 16,
//       color: colors.text,
//     },
//     toggleSwitch: {
//       width: 50,
//       height: 25,
//       borderRadius: 15,
//       justifyContent: 'center',
//     },
//     toggleHandle: {
//       width: 25,
//       height: 25,
//       borderRadius: 12.5,
//       backgroundColor: 'white',
//       alignSelf: 'flex-start',
//     },
//     toggleOn: {
//       backgroundColor: colors.primary,
//       alignSelf: 'flex-end',
//     },
//     toggleOff: {
//       backgroundColor: colors.disabled,
//       alignSelf: 'flex-start',
//     },