import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import ChildScreenContainerWithBackGround from "../../components/ChildScreenContainerWithBackGround";
import { moderateScale, scale } from "react-native-size-matters";
import CustomDropdown from "../../custom_hooks/CustomDropdown";
import CustomLableBtn from "../../components/CustomLableBtn";
import spacing from "../../constants/spacing";
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";
import fontFamily from "../../constants/fontFamily";
import CustomTextInput2 from "../../components/CustomTextInput2";
import ResultLableCom from "../../components/ResultLableCom";
import CustomDrop from "../../custom_hooks/CustomDrop";

const RetirementCal = ({ route }) => {
  const { title } = route?.params;

  const [openDropdown, setOpenDropdown] = useState(null);
  const [openDropdown2, setOpenDropdown2] = useState(null);

  const [inputs, setInputs] = useState({
    currentAge: "",
    retirementAge: "",
    lifeExpectancy: "",
    currentAnnualExpense: "",
    inflation: "",
    preRetirementROR: "",
    postRetirementROR: "",
    annualIncreaseIncome: "",
    existingInvestments: "",
    existingInvestmentROR: "",
  });

  const [results, setResults] = useState({
    retirementCorpus: 0,
    lumpsumFunding: 0,
    monthlySIP: 0,
    stepUpSIP: 0,
  });

  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field, value) => {
    setInputs((prevInputs) => ({ ...prevInputs, [field]: value }));
  };

  const allFieldsFilled = () => {
    return Object.values(inputs).every((value) => value.trim() !== "");
  };

  const calculateRetirement = () => {
    if (!allFieldsFilled()) {
      Alert.alert("All fields are required.");
      return;
    }
    const {
      currentAge,
      retirementAge,
      lifeExpectancy,
      currentAnnualExpense,
      inflation,
      preRetirementROR,
      postRetirementROR,
      annualIncreaseIncome,
      existingInvestments,
      existingInvestmentROR,
    } = inputs;

    const currentAgeNum = parseFloat(currentAge);
    const retirementAgeNum = parseFloat(retirementAge);
    const lifeExpectancyNum = parseFloat(lifeExpectancy);
    const currentAnnualExpenseNum = parseFloat(currentAnnualExpense);
    const inflationNum = parseFloat(inflation) / 100;
    const preRetirementRORNum = parseFloat(preRetirementROR) / 100;
    const postRetirementRORNum = parseFloat(postRetirementROR) / 100;
    const annualIncreaseIncomeNum = parseFloat(annualIncreaseIncome) / 100;
    const existingInvestmentsNum = parseFloat(existingInvestments);
    const existingInvestmentRORNum = parseFloat(existingInvestmentROR) / 100;

    if (
      isNaN(currentAgeNum) ||
      isNaN(retirementAgeNum) ||
      isNaN(lifeExpectancyNum) ||
      isNaN(currentAnnualExpenseNum) ||
      isNaN(inflationNum) ||
      isNaN(preRetirementRORNum) ||
      isNaN(postRetirementRORNum) ||
      isNaN(annualIncreaseIncomeNum) ||
      isNaN(existingInvestmentsNum) ||
      isNaN(existingInvestmentRORNum)
    ) {
      Alert.alert("All fields must be valid numbers.");
      return;
    }

    const yearsToRetirement = retirementAgeNum - currentAgeNum;
    const yearsInRetirement = lifeExpectancyNum - retirementAgeNum;

    if (yearsToRetirement <= 0 || yearsInRetirement <= 0) {
      Alert.alert("Invalid age inputs.");
      return;
    }

    const currentExpenseInflated =
      currentAnnualExpenseNum * Math.pow(1 + inflationNum, yearsToRetirement);
    const retirementCorpus = currentExpenseInflated * yearsInRetirement;
    const lumpsumFunding =
      retirementCorpus / Math.pow(1 + postRetirementRORNum, yearsInRetirement);
    const monthlySIP =
      (lumpsumFunding - existingInvestmentsNum) /
      ((Math.pow(1 + preRetirementRORNum, yearsToRetirement) - 1) /
        (preRetirementRORNum / 12));
    const stepUpSIP = monthlySIP * (1 + annualIncreaseIncomeNum);

    setResults({
      retirementCorpus,
      lumpsumFunding,
      monthlySIP: isNaN(monthlySIP) ? 0 : monthlySIP,
      stepUpSIP: isNaN(stepUpSIP) ? 0 : stepUpSIP,
    });
    setShowResults(true);
  };

  function formatNumber(num) {
    let str = num.toString().split(".");

    let intPart = str[0];
    intPart = intPart
      .replace(/\B(?=(\d{2})+(?!\d))/g, ",")
      .replace(/(\d+),(\d{3})$/, "$1,$2");

    return str.length > 1 ? intPart + "." + str[1] : intPart;
  }

  return (
    <ChildScreenContainerWithBackGround
      hideTopHeader={true}
      screen_name={title}
      showBgImage={false}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: moderateScale(12),
          paddingBottom: moderateScale(60),
          paddingTop: moderateScale(10),
        }}
        showsVerticalScrollIndicator={false}
      >
        <CustomDropdown
          title={"Basic Info"}
          content={
            <BasicInfoScreen
              handleInputChange={handleInputChange}
              inputs={inputs}
            />
          }
          isClicked={openDropdown === 0}
          setIsClicked={() =>
            setOpenDropdown((prevState) => (prevState === 0 ? null : 0))
          }
          index={0}
        />
        <CustomDropdown
          title={"Return Expectation"}
          content={
            <ReturnExpScreen
              handleInputChange={handleInputChange}
              inputs={inputs}
            />
          }
          isClicked={openDropdown === 1}
          setIsClicked={() =>
            setOpenDropdown((prevState) => (prevState === 1 ? null : 1))
          }
          index={1}
        />
        <CustomDropdown
          title={"Other"}
          content={
            <OtherScreen
              handleInputChange={handleInputChange}
              inputs={inputs}
            />
          }
          isClicked={openDropdown === 2}
          setIsClicked={() =>
            setOpenDropdown((prevState) => (prevState === 2 ? null : 2))
          }
          index={2}
        />
        <CustomLableBtn
          btnContainer={[styles.btnContainer]}
          title={"Calculate"}
          btnText={styles.btnText}
          onPress={calculateRetirement}
        />
        {showResults && (
          <View style={{ flex: 1, marginVertical: moderateScale(16) }}>
            <ResultLableCom
              result={formatNumber(results.retirementCorpus.toFixed(0))}
              lable={"Retirement corpus required"}
            />
            <ResultLableCom
              result={formatNumber(results.lumpsumFunding.toFixed(0))}
              lable={"Lumpsum Funding"}
            />
            <ResultLableCom
              result={formatNumber(results.monthlySIP.toFixed(0))}
              lable={"Monthly SIP required"}
            />
            <ResultLableCom
              result={formatNumber(results.stepUpSIP.toFixed(0))}
              lable={"Step up SIP required"}
            />
          </View>
        )}
        <View style={{ flex: 1 }}>
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
            DropdownContainer={{ paddingEnd: scale(12) }}
            title={"Why do you need to plan your retirement?"}
            content={`Saving for retirement is crucial because it helps ensure financial security when you no longer have a regular income. It provides a source of funds to cover living expenses, healthcare, and other needs during your retirement years, allowing you to maintain a comfortable lifestyle without relying solely on social security or other support systems. Starting early and consistently saving over time allows your investments to grow, providing a nest egg for your future.`}
            isClicked={openDropdown2 === 0}
            setIsClicked={() =>
              setOpenDropdown2((prevState) => (prevState === 0 ? null : 0))
            }
            index={0}
          />
          <CustomDrop
            DropdownContainer={{ paddingEnd: scale(12) }}
            title={"Products that help you plan your retirement."}
            content={`Insurance plays a valuable role in Retirement planning by providing financial security and support for your financial needs. Here's how insurance can help in this regard:

1. Annuities:
● Provide a steady stream of income during retirement.
● Types include fixed, variable, and indexed annuities.
● Offer options for immediate or deferred payouts.

2. Long-Term Care Insurance:
● Covers costs associated with extended healthcare needs in retirement.
● Helps with expenses like nursing homes, assisted living, or in-home care.
● Mitigates the impact of healthcare expenses on retirement savings.

3. Life Insurance with Cash Value:
● Some permanent life insurance policies accrue cash value over time.
● Policyholders can access this cash value during retirement.
● Combines life coverage with a potential savings component.

4. Indexed Universal Life Insurance:
● Ties cash value growth to the performance of a stock market index.
● Offers potential for higher returns compared to traditional whole life policies.
● Provides flexibility in premium payments and death benefits.

5. Income Protection Insurance:
● Safeguards against the loss of income due to disability or critical illness.
● Can be essential for protecting retirement savings in case of unexpected health challenges.
● Ensures financial stability during periods of reduced or no income. When considering insurance products for retirement planning, it’s crucial to assess individual needs, risk tolerance, and long-term financial goals. Consulting with a financial advisor can help tailor these products to your specific circumstances.`}
            isClicked={openDropdown2 === 1}
            setIsClicked={() =>
              setOpenDropdown2((prevState) => (prevState === 1 ? null : 1))
            }
            index={1}
          />
          <CustomDrop
            DropdownContainer={{ paddingEnd: scale(12) }}
            title={"How to use Retirement Calculator?"}
            content={`The Retirement Calculator is a powerful tool designed to help you plan for a financially secure retirement. Follow these steps to make the most out of it:

Step 1: Basic Information
● Current Age (Years): Input your current age. This forms the starting point for planning your retirement.
● Retirement Age (Years): Specify the age at which you plan to retire. This influences the duration of your retirement savings.
● Life Expectancy: Enter your expected life expectancy. This ensures your savings last throughout your retirement.
● Current Annual Expense (₹): Provide an estimate of your current yearly expenses to gauge your lifestyle.

Step 2: Return Expectations
● Inflation (%): Indicate the expected inflation rate. Inflation erodes purchasing power, affecting future expenses.
● Expected Pre-retirement RoR (%): Enter the expected rate of return on investments before retirement.
● Expected Post-retirement RoR (%): Specify the anticipated rate of return on investments during retirement.

Step 3: Other Factors
● Expected Annual Increase in Income (%): If applicable, input the expected annual increase in your income.
● Existing Investments (₹): Include the current value of your existing investments.
● Expected RoR of Existing Investment (%): Specify the anticipated rate of return on your existing investments.

Step 4: Click on the Calculate Button
● After filling in all the details, click on the 'Calculate' button to obtain comprehensive results.

Factors Responsible for Results:-
Retirement Corpus Required:
● Influenced by current age, retirement age, life expectancy, and current annual expenses.
● Reflects the estimated amount needed to maintain your lifestyle during retirement.

Lumpsum Funding:
● Takes into account inflation, pre-retirement rate of return, and post-retirement rate of return.
● Represents the one-time amount needed at the beginning of retirement.

Monthly SIP Required:
● Considers expected annual increase in income, existing investments, and their expected rate of return.
● Suggests the monthly systematic investment required to meet retirement goals.

Step up SIP Required:
● Similar to Monthly SIP but factors in an increase in investment over time to align with changing financial circumstances.

How Factors Impact Results:
● Age influences the time available for savings to grow.
● Inflation affects future expenses, requiring higher savings.
● Rate of return impacts the growth of investments.
● Existing investments contribute to the overall retirement portfolio.

By understanding these factors and customizing the calculator inputs based on your unique situation, you can make informed decisions to secure a financially sound retirement`}
            isClicked={openDropdown2 === 2}
            setIsClicked={() =>
              setOpenDropdown2((prevState) => (prevState === 2 ? null : 2))
            }
            index={2}
          />
        </View>
      </ScrollView>
    </ChildScreenContainerWithBackGround>
  );
};

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
});

