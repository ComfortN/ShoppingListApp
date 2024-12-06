import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import DatabaseService from '../features/sqlite/database';
import ItemForm from './ItemForm';
import Item from './Item';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import colors from '../theme/colors';

const ShoppingList = ({navigation}) => {
  const [items, setItems] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);

  useEffect(() => {
    // Add header right button for options menu
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          onPress={() => setIsOptionsMenuVisible(!isOptionsMenuVisible)}
          style={styles.headerOptionsButton}
        >
          <MaterialIcons name="more-vert" size={24} color="white" />
        </TouchableOpacity>
      )
    });
    fetchItems();
  }, [navigation, isOptionsMenuVisible]);


  const handleProfileNavigation = () => {
    navigation.navigate('Profile');
    setIsOptionsMenuVisible(false);
  };

  const handleSettingsNavigation = () => {
    navigation.navigate('Settings');
    setIsOptionsMenuVisible(false);
  };

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


      {isOptionsMenuVisible && (
        <TouchableWithoutFeedback onPress={() => setIsOptionsMenuVisible(false)}>
          <View style={styles.optionsMenuOverlay}>
            <View style={styles.optionsMenu}>
              <TouchableOpacity 
                style={styles.optionsMenuItem}
                onPress={handleProfileNavigation}
              >
                <Ionicons name="person-outline" size={20} color={colors.text} />
                <Text style={styles.optionsMenuItemText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.optionsMenuItem}
                onPress={handleSettingsNavigation}
              >
                <Ionicons name="settings-outline" size={20} color={colors.text} />
                <Text style={styles.optionsMenuItemText}>Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}

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
  headerOptionsButton: {
    marginRight: 15,
  },
  optionsMenuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  optionsMenu: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 50,
    marginRight: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionsMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionsMenuItemText: {
    marginLeft: 10,
    color: colors.text,
  },
});

export default ShoppingList;
