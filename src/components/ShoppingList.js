import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import DatabaseService from '../features/sqlite/database';
import ItemForm from './ItemForm';
import Item from './Item';
import { Ionicons } from '@expo/vector-icons'; 

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const fetchedItems = await DatabaseService.getItems();
      console.log("items: ", fetchedItems )
      setItems(fetchedItems);
      console.log("items: ", fetchedItems )
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async (item) => {
    try {
      if (item.id) {
        // Editing existing item
        await DatabaseService.editItem(
          item.id, 
          item.name, 
          item.quantity, 
          item.purchased
        );
      } else {
        // Adding new item
        await DatabaseService.addItem(
          item.name, 
          item.quantity, 
          item.purchased
        );
      }
      fetchItems();
      console.log("items: ", item )
      setIsFormVisible(false);
      setEditingItem(null);
      console.log("items: ", item )
    } catch (error) {
      console.error('Error adding/editing item:', error);
    }
  };

  const deleteItem = async (id) => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await DatabaseService.deleteItem(id);
            fetchItems();
          } catch (error) {
            console.error('Error deleting item:', error);
          }
        },
      },
    ]);
  };

  const togglePurchased = async (id) => {
    try {
      const item = items.find((i) => i.id === id);
      await DatabaseService.editItem(
        item.id, 
        item.name, 
        item.quantity, 
        !item.purchased
      );
      fetchItems();
    } catch (error) {
      console.error('Error toggling purchased status:', error);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsFormVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDelete={deleteItem}
            onToggle={togglePurchased}
            onEdit={handleEditItem}
          />
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.floatingAddButton} 
        onPress={() => {
          console.log('Add New Item clicked');
          setEditingItem(null);
          setIsFormVisible(true);
        }}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>

      <ItemForm
        isVisible={isFormVisible}
        onSubmit={addItem}
        initialItem={editingItem}
        onClose={() => {
          setIsFormVisible(false);
          setEditingItem(null);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  floatingAddButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  addButtonContainer: {
    marginBottom: 20,
  },
});

export default ShoppingList;