export default RetirementCal;

BasicInfoScreen = ({ handleInputChange, inputs }) => {
  return (
    <View
      style={{
        flex: 1,
        borderBottomWidth: 0.4,
        paddingHorizontal: moderateScale(6),
        marginTop: moderateScale(10),
        paddingBottom: moderateScale(10),
      }}
    >
      <CustomTextInput2
        requiredLable={"*"}
        lable={"Current Age (Years)"}
        value={inputs.currentAge}
        onChangeText={(text) => handleInputChange("currentAge", text)}
        placeholder="0"
        placeholderTextColor={colors.placeholderColor}
        keyboardType="number-pad"
      />

      <CustomTextInput2
        requiredLable={"*"}
        lable={"Retirement Age (Years)"}
        value={inputs.retirementAge}
        onChangeText={(text) => handleInputChange("retirementAge", text)}
        placeholder="0"
        placeholderTextColor={colors.placeholderColor}
        keyboardType="number-pad"
      />
      <CustomTextInput2
        requiredLable={"*"}
        lable={"Life Expectancy"}
        value={inputs.lifeExpectancy}
        onChangeText={(text) => handleInputChange("lifeExpectancy", text)}
        placeholder="0"
        placeholderTextColor={colors.placeholderColor}
        keyboardType="number-pad"
      />
      <CustomTextInput2
        requiredLable={"*"}
        lable={"Current Annual Expense (₹)"}
        value={inputs.currentAnnualExpense}
        onChangeText={(text) => handleInputChange("currentAnnualExpense", text)}
        placeholder="0"
        placeholderTextColor={colors.placeholderColor}
        keyboardType="number-pad"
      />
    </View>
  );
};

