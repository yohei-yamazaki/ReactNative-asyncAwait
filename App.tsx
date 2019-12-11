import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Constants from 'expo-constants';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getItems: () => Promise<any> = async () => {
    try {
      let response = await fetch('https://swapi.co/api/films');
      let responseJson = await response.json();
      return responseJson.results;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const films = await getItems();
    setData(films);
    setLoading(false);
  };

  const clearData = () => {
    setData([]);
  };

  return (
    <>
      <View style={{ height: Constants.statusBarHeight }} />
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Button title="fetch data" onPress={() => fetchData()} />
          <Button title="clear data" onPress={() => clearData()} />
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text>{item.title}</Text>
            </View>
          )}
        />
        {loading && (
          <View style={[StyleSheet.absoluteFill, styles.container]}>
            <ActivityIndicator />
          </View>
        )}
      </View>
      <SafeAreaView />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    margin: 12,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemContainer: {
    flex: 1,
    padding: 12,
  },
});

export default App;
