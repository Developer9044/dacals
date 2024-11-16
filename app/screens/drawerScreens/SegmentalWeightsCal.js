import {
  StyleSheet,
  ScrollView,
  Platform,
  View,
  Text,
  Image,
} from "react-native";
import ChildScreenContainerWithBackGround from "../../components/ChildScreenContainerWithBackGround";
import fontSize from "../../constants/fontSize";
import fontFamily from "../../constants/fontFamily";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import SwitchComp from "../../components/CalculatorComp/SwitchComp";
import CalculatorComp from "../../components/CalculatorComp/CalculatorComp";
import { useState } from "react";
import CheckBoxComp from "../../components/CalculatorComp/CheckBoxComp";
import ButtonComp from "../../components/CalculatorComp/ButtonComp";
import colors from "../../constants/colors";
import { measure } from "react-native-reanimated";
import { images } from "../../assets";

const SegmentalWeightsCal = ({ route }) => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  console.log("weight", weight);

  const [protein, setProtein] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const { title } = route?.params;

  const minimumValueW = isSwitchOn ? 35 : 77;
  const maximumValueW = isSwitchOn ? 180 : 396;

  const labelname = isSwitchOn
    ? "Measured Body Weight (kg)"
    : "Measured Body Weight (lb)";

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
            marginVertical: moderateScale(16),
          }}
        >
          <CalculatorComp
            label={labelname}
            minimumValue={minimumValueW}
            maximumValue={maximumValueW}
            onValueChange={(value) => {
              const roundedValue = Math.floor(value);
              setWeight(roundedValue.toString());
            }}
            value={weight}
          />
        </View>

        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              color: colors.back_btn_color,
              fontSize: fontSize.t1,
              fontFamily: fontFamily.MEDIUM,
            }}
          >
            Select amputated limbs
          </Text>
          <View style={{ marginVertical: moderateScale(6) }}>
            <Image
              style={{
                height: verticalScale(25),
                width: scale(25),
                resizeMode: "contain",
                tintColor: "#2B7D9F",
              }}
              source={images.down2}
            />
          </View>
        </View>

        <View style={{ width: "92%", alignSelf: "center" }}>
          <Image
            style={{
              width: "100%",
              height: verticalScale(500),
              resizeMode: "cover",
            }}
            source={require("../../assets/images/human-body-frontal.jpg")}
          />
          <View>
            <Text style={styles.Text}>Estimated Body Weight</Text>
            <View
              style={{
                backgroundColor: colors.back_btn_color,
                width: scale(100),
                alignItems: "center",
                justifyContent: "center",
                padding: moderateScale(6),
                borderRadius: scale(4),
                alignSelf: "center",
                marginTop: moderateScale(8),
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: fontSize.t1,
                  fontFamily: fontFamily.MEDIUM,
                }}
              >
                0.0 kg
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.referenceContainer}>
          <Text style={styles.referenceTitle}>Reference:</Text>
          <Text style={styles.referenceText}>
            Osterkamp LK. Current perspective on assessment of human body
            proportions of relevance to amputees. J Am Diet Assoc
            1995;95:215-218.
          </Text>
        </View>
      </ScrollView>
    </ChildScreenContainerWithBackGround>
  );
};

export default SegmentalWeightsCal;

const styles = StyleSheet.create({
  Text: {
    color: colors.black,
    fontSize: fontSize.t2,
    fontFamily: fontFamily.REGULAR,
    textAlign: "center",
    marginTop: moderateScale(14),
  },
  referenceContainer: {
    paddingHorizontal: scale(10),
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
});
