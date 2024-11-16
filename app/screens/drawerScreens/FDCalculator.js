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
import { frequency_data } from "../../components/dropdownData";
import { moderateScale, scale } from "react-native-size-matters";
import SelectedItem from "../../components/SelectedItem";
import { PieChart } from "react-native-chart-kit";
import CustomDrop from "../../custom_hooks/CustomDrop";
import { formatNumberWithCommas } from "../../custom_hooks/formatNumberWithCommas";

const { width } = Dimensions.get("window");

const FDCalculator = ({ route }) => {
  const { title } = route?.params;
  const [principal, setPrincipal] = useState(25000);
  const [rate, setRate] = useState(12);
  const [time, setTime] = useState(10);
  const [frequency, setFrequency] = useState("Simple Interest");
  const [maturityValue, setMaturityValue] = useState(null);
  const [totalReturns, setTotalReturns] = useState(null);
  const [pieData, setPieData] = useState([]);

  const [timeP, setTimeP] = useState("Years");

  const [openDropdown, setOpenDropdown] = useState(null);

  let formattedMaturityValue = formatNumberWithCommas(maturityValue);
  let formattedTotalReturns = formatNumberWithCommas(totalReturns);

  const calculateFD = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100;
    let T = parseFloat(time);

    if (timeP === "Months") {
      T = T / 12;
    } else if (timeP === "Days") {
      T = T / 365;
    }

    let A;

    if (frequency === "Simple Interest") {
      A = P * (1 + R * T);
    } else if (frequency === "Monthly") {
      A = P * Math.pow(1 + R / 12, 12 * T);
    } else if (frequency === "Quarterly") {
      A = P * Math.pow(1 + R / 4, 4 * T);
    } else if (frequency === "Half-Yearly") {
      A = P * Math.pow(1 + R / 2, 2 * T);
    } else if (frequency === "Yearly") {
      A = P * Math.pow(1 + R, T);
    }

    setMaturityValue(A.toFixed(2));
    setTotalReturns((A - P).toFixed(2));

    const interestEarned = A - P;

    const pieData = [
      {
        name: "Principal",
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
    calculateFD();
  }, [principal, rate, time, timeP, frequency]);

  const handleInputChange = (value) => {
    const numValue = Number(value);
    if (numValue <= 10 && timeP === "Years") {
      setTime(numValue);
    } else if (numValue <= 3650 && timeP === "Days") {
      setTime(numValue);
    } else if (numValue <= 120 && timeP === "Months") {
      setTime(numValue);
    }
  };

  const handleTimePChange = (timeData) => {
    setTimeP(timeData);
    if (timeData === "Years") {
      setTime(10);
    } else if (timeData === "Days") {
      setTime(time);
    } else if (timeData === "Months") {
      setTime(time);
    }
  };

  const maximumValue = timeP === "Years" ? 10 : timeP === "Days" ? 3650 : 120;

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
            } else if (numValue < 25000) {
              setPrincipal(25000);
            }
          }}
          slidOnValueChange={(value) => {
            if (value >= 1000) {
              setPrincipal(value);
            }
          }}
          minimumValue={1000}
          maximumValue={10000000}
          step={1000}
          title={"Total Investment"}
        />
        <CustomSlidAndTextInput
          slidValue={rate}
          inpValue={rate.toString()}
          inpOnChangeText={(value) => {
            const numValue = Number(value);
            if (numValue <= 15) {
              setRate(numValue);
            } else if (numValue < 12) {
              setPrincipal(12);
            }
          }}
          slidOnValueChange={setRate}
          minimumValue={1}
          maximumValue={15}
          step={0.5}
          title={"Rate of Interest (p.a)"}
          childT={title}
        />
        <CustomSlidAndTextInput
          slidValue={time}
          inpValue={time.toString()}
          inpOnChangeText={handleInputChange}
          slidOnValueChange={setTime}
          minimumValue={1}
          maximumValue={maximumValue}
          step={1}
          title={"Time Period"}
          isYears={true}
          setTimeP={handleTimePChange}
          timeP={timeP}
        />

        <View
          style={{
            paddingHorizontal:
              Platform.OS === "android" ? moderateScale(12) : null,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: colors.black,
                fontSize: fontSize.t3,
                fontFamily: fontFamily.REGULAR,
              }}
            >
              Frequency
            </Text>
            <View
              style={{
                marginStart: moderateScale(10),
                marginTop: moderateScale(3),
              }}
            >
              <SelectedItem
                data={frequency}
                setData={setFrequency}
                dropItem={frequency_data}
                dropDownStyle={{ minWidth: scale(175) }}
              />
            </View>
          </View>

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
              <Text style={[styles.result, { flex: 2 }]}>Invested Amount</Text>
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
              <Text style={[styles.result, { flex: 2 }]}>Total Returns</Text>
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
                  {formattedTotalReturns}
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
              <Text style={[styles.result, { flex: 2 }]}>Total Value</Text>
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
                  {formattedMaturityValue}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: moderateScale(10),
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

          <View
            style={{
              flex: 1,
            }}
          >
            <PieChart
              data={pieData}
              width={width - 18}
              center={centerValue}
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
              hasLegend={false}
            />
          </View>

          <View style={{ marginTop: moderateScale(-28) }}>
            <Text
              style={{
                color: colors.black,
                fontSize: fontSize.t3,
                fontFamily: fontFamily.SEMI_BOLD,
              }}
            >
              FAQs
            </Text>

            <CustomDrop
              title={"What is Fixed Deposit?"}
              content={
                "FDs are a form of fixed-income investment where you deposit a lump sum amount with a bank or financial institution, and they pay you a predetermined interest rate over a fixed period."
              }
              isClicked={openDropdown === 0}
              setIsClicked={() =>
                setOpenDropdown(openDropdown === 0 ? null : 0)
              }
              index={0}
            />
            <CustomDrop
              title={"Products that offer similar + added benefits."}
              content={
                "In contrast, insurance products are primarily designed to provide protection and risk coverage, although some insurance-linked products may have an investment or savings component. That said, here are some insurance products with savings or investment features that may offer stability or guaranteed returns similar to FDs:\n\n1. **Endowment Plans**: Endowment insurance policies offer both insurance coverage and a savings element. These policies provide a lump sum payout at maturity, which can be viewed as a form of savings. They often come with guaranteed returns and may offer bonuses.\n\n2. **Whole Life Insurance with Cash Value**: Certain whole life insurance policies accumulate cash value over time. This cash value can serve as a long-term savings component. While it may not provide fixed returns like FDs, it offers a conservative and stable growth option.\n\n3. **Guaranteed Savings Plans**: Some insurance products, such as guaranteed savings plans, provide assured returns over a fixed tenure. These plans may guarantee a minimum return, offering some level of stability.\n\n4. **Single Premium Insurance Policies**: These policies allow you to make a lump sum premium payment, and they typically offer an insurance cover along with a savings or investment component. Returns may vary based on the policy terms.\n\n5. **Annuity Plans**: Annuity plans, which can be considered a form of insurance, provide regular income payouts after a lump sum payment. While not exactly like FDs, they can provide a steady income stream in retirement.\n\nIt's essential to understand that the returns from insurance-linked savings or investment products are often lower than what you might get from FDs. Additionally, insurance products may come with charges and fees, and their returns can vary based on factors like market performance and policy terms. When considering insurance products with savings or investment features, carefully review the policy terms, assess the returns, understand the cost structure, and ensure the product aligns with your financial goals and risk tolerance. It's also advisable to consult with a financial advisor to make informed decisions tailored to your specific needs and objectives."
              }
              isClicked={openDropdown === 1}
              setIsClicked={() =>
                setOpenDropdown(openDropdown === 1 ? null : 1)
              }
              index={1}
            />
            <CustomDrop
              title={"How to use Fixed Deposit calculator?"}
              content={`To calculate your Fixed Deposit (FD), follow these steps:

1. **Total Investment**: Use the slider or manually enter the amount.
2. **Rate of Interest (p.a)**: Use the slider or manually enter the rate.
3. **Time Period Frequency**: Select from Years, Months, or Days via dropdown.
4. **Time Period**: Use the slider or manually enter the duration.
5. **Interest Calculation Frequency**: Choose Simple Interest, Compounded Monthly,
Quarterly, Half-Yearly, or Yearly from the dropdown.

**Note**: Upon completing all required fields, the calculated amounts will display on the bottom side of the screen.

### Additional Functionality:

**Pie Chart Feature**:
1. **Total Investment**: Shows the total investment.
2. **Total Interest**: Displays the total Interest.

**Tooltips**:
1. **On PC**: Mouse hover over Total Investment for a tooltip displaying the invested amount.
2. **On PC**: Mouse hover over Total Return for a tooltip displaying the return amount.
3. **On Mobile**: Tap & hold on Total Investment for a tooltip displaying the invested amount.
4. **On Mobile**: Tap & hold on Total Return for a tooltip displaying the return amount.

Start planning your Fixed Deposit today!`}
              isClicked={openDropdown === 2}
              setIsClicked={() =>
                setOpenDropdown(openDropdown === 2 ? null : 2)
              }
              index={2}
            />
          </View>
        </View>
      </ScrollView>
    </ChildScreenContainerWithBackGround>
  );
};

export default FDCalculator;

const styles = StyleSheet.create({
  result: {
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.8)",
  },
});
