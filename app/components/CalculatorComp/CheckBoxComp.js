import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { scale, verticalScale } from "react-native-size-matters";
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";
import fontFamily from "../../constants/fontFamily";
import { images } from "../../assets";

const CheckBoxComp = ({ CheckboxLabel, akash ,alertMessage}) => {
  const [isChecked, setIsChecked] = useState(akash?true:false);


  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const toggleCheckboxalert = () => {
    {isChecked === true}{
      Alert.alert(
        "Attention",
        alertMessage,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => setIsChecked(!isChecked) }
        ],
        { cancelable: false }
      );
     
    }
   
 
  };


  return (
    <View style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked ? (
          <TouchableOpacity onPress={toggleCheckbox}>
            <Image style={styles.image} source={images.check_in} />
          </TouchableOpacity>
        ) : akash ? (
          <TouchableOpacity onPress={toggleCheckboxalert}>
            <Image style={styles.image} source={images.check_out} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleCheckbox}>
            <Image style={styles.image} source={images.check_out} />
          </TouchableOpacity>
        )}
        <Text style={styles.Checkboxtext}>{CheckboxLabel}</Text>
      </View>
    </View>
  );
};

export default CheckBoxComp;

const styles = StyleSheet.create({
  checked: {
    backgroundColor: colors.primary,
  },
  checkIcon: {
    height: verticalScale(15),
    width: scale(15),
    resizeMode: "contain",
  },
  image: {
    height: verticalScale(25),
    width: scale(25),
    resizeMode: "contain",
  },
  checkbox: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  Checkboxtext: {
    fontSize: fontSize.t3,
    color: colors.black,
    fontFamily: fontFamily.REGULAR,
  },
});






// import {
//   Alert,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { useState } from "react";
// import { scale, verticalScale } from "react-native-size-matters";
// import colors from "../../constants/colors";
// import fontSize from "../../constants/fontSize";
// import fontFamily from "../../constants/fontFamily";
// import { images } from "../../assets";

// const CheckBoxComp = ({ CheckboxLabel, akash, alertMessage }) => {
//   const [isChecked, setIsChecked] = useState(false);

//   const toggleCheckbox = () => {
//     if (isChecked) {
//       // Show alert when checkbox transitions from checked to unchecked
//       Alert.alert(
//         "Attention",
//         alertMessage,
//         [
//           {
//             text: "Cancel",
//             onPress: () => console.log("Cancel Pressed"),
//             style: "cancel",
//           },
//           { text: "OK", onPress: () => setIsChecked(!isChecked) },
//         ],
//         { cancelable: false }
//       );
//     } else {
//       // Directly toggle the checkbox when it's unchecked
//       setIsChecked(!isChecked);
//     }
//   };

//   return (
//     <View style={styles.checkboxContainer}>
//       <View style={[styles.checkbox, isChecked && styles.checked]}>
//         <TouchableOpacity onPress={toggleCheckbox}>
//           <Image
//             style={styles.image}
//             source={isChecked ? images.check_in : images.check_out}
//           />
//         </TouchableOpacity>
//         <Text style={styles.Checkboxtext}>{CheckboxLabel}</Text>
//       </View>
//     </View>
//   );
// };

// export default CheckBoxComp;

// const styles = StyleSheet.create({
//   checked: {
//     backgroundColor: colors.primary,
//   },
//   checkIcon: {
//     height: verticalScale(15),
//     width: scale(15),
//     resizeMode: "contain",
//   },
//   image: {
//     height: verticalScale(25),
//     width: scale(25),
//     resizeMode: "contain",
//   },
//   checkbox: {
//     flexDirection: "row",
//     alignContent: "center",
//     alignItems: "center",
//   },
//   Checkboxtext: {
//     fontSize: fontSize.t3,
//     color: colors.black,
//     fontFamily: fontFamily.REGULAR,
//   },
// });
