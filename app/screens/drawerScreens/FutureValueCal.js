import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
import ChildScreenContainerWithBackGround from "../../components/ChildScreenContainerWithBackGround";
import CustomSlidAndTextInput from "../../components/CustomSlidAndTextInput";
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";
import fontFamily from "../../constants/fontFamily";
import { moderateScale, scale } from "react-native-size-matters";
import { PieChart } from "react-native-chart-kit";
import { formatNumberWithCommas } from "../../custom_hooks/formatNumberWithCommas";
const { width } = Dimensions.get("window");
const FutureValueCal = ({ route }) => {
  const { title } = route?.params;
  const [principal, setPrincipal] = useState(1000);
  const [periodicData, setPeriodicData] = useState(100);
  const [rate, setRate] = useState(5);
  const [time, setTime] = useState(1);
  const [totalReturns, setTotalReturns] = useState(null);
  const [presentValue, setPresentValue] = useState(null);
  const [totalDeposits, setTotalDeposits] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [pieData, setPieData] = useState([]);

  const calculateFD = () => {
    const P = principal;
    const PMT = periodicData;
    const r = rate / 100;
    const t = time;

    const futureValue =
      P * Math.pow(1 + r, t) + PMT * ((Math.pow(1 + r, t) - 1) / r);

    const presentValue = futureValue / Math.pow(1 + r, t);

    const totalDeposits = PMT * t;

    const totalInterest = futureValue - (P + totalDeposits);

    setTotalReturns(futureValue.toFixed(2));
    setPresentValue(presentValue.toFixed(2));
    setTotalDeposits(totalDeposits.toFixed(2));
    setTotalInterest(totalInterest.toFixed(2));

    setPieData([
      {
        name: "Principal",
        amount: P,
        color: colors.back_btn_color,

        legendFontSize: 12,
      },
      {
        name: "Periodic Investment",
        amount: PMT,
        color: colors.chatColor,
        legendFontSize: 12,
      },
    ]);
  };

  useEffect(() => {
    calculateFD();
  }, [principal, periodicData, rate, time]);
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
          minimumValue={100}
          maximumValue={10000000}
          step={1000}
          title={"Initial Investment"}
        />
        <CustomSlidAndTextInput
          slidValue={periodicData}
          inpValue={periodicData.toString()}
          inpOnChangeText={(value) => {
            const numValue = Number(value);
            if (numValue <= 10000000) {
              setPeriodicData(numValue);
            } else if (numValue < 10000000) {
              setPeriodicData(10000000);
            }
          }}
          slidOnValueChange={setPeriodicData}
          minimumValue={100}
          maximumValue={10000000}
          step={1000}
          title={"Periodic Investment"}
        />
        <CustomSlidAndTextInput
          slidValue={rate}
          inpValue={rate.toString()}
          inpOnChangeText={(value) => {
            const numValue = Number(value);
            if (numValue >= 1 && numValue <= 100) {
              setRate(numValue);
            } else if (numValue < 100) {
              setRate(100);
            }
          }}
          slidOnValueChange={setRate}
          minimumValue={1}
          maximumValue={100}
          step={0.5}
          title={"Rate of Interest"}
          childT={title}
        />
        <CustomSlidAndTextInput
          slidValue={time}
          inpValue={time.toString()}
          inpOnChangeText={(value) => {
            const numValue = Number(value);
            if (numValue >= 1 && numValue <= 100) {
              setTime(numValue);
            } else if (numValue < 100) {
              setTime(100);
            }
          }}
          slidOnValueChange={setTime}
          minimumValue={1}
          maximumValue={100}
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
                Future Value of Investment
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
                  {totalReturns
                    ? formatNumberWithCommas(totalReturns.toLocaleString())
                    : "Calculating..."}
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
              <Text style={[styles.result, { flex: 2 }]}>
                Present Value of Investment
              </Text>
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
                  {presentValue
                    ? formatNumberWithCommas(presentValue.toLocaleString())
                    : "Calculating..."}
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
              <Text style={[styles.result, { flex: 2 }]}>
                Total Periodic Deposits
              </Text>
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
                  {totalDeposits
                    ? formatNumberWithCommas(totalDeposits.toLocaleString())
                    : "Calculating..."}
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
              <Text style={[styles.result, { flex: 2 }]}>Total Interest</Text>
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
                  {totalInterest
                    ? formatNumberWithCommas(totalInterest.toLocaleString())
                    : "Calculating..."}
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

export default FutureValueCal;

const styles = StyleSheet.create({
  result: {
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.8)",
  },
});
