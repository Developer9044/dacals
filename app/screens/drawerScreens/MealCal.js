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

const MealCal = ({ route }) => {
  const [meal, setMeal] = useState("");
  const [mealError, setMealError] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [genderOptions, setGenderOptions] = useState([
    { id: 1, name: "Male", selected: true },
    { id: 2, name: "Female", selected: false },
  ]);

  const gender = genderOptions.find((option) => option.selected).name;

  const [frameSizeOptions, setFrameSizeOptions] = useState([
    { id: 1, name: "Three", selected: false },
    { id: 2, name: "Four", selected: true },
    { id: 3, name: "Five", selected: false },
  ]);

  const frameSize = frameSizeOptions.find((option) => option.selected).name;
  const [isLiked, setIsLiked] = useState([
    { id: 1, value: true, name: "General Recommendation", selected: true },
    { id: 2, value: false, name: "Sports Recommendation", selected: false },
  ]);
  const { title } = route?.params;
  const labelname = "Calories";
  const lableAge = "Age";
  const CaloriesM = 0;
  const CaloriesMax = 10000;

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

  const CalChange = (value) => {
    setMeal("");
    setMealError("");
    if (value == "0") {
      setMealError("Please Enter Greater Than Or Equal " + meal + ".");
      setMeal("");
    } else if (isNaN(value) == true) {
      setMealError("Only Digits Are Allowed.*");
    } else if (value?.includes(".") == true) {
      let check = parseFloat(value.match(/\d+\.\d{1}/));
      if (isNaN(check) == true) {
        setMeal(value);
      } else {
        if (value >= 0 && value <= 10000) {
          setMeal(check);
        } else {
          setMealError("Invalid Calories. *");
        }
      }
    } else {
      if (
        (parseFloat(value) >= 0 && parseFloat(value) <= 10000) ||
        value.length < 5
      ) {
        setMealError("");
        setMeal(parseFloat(value || 0));
      } else {
        setMeal(10000);
        setMealError("");
      }
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
            minimumValue={CaloriesM}
            maximumValue={CaloriesMax}
            onChangeText={CalChange}
            onValueChange={(value) => {
              const roundedValue = parseFloat(value).toFixed(1);
              setMeal(roundedValue);
              setMealError("");
            }}
            inpValue={meal.toString()}
            slidValue={parseFloat(meal)}
            error_msg={mealError}
          />

          <View
            style={{
              paddingHorizontal:
                Platform.OS === "android" ? moderateScale(12) : null,
            }}
          >
            <View style={{ marginVertical: moderateScale(14) }}>
              <View style={[styles.radioContainer1]}>
                <Text style={[styles.text, { flex: 1.13 }]}>Meals per day</Text>
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
                Results
              </Text>
            </View>
            <View style={{ backgroundColor: "#0373BB", padding: 10 }}>
              <Text style={styles.resultText}>Breakfast : 0 kcal</Text>
              <Text style={styles.resultText}>(min: 0, max: 0)</Text>
              <Text style={styles.resultText}>Lunch : 0 kcal</Text>
              <Text style={styles.resultText}>(min: 0, max: 0)</Text>
              <Text style={styles.resultText}>Dinner : 0 kcal</Text>
              <Text style={styles.resultText}>(min: 0, max: 0)</Text>
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
    padding: moderateScale(5),
  },
  radioContainer1: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default MealCal;
