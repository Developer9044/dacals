import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChildScreenContainerWithBackGround from "../../components/ChildScreenContainerWithBackGround";
import { moderateScale, scale } from "react-native-size-matters";
import CustomTextInput2 from "../../components/CustomTextInput2";
import CustomLableBtn from "../../components/CustomLableBtn";
import colors from "../../constants/colors";
import spacing from "../../constants/spacing";
import fontSize from "../../constants/fontSize";
import fontFamily from "../../constants/fontFamily";
import DateTimePicker from "@react-native-community/datetimepicker";
import { images } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import { address_data, sum_insured_data } from "../../components/dropdownData";
import SelectedItem from "../../components/SelectedItem";
import CheckBoxCom from "../../components/CheckBoxCom";

const HealthCal = ({ route }) => {
  const { title } = route?.params;

  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [date, setDate] = useState(new Date());
  const [sumInsured, setSumInsured] = useState("5 Lacs");
  const [policyTerm, setPolicyTerm] = useState("1");
  const [show, setShow] = useState(false);
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [dobError, setDobError] = useState("");
  const [result, setResult] = useState({
    totalPremium: "0",
    annualizedPremium: "0",
  });
  const [showResult, setShowResult] = useState(false);
  const [checkIn, setCheckIn] = useState(false);
  const [checkIn2, setCheckIn2] = useState(false);
  const [checkIn3, setCheckIn3] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const calculatePremium = () => {
    const age = new Date().getFullYear() - date.getFullYear();
    const sumInsuredValue =
      parseInt(sumInsured.replace(" Lacs", "").replace(" Crore", "")) *
      (sumInsured.includes("Crore") ? 10000000 : 100000);
    const policyTermValue = parseInt(policyTerm);

    const basePremium = 5000;
    const ageFactor = age * 100;
    const sumInsuredFactor = sumInsuredValue / 1000;
    const policyTermFactor = policyTermValue * 200;

    const premium =
      basePremium + ageFactor + sumInsuredFactor + policyTermFactor;

    const premiumWithInflation = premium * 1.15;

    const totalPremiumWithGST = premiumWithInflation * policyTermValue * 1.18;

    const annualizedPremium = totalPremiumWithGST / policyTermValue;

    setResult({
      totalPremium: totalPremiumWithGST.toFixed(2),
      annualizedPremium: annualizedPremium.toFixed(2),
    });
  };

  useEffect(() => {
    calculatePremium();
  }, [sumInsured, policyTerm, date]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setShowResult(false);
      setNameError("");
      setMobileError("");
      setDobError("");
    });
    return unsubscribe;
  }, [navigation]);

  const handleSubmit = () => {
    console.log("submit data");
  };

  const handleCalculate = () => {
    let hasError = false;

    if (!name) {
      setNameError("Name is Required");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!mobileNumber) {
      setMobileError("Mobile Number is Required");
      hasError = true;
    } else {
      setMobileError("");
    }

    const age = new Date().getFullYear() - date.getFullYear();
    if (age < 18) {
      setDobError("Minimum age should be 18 years");
      hasError = true;
    } else {
      setDobError("");
    }

    if (!hasError) {
      setShowResult(true);
    }
  };

  return (
    <ChildScreenContainerWithBackGround
      hideTopHeader={true}
      screen_name={title}
      showBgImage={false}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? null : moderateScale(12),
          paddingBottom: moderateScale(60),
          paddingTop: moderateScale(10),
        }}
        showsVerticalScrollIndicator={false}
      >
        {showResult ? (
          <View
            style={{
              flex: 1,
              paddingHorizontal:
                Platform.OS === "ios" ? moderateScale(6) : moderateScale(10),
            }}
          >
            <Text
              style={[
                styles.headerTextStyle,
                { color: colors.back_btn_color, fontSize: fontSize.h6 },
              ]}
            >
              Mediclaim Plan
            </Text>
            <View
              style={{
                backgroundColor: colors.lightBackColor,
                marginVertical: moderateScale(10),
                padding: moderateScale(8),
                borderRadius: scale(8),
              }}
            >
              <SelectedItem
                data={sumInsured}
                setData={setSumInsured}
                dropItem={sum_insured_data}
                placeholder={"Choose Your Sum Insured"}
              />
              <CustomTextInput2
                lable={"Policy Term(years)"}
                value={policyTerm}
                onChangeText={(text) => setPolicyTerm(text)}
                placeholder={"Tenure in years"}
                placeholderTextColor={"rgba(0,0,0,0.6)"}
              />
            </View>

            <View
              style={{
                backgroundColor: colors.back_btn_color,
                marginVertical: moderateScale(10),
                borderRadius: scale(8),
              }}
            >
              <View
                style={{
                  paddingHorizontal: moderateScale(18),
                  paddingTop: moderateScale(12),
                }}
              >
                <Text style={styles.headerTextStyle}>Total premium</Text>
                <Text
                  style={styles.headerTextStyle}
                >{`${policyTerm} Year`}</Text>
                <Text style={styles.headerTextStyle}>
                  Inclusive of 15% inflation approx
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: colors.white,
                  marginVertical: moderateScale(10),
                }}
              />
              <View
                style={{
                  paddingHorizontal: moderateScale(18),
                  paddingBottom: moderateScale(12),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: moderateScale(4),
                  }}
                >
                  <Text style={styles.resultTextStyle}>{`₹ ${
                    result.totalPremium === "NaN" ? 0 : result.totalPremium
                  }`}</Text>
                  <Image
                    source={images.info}
                    style={{
                      width: scale(18),
                      height: scale(18),
                      marginStart: moderateScale(6),
                    }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.headerTextStyle}>Inclusive of 18% GST</Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: colors.bgPlaceholder,
                marginVertical: moderateScale(10),
                borderRadius: scale(8),
              }}
            >
              <View
                style={{
                  paddingHorizontal: moderateScale(18),
                  paddingTop: moderateScale(12),
                }}
              >
                <Text style={styles.bheaderTextStyle}>
                  Average mediclaim annualized premium
                </Text>
                <Text style={styles.bheaderTextStyle}>{`1 Year`}</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: colors.back_btn_color,
                  marginVertical: moderateScale(10),
                }}
              />
              <View
                style={{
                  paddingHorizontal: moderateScale(18),
                  paddingBottom: moderateScale(12),
                }}
              >
                <Text
                  style={[
                    styles.resultTextStyle,
                    { color: colors.back_btn_color },
                  ]}
                >{`₹ ${
                  result.annualizedPremium === "NaN"
                    ? 0
                    : result.annualizedPremium
                }`}</Text>
                <Text style={styles.bheaderTextStyle}>
                  Inclusive of 18% GST
                </Text>
              </View>
            </View>
            {/* 
            <View style={{ flex: 1 }}>
              <CheckBoxCom
                title={
                  "Would you prefer a plan where premium remains consistence throughout the coverage term?"
                }
                checkIn={checkIn}
                setCheckIn={setCheckIn}
              />
              <CheckBoxCom
                title={
                  "Would you prefer a plan where premium remains consistence throughout the coverage term?"
                }
                checkIn={checkIn2}
                setCheckIn={setCheckIn2}
              />
              <CheckBoxCom
                title={
                  "Would you want the premium being paid back to you corrected as per the market rate?"
                }
                checkIn={checkIn3}
                setCheckIn={setCheckIn3}
              />
            </View>

            <CustomLableBtn
              btnContainer={[styles.btnContainer]}
              title={"Submit"}
              btnText={styles.btnText}
              onPress={handleSubmit}
            /> */}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              paddingHorizontal:
                Platform.OS === "ios" ? moderateScale(6) : moderateScale(10),
            }}
          >
            <CustomTextInput2
              requiredLable={"*"}
              lable={"Name"}
              value={name}
              onChangeText={(text) => setName(text)}
              error_msg={nameError}
              placeholder="Enter your name"
              placeholderTextColor={colors.placeholderColor}
            />
            <CustomTextInput2
              requiredLable={"*"}
              lable={"Mobile Number"}
              value={mobileNumber}
              onChangeText={(text) => {
                if (text.length <= 10) {
                  setMobileNumber(text);
                }
              }}
              keyboardType="numeric"
              error_msg={mobileError}
              placeholder="Enter your mobile no."
              placeholderTextColor={colors.placeholderColor}
            />
            <CustomTextInput2
              lable={"Email Id"}
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              placeholder="Enter your email Id"
              placeholderTextColor={colors.placeholderColor}
            />
            <SelectedItem
              data={city}
              setData={setCity}
              dropItem={address_data}
              placeholder={"Choose City"}
            />
            <CustomTextInput2
              requiredLable={"*"}
              lable={"Date of birth"}
              isIcon={images.calendar}
              onPress={showDatepicker}
              value={formatDate(date)}
              error_msg={dobError}
            />

            <CustomLableBtn
              btnContainer={[styles.btnContainer]}
              title={"Calculate"}
              btnText={styles.btnText}
              onPress={handleCalculate}
            />

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        )}
      </ScrollView>
    </ChildScreenContainerWithBackGround>
  );
};

export default HealthCal;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: colors.back_btn_color,
    height: scale(32),
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.s10,
    borderRadius: moderateScale(4),
  },
  btnText: {
    color: colors.white,
    fontSize: fontSize.t3,
    fontFamily: fontFamily.SEMI_BOLD,
    textAlign: "center",
  },
  headerTextStyle: {
    color: colors.white,
    fontSize: fontSize.t3,
    fontFamily: fontFamily.MEDIUM,
  },
  bheaderTextStyle: {
    color: colors.back_btn_color,
    fontSize: fontSize.t3,
    fontFamily: fontFamily.MEDIUM,
  },
  resultTextStyle: {
    color: colors.white,
    fontSize: fontSize.h5,
    fontFamily: fontFamily.SEMI_BOLD,
  },
});
