import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MainStackNavigation from "./app/navigations/MainStackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import DeviceInfo from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';



const App = () => {
  const [update, setUpdate] = useState({});
  const [appVersion, setAppVersion] = useState('');


  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const versionCollection = await firestore().collection('Version').get();
        const versionData = versionCollection.docs[0].data();
        setUpdate(versionData);
      } catch (error) {
        console.error('Error fetching version:', error);
      }
    };

    const fetchAppVersion = () => {
      const versionData = DeviceInfo.getVersion();
      setAppVersion(versionData);
    };

    fetchVersion();
    fetchAppVersion();
  }, []);

  useEffect(() => {
    if (update.version && appVersion && update.version !== appVersion) {
      Alert.alert(
        'New version available',
        update.message
          ? update.message
          : 'Please update the app to the latest version.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Update Now', onPress: () => console.log('OK Pressed')},
        ],
      );
    }
  }, [update, appVersion]);


  return (
    <NavigationContainer>
      <MainStackNavigation />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
