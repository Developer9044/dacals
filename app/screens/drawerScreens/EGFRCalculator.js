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

const EGFRCalculator = ({ route }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [age, setAge] = useState("");
  const [ageerror, setAgeError] = useState("");

  const [egfr, setegfr] = useState("");
  const [serum, setSerum] = useState("0.0");
  const [serumerror, setSerumerror] = useState("0.0");
  const [ErrMsg, setErrMsg] = useState("");

  // console.log(ErrMsg, "vhdsvfcvvgcvsdvc<<>>>>>>>>");

  const [genderOptions, setGenderOptions] = useState([
    { id: 1, name: "Male", selected: true },
    { id: 2, name: "Female", selected: false },
  ]);
  const gender = genderOptions.find((item) => item.selected)?.name;

  // console.log(gender);

  const { title } = route?.params;
  const labelname = isSwitchOn
    ? "Serum Creatinine (μmol/L)"
    : "Serum Creatinine (mg/dL)";

  const Serumminimum = isSwitchOn ? 9 : 0.1;
  const Serummaxmimum = isSwitchOn ? 1768 : 20;
  const minimumAge = 18;
  const maximumAge = 110;

  const onGenderRadioBtnClick = (item) => {
    const updatedState = genderOptions.map((option) =>
      option.id === item.id
        ? { ...option, selected: true }
        : { ...option, selected: false }
    );
    setGenderOptions(updatedState);
  };

  const handleSecrum = (value) => {
    // console.log(parseFloat(value), typeof value, "pppp");
    setSerum("");
    setErrMsg("");
    setSerumerror("");

    // if (value == "") {
    //   setErrMsg("Please Enter Greater Than  " + serum + ".");
    //   setSerum("");
    // } else if (isNaN(value) == true) {
    //   setSerumerror("Only Digits Are Allowed.*");
    // } else if (value?.includes(".") == true) {
    //   let check = parseFloat(value.match(/\d+\.\d{1}/));
    //   if (isNaN(check) == true) {
    //     setSerum(value);
    //   } else {
    //     setSerum(check);
    //   }
    // }

    // else

    if (isSwitchOn === true) {
      if (
        (parseFloat(value) > 9 && parseFloat(value) <= 1768) ||
        value.length < 4
      ) {
        setSerumerror("");
        setSerum(parseFloat(value || 0));
      } else {
        setSerum(1768);
        setSerumerror("");
      }
    } else if (isSwitchOn === false) {
      const regex = /^\d*$/;
      if (parseFloat(value) > 0.1 && parseFloat(value) <= 20) {
        setSerumerror("");
        setSerum(value);
      } else {
        if (value == "0" || value == "0." || parseFloat(value) <= 0) {
          setSerumerror("Invalid");
          setSerum(value);
        } else {
          if (parseFloat(value) >= 20) {
            setSerum(20);
            setSerumerror("");
          } else {
            setSerum(value);
            setSerumerror("");
          }
        }
      }
    }
  };

  const handleAgeChange = (value) => {
    // const numericValue = value.replace(/[^0-9]/g, "");
    // setAge(parseInt(numericValue, 10) || 0);
    setAge("");
    setErrMsg("");
    if (value == "0") {
      setErrMsg("Please Enter Greater Than Or Equal " + serum + " ");
      setAge("");
    } else if (isNaN(value) == true) {
      setSerumerror("Only Digits Are Allowed.*");
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
        setSerumerror("");
        setAge(parseFloat(value || 0));
      } else {
        setAge(110);
        setSerumerror("Invalid height. *");
      }
    } else if (isSwitchOn === false) {
      if (
        (parseFloat(value) >= 18 && parseFloat(value) <= 110) ||
        value.length < 3
      ) {
        setSerumerror("");
        setAge(parseFloat(value || 0));
      } else {
        setAge(110);
        setSerumerror("Invalid height. *");
      }
    }
  };

  const CalculateEgfr = (e) => {
    //-----minimum_values_of_male----//
    let age_value = Math.pow(0.99, age);
    let ScrValue = serum;
    let minimummaleScr = serum / 0.9;
    let minimum_male_value = Math.min(minimummaleScr, 1);
    let powerofminmaleValue = 1 / minimum_male_value;
    let minimum_male_Scr = Math.pow(powerofminmaleValue, 0.3);
    //-----maximum_values_of_male----//
    let maximumScrMale = serum / 0.9;
    let maximum_male_value = Math.max(maximumScrMale, 1);
    let powerofmaxmaleValue = 1 / maximum_male_value;
    let maximum_male_Scr = Math.pow(powerofmaxmaleValue, 1.2);
    let egfr_male = 142 * minimum_male_Scr * maximum_male_Scr * age_value;
    //-----minimum_values_of_female----//
    let minimumFemaleScr = serum / 0.7;
    let minimum_female_value = Math.min(minimumFemaleScr, 1);
    let powerofminfemaleValue = 1 / minimum_female_value;
    let minimum_female_Scr = Math.pow(powerofminfemaleValue, 0.24);
    //-----maximum_values_of_female----//
    let maximumFemaleScr = serum / 0.7;
    let maximum_female_value = Math.max(maximumFemaleScr, 1);
    let powerofmaxfemaleValue = 1 / maximum_female_value;
    let maximum_female_Scr = Math.pow(powerofmaxfemaleValue, 1.2);
    let egfr_female =
      142 * maximum_female_Scr * minimum_female_Scr * 1.012 * age_value;
    setErrMsg("");
    if (isSwitchOn === true) {
      if (serum == "" && serum > 1768) {
        setErrMsg("Invalid serum creatinine value.");
      } else if (serum < 9) {
        setErrMsg("Invalid serum creatinine value");
      } else if (serum == 0) {
        setErrMsg("Invalid serum creatinine value.");
      } else if (age < 18) {
        setErrMsg("Please select Age above 18");
      } else if (gender === "Male") {
        nval = (egfr_male * 88.4).toFixed(1);
        setegfr(nval);
      } else if (gender == "Female") {
        nval = (egfr_female * 88.4).toFixed(1);
        setegfr(nval);
      }
    } else if (isSwitchOn === false) {
      if (serum == "" && serum > 20) {
        setErrMsg("Invalid serum creatinine value.");
      } else if (serum == 0) {
        setErrMsg("Invalid serum creatinine value.");
      } else if (age < 18) {
        setErrMsg("Please select Age above 18");
      } else if (gender == "Male") {
        valtab2 = egfr_male.toFixed(1);
        //nval2= valtab2.toFixed(1)
        setegfr(valtab2);
      } else if (gender == "Female") {
        valtab2 = egfr_female.toFixed(1);
        // nval2 = valtab2.toFixed(1)
        setegfr(valtab2);
      }
    }
  };

  useEffect(() => {
    setSerum(isSwitchOn ? 9 : 0.1);
    setAge(isSwitchOn ? 18 : 18);
  }, [isSwitchOn]);

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
        <SwitchComp
          topbutton={true}
          text1={"mg/dL"}
          text2={"μmol/L"}
          value={isSwitchOn}
          onValueChange={setIsSwitchOn}
        />

        <View style={{ flex: 1, marginTop: moderateScale(14) }}>
          <CalculatorComp
            label={labelname}
            minimumValue={Serumminimum}
            maximumValue={Serummaxmimum}
            onChangeText={handleSecrum}
            onValueChange={(value) => {
              const formattedValue = parseFloat(value).toFixed(1);
              setSerum(formattedValue);
            }}
            slideContainerStyle={{
              marginBottom: moderateScale(10),
            }}
            inpValue={serum.toString()}
            slidValue={parseFloat(serum)}
            error_msg={serumerror}
          />

          {/* <CalculatorComp
            label={"Age"}
            minimumValue={minimumAge}
            maximumValue={maximumAge}
            onChangeText={handleAgeChange}
            onValueChange={(value) => {
              const roundedValue = Math.floor(value);
              setAge(roundedValue);
            }}
            slideContainerStyle={{
              marginBottom: moderateScale(10),
            }}
            inpValue={age.toString()}
            slidValue={age}
          /> */}

          <View
            style={{
              paddingHorizontal:
                Platform.OS === "android" ? moderateScale(12) : null,
            }}
          >
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
              onPress={CalculateEgfr}
            />

            <View style={styles.resultContainer}>
              <View style={styles.resultContent}>
                <Text style={styles.resultTitle}>eGFR</Text>
                <View style={styles.resultBox}>
                  <Text style={styles.resultText}>
                    {`${egfr}mL/min/1.73m2`}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.referenceContainer}>
              <Text style={styles.referenceTitle}>Reference:</Text>
              <Text style={styles.referenceText}>
                National Kidney Foundation (US). CKD-EPI Creatinine Equation
                (2021)
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
    marginVertical: moderateScale(6),
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
});

export default EGFRCalculator;
