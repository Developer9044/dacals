import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Platform, View, Text } from "react-native";
import ChildScreenContainerWithBackGround from "../../components/ChildScreenContainerWithBackGround";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import SwitchComp from "../../components/CalculatorComp/SwitchComp";
import CalculatorComp from "../../components/CalculatorComp/CalculatorComp";
import fontSize from "../../constants/fontSize";
import fontFamily from "../../constants/fontFamily";
import colors from "../../constants/colors";
import spacing from "../../constants/spacing";
import CustomLableBtn from "../../components/CustomLableBtn";

const BodySurfaceArea = ({ route }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [BSA, setBSA] = useState();
  const [weighterr, setWeightErr] = useState("");
  const [heighterr, setHeightErr] = useState("");
  const [error_msg, setErrMsg] = useState("");

  const { title } = route?.params;
  const heightLabel = isSwitchOn ? "Height (cm)" : "Height (in)";
  const weightLabel = isSwitchOn ? "Weight (kg)" : "Weight (lb)";

  const minHeight = isSwitchOn ? 100 : 39;
  const maxHeight = isSwitchOn ? 210 : 83;

  const minWeight = isSwitchOn ? 35 : 77;
  const maxWeight = isSwitchOn ? 180 : 396;

  useEffect(() => {
    setHeight(isSwitchOn ? 100 : 39);
    setWeight(isSwitchOn ? 35 : 77);
  }, [isSwitchOn]);

  const handleHeightChange = (value) => {
    setHeight("");
    setHeightErr("");
    if (value == "0") {
      setHeightErr("Please Enter Greater Than  " + height + ".");
      setHeight("");
    } else if (isNaN(value) == true) {
      setHeightErr("Only Digits Are Allowed.*");
    } else if (value?.includes(".") == true) {
      let check = parseFloat(value.match(/\d+\.\d{1}/));
      if (isNaN(check) == true) {
        setHeight(value);
      } else {
        if (value <= 83) {
          setHeight(check);
        }
      }
    } else if (isSwitchOn === true) {
      let check = parseFloat(value.match(/\d+\.\d{1}/));

      if (
        (parseFloat(value) >= 100 && parseFloat(value) <= 210) ||
        value.length < 3
      ) {
        if (isNaN(check) == true) {
          setHeight(value);
        } else {
          if (value <= 210) {
            setHeight(check);
          }
        }
        setHeightErr("");
        setHeight(parseFloat(value || 0));
      } else {
        setHeight("");
        setHeightErr("Invalid height. *");
      }
    } else if (isSwitchOn === false) {
      if (
        (parseFloat(value) >= 39 && parseFloat(value) <= 83) ||
        value.length < 2
      ) {
        setHeightErr("");
        setHeight(parseFloat(value || 0));
      } else {
        setHeight("");
        setHeightErr("Invalid height. *");
      }
    }
  };

  const handleWeightChange = (value) => {
    setWeight("");
    setWeightErr("");
    if (value == "0") {
      setWeightErr("Please Enter Greater Than  " + weight + ".");
      setWeight("");
    } else if (isNaN(value) == true) {
      setWeightErr("Only Digits Are Allowed.*");
    } else if (value?.includes(".") == true) {
      let check = parseFloat(value.match(/\d+\.\d{1}/));
      if (isNaN(check) == true) {
        setWeight(value);
      } else {
        if (value <= 396) {
          setWeight(check);
        }
      }
    } else if (isSwitchOn === true) {
      if (
        (parseFloat(value) > 35 && parseFloat(value) <= 180) ||
        value.length < 3
      ) {
        setWeightErr("");
        setWeight(parseFloat(value || 0));
      } else {
        setWeight("");
        setWeightErr("Invalid weight. *");
      }
    } else if (isSwitchOn === false) {
      if (
        (parseFloat(value) >= 77 && parseFloat(value) <= 396) ||
        value.length < 3
      ) {
        setWeightErr("");
        setWeight(parseFloat(value || 0));
      } else {
        setWeight("");
        setWeightErr("Invalid weight. *");
      }
    }
  };

  const CalBSA = () => {
    let BSArea = "";
    let ClcultedVlue = "";
    if (
      (weight == "" || weight == undefined) &&
      (height == "" || height == undefined)
    ) {
      setErrMsg("Enter Your Weight and Height. **");
    } else if (weight == "" || weight == undefined) {
      setErrMsg("Enter Your Weight. *");
    } else if (height == "" || height == undefined) {
      setErrMsg("Enter Your Height. *");
    } else if (isSwitchOn === false) {
      if (weight < 77 && height < 39) {
        setErrMsg("Invalid Height and Weight. **");
      } else if (height < 39) {
        setErrMsg("Invalid Height. *");
      } else if (weight < 77) {
        setErrMsg("Invalid Weight. *");
      } else {
        ClcultedVlue = Math.sqrt((height * weight) / 3131);
        BSArea = ClcultedVlue.toFixed(2);
        setErrMsg("");
      }
    } else if (isSwitchOn === true) {
      if (weight < 35) {
        setErrMsg("Invalid Weight. *");
      } else if (height < 100) {
        setErrMsg("Invalid Height. *");
      } else {
        ClcultedVlue = Math.sqrt((height * weight) / 3600);
        BSArea = ClcultedVlue.toFixed(2);
        setErrMsg("");
      }
    } else {
      setErrMsg("No Calculation");
    }
    if (BSArea == undefined || BSArea == "") {
      setBSA(0);
    } else if (isNaN(BSArea) == true) {
      setBSA(0);
    } else {
      setBSA(BSArea);
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
          <CalculatorComp
            label={heightLabel}
            minimumValue={minHeight}
            maximumValue={maxHeight}
            onChangeText={handleHeightChange}
            onValueChange={(value) => {
              const roundedValue = parseFloat(value).toFixed(1);
              setHeight(roundedValue);
              setHeightErr("");
            }}
            slideContainerStyle={{
              marginBottom: moderateScale(10),
            }}
            inpValue={height.toString()}
            slidValue={parseFloat(height)}
            error_msg={heighterr}
          />

          <View
            style={{
              paddingHorizontal:
                Platform.OS === "android" ? moderateScale(12) : null,
            }}
          >
            <CalculatorComp
              label={weightLabel}
              minimumValue={minWeight}
              maximumValue={maxWeight}
              onChangeText={handleWeightChange}
              onValueChange={(value) => {
                const roundedValue = parseFloat(value).toFixed(1);
                setWeight(roundedValue);
                setWeightErr("");
              }}
              slideContainerStyle={{
                marginBottom: moderateScale(10),
              }}
              inpValue={weight.toString()}
              slidValue={parseFloat(weight)}
              error_msg={weighterr}
              calculateErro={error_msg}
            />

            <CustomLableBtn
              btnContainer={[styles.btnContainer]}
              title={"Calculate"}
              btnText={styles.btnText}
              onPress={CalBSA}
            />
            <View style={styles.resultContainer}>
              <View style={styles.resultContent}>
                <Text style={styles.resultTitle}>BSA</Text>
                <View style={styles.resultBox}>
                  <Text style={styles.resultText}>{BSA} m²</Text>
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
export default BodySurfaceArea;
