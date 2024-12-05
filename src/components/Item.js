import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';


const Item = ({ item, onDelete, onToggle, onEdit }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Checkbox
            disabled={false}
          value={item.purchased}
          onValueChange={() => onToggle(item.id)}
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

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  },
  purchased: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  editButton: {
    padding: 5,
    marginRight: 10,
  },
  editText: {
    color: 'blue',
    fontSize: 14,
  },
  deleteButton: {
    padding: 5,
  },
  deleteText: {
    color: 'red',
    fontSize: 14,
  },
});

export default Item;