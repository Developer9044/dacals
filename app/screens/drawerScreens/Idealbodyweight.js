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

const Idealbodyweight = ({ route }) => {
  const [weight, setWeight] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [NewVar, setNewVar] = useState();
  const [NeVarble, setNeVarble] = useState();
  const [IBW, setIBW] = useState("");
  const [genderOptions, setGenderOptions] = useState([
    { id: 1, name: "Male", selected: true },
    { id: 2, name: "Female", selected: false },
  ]);

  const gender = genderOptions.find((option) => option.selected).name;

  const [frameSizeOptions, setFrameSizeOptions] = useState([
    { id: 1, name: "Small", selected: false },
    { id: 2, name: "Medium", selected: true },
    { id: 3, name: "Large", selected: false },
  ]);

  const frameSize = frameSizeOptions.find((option) => option.selected).name;
  const [isLiked, setIsLiked] = useState([
    { id: 1, value: true, name: "Yes", selected: true },
    { id: 2, value: false, name: "No", selected: false },
  ]);

  const paraplegic = isLiked.find((option) => option.selected).value;
  const { title } = route?.params;
  const labelname = isSwitchOn ? "Height(cm)" : "Height(in)";

  const minimumValueW = isSwitchOn ? 100 : 39;
  const maximumValueW = isSwitchOn ? 210 : 83;

  useEffect(() => {
    setWeight(isSwitchOn ? 100 : 39);
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

  const onRadioBtnClick = (item) => {
    const updatedState = isLiked.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false }
    );
    setIsLiked(updatedState);
  };

  const UpdateRangeInput = (value) => {
    setWeight("");
    setErrMsg("");
    setNewVar("");
    setNeVarble("");
    setIBW("");
    if (value == "0") {
      setErrMsg("Please Enter Greater Than  " + weight + ".");
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
        if (parseFloat(value) < 39 || parseFloat(value) > 83.0) {
          setErrMsg("");
          setWeight(83);
        } else {
          setWeight(parseFloat(value));
        }
      } else if (value.length > 2) {
        setErrMsg("");
        setWeight(83);
      }
    }
  };

  const MetImp = () => {
    setErrMsg("");
    let IBWeight = 0;
    let HlfClclton = 0;
    let PraplagcYN = 0;
    let FrmSzeLMS = 0;
    let PrplgcProcess = 0;
    let Frmszeprocess = 0;

    const numericWeight = parseFloat(weight);
    if (isSwitchOn) {
      if (!weight || numericWeight < 100 || numericWeight > 210) {
        setErrMsg("Please enter a valid height. *");
        return;
      }
      if (gender === "Male") {
        if (numericWeight > 152.4) {
          HlfClclton = 0.3161 * 152.4 + 1.0738 * (numericWeight - 152.4);
        } else {
          HlfClclton = 0.3161 * numericWeight;
        }
      } else {
        if (numericWeight < 152.4) {
          HlfClclton = 0.2982 * numericWeight;
        } else {
          HlfClclton = 0.2982 * 152.4 + 1.0738 * (numericWeight - 152.4);
        }
      }
    } else {
      if (!weight || numericWeight < 39 || numericWeight > 83) {
        setErrMsg("Please enter a valid height. *");
        return;
      }
      if (gender === "Male") {
        if (numericWeight >= 61) {
          HlfClclton = 1.7667 * 60 + 6 * (numericWeight - 60);
        } else {
          HlfClclton = 1.766 * numericWeight;
        }
      } else {
        if (numericWeight <= 60) {
          HlfClclton = 1.66 * numericWeight;
        } else {
          HlfClclton = 1.66 * 60 + 5 * (numericWeight - 60);
        }
      }
    }

    if (paraplegic) {
      PrplgcProcess = (HlfClclton * 10) / 100;
      PraplagcYN = HlfClclton - PrplgcProcess;
    } else {
      PraplagcYN = HlfClclton;
    }

    if (frameSize === "Small") {
      Frmszeprocess = (PraplagcYN * 10) / 100;
      FrmSzeLMS = PraplagcYN - Frmszeprocess;
      IBWeight = FrmSzeLMS.toFixed(1);
    } else if (frameSize === "Large") {
      Frmszeprocess = (PraplagcYN * 10) / 100;
      FrmSzeLMS = PraplagcYN + Frmszeprocess;
      IBWeight = FrmSzeLMS.toFixed(1);
    } else {
      FrmSzeLMS = PraplagcYN;
      IBWeight = FrmSzeLMS.toFixed(1);
    }

    setIBW(IBWeight || "");
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

        <View
          style={{
            flex: 1,
            marginTop: moderateScale(14),
          }}
        >
          <CalculatorComp
            label={labelname}
            minimumValue={minimumValueW}
            maximumValue={maximumValueW}
            onChangeText={UpdateRangeInput}
            onValueChange={(value) => {
              const roundedValue = parseFloat(value).toFixed(1);
              setWeight(roundedValue);
              setErrMsg("");
            }}
            inpValue={weight.toString()}
            slidValue={parseFloat(weight)}
            error_msg={errMsg}
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

              <View
                style={[
                  styles.radioContainer,
                  { marginVertical: moderateScale(12) },
                ]}
              >
                <Text style={[styles.text, { flex: 1.5 }]}>Paraplegic</Text>
                {isLiked.map((item) => (
                  <RadioButtonComp
                    onPress={() => onRadioBtnClick(item)}
                    selected={item.selected}
                    key={item.id}
                    radioBtnConStyle={{ flex: 2 }}
                  >
                    {item.name}
                  </RadioButtonComp>
                ))}
              </View>

              <View style={[styles.radioContainer]}>
                <Text style={[styles.text, { flex: 1.13 }]}>Frame Size</Text>
                {frameSizeOptions.map((option) => (
                  <RadioButtonComp
                    onPress={() => onFrameSizeRadioBtnClick(option)}
                    selected={option.selected}
                    key={option.id}
                    radioBtnConStyle={{ flex: 1 }}
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
              onPress={MetImp}
            />

            <View style={styles.resultContainer}>
              <View style={styles.resultContent}>
                <Text style={styles.resultTitle}>IBW</Text>
                <View style={styles.resultBox}>
                  <Text style={styles.resultText}>
                    {isSwitchOn
                      ? `${IBW ? IBW : 0.0} kg`
                      : `${IBW ? IBW : 0.0} lb`}
                  </Text>
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

export default Idealbodyweight;
