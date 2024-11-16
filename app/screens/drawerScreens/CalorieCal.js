import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Platform, View, Text } from "react-native";
import ChildScreenContainerWithBackGround from "../../components/ChildScreenContainerWithBackGround";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import SwitchComp from "../../components/CalculatorComp/SwitchComp";
import CalculatorComp from "../../components/CalculatorComp/CalculatorComp";
import RadioButtonComp from "../../components/CalculatorComp/RadioButtonComp";
import fontSize from "../../constants/fontSize";
import fontFamily from "../../constants/fontFamily";
import colors from "../../constants/colors";
import ButtonComp from "../../components/CalculatorComp/ButtonComp";
import CustomLableBtn from "../../components/CustomLableBtn";
import spacing from "../../constants/spacing";

const CalorieCal = ({ route }) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [genderOptions, setGenderOptions] = useState([
    { id: 1, name: "Male", selected: true },
    { id: 2, name: "Female", selected: false },
  ]);
  const [heighterror, setHeightError] = useState("");
  const [weighterror, setWeightError] = useState("");
  const gender = genderOptions.find((option) => option.selected).name;

  const [frameSizeOptions, setFrameSizeOptions] = useState([
    { id: 1, name: "Small", selected: false },
    { id: 2, name: "Medium", selected: true },
    { id: 3, name: "Large", selected: false },
    { id: 4, name: "Professional Athlete", selected: false },
  ]);

  const frameSize = frameSizeOptions.find((option) => option.selected).name;
  const [isLiked, setIsLiked] = useState([
    { id: 1, value: true, name: "General Recommendation", selected: true },
    { id: 2, value: false, name: "Sports Recommendation", selected: false },
  ]);
  const paraplegic = isLiked.find((option) => option.selected).value;
  const { title } = route?.params;
  const labelname = "Height(cm)";
  const labelnameW = "Weight";
  const lableAge = "Age";
  const minimumValueH = 50;
  const maximumValueH = 272;
  const minimumValueW = 15;
  const maximumValueW = 635;
  const ageM = 18;
  const ageH = 120;

  const onGenderRadioBtnClick = (item) => {
    const updatedState = genderOptions.map((option) =>
      option.id === item.id
        ? { ...option, selected: true }
        : { ...option, selected: false }
    );
    setGenderOptions(updatedState);
  };

  const onFrameSizeRadioBtnClick = (item) => {
    const updatedState = frameSizeOptions.map((option) =>
      option.id === item.id
        ? { ...option, selected: true }
        : { ...option, selected: false }
    );
    setFrameSizeOptions(updatedState);
  };

  const onRadioBtnClick = (item) => {
    const updatedState = isLiked.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false }
    );
    setIsLiked(updatedState);
  };

  useEffect(() => {
    setHeight(50), setWeight(15), setAge(18);
  }, []);

  const handleWeightChange = (value) => {
    setWeight("");
    setWeightError("");
    if (value == "0") {
      setWeightError("Please Enter Greater Than Or Equal " + weight + ".");
      setWeight("");
    } else if (isNaN(value) == true) {
      setWeightError("Only Digits Are Allowed.*");
    } else if (value?.includes(".") == true) {
      let check = parseFloat(value.match(/\d+\.\d{1}/));
      if (isNaN(check) == true) {
        setWeight(value);
      } else {
        // setWeight(check);
        if (value >= 15 && value <= 635) {
          setWeight(check);
        } else {
          setWeightError("Invalid height. *");
        }
      }
    } else {
      if (
        (parseFloat(value) >= 15 && parseFloat(value) <= 635) ||
        value.length < 3
      ) {
        setWeightError("");
        setWeight(parseFloat(value || 0));
      } else {
        setWeight(272);
        setWeightError("");
      }
    }
  };

  const heightChange = (value) => {
    setHeight("");
    setHeightError("");
    if (value == "0") {
      setHeightError("Please Enter Greater Than Or Equal " + height + ".");
      setHeight("");
    } else if (isNaN(value) == true) {
      setHeightError("Only Digits Are Allowed.*");
    } else if (value?.includes(".") == true) {
      let check = parseFloat(value.match(/\d+\.\d{1}/));
      if (isNaN(check) == true) {
        setHeight(value);
      } else {
        if (value >= 50 && value <= 272) {
          setHeight(check);
        } else {
          setHeightError("Invalid height. *");
        }
      }
    } else {
      if (
        (parseFloat(value) >= 50 && parseFloat(value) <= 272) ||
        value.length < 3
      ) {
        setHeightError("");
        setHeight(parseFloat(value || 0));
      } else {
        setHeight(272);
        setHeightError("");
      }
    }
  };

  const ageChange = (value) => {
    const numericValue = parseInt(value, 0);

    if (isNaN(numericValue)) {
      setAgeError("Only digits are allowed.");
      setAge("");
      return;
    }
    if (numericValue >= 18 && numericValue <= 120) {
      setAge(numericValue);
      setAgeError("");
    } else if (value.length < 3) {
      setAge(numericValue);
      setAgeError("");
    } else {
      setAge(120);
      setAgeError("");
    }
  };

  return (
    <ChildScreenContainerWithBackGround
      hideTopHeader={true}
      screen_name={title}
      showBgImage={false}
    >
      <ScrollView
        style={{ marginTop: moderateScale(12) }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? null : moderateScale(12),
          paddingBottom: moderateScale(60),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            marginTop: moderateScale(14),
          }}
        >
          <CalculatorComp
            label={labelname}
            minimumValue={minimumValueH}
            maximumValue={maximumValueH}
            onChangeText={heightChange}
            onValueChange={(value) => {
              const roundedValue = parseFloat(value).toFixed(1);
              setHeight(roundedValue);
              setHeightError("");
            }}
            inpValue={height.toString()}
            slidValue={parseFloat(height)}
            error_msg={heighterror}
          />

          <CalculatorComp
            label={labelnameW}
            minimumValue={minimumValueW}
            maximumValue={maximumValueW}
            onChangeText={handleWeightChange}
            onValueChange={(value) => {
              const roundedValue = parseFloat(value).toFixed(1);
              setWeight(roundedValue);
              setWeightError("");
            }}
            inpValue={weight.toString()}
            slidValue={parseFloat(weight)}
            error_msg={weighterror}
          />

          <CalculatorComp
            label={lableAge}
            minimumValue={ageM}
            maximumValue={ageH}
            onChangeText={ageChange}
            onValueChange={(value) => {
              setAge(parseInt(value));
              setAgeError("");
            }}
            inpValue={age.toString()}
            slidValue={parseInt(age)}
            error_msg={ageError}
          />

          <View
            style={{
              paddingHorizontal:
                Platform.OS === "android" ? moderateScale(12) : null,
            }}
          >
            <View style={{ marginVertical: moderateScale(14) }}>
              <View style={styles.radioContainer}>
                <Text style={[styles.text, { flex: 1.5 }]}>Gender</Text>

                {genderOptions.map((option) => (
                  <RadioButtonComp
                    onPress={() => onGenderRadioBtnClick(option)}
                    selected={option.selected}
                    key={option.id}
                    radioBtnConStyle={{ flex: 2 }}
                  >
                    {option.name}
                  </RadioButtonComp>
                ))}
              </View>

              <View style={[styles.radioContainer1]}>
                <Text style={[styles.text, { flex: 1.13 }]}>Frame Size</Text>
                {frameSizeOptions.map((option, index) => (
                  <RadioButtonComp
                    onPress={() => onFrameSizeRadioBtnClick(option)}
                    selected={option.selected}
                    key={option.id}
                    radioBtnConStyle={{
                      marginRight: scale(25),
                      marginBottom: verticalScale(10),
                    }}
                  >
                    {option.name}
                  </RadioButtonComp>
                ))}
              </View>
            </View>

            <CustomLableBtn
              btnContainer={[styles.btnContainer]}
              title={"Calculate"}
              btnText={styles.btnText}
              // onPress={MetImp}
            />

            <View style={styles.box}>
              <Text
                style={{
                  fontFamily: fontFamily.SEMI_BOLD,
                  fontSize: fontSize.t1,
                  color: colors.white,
                }}
              >
                Result
              </Text>
            </View>
            <View style={{ backgroundColor: "#0373BB", padding: 10 }}>
              <Text style={styles.resultText}>
                Daily Calories Needed : 0kcal
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ChildScreenContainerWithBackGround>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: colors.black,
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
  },
  resultContainer: {
    width: "100%",
    backgroundColor: colors.bgPlaceholder,
    height: verticalScale(130),
    alignSelf: "center",
    marginVertical: verticalScale(10),
    borderRadius: 10,
  },
  resultContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  resultTitle: {
    fontSize: fontSize.h3,
    fontFamily: fontFamily.MEDIUM,
    color: colors.appColor,
  },
  resultBox: {
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingHorizontal: moderateScale(20),
    marginTop: moderateScale(10),
  },
  resultText: {
    fontSize: fontSize.h3,
    fontFamily: fontFamily.SEMI_BOLD,
    color: colors.back_btn_color,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(6),
  },
  referenceContainer: {
    paddingHorizontal: scale(4),
    flexDirection: "column",
    marginVertical: verticalScale(10),
  },
  referenceTitle: {
    color: colors.black,
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    marginBottom: verticalScale(2),
  },
  referenceText: {
    color: colors.lightGrey,
    fontSize: fontSize.t4,
    fontFamily: fontFamily.REGULAR,
  },
  btnContainer: {
    backgroundColor: colors.back_btn_color,
    height: scale(32),
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.s12,
    borderRadius: moderateScale(4),
  },
  btnText: {
    color: colors.white,
    fontSize: fontSize.t3,
    fontFamily: fontFamily.SEMI_BOLD,
    textAlign: "center",
  },
  box: {
    height: verticalScale(50),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D7264E",
  },
  resultText: {
    fontSize: fontSize.t2,
    fontFamily: fontFamily.REGULAR,
    color: colors.white,
    padding: moderateScale(10),
  },
  radioContainer1: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default CalorieCal;
