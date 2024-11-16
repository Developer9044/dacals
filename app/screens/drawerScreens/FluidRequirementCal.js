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
import CustomLableBtn from "../../components/CustomLableBtn";
import spacing from "../../constants/spacing";

const FluidRequirementCal = ({ route }) => {
  const [weight, setWeight] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [p, setProtein] = useState("0.0");
  const [proteinResult, setProteinResult] = useState("");

  const [ageError, setAgeError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [ProteinError, setProteinError] = useState("");
  const [fluid, setFluid] = useState("");
  const [ErrMsg, setErrMsg] = useState("");
  const [calorie, setCalorie] = useState("");

  const [fluidRequirement, setFluidRequirement] = useState(0);

  const [genderOptions, setGenderOptions] = useState([
    { id: 1, name: "Male", selected: true },
    { id: 2, name: "Female", selected: false },
  ]);

  const selectedGender = genderOptions.find((option) => option.selected)?.name;

  const [frameSizeOptions, setFrameSizeOptions] = useState([
    { id: 1, name: "Light", selected: false },
    { id: 2, name: "Moderate", selected: true },
    { id: 3, name: "Active", selected: false },
    { id: 4, name: "Very Active", selected: false },
  ]);

  const frameSize = frameSizeOptions.find((item) => item.selected)?.name;

  const { title } = route?.params;
  const labelname = isSwitchOn ? "Height(cm)" : "Height(in)";
  const labelnamew = isSwitchOn ? "Weight (kg) " : "Weight (lb)";
  const protein = "Protein Requirement (grams/day)";

  const minimumValueW = isSwitchOn ? 35 : 77;
  const maximumValueW = isSwitchOn ? 180 : 396;
  const minimumValueH = isSwitchOn ? 100 : 39;
  const maximumValueH = isSwitchOn ? 210 : 83;
  const minimumAge = 18;
  const maximumAge = 110;
  const minimumP = 0.8;
  const maximumP = 2;

  useEffect(() => {
    setAge(isSwitchOn ? 18 : 18);
    setHeight(isSwitchOn ? 100 : 39);
    setWeight(isSwitchOn ? 35 : 77);
    setProtein(isSwitchOn ? 0.8 : 0.8);
  }, [isSwitchOn]);

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

  const calculateFluidRequirement = () => {
    let fluidRequirement = 0;
    const selectedFrameSize = frameSizeOptions.find(
      (option) => option.selected
    );
    if (weight && selectedFrameSize) {
      let multiplier = 1;
      switch (selectedFrameSize.name) {
        case "Light":
          multiplier = 30;
          break;
        case "Moderate":
          multiplier = 35;
          break;
        case "Active":
          multiplier = 40;
          break;
        case "Very Active":
          multiplier = 45;
          break;
        default:
          multiplier = 30;
      }
      fluidRequirement = weight * multiplier;
    }
    return fluidRequirement;
  };

  const handleCalculatePress = () => {
    const requirement = calculateFluidRequirement();
    setFluidRequirement(requirement);
  };

  const handleAgeChange = (value) => {
    // const numericValue = value.replace(/[^0-9]/g, "");
    // setAge(parseInt(numericValue, 10) || 0);

    if (value == "0") {
      setErrMsg("Please Enter Greater Than  " + age + ".");
      setAge("");
    } else if (isNaN(value) == true) {
      setErrMsg("Only Digits Are Allowed.*");
    } else if (value?.includes(".") == true) {
      let check = parseFloat(value.match(/\d+\d{1}/));
      if (isNaN(check) == true) {
        setAge(value);
      } else {
        setAge(check);
      }
    } else if (isSwitchOn === true) {
      if (
        (parseFloat(value) > 18 && parseFloat(value) <= 110) ||
        value.length < 3
      ) {
        setAgeError("");
        setAge(parseFloat(value || 0));
      } else {
        setAge(110);
        setAgeError("");
      }
    } else if (isSwitchOn === false) {
      const decimalRegex = /^\d*(\.\d{0,2})?$/;
      if (decimalRegex.test(value)) {
        const numberValue = parseFloat(value);
        if ((numberValue > 18 && numberValue <= 110) || value.length < 3) {
          setAgeError("");

          setAge(numberValue || 0);
        } else {
          setAge(110);
          setAgeError("");
        }
      }
    }
    console.log("<<<<object>>>>");
  };

  const handleheight = (value) => {
    if (isSwitchOn === true) {
      if (value == "") {
        setHeightError("Invalid height*");
        setHeight("");
      }
      if (parseFloat(value) < 100) {
        setHeightError("Invalid height*");
        setHeight(value);
        return false;
      }
      if (value > 210) {
        setHeightError("");
        setHeight(210);
      }
      if (value > 0 && value <= 210) {
        if (value?.includes(".") == true) {
          let vl = value?.split(".")[1];
          if (vl?.length > 1) {
            return false;
          } else {
            setHeightError("");
            setHeight(value);
          }
        } else {
          setHeightError("");
          setHeight(value);
        }
      }
    } else {
      if (value == "") {
        setHeightError("Invalid height.*");
        setHeight("");
      }
      if (parseFloat(value) < 39) {
        setHeightError("Invalid height.*");
        setHeight(value);
        return false;
      }
      if (value > 83) {
        setHeightError("");
        setHeight(83);
      }
      if (value > 0 && value <= 83) {
        if (value?.includes(".") == true) {
          let vl = value?.split(".")[1];
          if (vl?.length > 1) {
            return false;
          } else {
            setHeightError("");
            setHeight(value);
          }
        } else {
          setHeightError("");
          setHeight(value);
        }
      }
    }
  };

  const handleWidth = (value) => {
    if (isSwitchOn === true) {
      if (value == "") {
        setWeightError("Invalid weight*");
        setWeight("");
      }
      if (parseFloat(value) < 35) {
        setWeightError("Invalid weight*");
        setWeight(value);
        return false;
      }
      if (value > 180) {
        setWeightError("");
        setWeight(180);
      }
      if (value > 0 && value <= 180) {
        if (value?.includes(".") == true) {
          let vl = value?.split(".")[1];
          if (vl?.length > 1) {
            return false;
          } else {
            setWeightError("");
            setWeight(value);
          }
        } else {
          setWeightError("");
          setWeight(value);
        }
      }
    } else {
      if (value == "") {
        setWeightError("Invalid weight.*");
        setWeight("");
      }
      if (parseFloat(value) < 77) {
        setWeightError("Invalid weight.*");
        setWeight(value);
        return false;
      }
      if (value > 396) {
        setWeightError("");
        setWeight(396);
      }
      if (value > 0 && value <= 396) {
        if (value?.includes(".") == true) {
          let vl = value?.split(".")[1];
          if (vl?.length > 1) {
            return false;
          } else {
            setWeightError("");
            setWeight(value);
          }
        } else {
          setWeightError("");
          setWeight(value);
        }
      }
    }
  };

  const handleProteinChange = (value) => {
    if (isSwitchOn === true) {
      if (value == "") {
        setProteinError("Invalid protein.*");
        setProtein("");
      }
      if (parseFloat(value) < 0.8) {
        setProteinError("Invalid protein.*");
        setProtein(value);
        return false;
      }
      if (value > 2) {
        setProteinError("");
        setProtein(2);
      }
      if (value > 0 && value <= 2) {
        if (value?.includes(".") == true) {
          let vl = value?.split(".")[1];
          if (vl?.length > 1) {
            return false;
          } else {
            setProteinError("");
            setProtein(value);
          }
        } else {
          setProteinError("");
          setProtein(value);
        }
      }
    } else {
      if (value == "") {
        setProteinError("Invalid weight.*");
        setProtein("");
      }
      if (parseFloat(value) < 0.8) {
        setProteinError("Invalid weight.*");
        setProtein(value);
        return false;
      }
      if (value > 2) {
        setProteinError("");
        setProtein(2);
      }
      if (value > 0 && value <= 2) {
        if (value?.includes(".") == true) {
          let vl = value?.split(".")[1];
          if (vl?.length > 1) {
            return false;
          } else {
            setProteinError("");
            setProtein(value);
          }
        } else {
          setProteinError("");
          setProtein(value);
        }
      }
    }
  };

  const calculate = () => {
    setErrMsg("");
    if (isSwitchOn === false) {
      if (weight == "" && height == "" && p == "" && age == "") {
        setErrMsg("Please Enter the weight & height & Protein!...");
        return false;
      }
      if (age == "") {
        setErrMsg("Please Enter the age");
        return false;
      }
      if (age < 18) {
        setErrMsg("Please enter Age value above 18");
        return false;
      }
      if (age > 110) {
        setErrMsg("Allowed Only Less than 110");
        return false;
      }
      if (p == "") {
        setErrMsg("Please Enter Protein value");
        return false;
      }
      if (p <= 0.7) {
        setErrMsg("Please enter Protein Requirement value above 0.8 ");
        return false;
      }
      if (weight == "") {
        setErrMsg("Please Enter the weight , height & Protein !...");
        return false;
      } else if (weight < 77) {
        setErrMsg("Please Enter Valid Weight!...");
        return false;
      } else if (height < 39) {
        setErrMsg("Please Enter Valid Height");
        return false;
      }
      pro = p * weight;
      prot = (pro / 2.22).toFixed(0);
      flu = 30 * weight;
      fl = (flu / 2.22).toFixed(0);
      setProteinResult(prot);
      setFluid(fl);
      if (selectedGender == "Male") {
        if (frameSize == "Light") {
          // var weight = (inputValWeight/2.2);
          // var height = (inputValHeight/2.54);
          cal = (
            ((10 * weight) / 2.22 + (6.25 * height) / 2.54 - 5 * age + 5) *
            1.4
          ).toFixed(0);
          setCalorie(cal);
        } else if (frameSize == "Moderate") {
          cal = ((10 * weight + 6.25 * height - 5 * age + 5) * 1.55).toFixed(0);

          setCalorie(cal);
        } else if (frameSize == "Active") {
          cal = ((10 * weight + 6.25 * height - 5 * age + 5) * 1.725).toFixed(
            0
          );
          setCalorie(cal);
        } else if (frameSize == "Very Active") {
          cal = ((10 * weight + 6.25 * height - 5 * age + 5) * 1.9).toFixed(0);
          setCalorie(cal);
        }
      }
      if (selectedGender == "Female") {
        if (frameSize == "Light") {
          cal = ((10 * weight + 6.25 * height - 5 * age - 161) * 1.37).toFixed(
            0
          );

          setCalorie(cal);
        } else if (frameSize == "Moderate") {
          cal = ((10 * weight + 6.25 * height - 5 * age - 161) * 1.55).toFixed(
            0
          );

          setCalorie(cal);
        } else if (frameSize === "Active") {
          cal = ((10 * weight + 6.25 * height - 5 * age - 161) * 1.725).toFixed(
            0
          );

          setCalorie(cal);
        } else if (frameSize == "Very Active") {
          cal = ((10 * weight + 6.25 * height - 5 * age - 161) * 1.9).toFixed(
            0
          );
          setCalorie(cal);
        }
      }
    } else if (isSwitchOn === true) {
      if (weight == "" && height == "" && p == "") {
        setErrMsg("Please Enter the Age, weight & height & Protein!...");
        return false;
      } else if (age == "") {
        setErrMsg("Please Enter the age");
        return false;
      } else if (age < 18) {
        setErrMsg("Please enter Age value above 18.");
        return false;
      } else if (age > 110) {
        setErrMsg("Allowed Only Less Than 110");
        return false;
      } else if (weight < 35) {
        setErrMsg("Please enter a valid weight. *");
        return false;
      } else if (height < 100) {
        setErrMsg("Please enter a valid height. *");
        return false;
      } else if (p <= 0.7) {
        setErrMsg("Please enter Protein Requirement value above 0.8");
        return false;
      }
      pro = (p * weight).toFixed(0);
      flu = (30 * weight).toFixed(0);
      setProteinResult(pro);
      setFluid(flu);

      if (selectedGender == "Male") {
        if (frameSize == "Light") {
          cal = ((10 * weight + 6.25 * height - 5 * age + 5) * 1.4).toFixed(0);
          setCalorie(cal);
        } else if (frameSize == "Moderate") {
          cal = ((10 * weight + 6.25 * height - 5 * age + 5) * 1.5).toFixed(0);
          setCalorie(cal);
        } else if (frameSize == "Active") {
          cal = ((10 * weight + 6.25 * height - 5 * age + 5) * 1.725).toFixed(
            0
          );
          setCalorie(cal);
        } else if (frameSize == "Very Active") {
          cal = ((10 * weight + 6.25 * height - 5 * age + 5) * 1.9).toFixed(0);
          setCalorie(cal);
        }
      } else if (selectedGender == "Female") {
        if (frameSize == "Light") {
          cal = ((10 * weight + 6.25 * height - 5 * age - 161) * 1.4).toFixed(
            0
          );
          setCalorie(cal);
        } else if (frameSize == "Moderate") {
          cal = ((10 * weight + 6.25 * height - 5 * age - 161) * 1.5).toFixed(
            0
          );
          setCalorie(cal);
        } else if (frameSize == "Active") {
          cal = ((10 * weight + 6.25 * height - 5 * age - 161) * 1.725).toFixed(
            0
          );
          setCalorie(cal);
        } else if (frameSize == "Very Active") {
          cal = ((10 * weight + 6.25 * height - 5 * age - 161) * 1.9).toFixed(
            0
          );
          setCalorie(cal);
        }
      }
    }
  };

  const UpdateRangeInput = (value) => {
    setWeight("");
    setErrMsg("");
    setNewVar("");
    setNeVarble("");
    setIBW("");
    if (value == "0") {
      setErrMsg("Please Enter Greater Than " + weight + ".");
      setWeight("");
    } else if (isNaN(value) == true) {
      setErrMsg("Only Digits Are Allowed.*");
    } else if (value?.includes(".") == true) {
      let check = parseFloat(value.match(/\d+\.\d{1}/));
      if (isNaN(check) == true) {
        setWeight(value);
      } else {
        setWeight(check);
      }
    } else if (isSwitchOn === true) {
      if (value.length == 1) {
        if (parseFloat(value) < 1 || parseFloat(value) > 2) {
          setErrMsg("Invalid height. *");
        } else {
          setWeight(parseFloat(value));
        }
      } else if (value.length == 2) {
        if (parseFloat(value) < 10 || parseFloat(value) > 21) {
          setErrMsg("Invalid height. *");
        } else {
          setWeight(parseFloat(value));
        }
      } else if (value.length == 3) {
        if (parseFloat(value) < 100 || parseFloat(value) > 210) {
          setErrMsg("Invalid height. *");
        } else {
          setWeight(parseFloat(value));
        }
      } else if (value.length > 3) {
        setErrMsg("Invalid height. *");
      }
    } else if (isSwitchOn === false) {
      if (value.length == 1) {
        if (parseFloat(value) < 3 || parseFloat(value) > 8) {
          setErrMsg("Invalid height. *");
        } else {
          setWeight(parseFloat(value));
        }
      } else if (value.length == 2) {
        if (parseFloat(value) < 39 || parseFloat(value) > 83) {
          setErrMsg("Invalid height. *");
        } else {
          setWeight(parseFloat(value));
        }
      } else if (value.length > 2) {
        setErrMsg("Invalid height. *");
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

        <View style={{ flex: 1, marginTop: moderateScale(14) }}>
          {/* <CalculatorComp
            label={"Age"}
            minimumValue={minimumAge}
            maximumValue={maximumAge}
            onValueChange={(value) => {
              const roundedValue = Math.floor(value);
              setAge(roundedValue);
            }}
            value={age.toString()}
            slideContainerStyle={{
              marginBottom: moderateScale(10),
            }}
         
          /> */}

          <CalculatorComp
            label={"Age"}
            minimumValue={minimumAge}
            maximumValue={maximumAge}
            onChangeText={handleAgeChange}
            onValueChange={(value) => {
              const roundedValue = parseFloat(value);
              setAge(roundedValue);
              setAgeError("");
            }}
            slideContainerStyle={{
              marginBottom: moderateScale(10),
            }}
            inpValue={age.toString()}
            slidValue={age}
            error_msg={ageError}
          />

          <CalculatorComp
            label={labelname}
            minimumValue={minimumValueH}
            maximumValue={maximumValueH}
            onChangeText={handleheight}
            onValueChange={(value) => {
              const roundedValue = parseFloat(value).toFixed(1);
              setHeight(roundedValue);
              setHeightError("");
            }}
            slideContainerStyle={{
              marginBottom: moderateScale(10),
            }}
            inpValue={height.toString()}
            slidValue={parseFloat(height)}
            error_msg={heightError}
          />

          <CalculatorComp
            label={labelnamew}
            minimumValue={minimumValueW}
            maximumValue={maximumValueW}
            onChangeText={handleWidth}
            onValueChange={(value) => {
              const roundedValue = parseFloat(value).toFixed(1);
              setWeight(roundedValue);
              setWeightError("");
            }}
            slideContainerStyle={{
              marginBottom: moderateScale(10),
            }}
            inpValue={weight.toString()}
            slidValue={parseFloat(weight)}
            error_msg={weightError}
          />

          <CalculatorComp
            label={protein}
            minimumValue={0.8}
            maximumValue={2}
            onChangeText={handleProteinChange}
            onValueChange={(value) => {
              const formattedValue = parseFloat(value).toFixed(1);
              setProtein(formattedValue);
            }}
            inpValue={p.toString()}
            slidValue={parseFloat(p)}
            error_msg={ProteinError}
          />

          <View
            style={{
              paddingHorizontal:
                Platform.OS === "android" ? moderateScale(12) : null,
            }}
          >
            <View style={{ marginTop: moderateScale(14) }}>
              <View style={styles.radioContainer}>
                <Text style={[styles.text, { flex: 1 }]}>Gender</Text>
                <View style={[styles.radioGroup, { flex: 3 }]}>
                  {genderOptions.map((option) => (
                    <RadioButtonComp
                      onPress={() => onGenderRadioBtnClick(option)}
                      selected={option.selected}
                      key={option.id}
                      radioBtnConStyle={{
                        marginRight: 10,
                      }}
                    >
                      {option.name}
                    </RadioButtonComp>
                  ))}
                </View>
              </View>

              <View
                style={[styles.radioContainer, { alignItems: "flex-start" }]}
              >
                <Text style={[styles.text, { flex: 1 }]}>Frame Size</Text>
                <View style={[styles.radioGroup, { flex: 3 }]}>
                  {frameSizeOptions.map((option) => (
                    <RadioButtonComp
                      onPress={() => onFrameSizeRadioBtnClick(option)}
                      selected={option.selected}
                      key={option.id}
                      radioBtnConStyle={{
                        marginBottom: moderateScale(6),
                        marginRight: 10,
                      }}
                    >
                      {option.name}
                    </RadioButtonComp>
                  ))}
                </View>
              </View>
            </View>
            <View
              style={{ marginBottom: verticalScale(5), alignItems: "center" }}
            >
              <Text
                style={{
                  color: colors.danger,
                  fontSize: fontSize.t4,
                  marginLeft: 2.0,
                  marginTop: 2,
                  marginBottom: -1,
                  fontFamily: fontFamily.REGULAR,
                }}
              >
                {ErrMsg}
              </Text>
            </View>

            <CustomLableBtn
              btnContainer={[styles.btnContainer]}
              title={"Calculate"}
              btnText={styles.btnText}
              onPress={calculate}
            />

            <View style={styles.resultContainer}>
              <View style={styles.resultContent}>
                <Text
                  style={[styles.resultTitle, { marginTop: moderateScale(4) }]}
                >
                  Protein Requirement
                </Text>
                <View style={styles.resultBox}>
                  <Text style={styles.resultText}>
                    {proteinResult} grams/day
                  </Text>
                </View>
              </View>
              <View style={styles.resultContent}>
                <Text style={styles.resultTitle}>Calorie Requirement</Text>
                <View style={styles.resultBox}>
                  <Text style={styles.resultText}>{calorie} kCal/day</Text>
                </View>
              </View>
              <View style={styles.resultContent}>
                <Text style={styles.resultTitle}>Fluid Requirement</Text>
                <View style={styles.resultBox}>
                  <Text style={styles.resultText}>{fluid} mL/day</Text>
                </View>
              </View>
            </View>

            <View style={styles.referenceContainer}>
              <Text style={styles.referenceTitle}>Reference:</Text>
              <Text style={styles.referenceText}>
                * Hamwi GJ. Therapy: changing dietary concepts. In: Danowski TS,
                editor. Diabetes mellitus: diagnosis and Treatment, vol 1. New
                York: American Diabetes Association; 1964:73–78.
              </Text>

              <Text
                style={{
                  color: colors.lightGrey,
                  fontSize: fontSize.t4,
                  fontFamily: fontFamily.REGULAR,
                  marginTop: moderateScale(10),
                }}
              >
                * Chichester S, Holmes TM, Hubbard J. Ideal body weight: A
                commentary. Clin Nutr ESPEN. 2021;46:246-250.
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
    marginBottom: moderateScale(15),
  },
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    color: colors.black,
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
  },
  resultContainer: {
    width: "100%",
    backgroundColor: colors.bgPlaceholder,
    padding: moderateScale(10),
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
    fontSize: fontSize.h6,
    fontFamily: fontFamily.MEDIUM,
    color: colors.appColor,
  },
  resultBox: {
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(6),
    paddingHorizontal: moderateScale(20),
    marginTop: moderateScale(6),
    marginBottom: moderateScale(10),
  },
  resultText: {
    fontSize: fontSize.h5,
    fontFamily: fontFamily.MEDIUM,
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
    fontSize: fontSize.h6,
    fontFamily: fontFamily.BOLD,
    color: colors.lightGrey,
    marginBottom: verticalScale(5),
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
    marginBottom: spacing.s12,
    borderRadius: moderateScale(4),
  },
  btnText: {
    color: colors.white,
    fontSize: fontSize.t3,
    fontFamily: fontFamily.SEMI_BOLD,
    textAlign: "center",
  },
});

export default FluidRequirementCal;
