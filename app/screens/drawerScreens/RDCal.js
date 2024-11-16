import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import ChildScreenContainerWithBackGround from "../../components/ChildScreenContainerWithBackGround";
import CustomSlidAndTextInput from "../../components/CustomSlidAndTextInput";
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";
import fontFamily from "../../constants/fontFamily";
import { PieChart } from "react-native-chart-kit";
import CustomDrop from "../../custom_hooks/CustomDrop";
import { moderateScale, scale } from "react-native-size-matters";
import { time_period_rd } from "../../components/dropdownData";
import { formatNumberWithCommas } from "../../custom_hooks/formatNumberWithCommas";

const { width } = Dimensions.get("window");

const RDCal = ({ route }) => {
  const { title } = route?.params;
  const [monthlyInvestment, setMonthlyInvestment] = useState(1000);
  const [rate, setRate] = useState(3);
  const [time, setTime] = useState(5);
  const [timePeriod, setTimePeriod] = useState("Years");
  const [maturityValue, setMaturityValue] = useState(null);
  const [totalReturns, setTotalReturns] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const calculateRD = () => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(rate) / 400;
    let n = time;
    if (timePeriod === "Months") {
      n = time / 12;
    }

    const A =
      P * ((Math.pow(1 + r, 4 * n) - 1) / (1 - Math.pow(1 + r, -1 / 3)));
    setMaturityValue(A.toFixed(2));
    setTotalReturns((A - P * n * 12).toFixed(2));

    const principalAmount = P * n * 12;
    const interestEarned = A - principalAmount;

    const pieData = [
      {
        name: "Principal",
        amount: principalAmount,
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
    calculateRD();
  }, [monthlyInvestment, rate, time, timePeriod]);

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
          slidValue={monthlyInvestment}
          inpValue={monthlyInvestment.toString()}
          inpOnChangeText={(value) => {
            const numValue = Number(value);
            if (numValue <= 10000000) {
              setMonthlyInvestment(numValue);
            } else if (numValue < 500) {
              setMonthlyInvestment(500);
            }
          }}
          slidOnValueChange={(value) => {
            if (value >= 500) {
              setMonthlyInvestment(value);
            }
          }}
          minimumValue={500}
          maximumValue={10000000}
          step={100}
          title={"Monthly Investment"}
        />
        <CustomSlidAndTextInput
          slidValue={rate}
          inpValue={rate.toString()}
          inpOnChangeText={(value) => {
            const numValue = Number(value);
            if (numValue <= 15) {
              setRate(numValue);
            } else if (numValue < 3) {
              setRate(3);
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
          inpOnChangeText={(value) => {
            const numericValue = Number(value);
            if (timePeriod === "Years" && numericValue <= 10) {
              setTime(numericValue);
            } else if (numValue < 5) {
              setTime(5);
            } else if (timePeriod === "Months" && numericValue <= 120) {
              setTime(numericValue);
            } else if (numValue < 5) {
              setTime(5);
            }
          }}
          slidOnValueChange={setTime}
          minimumValue={1}
          maximumValue={timePeriod === "Years" ? 10 : 120}
          step={1}
          title={"Time Period"}
          isYears={true}
          selectionData={time_period_rd}
          onSelectionChange={(selectedItem) => {
            setTimePeriod(selectedItem.value);
          }}
          setTimeP={(timeData) => {
            if (timeData === "Years") {
              setTimePeriod(timeData);
              setTime(10);
            } else if (timeData === "Months") {
              setTimePeriod(timeData);
            }
          }}
          timeP={timePeriod}
        />

        <View
          style={{
            paddingHorizontal:
              Platform.OS === "android" ? moderateScale(12) : null,
          }}
        >
          <View style={{ marginTop: moderateScale(12) }}>
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
                  {monthlyInvestment * time * (timePeriod === "Years" ? 12 : 1)}
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
                  {formatNumberWithCommas(totalReturns)}
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
                  {formatNumberWithCommas(maturityValue)}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: moderateScale(10) }}>
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
              title={"What is Recurring Deposit?"}
              content={
                "A Recurring Deposit is a special kind of term deposit offered by Banks and Post Office which helps people with regular incomes to deposit a fixed amount every month into their recurring deposit account and earn interest at the rate applicable to fixed deposits. It is similar to making fixed deposits of a certain amount in monthly instalments."
              }
              isClicked={openDropdown === 0}
              setIsClicked={() =>
                setOpenDropdown(openDropdown === 0 ? null : 0)
              }
              index={0}
            />
            <CustomDrop
              title={"Products that offer similar + added benefits."}
              content={`Insurance options that offer some investment or savings features similar to RD, you might consider the following:

1. Endowment Plans: Endowment insurance policies offer a combination of insurance coverage and savings. These policies provide a lump sum payout at maturity, making them similar to long-term savings plans. They typically offer guaranteed returns along with bonuses.

2. Money-Back Policies: Money-back insurance policies provide periodic payouts (usually a percentage of the sum assured) during the policy term. These policies can be considered a form of savings with an insurance component.

3. Unit-Linked Insurance Plans (ULIPs): ULIPs combine insurance coverage with an investment component. Part of your premium goes toward insurance, while the remainder is invested in various funds like equity, debt, or balanced funds. ULIPs offer market-linked returns and can provide flexibility in investment choices.

4. Single Premium Insurance Policies: These policies allow you to make a lump sum premium payment, and they typically offer an insurance cover along with a savings or investment component. Returns may vary based on the policy terms.

5. Whole Life Insurance with Cash Value: Certain whole life insurance policies accumulate cash value over time, which can be accessed or borrowed against. The cash value component can serve as a long-term savings and investment option. It's important to note that insurance products with investment components often come with associated costs, including charges and fees. When considering insurance products with investment or savings features, carefully review the policy terms, assess the returns, understand the cost structure, and ensure the product aligns with your financial goals and risk tolerance. Consult with a financial advisor to make informed decisions based on your specific needs and objectives, consider diversifying your investments across different asset classes to achieve your financial goals more effectively.`}
              isClicked={openDropdown === 1}
              setIsClicked={() =>
                setOpenDropdown(openDropdown === 1 ? null : 1)
              }
              index={1}
            />
            <CustomDrop
              title={"How to use this Recurring Deposit Calculator?"}
              content={`To calculate your Recurring Deposit (RD), follow these steps:

1. Monthly Investment: Enter manually or use the slider.
2. Rate of Interest (P.A): Enter manually or use the slider.
3. Time Period Frequency: Choose between Year or Month options.
4. Time Period: Enter manually or use the slider.

Results Display: Upon completing all details, the result will display at the bottom of the screen.

Additional Functionality:
Pie Chart Feature:
1. Total Investment: Shows the total investment.
2. Total Interest: Displays the total Interest.

Tooltips:
1. On PC: Mouse hover over Total Investment for a tooltip displaying the invested amount.
2. On PC: Mouse hover over Total Interest for a tooltip displaying the interest amount.
3. On Mobile: Tap & hold on Total Investment for a tooltip showing the invested amount.
4. On Mobile: Tap & hold on Total Interest for a tooltip displaying the interest amount.

Effortlessly plan your Recurring Deposit today!`}
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

export default RDCal;

const styles = StyleSheet.create({
  result: {
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.8)",
  },
});
