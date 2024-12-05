import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Modal } from 'react-native';

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
      purchased: isEditing ? initialItem.purchased : false
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
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            keyboardType="number-pad"
            value={quantity}
            onChangeText={setQuantity}
          />
          <View style={styles.buttonContainer}>
            <Button 
              title={isEditing ? "Update Item" : "Add Item"} 
              onPress={handleSubmit} 
            />
            <Button 
              title="Cancel" 
              onPress={onClose} 
              color="red" 
            />
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
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ItemForm;