const ReturnExpScreen = ({ handleInputChange, inputs }) => {
  return (
    <View
      style={{
        flex: 1,
        borderBottomWidth: 0.4,
        paddingHorizontal: moderateScale(6),
        marginTop: moderateScale(10),
        paddingBottom: moderateScale(10),
      }}
    >
      <CustomTextInput2
        requiredLable={"*"}
        lable={"Inflation (%)"}
        value={inputs.inflation}
        onChangeText={(text) => handleInputChange("inflation", text)}
        placeholder="0"
        placeholderTextColor={colors.placeholderColor}
        keyboardType="number-pad"
      />

      <CustomTextInput2
        requiredLable={"*"}
        lable={"Expected Pre-retirement RoR (%)"}
        value={inputs.preRetirementROR}
        onChangeText={(text) => handleInputChange("preRetirementROR", text)}
        placeholder="0"
        placeholderTextColor={colors.placeholderColor}
        keyboardType="number-pad"
      />
      <CustomTextInput2
        requiredLable={"*"}
        lable={"Expected Post-retirement RoR (%)"}
        value={inputs.postRetirementROR}
        onChangeText={(text) => handleInputChange("postRetirementROR", text)}
        placeholder="0"
        placeholderTextColor={colors.placeholderColor}
        keyboardType="number-pad"
      />
    </View>
  );
};

