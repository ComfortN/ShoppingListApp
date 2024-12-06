import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import Colors from '../theme/colors';

const Item = ({ item, onDelete, onToggle, onEdit }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Checkbox
          value={item.purchased}
          onValueChange={() => onToggle(item.id)}
          color={item.purchased ? Colors.primary : Colors.secondary}
        />
        <Text style={[styles.itemText, item.purchased && styles.purchased]}>
          {item.name} (x{item.quantity})
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => onEdit(item)} style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: Colors.text,
    borderRadius: 8,
    marginVertical: 5,
 
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    color: Colors.primary,
  },
  purchased: {
    textDecorationLine: 'line-through',
    color: Colors.textLight,
  },
  editButton: {
    padding: 8,
    backgroundColor: Colors.secondary,
    borderRadius: 5,
    marginRight: 10,
  },
  editText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 8,
    backgroundColor: Colors.error,
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
