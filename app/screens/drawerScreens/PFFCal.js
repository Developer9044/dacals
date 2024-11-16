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
import CustomDrop from "../../custom_hooks/CustomDrop";
import { formatNumberWithCommas } from "../../custom_hooks/formatNumberWithCommas";
const { width } = Dimensions.get("window");
const PFFCal = ({ route }) => {
  const { title } = route?.params;
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7.1);
  const [time, setTime] = useState(15);
  const [maturityValue, setMaturityValue] = useState(null);
  const [totalReturns, setTotalReturns] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const calculatePPF = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const T = parseFloat(time);

    let A = 0;
    for (let i = 0; i < T; i++) {
      A = (A + P) * (1 + R / 100);
    }

    setMaturityValue(A.toFixed(2));
    setTotalReturns((A - P * T).toFixed(2));

    const interestEarned = A - P * T;

    const pieData = [
      {
        name: "Total Investment",
        amount: P * T,
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
    calculatePPF();
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
          title={"Yearly Investment"}
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
          minimumValue={15}
          maximumValue={40}
          step={1}
          title={"Time Period(In Years)"}
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
                flex: 2,
              }}
            >
              Rate Of Interest
            </Text>
            <View
              style={{
                flex: 0.73,
                paddingHorizontal: moderateScale(8),
                paddingVertical: moderateScale(6),
                backgroundColor: "#969ea31a",
                flexDirection: "row",
                borderRadius: scale(4),
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
                {rate}
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
                  {(principal * time).toLocaleString()}
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
              title={"What is PPF?"}
              content={
                "Public Provident Fund (PPF) is considered an excellent investment option, especially for people uncomfortable with taking risks. While the returns may not be very high because they depend on the market, they offer stability. Additionally, investing in PPF can help diversify your portfolio and has tax benefits."
              }
              isClicked={openDropdown === 0}
              setIsClicked={() =>
                setOpenDropdown(openDropdown === 0 ? null : 0)
              }
              index={0}
            />
            <CustomDrop
              title={"Products that offer similar + added benefits."}
              content={`Insurance products also offer savings or investment benefits, here are some options:

1. Unit-Linked Insurance Plans (ULIPs): ULIPs combine insurance coverage with an investment component. A portion of your premium goes toward insurance, and the remainder is invested in various funds like equity, debt, or balanced funds. ULIPs offer the potential for market-linked returns but come with associated costs and lock-in periods.

2. Endowment Plans: Endowment insurance policies offer both insurance coverage and savings benefits. These policies provide a lump sum payout at maturity, making them similar to long-term savings plans.

3. Money-Back Policies: Money-back insurance policies provide periodic payouts (usually a percentage of the sum assured) during the policy term. These policies can be considered a form of savings with an insurance component.

4. Whole Life Insurance with Cash Value: Some whole life insurance policies accumulate cash value over time, which can be accessed or borrowed against. The cash value component can serve as a long-term savings and investment option.

5. Child Plans and Education Plans: These insurance policies are designed to provide for a child's future financial needs, such as education. They combine insurance coverage with an investment component to fund specific milestones.

6. Retirement Plans (Pension Plans): Retirement or pension plans provide income security during your retirement years. These plans involve regular premium payments, and the accumulated corpus is invested to generate returns that can be received as a pension after retirement. It's important to note that while these insurance-linked products offer an investment or savings component, they often come with associated costs, including charges and fees. When considering insurance products with an investment element, carefully review the policy terms, assess the historical and expected returns, understand the cost structure, and ensure the product aligns with your financial goals and risk tolerance. Consult with a financial advisor to make informed decisions based on your specific needs and objectives.`}
              isClicked={openDropdown === 1}
              setIsClicked={() =>
                setOpenDropdown(openDropdown === 1 ? null : 1)
              }
              index={1}
            />
            <CustomDrop
              title={"How to use PPF calculator?"}
              content={`To compute your Public Provident Fund (PPF), follow these steps:

1. Yearly Investment: Enter the amount manually or use the slider.
2. Time Period (In Years): Enter the duration manually or use the slider.
3. Rate of Interest: The interest rate is fixed.

Result Display:
After entering all the required details, the calculated results will display at the bottom of the screen.

Additional Functionality:
Pie Chart Feature:
1. Total Investment: Shows the total investment.
2. Total Interest: Displays the total Interest.

Tooltips:
1. On PC: Mouse hover over Total Investment for a tooltip displaying the invested amount.
2. On PC: Mouse hover over Total Interest for a tooltip displaying the interest amount.
3. On Mobile: Tap & hold on Total Investment for a tooltip showing the invested amount.
4. On Mobile: Tap & hold on Total Interest for a tooltip displaying the interest amount.

Effortlessly calculate your PPF today!`}
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

export default PFFCal;

const styles = StyleSheet.create({
  result: {
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.8)",
  },
});
