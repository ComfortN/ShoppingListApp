import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import DatabaseService from '../features/sqlite/database';
import ItemForm from './ItemForm';
import Item from './Item';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const fetchedItems = await DatabaseService.getItems();
      setItems(fetchedItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async (item) => {
    try {
      if (item.id) {
        await DatabaseService.editItem(item.id, item.name, item.quantity, item.purchased);
      } else {
        await DatabaseService.addItem(item.name, item.quantity, item.purchased);
      }
      fetchItems();
      setIsFormVisible(false);
      setEditingItem(null);
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
      await DatabaseService.editItem(item.id, item.name, item.quantity, !item.purchased);
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
          setEditingItem(null);
          setIsFormVisible(true);
        }}
      >
        <Ionicons name="add" size={24} color={'#fff'} />
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
    backgroundColor: colors.background,
    flex: 1,
  },
  floatingAddButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 5,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: 'bold',
  },
  addButtonContainer: {
    marginBottom: 20,
  },
});

export default ShoppingList;