const OtherScreen = ({ handleInputChange, inputs }) => {
  return (
    <View
      style={{
        flex: 1,
        borderBottomWidth: 0.4,
        paddingHorizontal: moderateScale(6),
        marginTop: moderateScale(10),
        paddingBottom: moderateScale(10),
      }}
    >
      <CustomTextInput2
        requiredLable={"*"}
        lable={"Expected Annual Increase in Income (%)"}
        value={inputs.annualIncreaseIncome}
        onChangeText={(text) => handleInputChange("annualIncreaseIncome", text)}
        placeholder="0"
        placeholderTextColor={colors.placeholderColor}
        keyboardType="number-pad"
      />

      <CustomTextInput2
        requiredLable={"*"}
        lable={"Existing Investments (₹)"}
        value={inputs.existingInvestments}
        onChangeText={(text) => handleInputChange("existingInvestments", text)}
        placeholder="0"
        placeholderTextColor={colors.placeholderColor}
        keyboardType="number-pad"
      />
      <CustomTextInput2
        requiredLable={"*"}
        lable={"Expected RoR of Existing Investment (%)"}
        value={inputs.existingInvestmentROR}
        onChangeText={(text) =>
          handleInputChange("existingInvestmentROR", text)
        }
        placeholder="0"
        placeholderTextColor={colors.placeholderColor}
        keyboardType="number-pad"
      />
    </View>
  );
};
