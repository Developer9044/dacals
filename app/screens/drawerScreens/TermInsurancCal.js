import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ChildScreenContainerWithBackGround from "../../components/ChildScreenContainerWithBackGround";
import CustomTextInput2 from "../../components/CustomTextInput2";
import SelectedItem from "../../components/SelectedItem";
import {
  NicotineData,
  address_data,
  annualIncomeData,
  education_data,
  gender_data,
  occupation_data,
} from "../../components/dropdownData";
import CustomLableBtn from "../../components/CustomLableBtn";
import CustomDrop from "../../custom_hooks/CustomDrop";
import colors from "../../constants/colors";
import fontFamily from "../../constants/fontFamily";
import fontSize from "../../constants/fontSize";
import spacing from "../../constants/spacing";
import { moderateScale, scale } from "react-native-size-matters";
import { images } from "../../assets";

const TermInsuranceCal = ({ route }) => {
  const { title } = route?.params;
  const [openDropdown, setOpenDropdown] = useState(null);
  const [fullName, setFullName] = useState("");
  const [date, setDate] = useState(new Date());
  const [mobile, setMobile] = useState("");
  const [annualIncome, setAnnualIncome] = useState(3);
  const [city, setCity] = useState("Mumbai");
  const [gender, setGender] = useState("Male");
  const [nicotine, setNicotine] = useState("Yes");
  const [occupation, setOccupation] = useState("Self Employed / Business");
  const [education, setEducation] = useState("Graduate & Above");
  const [liability, setLiability] = useState("");
  const [futureGoal, setFutureGoal] = useState("");
  const [recommendedCover, setRecommendedCover] = useState(0);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [dobError, setDobError] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
    setMode("date");
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const parseIncome = (income) => {
    if (typeof income === "string") {
      const parts = income.split("-");
      if (parts.length === 2) {
        const min = parseFloat(parts[0]);
        const max = parseFloat(parts[1]);
        return (min + max) / 2;
      }
    }
    return parseFloat(income);
  };

  const handleCalculate = () => {
    let hasError = false;

    if (!fullName) {
      setNameError("Name is Required");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!mobile) {
      setMobileError("Mobile Number is Required");
      hasError = true;
    } else {
      setMobileError("");
    }

    const age = calculateAge(date);
    if (age < 18) {
      setDobError("Minimum age should be 18 years");
      hasError = true;
    } else if (age > 65) {
      setDobError("Maximum age should be 65 years");
      hasError = true;
    } else {
      setDobError("");
      hasError = false;
    }

    if (hasError) {
      return;
    }

    const income = parseIncome(annualIncome);
    const liabilityValue = parseFloat(liability) || 0;
    const futureGoalValue = parseFloat(futureGoal) || 0;
    if (isNaN(income) || isNaN(liabilityValue) || isNaN(futureGoalValue)) {
      alert(
        "Please enter valid numbers for annual income, liability, and future goals."
      );
      return;
    }

    const incomeFactor = 8.333;
    const occupationFactor = 1.0;
    let educationFactor = 1.0;

    if (education === "12th Pass") {
      educationFactor = 0.9;
    } else if (education === "10th Pass") {
      educationFactor = 0.2;
    }

    const baseCoverage = income * incomeFactor * 100000;

    let coverage =
      baseCoverage * occupationFactor * educationFactor +
      liabilityValue +
      futureGoalValue;
    coverage = Math.round(coverage / 100000) * 100000;

    setRecommendedCover(coverage);
  };

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
        <CustomTextInput2
          requiredLable={"*"}
          lable={"Full Name"}
          value={fullName}
          onChangeText={setFullName}
          error_msg={nameError}
        />
        <CustomTextInput2
          requiredLable={"*"}
          lable={"Date of birth"}
          isIcon={images.calendar}
          onPress={showDatepicker}
          value={formatDate(date)}
          error_msg={dobError}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
        <CustomTextInput2
          keyboardType="number-pad"
          requiredLable={"*"}
          lable={"Mobile"}
          value={mobile}
          onChangeText={(text) => {
            if (text.length <= 10) {
              setMobile(text);
            }
          }}
          error_msg={mobileError}
        />
        <SelectedItem
          data={annualIncome}
          setData={setAnnualIncome}
          dropItem={annualIncomeData}
          placeholder={"Annual Income (In Lakhs)"}
        />
        <View style={styles.row}>
          <SelectedItem
            dropDownStyle={{ width: "48%" }}
            data={city}
            setData={setCity}
            dropItem={address_data}
            placeholder={"Choose your city"}
          />
          <SelectedItem
            dropDownStyle={{ width: "48%" }}
            data={gender}
            setData={setGender}
            dropItem={gender_data}
            placeholder={"Gender"}
          />
        </View>

        <SelectedItem
          data={nicotine}
          setData={setNicotine}
          dropItem={NicotineData}
          placeholder={"Tobacco/Nicotine"}
        />
        <SelectedItem
          data={occupation}
          setData={setOccupation}
          dropItem={occupation_data}
          placeholder={"What's your occupation?"}
        />
        <SelectedItem
          data={education}
          setData={setEducation}
          dropItem={education_data}
          placeholder={"What's your Education?"}
        />
        <CustomTextInput2
          keyboardType="number-pad"
          requiredLable={"*"}
          lable={"Liability(₹)"}
          value={liability}
          onChangeText={setLiability}
        />
        <Text style={styles.bottomText}>
          Example: home loan, personal loan etc.
        </Text>
        <CustomTextInput2
          keyboardType="number-pad"
          requiredLable={"*"}
          lable={"Future Goal(₹)"}
          value={futureGoal}
          onChangeText={setFutureGoal}
        />
        <Text style={styles.bottomText}>
          Example: child education, start a new business etc.
        </Text>
        <CustomLableBtn
          btnContainer={styles.btnContainer}
          title={"Calculate"}
          btnText={styles.btnText}
          onPress={handleCalculate}
        />
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Recommended Life Cover</Text>
          <View style={styles.resultBox}>
            <Text style={styles.resultSymbol}>₹</Text>
            <Text style={styles.resultAmount}>
              {recommendedCover.toLocaleString()}
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.faqHeader}>FAQs</Text>
          <CustomDrop
            title={"What is Term insurance?"}
            content={
              "Term insurance is a type of life insurance that provides coverage for a specified term or period, typically ranging from 5 to 30 years."
            }
            isClicked={openDropdown === 0}
            setIsClicked={() => setOpenDropdown(openDropdown === 0 ? null : 0)}
            index={0}
          />
          <CustomDrop
            title={"Why do you need term Insurance?"}
            content={`Term insurance is a type of life insurance that provides coverage for a specified term or period, typically ranging from 5 to 30 years. It is one of the simplest and most affordable forms of life insurance. Importance of Term Insurance:

1. Financial Security for Dependents: Term insurance provides financial protection for your dependents in case of your untimely death. It ensures that they have a financial safety net to cover expenses like daily living, debts, education, and future goals.

2. Affordable Premiums: Term insurance is usually much more affordable than other types of life insurance, making it accessible for individuals with various budget levels.

3. Focused on Protection: Term insurance is designed primarily for risk protection. It serves its purpose by providing a high coverage amount (sum assured) at a relatively low cost.

4. Customizable Coverage: You can choose the coverage amount and policy term based on your specific needs and financial obligations. This customization allows you to tailor the policy to your family's requirements.

5. Risk Mitigation: Term insurance helps mitigate the financial risks associated with unexpected events, such as premature death. It ensures that your loved ones are not burdened with financial difficulties during an already challenging time.

6. Temporary Financial Obligations: Term insurance is particularly useful when you have temporary financial obligations, such as a mortgage or a child's education expenses. The coverage lasts for the duration of these obligations, providing the necessary financial support.

7. Peace of Mind: Knowing that you have term insurance in place can give you peace of mind, knowing that your family's financial well-being is secure, even if you're not there to provide for them. It's a fundamental component of financial planning, especially if you have dependents who rely on your income.`}
            isClicked={openDropdown === 1}
            setIsClicked={() => setOpenDropdown(openDropdown === 1 ? null : 1)}
            index={1}
          />
          <CustomDrop
            title={"How to use the term Insurance Calculator?"}
            content={`Understanding the Term Insurance Calculator

Step 1: Candidate Details
Name: Enter your full name for identification.
DOB (Date of Birth): Provide your date of birth for age calculation.
Mobile Number: Include your mobile number for communication purposes.

Step 2: Financial Information
Annual Income: Input your annual income to assess coverage needs.
City: Select your city to adjust coverage based on living expenses.
Occupation:
For Men: Choose between self-employed, business, or salaried.
For Women: Select between self-employed, business, salaried, or housewife.
Education: Indicate your education level for risk assessment.

Step 3: Lifestyle Factors
Tobacco/Nicotine Intake: Specify if you consume tobacco or nicotine.
Liabilities: Mention any financial responsibilities or debts.
Future Goals: Share any future financial goals to factor into coverage needs.

How Factors Impact the Results:
Age & Health: Younger and healthier individuals often qualify for lower premiums.
Income & Occupation: Higher income might require greater coverage. Different occupations may influence risk assessments.
Tobacco/Nicotine: Users who consume tobacco or nicotine might face higher premiums due to health risks.
Liabilities & Future Goals: Financial responsibilities and future objectives impact coverage needs.

Using the Calculator:
Fill in Your Details: Enter accurate personal and financial information and be honest about habits like tobacco or nicotine intake.
Review and Analyze: Check the results to understand coverage estimates.
Assess Suitability: Evaluate if the coverage aligns with your financial needs and goals.
Adjust if Necessary: Modify details to see how different factors affect coverage.`}
            isClicked={openDropdown === 2}
            setIsClicked={() => setOpenDropdown(openDropdown === 2 ? null : 2)}
            index={2}
          />
        </View>
      </ScrollView>
    </ChildScreenContainerWithBackGround>
  );
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomText: {
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.4)",
    marginTop: moderateScale(-8),
    marginBottom: moderateScale(6),
  },
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
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: moderateScale(16),
    marginBottom: moderateScale(8),
  },
  resultLabel: {
    color: colors.appColor,
    fontSize: fontSize.t3,
    fontFamily: fontFamily.SEMI_BOLD,
    flex: 1.3,
  },
  resultBox: {
    flex: 1,
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(6),
    backgroundColor: "#969ea31a",
    flexDirection: "row",
    borderRadius: scale(4),
  },
  resultSymbol: {
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.8)",
  },
  resultAmount: {
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.8)",
    textAlign: "right",
    paddingEnd: moderateScale(5),
  },
  faqHeader: {
    color: colors.black,
    fontSize: fontSize.t3,
    fontFamily: fontFamily.SEMI_BOLD,
  },
});

export default TermInsuranceCal;
