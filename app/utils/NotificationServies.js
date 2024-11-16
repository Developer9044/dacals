import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';

export async function requestUserPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getFCMToken();
    } else {
      console.log('Permission Denied');
    }
  } else {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFCMToken();
      console.log('Authorization status:', authStatus);
    }
  }
}

const getFCMToken = async () => {
  try {
    let fcmToken = await AsyncStorage.getItem('fcm_token');
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      await AsyncStorage.setItem('fcm_token', fcmToken);
    }
    // console.log('FCM Token:', fcmToken);
  } catch (error) {
    console.log('Error:', error);
  }
};
