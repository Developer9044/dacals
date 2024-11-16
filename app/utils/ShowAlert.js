import {Alert} from 'react-native';
import Strings from './Strings';

/* Show alert */
export const showAlert = message => {
  Alert.alert(Strings.appName, message, [{text: Strings.ok}], {
    cancelable: false,
  });
};

export const showOptionAlert = (message, action) => {
  Alert.alert(
    Strings.appName,
    message,
    [{text: Strings.yes, onPress: action}, {text: Strings.no}],
    {cancelable: false},
  );
};
