import { useState } from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type MenuItem = {
  id: number;
  dishName: string;
  description: string;
  courseType: string;
  price: string;
};

export default function HomeScreen() {
  const [screen, setScreen] = useState('menu');

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [courseType, setCourseType] = useState('');
  const [price, setPrice] = useState('');

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] =
    useState<MenuItem | null>(null);

  const [message, setMessage] = useState('');

  // Clears all input fields
  const clearForm = () => {
    setDishName('');
    setDescription('');
    setCourseType('');
    setPrice('');
    setMessage('');
  };

  // Opens the add item screen
  const openAddScreen = () => {
    clearForm();
    setScreen('add');
  };

  // Saves a new menu item
  const saveMenuItem = () => {
    if (
      dishName.trim() === '' ||
      description.trim() === '' ||
      courseType.trim() === '' ||
      price.trim() === ''
    ) {
      setMessage('Please complete all the fields.');
      return;
    }

    if (isNaN(Number(price)) || Number(price) <= 0) {
      setMessage('Please enter a valid price.');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now(),
      dishName: dishName,
      description: description,
      courseType: courseType,
      price: price,
    };

    setMenuItems([...menuItems, newItem]);

    clearForm();
    setScreen('menu');
  };

  // Opens the details of an item
  const openDetails = (item: MenuItem) => {
    setSelectedItem(item);
    setScreen('details');
  };

  // Opens the edit screen
  const openEdit = () => {
    if (selectedItem === null) {
      return;
    }

    setDishName(selectedItem.dishName);
    setDescription(selectedItem.description);
    setCourseType(selectedItem.courseType);
    setPrice(selectedItem.price);

    setMessage('');
    setScreen('edit');
  };

  // Updates an existing item
  const updateMenuItem = () => {
    if (selectedItem === null) {
      return;
    }

    if (
      dishName.trim() === '' ||
      description.trim() === '' ||
      courseType.trim() === '' ||
      price.trim() === ''
    ) {
      setMessage('Please complete all the fields.');
      return;
    }

    if (isNaN(Number(price)) || Number(price) <= 0) {
      setMessage('Please enter a valid price.');
      return;
    }

    const updatedItems = menuItems.map((item) => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          dishName: dishName,
          description: description,
          courseType: courseType,
          price: price,
        };
      }

      return item;
    });

    setMenuItems(updatedItems);
    clearForm();
    setSelectedItem(null);
    setScreen('menu');
  };

  // Deletes an item
  const deleteMenuItem = () => {
    if (selectedItem === null) {
      return;
    }

    const updatedItems = menuItems.filter(
      (item) => item.id !== selectedItem.id
    );

    setMenuItems(updatedItems);
    setSelectedItem(null);
    setScreen('menu');
  };

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.pageContent}
    >
      <View style={styles.container}>

        {/* RESTAURANT MENU SCREEN */}

        {screen === 'menu' && (
          <>
            <Text style={styles.title}>
              Restaurant Menu
            </Text>

            <Text style={styles.subtitle}>
              Manage your restaurant dishes
            </Text>

            <Pressable
              style={styles.greenButton}
              onPress={openAddScreen}
            >
              <Text style={styles.buttonText}>
                + Add Menu Item
              </Text>
            </Pressable>

            {menuItems.length === 0 ? (
              <Text style={styles.emptyText}>
                No menu items have been added yet.
              </Text>
            ) : (
              <>
                <Text style={styles.menuHeading}>
                  Menu Items
                </Text>

                {menuItems.map((item) => (
                  <View
                    key={item.id}
                    style={styles.menuItem}
                  >
                    <Pressable
                      onPress={() => openDetails(item)}
                    >
                      <Text style={styles.dishName}>
                        {item.dishName}
                      </Text>

                      <Text style={styles.itemText}>
                        {item.courseType}
                      </Text>

                      <Text style={styles.itemText}>
                        R{Number(item.price).toFixed(2)}
                      </Text>

                      <Text style={styles.viewText}>
                        View Details
                      </Text>
                    </Pressable>
                  </View>
                ))}
              </>
            )}
          </>
        )}

        {/* ADD MENU ITEM SCREEN */}

        {screen === 'add' && (
          <>
            <Text style={styles.title}>
              Add menu item
            </Text>

            <Text style={styles.label}>
              Dish name
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter dish name"
              value={dishName}
              onChangeText={setDishName}
            />

            <Text style={styles.label}>
              Description
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter dish description"
              value={description}
              onChangeText={setDescription}
            />

            <Text style={styles.label}>
              Course Type
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Starter, Main Course or Dessert"
              value={courseType}
              onChangeText={setCourseType}
            />

            <Text style={styles.label}>
              Add price
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />

            {message !== '' && (
              <Text style={styles.errorText}>
                {message}
              </Text>
            )}

            <Pressable
              style={styles.greenButton}
              onPress={saveMenuItem}
            >
              <Text style={styles.buttonText}>
                Save Menu Item
              </Text>
            </Pressable>

            <Pressable
              style={styles.backButton}
              onPress={() => setScreen('menu')}
            >
              <Text style={styles.backText}>
                Back to Menu
              </Text>
            </Pressable>
          </>
        )}

        {/* MENU ITEM DETAILS SCREEN */}

        {screen === 'details' &&
          selectedItem !== null && (
            <>
              <Text style={styles.title}>
                Menu item details
              </Text>

              <Text style={styles.label}>
                Dish name
              </Text>

              <Text style={styles.value}>
                {selectedItem.dishName}
              </Text>

              <Text style={styles.label}>
                Description
              </Text>

              <Text style={styles.value}>
                {selectedItem.description}
              </Text>

              <Text style={styles.label}>
                Course Type
              </Text>

              <Text style={styles.value}>
                {selectedItem.courseType}
              </Text>

              <Text style={styles.label}>
                Add price
              </Text>

              <Text style={styles.value}>
                R{Number(selectedItem.price).toFixed(2)}
              </Text>

              <Pressable
                style={styles.greenButton}
                onPress={openEdit}
              >
                <Text style={styles.buttonText}>
                  Edit Menu Item
                </Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={deleteMenuItem}
              >
                <Text style={styles.buttonText}>
                  Delete Menu Item
                </Text>
              </Pressable>

              <Pressable
                style={styles.backButton}
                onPress={() => setScreen('menu')}
              >
                <Text style={styles.backText}>
                  Back to Menu
                </Text>
              </Pressable>
            </>
          )}

        {/* EDIT MENU ITEM SCREEN */}

        {screen === 'edit' && (
          <>
            <Text style={styles.title}>
              Edit menu item
            </Text>

            <Text style={styles.label}>
              Dish name
            </Text>

            <TextInput
              style={styles.input}
              value={dishName}
              onChangeText={setDishName}
            />

            <Text style={styles.label}>
              Description
            </Text>

            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
            />

            <Text style={styles.label}>
              Course Type
            </Text>

            <TextInput
              style={styles.input}
              value={courseType}
              onChangeText={setCourseType}
            />

            <Text style={styles.label}>
              Add price
            </Text>

            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />

            {message !== '' && (
              <Text style={styles.errorText}>
                {message}
              </Text>
            )}

            <Pressable
              style={styles.greenButton}
              onPress={updateMenuItem}
            >
              <Text style={styles.buttonText}>
                Update Menu Item
              </Text>
            </Pressable>

            <Pressable
              style={styles.backButton}
              onPress={() => setScreen('details')}
            >
              <Text style={styles.backText}>
                Cancel
              </Text>
            </Pressable>
          </>
        )}

      </View>
    </ScrollView>
  );
}


// STYLING

const styles: any = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },

  pageContent: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },

  container: {
    width: '90%',
    maxWidth: 420,
    minHeight: 580,
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 5,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },

  greenButton: {
    backgroundColor: '#2E8B57',
    padding: 13,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 18,
  },

  deleteButton: {
    backgroundColor: '#D85B73',
    padding: 13,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 17,
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    textAlign: 'center',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 35,
    color: '#777777',
  },

  menuHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },

  menuItem: {
    padding: 13,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },

  dishName: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  itemText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 3,
  },

  viewText: {
    color: '#2E8B57',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },

  value: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },

  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 12,
  },

  backButton: {
    padding: 12,
    marginTop: 8,
  },

  backText: {
    textAlign: 'center',
    color: '#555555',
  },
});