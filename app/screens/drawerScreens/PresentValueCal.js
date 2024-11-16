import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChildScreenContainerWithBackGround from "../../components/ChildScreenContainerWithBackGround";
import CustomSlidAndTextInput from "../../components/CustomSlidAndTextInput";
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";
import fontFamily from "../../constants/fontFamily";
import { moderateScale, scale } from "react-native-size-matters";
import { PieChart } from "react-native-chart-kit";
const { width } = Dimensions.get("window");
const PresentValueCal = ({ route }) => {
  const { title } = route?.params;
  const [principal, setPrincipal] = useState(500);
  const [rate, setRate] = useState(5);
  const [time, setTime] = useState(1);
  const [presentValue, setPresentValue] = useState(null);
  const [pieData, setPieData] = useState([]);

  const calculatePresentValue = () => {
    const FV = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const PV = FV / Math.pow(1 + r, t);
    setPresentValue(PV.toFixed(2));

    const interestEarned = FV - PV;

    const pieData = [
      {
        name: "Present Value",
        amount: PV,
        color: colors.chatColor,
        legendFontColor: colors.back_btn_color,
        legendFontSize: fontSize.t4,
      },
      {
        name: "Interest Earned",
        amount: interestEarned,
        color: colors.back_btn_color,
        legendFontColor: colors.back_btn_color,
        legendFontSize: fontSize.t4,
      },
    ];
    setPieData(pieData);
  };

  useEffect(() => {
    calculatePresentValue();
  }, [principal, rate, time]);
  const centerValue = width > 600 ? [180, -15] : [90, -15];
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
        <CustomSlidAndTextInput
          slidValue={principal}
          inpValue={principal.toString()}
          inpOnChangeText={(value) => {
            const numValue = Number(value);
            if (numValue <= 10000000) {
              setPrincipal(numValue);
            } else if (numValue < 500) {
              setPrincipal(500);
            }
          }}
          slidOnValueChange={(value) => {
            if (value >= 500) {
              setPrincipal(value);
            }
          }}
          minimumValue={500}
          maximumValue={10000000}
          step={1000}
          title={"Future Value"}
        />
        <CustomSlidAndTextInput
          slidValue={rate}
          inpValue={rate.toString()}
          inpOnChangeText={(value) => {
            if (value <= 30) {
              setRate(Number(value));
            }
          }}
          slidOnValueChange={setRate}
          minimumValue={1}
          maximumValue={30}
          step={0.5}
          title={"Rate of Interest"}
          childT={title}
        />
        <CustomSlidAndTextInput
          slidValue={time}
          inpValue={time.toString()}
          inpOnChangeText={(value) => {
            const numValue = Number(value);
            if (numValue >= 1 && numValue <= 50) {
              setTime(numValue);
            } else if (numValue < 1) {
              setTime(1);
            }
          }}
          slidOnValueChange={setTime}
          minimumValue={1}
          maximumValue={50}
          step={1}
          title={"Number of Periods"}
          isYears={false}
          childT={title}
        />

        <View
          style={{
            paddingHorizontal:
              Platform.OS === "android" ? moderateScale(12) : null,
          }}
        >
          <View
            style={{
              marginTop: moderateScale(12),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[styles.result, { flex: 2 }]}>
                Present Value of Investment
              </Text>
              <View
                style={{
                  flex: 1.2,
                  paddingHorizontal: moderateScale(8),
                  paddingVertical: moderateScale(4),
                  backgroundColor: colors.bgPlaceholder,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={[
                    styles.result,
                    { flex: 0.5, paddingStart: moderateScale(4) },
                  ]}
                >
                  ₹
                </Text>
                <Text
                  style={[
                    styles.result,
                    {
                      textAlign: "right",
                      flex: 3,
                      paddingEnd: moderateScale(5),
                    },
                  ]}
                >
                  {presentValue && presentValue.toLocaleString()}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: moderateScale(10),
              }}
            >
              <Text style={[styles.result, { flex: 2 }]}>Interest Earned</Text>
              <View
                style={{
                  flex: 1.2,
                  paddingHorizontal: moderateScale(8),
                  flexDirection: "row",
                  backgroundColor: colors.bgPlaceholder,
                  paddingVertical: moderateScale(4),
                }}
              >
                <Text
                  style={[
                    styles.result,
                    { flex: 0.5, paddingStart: moderateScale(4) },
                  ]}
                >
                  ₹
                </Text>
                <Text
                  style={[
                    styles.result,
                    {
                      textAlign: "right",
                      flex: 3,
                      paddingEnd: moderateScale(5),
                    },
                  ]}
                >
                  {presentValue && (principal - presentValue).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: moderateScale(30),
            }}
          >
            {pieData.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: moderateScale(6),
                }}
              >
                <View
                  style={{
                    width: scale(16),
                    height: scale(16),
                    backgroundColor: item.color,
                    marginRight: moderateScale(10),
                  }}
                />
                <Text
                  style={{
                    fontSize: item.legendFontSize,
                    color: colors.lightGrey,
                  }}
                >
                  {item.name}: {item.amount.toLocaleString()}
                </Text>
              </View>
            ))}
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <PieChart
              data={pieData}
              height={scale(250)}
              chartConfig={{
                backgroundGradientFrom: "#1E2923",
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: "#08130D",
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                barPercentage: 0.5,
              }}
              accessor="amount"
              backgroundColor="transparent"
              absolute
              width={width - 18}
              center={centerValue}
              hasLegend={false}
            />
          </View>
        </View>
      </ScrollView>
    </ChildScreenContainerWithBackGround>
  );
};

export default PresentValueCal;

const styles = StyleSheet.create({
  result: {
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.8)",
  },
});
