import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Modal, Text, TouchableOpacity } from 'react-native';
import Colors from '../theme/colors';

const ItemForm = ({ 
  onSubmit, 
  initialItem = null, 
  isVisible, 
  onClose 
}) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialItem) {
      setName(initialItem.name);
      setQuantity(initialItem.quantity.toString());
      setIsEditing(true);
    } else {
      setName('');
      setQuantity('');
      setIsEditing(false);
    }
  }, [initialItem]);

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Item name is required');
      return;
    }
    if (!quantity || parseInt(quantity) <= 0) {
      Alert.alert('Validation', 'Quantity must be greater than 0');
      return;
    }

    const itemToSubmit = {
      name, 
      quantity: parseInt(quantity),
      purchased: isEditing ? initialItem.purchased : false,
    };

    if (isEditing) {
      itemToSubmit.id = initialItem.id;
    }
    console.log('Submitting item:', itemToSubmit);
    onSubmit(itemToSubmit);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setQuantity('');
    onClose();
  };

  return (
    <Modal 
      visible={isVisible} 
      transparent={true} 
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>{isEditing ? "Edit Item" : "Add Item"}</Text>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            keyboardType="number-pad"
            value={quantity}
            onChangeText={setQuantity}
            placeholderTextColor="#aaa"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.submitButton]} 
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>
                {isEditing ? "Update" : "Add"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  formContainer: {
    width: '85%',
    backgroundColor: Colors.background,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: Colors.primary,
  },
  cancelButton: {
    backgroundColor: Colors.text,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ItemForm;
