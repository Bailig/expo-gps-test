import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export default function App() {
  const [userCoordinates, setUserCoordinates] = useState('');
  const [providerStatus, setProviderStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    (async() => {
      try {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          setErrorMessage("permission required!");
          return;
        }

        setProviderStatus(JSON.stringify(await Location.getProviderStatusAsync(), null, 2));
        const location = await Location.getCurrentPositionAsync();
        setUserCoordinates(JSON.stringify(location.coords, null, 2));
      } catch (error) {
        setErrorMessage(error.message);
      }
    })();
  }, [])

  return (
    <View style={styles.container}>
      <Text>User Location: {userCoordinates}</Text>
      <Text>Error Message: {errorMessage}</Text>
      <Text>Provider Status: {providerStatus}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
