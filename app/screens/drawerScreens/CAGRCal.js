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
const CAGRCal = ({ route }) => {
  const { title } = route?.params;
  const [principal, setPrincipal] = useState(10000);
  const [finalValue, setFinalValue] = useState(15000);
  const [time, setTime] = useState(5);
  const [cagr, setCagr] = useState(null);
  const [pieData, setPieData] = useState([]);

  const calculateCAGR = () => {
    const P = parseFloat(principal);
    const F = parseFloat(finalValue);
    const T = parseFloat(time);

    // Calculate CAGR
    const cagrValue = ((F / P) ** (1 / T) - 1) * 100;
    setCagr(cagrValue.toFixed(2));

    // Pie chart data
    const interestEarned = F - P;
    const pieData = [
      {
        name: "Initial Investment",
        amount: P,
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
    calculateCAGR();
  }, [principal, finalValue, time]);
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
            } else if (numValue < 1000) {
              setPrincipal(1000);
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
          title={"Initial Investment"}
        />
        <CustomSlidAndTextInput
          slidValue={finalValue}
          inpValue={finalValue.toString()}
          inpOnChangeText={(value) => {
            const numValue = Number(value);
            if (numValue >= 1000 && numValue <= 10000000) {
              setFinalValue(numValue);
            } else if (numValue < 1000) {
              setFinalValue(1000);
            }
          }}
          slidOnValueChange={setFinalValue}
          minimumValue={1000}
          maximumValue={10000000}
          step={1000}
          title={"Final Investment"}
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
          title={"Duration of Investment (Years)"}
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
                Initial Investment
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
                  {principal.toLocaleString()}
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
              <Text style={[styles.result, { flex: 2 }]}>Final Investment</Text>
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
                  {finalValue.toLocaleString()}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[styles.result, { flex: 2 }]}>CAGR</Text>
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
                    {
                      textAlign: "right",
                      flex: 3,
                      paddingEnd: moderateScale(5),
                    },
                  ]}
                >
                  {cagr}
                </Text>
                <Text
                  style={[
                    styles.result,
                    { flex: 0.5, paddingStart: moderateScale(4) },
                  ]}
                >
                  %
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

export default CAGRCal;

const styles = StyleSheet.create({
  result: {
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.8)",
  },
});
