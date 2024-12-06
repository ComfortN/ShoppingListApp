import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  Alert 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { updateProfile } from 'firebase/auth';
import { auth } from '../features/firebase/auth';
import colors from '../theme/colors';
import { login } from '../redux/actions/authAction';

export const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  // State for edit profile modal
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const handleEditProfile = async () => {
    try {
      if (auth.currentUser) {
        // Update display name in Firebase
        await updateProfile(auth.currentUser, {
          displayName: displayName
        });

        // Update Redux store
        dispatch(login({
          ...user,
          displayName: displayName
        }));

        // Close modal
        setIsEditModalVisible(false);

        Alert.alert('Success', 'Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Ionicons name="person-circle" size={100} color={colors.primary} />
        <Text style={styles.nameText}>
          {user?.displayName || 'User Name'}
        </Text>
        <Text style={styles.emailText}>{user?.email}</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setIsEditModalVisible(true)}
        >
          <Ionicons name="create-outline" size={24} color={colors.text} />
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {
            // Navigate to change password screen
            navigation.navigate('ChangePassword');
          }}
        >
          <Ionicons name="key-outline" size={24} color={colors.text} />
          <Text style={styles.actionText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color={colors.error} />
          <Text style={styles.actionText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Display Name"
              value={displayName}
              onChangeText={setDisplayName}
            />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleEditProfile}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.surface,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    color: colors.text,
  },
  saveButtonText: {
    color: 'white',
  },
});

export default ProfileScreen;




  