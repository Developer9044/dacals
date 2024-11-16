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
import { time_period_sip } from "../../components/dropdownData";
import { moderateScale, scale } from "react-native-size-matters";
import SelectedItem from "../../components/SelectedItem";
import { PieChart } from "react-native-chart-kit";
import CustomDrop from "../../custom_hooks/CustomDrop";
import { formatNumberWithCommas } from "../../custom_hooks/formatNumberWithCommas";
const { width } = Dimensions.get("window");
const SIPCal = ({ route }) => {
  const { title } = route?.params;
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [rate, setRate] = useState(12);
  const [time, setTime] = useState(10);
  const [maturityValue, setMaturityValue] = useState(null);
  const [totalReturns, setTotalReturns] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [selectFrequency, setSelectFrequency] = useState("Monthly");
  const [openDropdown, setOpenDropdown] = useState(null);

  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);

    let n;
    switch (selectFrequency) {
      case "Quarterly":
        n = 4;
        break;
      case "Yearly":
        n = 1;
        break;
      case "Monthly":
      default:
        n = 12;
        break;
    }

    const A = P * (((1 + r / n) ** (n * t) - 1) / (r / n)) * (1 + r / n);
    setMaturityValue(A.toFixed(2));
    setTotalReturns((A - P * t * n).toFixed(2));

    const interestEarned = A - P * t * n;

    const pieData = [
      {
        name: "Total Investment",
        amount: P * t * n,
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
    calculateSIP();
  }, [monthlyInvestment, rate, time, selectFrequency]);

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
            } else if (numValue < 25000) {
              setMonthlyInvestment(25000);
            }
          }}
          slidOnValueChange={(value) => {
            if (value >= 500) {
              setMonthlyInvestment(value);
            }
          }}
          minimumValue={500}
          maximumValue={10000000}
          step={1000}
          title={"Monthly Investment"}
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
          title={"Expected Return Rate (p.a)"}
          childT={title}
        />
        <CustomSlidAndTextInput
          slidValue={time}
          inpValue={time.toString()}
          inpOnChangeText={(value) => {
            if (value <= 40) {
              setTime(Number(value));
            }
          }}
          slidOnValueChange={setTime}
          minimumValue={1}
          maximumValue={40}
          step={1}
          title={"Time Period (Yr)"}
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
                data={selectFrequency}
                setData={setSelectFrequency}
                dropItem={time_period_sip}
                dropDownStyle={{ minWidth: scale(175) }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: Platform.OS === "ios" ? null : moderateScale(12),
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
              <Text style={[styles.result, { flex: 2 }]}>Invested Amount</Text>
              <View
                style={{
                  flex: 2,
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
                  {(
                    monthlyInvestment *
                    time *
                    (selectFrequency === "Monthly"
                      ? 12
                      : selectFrequency === "Quarterly"
                      ? 4
                      : 1)
                  ).toLocaleString()}
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
              <Text style={[styles.result, { flex: 2 }]}>Est. Returns</Text>
              <View
                style={{
                  flex: 2,
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
                  flex: 2,
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

          <View style={{ marginTop: moderateScale(30) }}>
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
              marginTop: moderateScale(10),
            }}
          >
            <View style={{ flex: 1 }}>
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

            <View style={{ marginTop: moderateScale(-22) }}>
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
                title={"What is SIP?"}
                content={
                  "**Systematic Investment Plan (SIP)** is the ideal way of investing in mutual funds in a regular and systematic manner. A SIP works on the basic rule of investing regularly, enabling you to build wealth over time. Under SIP, you invest a fixed sum every quarter, month, or week as per your convenience."
                }
                isClicked={openDropdown === 0}
                setIsClicked={() =>
                  setOpenDropdown(openDropdown === 0 ? null : 0)
                }
                index={0}
              />
              <CustomDrop
                title={"Products that offer similar + added benefits."}
                content={`Insurance products can also be used for investment purposes like SIP (Systematic Investment Plan) are typically referred to as investment-linked insurance products. These products combine insurance coverage with an investment component. Here are a few examples:

1.Unit-Linked Insurance Plans (ULIPs): ULIPs are insurance-cum-investment plans that allow you to invest in a variety of funds, such as equity, debt, or balanced funds. A portion of your premium goes toward insurance coverage, while the remainder is invested in the chosen funds. ULIPs offer the potential for market-linked returns and typically have lock-in periods.

2.Endowment Plans: Endowment insurance policies are long-term savings plans that offer a combination of insurance coverage and a guaranteed lump sum payout at maturity. These policies provide a disciplined way to save and invest over a specified period.

3.Whole Life Insurance with Cash Value: Some whole life insurance policies accumulate cash value over time, which you can access or borrow against. This cash value component can function as a form of investment, offering a conservative and stable growth option.

4.Child Plans and Education Plans: These insurance policies are designed to provide for a child's education and future financial needs. They combine insurance coverage with an investment component that grows over time to fund educational expenses.

5. Retirement Plans (Pension Plans): Retirement or pension plans provide income security during your retirement years. These plans typically involve regular premium payments, and the accumulated corpus is invested to generate returns that can be received as a pension after retirement. Don't prioritize investment over insurance. Ensure the insurance coverage provided meets your protection needs adequately. Before investing in any insurance-linked product, it's advisable to carefully review the policy terms, understand the benefits, risks, and consult with a financial advisor to ensure it aligns with your overall financial plan and goals.`}
                isClicked={openDropdown === 1}
                setIsClicked={() =>
                  setOpenDropdown(openDropdown === 1 ? null : 1)
                }
                index={1}
              />
              <CustomDrop
                title={"How to use SIP calculator?"}
                content={`Using the SIP Calculator is simple:

1.Monthly Investment: Enter the amount manually or use the slider.
2.Expected Return Rate (p.a): Input the rate manually or use the slider.
3.Time Period: Enter the duration manually or use the slider.

Note: Upon completing all necessary fields, the calculated amounts will display at the bottom of the screen.

Upon calculation, the SIP Calculator will exhibit the following results:
1.Invested Amount: ₹ (00,00,000)
2.Estimated Returns: ₹ (00,00,000)
3.Total Value: ₹ (00,00,000)

Additional Functionality:
Pie Chart Feature:
1.Total Investment: Shows the total investment.
2.Total Interest: Displays the total Interest.

Tooltips:
1.On PC: Mouse hover over Total Investment for a tooltip displaying the invested amount.
2.On PC: Mouse hover over Total Return for a tooltip displaying the return amount.
3.On Mobile: Tap & hold on Total Investment for a tooltip displaying the invested amount.
4.On Mobile: Tap & hold on Total Return for a tooltip displaying the return amount.
Start planning your SIP today!`}
                isClicked={openDropdown === 2}
                setIsClicked={() =>
                  setOpenDropdown(openDropdown === 2 ? null : 2)
                }
                index={2}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </ChildScreenContainerWithBackGround>
  );
};

export default SIPCal;

const styles = StyleSheet.create({
  result: {
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.8)",
  },
});
