import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  View,
  Text,
  Image,
  Alert,
} from "react-native";
import ChildScreenContainerWithBackGround from "../../components/ChildScreenContainerWithBackGround";
import fontSize from "../../constants/fontSize";
import fontFamily from "../../constants/fontFamily";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import SwitchComp from "../../components/CalculatorComp/SwitchComp";
import CalculatorComp from "../../components/CalculatorComp/CalculatorComp";
import CheckBoxComp from "../../components/CalculatorComp/CheckBoxComp";
import colors from "../../constants/colors";
import { images } from "../../assets";
import CustomLableBtn from "../../components/CustomLableBtn";
import spacing from "../../constants/spacing";

const BodyMassCal = ({ route }) => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [error, setError] = useState("");
  const [heighterror, setHeightError] = useState("");
  const [weighterror, setWeightError] = useState("");
  const [bmi, setBmi] = useState(null);

  const { title } = route?.params;

  const [minimumValueH, setMinimumValueH] = useState(isSwitchOn ? 100 : 39);
  const [maximumValueH, setMaximumValueH] = useState(isSwitchOn ? 210 : 83);
  const [minimumValueW, setMinimumValueW] = useState(isSwitchOn ? 35 : 77);
  const [maximumValueW, setMaximumValueW] = useState(isSwitchOn ? 180 : 396);

  useEffect(() => {
    setMinimumValueH(isSwitchOn ? 100 : 39);
    setMaximumValueH(isSwitchOn ? 210 : 83);
    setMinimumValueW(isSwitchOn ? 35 : 77);
    setMaximumValueW(isSwitchOn ? 180 : 396);
    setHeight(isSwitchOn ? 100 : 39);
    setWeight(isSwitchOn ? 35 : 77);
  }, [isSwitchOn]);

  const calculateBMI = () => {
    let heightInMeters = parseFloat(height);
    let weightInKg = parseFloat(weight);

    if (!isSwitchOn) {
      heightInMeters *= 0.0254;
      weightInKg *= 0.453592;

      if (weight < 77 || weight > 396) {
        setWeightError("Invalid Weight");
      } else {
        setWeightError("");
      }

      if (height < 39 || height > 83) {
        setHeightError("Invalid Height");
      } else {
        setHeightError("");
      }
    } else {
      heightInMeters /= 100;

      if (weight < 35 || weight > 180) {
        setWeightError("Invalid Weight");
      } else {
        setWeightError("");
      }

      if (height < 100 || height > 210) {
        setHeightError("Invalid Height");
      } else {
        setHeightError("");
      }
    }

    if (weighterror === "" && heighterror === "") {
      const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
      setBmi(calculatedBmi.toFixed(2));
      setError("");
    } else {
      setBmi(null);
      setError(`${weighterror} ${heighterror}`.trim());
    }
  };

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
        setWeight(check);
      }
    } else if (isSwitchOn === true) {
      if (
        (parseFloat(value) > 35 && parseFloat(value) <= 180) ||
        value.length < 3
      ) {
        setWeightError("");
        setWeight(parseFloat(value || 0));
      } else {
        setWeight("");
        setWeightError("Invalid weight. *");
      }
    } else if (isSwitchOn === false) {
      if (
        (parseFloat(value) >= 77 && parseFloat(value) <= 396) ||
        value.length < 3
      ) {
        setWeightError("");
        setWeight(parseFloat(value || 0));
      } else {
        setWeight(396);
        // setWeightError("Invalid weight. *");
        setWeightError("");
      }
    }
  };

  const handleHeightChange = (value) => {
    setHeight("");
    setHeightError("");
    if (value == "0") {
      setHeightError("Please Enter Greater Than Or Equal " + weight + ".");
      setHeight("");
    } else if (isNaN(value) == true) {
      setHeightError("Only Digits Are Allowed.*");
    } else if (value?.includes(".") == true) {
      let check = parseFloat(value.match(/\d+\.\d{1}/));
      if (isNaN(check) == true) {
        setHeight(value);
      } else {
        setHeight(check);
      }
    } else if (isSwitchOn === true) {
      if (
        (parseFloat(value) >= 100 && parseFloat(value) <= 210) ||
        value.length < 3
      ) {
        setHeightError("");
        setHeight(parseFloat(value || 0));
      } else {
        setHeight(parseFloat(value) || 0);
        setHeightError("Invalid height. *");
      }
    } else if (isSwitchOn === false) {
      if (
        (parseFloat(value) >= 39 && parseFloat(value) <= 83) ||
        value.length < 2
      ) {
        setHeightError("");
        setHeight(parseFloat(value || 0));
      } else {
        setHeight("");
        setHeightError("Invalid height. *");
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
        <SwitchComp value={isSwitchOn} onValueChange={setIsSwitchOn} />

        <View style={{ flex: 1 }}>
          <CalculatorComp
            label={isSwitchOn ? "Weight (kg)" : "Weight (lb)"}
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
            label={isSwitchOn ? "Height (cm)" : "Height (in)"}
            minimumValue={minimumValueH}
            maximumValue={maximumValueH}
            onChangeText={handleHeightChange}
            onValueChange={(value) => {
              const roundedValue = parseFloat(value).toFixed(1);
              setHeight(roundedValue);
              setHeightError("");
            }}
            inpValue={height.toString()}
            slidValue={parseFloat(height)}
            error_msg={heighterror}
          />

          <View
            style={{
              paddingHorizontal:
                Platform.OS === "android" ? moderateScale(12) : null,
            }}
          >
            <CustomLableBtn
              btnContainer={[styles.btnContainer]}
              title={"Calculate BMI"}
              btnText={styles.btnText}
              onPress={calculateBMI}
            />

            <View
              style={{ alignItems: "center", marginVertical: verticalScale(8) }}
            >
              <Text style={styles.text1}>
                {bmi ? `BMI: ${bmi} kg/m²` : "BMI: --.- kg/m²"}
              </Text>
            </View>

            <View style={styles.bmiContainer}>
              <View style={[styles.bmiColumn, { backgroundColor: "#DD070A" }]}>
                <Text style={styles.bmiText}>{"BMI < 18.5"}</Text>
                <View
                  style={[
                    styles.bmiInnerView,
                    { backgroundColor: bmi < 18.5 ? "#F70B08" : "#F8AFAF" },
                  ]}
                >
                  {bmi < 18.5 ? (
                    <Image
                      style={styles.extremeObesityImage}
                      source={images.down2}
                    />
                  ) : null}

                  <Text style={styles.bmiName}>Underweight</Text>
                </View>
              </View>

              <View style={[styles.bmiColumn, { backgroundColor: "#8AB425" }]}>
                <Text style={styles.bmiText}>{"BMI 18.5 - 24.9"}</Text>
                <View
                  style={[
                    styles.bmiInnerView,
                    {
                      backgroundColor:
                        bmi >= 18.5 && bmi <= 24.99 ? "#A6C550" : "#C4D98F",
                    },
                  ]}
                >
                  {bmi >= 18.5 && bmi <= 24.99 && (
                    <Image
                      style={styles.extremeObesityImage}
                      source={images.down2}
                    />
                  )}

                  <Text style={styles.bmiName}>Normal Weight</Text>
                </View>
              </View>

              <View style={[styles.bmiColumn, { backgroundColor: "#E08232" }]}>
                <Text style={styles.bmiText}>BMI 25 - 29.9</Text>
                <View
                  style={[
                    styles.bmiInnerView,
                    {
                      backgroundColor:
                        bmi >= 25 && bmi <= 29.99 ? "#EF842E" : "#F5D181",
                    },
                  ]}
                >
                  {bmi >= 25 && bmi <= 29.99 && (
                    <Image
                      style={styles.extremeObesityImage}
                      source={images.down2}
                    />
                  )}

                  <Text style={styles.bmiName}>Overweight</Text>
                </View>
              </View>

              <View style={[styles.bmiColumn, { backgroundColor: "#C759E3" }]}>
                <Text style={styles.bmiText}>BMI 30 - 34.9</Text>
                <View
                  style={[
                    styles.bmiInnerView,
                    {
                      backgroundColor:
                        bmi >= 30 && bmi <= 34.99 ? "#D964F6" : "#EBB1F9",
                    },
                  ]}
                >
                  {bmi >= 30 && bmi <= 34.99 && (
                    <Image
                      style={styles.extremeObesityImage}
                      source={images.down2}
                    />
                  )}

                  <Text style={styles.bmiName}>Obesity Level I</Text>
                </View>
              </View>
              <View style={[styles.bmiColumn, { backgroundColor: "#B7031D" }]}>
                <Text style={styles.bmiText}>BMI 35 - 39.9</Text>
                <View
                  style={[
                    styles.bmiInnerView,
                    {
                      backgroundColor:
                        bmi >= 35 && bmi <= 39.99 ? "#EC1068" : "#FDD0E2",
                    },
                  ]}
                >
                  {bmi >= 35 && bmi <= 39.99 && (
                    <Image
                      style={styles.extremeObesityImage}
                      source={images.down2}
                    />
                  )}

                  <Text style={styles.bmiName}>Obesity Level II</Text>
                </View>
              </View>

              <View style={[styles.bmiColumn, { backgroundColor: "#DD070A" }]}>
                <Text style={styles.bmiText}>{"BMI > 40"}</Text>
                <View
                  style={[
                    styles.bmiInnerView,
                    { backgroundColor: bmi > 40 ? "#F70B08" : "#FF8781" },
                  ]}
                >
                  <View style={styles.extremeObesityView}>
                    {bmi > 40 && (
                      <Image
                        style={styles.extremeObesityImage}
                        source={images.down2}
                      />
                    )}
                    <Text style={styles.bmiName}>Extreme Obesity</Text>
                  </View>
                </View>
              </View>

              <View style={styles.referenceContainer}>
                <Text style={styles.referenceTitle}>Reference:</Text>
                <Text style={styles.referenceText}>
                  World Health Organization. A healthy lifestyle - WHO
                  recommendations for Body Mass Index (BMI).
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ChildScreenContainerWithBackGround>
  );
};

export default BodyMassCal;

const styles = StyleSheet.create({
  text1: {
    color: colors.lightGrey,
    fontSize: fontSize.h5,
    fontFamily: fontFamily.REGULAR,
  },
  bmiContainer: {
    flex: 1,
  },
  bmiColumn: {
    flex: 1,
    marginVertical: verticalScale(5),
  },
  bmiText: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "white",
    padding: 10,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  bmiInnerView: {
    height: verticalScale(100),
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  bmiName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  extremeObesityView: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  extremeObesityImage: {
    height: verticalScale(30),
    width: scale(30),
    resizeMode: "contain",
    tintColor: colors.white,
  },
  referenceContainer: {
    flexDirection: "column",
    marginVertical: verticalScale(10),
    paddingHorizontal: moderateScale(4),
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
});
