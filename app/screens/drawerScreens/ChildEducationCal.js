import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ChildScreenContainerWithBackGround from "../../components/ChildScreenContainerWithBackGround";
import { moderateScale, scale } from "react-native-size-matters";
import CustomTextInput2 from "../../components/CustomTextInput2";
import CustomDropdown from "../../custom_hooks/CustomDropdown";
import SelectedItem from "../../components/SelectedItem";
import {
  ageData,
  child_ageData,
  gender_data,
  getting_started_data,
  investor_data,
  location_data,
  percentage_data,
} from "../../components/dropdownData";
import fontFamily from "../../constants/fontFamily";
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";
import CustomLableBtn from "../../components/CustomLableBtn";
import spacing from "../../constants/spacing";
import CustomDrop from "../../custom_hooks/CustomDrop";

const ChildEducationCal = ({ route }) => {
  const { title } = route?.params;
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openDropdown2, setOpenDropdown2] = useState(null);
  const [percentageData, setPercentageData] = useState("4%");
  const [infostore, setInfo] = useState({
    current_amount_require: "",
    child_name: "",
    child_age: "0",
    child_need_age: "18",
    inflamation_rate: "4",
    save_money: "",
    remain_val: "",
    monthly_save_amount: "",
    loan: "0",
    father_name: "",
    father_gender: "Male",
    father_age: "20",
    child_gender: "Male",
    investor_type: "Conservative",
    tempremainval: "0",
    interest_rate: "5",
    error_message: "",
    inflatedValue: "0",
    tempinflatedValue: "0",
    maturity: 0,
    want_data: "A Professor",
    age2: "18",
    location: "India",
  });

  const inflationCalculator = () => {
    let currentValue = parseFloat(infostore.current_amount_require);
    let annualInflationRate = parseFloat(infostore.inflamation_rate);

    if (isNaN(currentValue)) {
      currentValue = 0;
    }
    if (isNaN(annualInflationRate)) {
      annualInflationRate = 0;
    }

    let period =
      parseFloat(infostore.child_need_age) - parseFloat(infostore.child_age);
    let inflatedValue =
      currentValue * Math.pow(1 + annualInflationRate / 100, period);
    let nf = new Intl.NumberFormat("en-IN");
    setInfo((prevInfo) => ({
      ...prevInfo,
      inflatedValue: nf.format(parseInt(inflatedValue)),
      tempinflatedValue: parseInt(inflatedValue),
      remain_val: nf.format(
        parseInt(inflatedValue) - parseInt(prevInfo.save_money)
      ),
      tempremainval: parseInt(inflatedValue) - parseInt(prevInfo.save_money),
    }));
    calculate_remaining();
  };

  const storeinfo = (e, id) => {
    console.log(id);
    setInfo((prevInfo) => ({
      ...prevInfo,
      [id]: e,
      ...(id === "investor_type" && {
        showhide: {
          ...prevInfo.showhide,
          [prevInfo.investor_type]: { display: "none" },
          [e]: { display: "flex" },
        },
      }),
    }));
  };

  const calloan_val = () => {
    let remain_val = parseInt(infostore.tempremainval);
    let loan = remain_val + parseInt((remain_val * 12) / 100);
    loan = parseInt(loan / 5 / 12);
    let nf = new Intl.NumberFormat("en-IN");
    setInfo((prevInfo) => ({
      ...prevInfo,
      loan: nf.format(loan),
    }));
  };

  const count_addi_money = () => {
    let monthly_save_amount = infostore.monthly_save_amount || "0";
    let remain_val = parseInt(infostore.tempremainval);
    let i = parseInt(infostore.interest_rate);
    let n =
      (parseInt(infostore.child_need_age) - parseInt(infostore.child_age)) * 12;
    let e1 = Math.pow(1 + i / 400, n / 3);
    let d = Math.pow(1 + i / 400, -1 / 3);
    remain_val = remain_val / (e1 - 1);
    let invest = remain_val * (1 - d);

    if (invest > 0 && !isNaN(invest)) {
      while (true) {
        ++invest;
        let m = (invest * (e1 - 1)) / (1 - d);
        if (m > parseInt(infostore.tempremainval)) {
          m = m - parseInt(infostore.tempremainval);
          if (350 < m && parseInt(infostore.tempremainval) > 8000000) {
            ++invest;
          }
          --invest;
          break;
        }
      }
    }

    invest = invest - parseInt(monthly_save_amount);
    let nf = new Intl.NumberFormat("en-IN");
    setInfo((prevInfo) => ({
      ...prevInfo,
      addi_money: nf.format(parseInt(invest)),
    }));
  };

  const calculate_remaining = () => {
    let maturity = 0;
    let investor_type = infostore.investor_type;
    let amt = parseFloat(infostore.save_money);

    if (!isNaN(amt) && amt > 0) {
      let rate = 5; // Default rate
      switch (investor_type) {
        case "Moderate":
          rate = 8;
          break;
        case "Aggressive":
          rate = 12;
          break;
      }

      // Set the interest rate in infostore
      setInfo((prevInfo) => ({
        ...prevInfo,
        interest_rate: rate,
      }));

      maturity =
        amt *
        Math.pow(
          1 + rate / 100 / 4,
          4 *
            (parseFloat(infostore.child_need_age) -
              parseFloat(infostore.child_age))
        );
    }

    let remain_val = parseFloat(infostore.tempinflatedValue) - maturity;
    remain_val = isNaN(remain_val) ? 0 : remain_val;
    let nf = new Intl.NumberFormat("en-IN");

    setInfo((prevInfo) => ({
      ...prevInfo,
      maturity: nf.format(parseInt(maturity)),
      remain_val: nf.format(remain_val),
      tempremainval: remain_val,
    }));

    calloan_val();
    count_addi_money();
  };
  const validate = () => {
    let temp_return = true;
    let error_message = "";

    if (infostore.current_amount_require === "") {
      error_message += "Please enter required amount. ";
      temp_return = false;
    }
    if (infostore.father_name === "") {
      error_message += "Please enter father name. ";
      temp_return = false;
    }
    if (infostore.child_name === "") {
      error_message += "Please enter child name. ";
      temp_return = false;
    }

    setInfo((prevInfo) => ({
      ...prevInfo,
      error_message,
    }));

    return temp_return;
  };

  // console.log(infostore.maturity);
  console.log(infostore.error_message);

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
          title={"About You"}
          content={
            <AboutUsScreen storeinfo={storeinfo} infostore={infostore} />
          }
          isClicked={openDropdown === 0}
          setIsClicked={() => setOpenDropdown(openDropdown === 0 ? null : 0)}
          index={0}
        />
        <CustomDropdown
          title={"Getting Started"}
          content={
            <GettingStated storeinfo={storeinfo} infostore={infostore} />
          }
          isClicked={openDropdown === 1}
          setIsClicked={() => setOpenDropdown(openDropdown === 1 ? null : 1)}
          index={1}
        />
        <CustomDropdown
          title={"Finance"}
          content={
            <FinanceScreen storeinfo={storeinfo} infostore={infostore} />
          }
          isClicked={openDropdown === 2}
          setIsClicked={() => setOpenDropdown(openDropdown === 2 ? null : 2)}
          index={2}
        />
        {infostore.error_message !== "" && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{infostore.error_message}</Text>
          </View>
        )}
        <CustomLableBtn
          btnContainer={[styles.btnContainer]}
          title={"Calculate"}
          btnText={styles.btnText}
          onPress={() => {
            if (validate()) {
              inflationCalculator();
            } else {
              infostore.tempinflatedValue = "0";
              infostore.inflatedValue = "0";
              infostore.remain_val = "0";
              infostore.tempremainval = "0";
              infostore.loan = "0";
              infostore.addi_money = "0";
              infostore.maturity = "0";
            }
          }}
        />
        <View
          style={{
            flex: 1,
            paddingVertical: moderateScale(10),
            paddingHorizontal: moderateScale(2),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[styles.textStyle, { flex: 5 }]}>
              To fund{" "}
              <Text style={styles.hightLightText}>{infostore.child_name}</Text>
              's education to be{" "}
              <Text style={styles.hightLightText}>{infostore.want_data}</Text>,
              with inflation @{" "}
              <Text style={styles.hightLightText}>
                {infostore.inflamation_rate ? infostore.inflamation_rate : 0}
              </Text>
            </Text>
            <SelectedItem
              dropDownStyle={{ flex: 1 }}
              data={infostore.inflamation_rate ? infostore.inflamation_rate : 0}
              setData={(value) => storeinfo(value, "inflamation_rate")}
              dropItem={percentage_data}
            />
          </View>

          <Text
            style={[styles.textStyle, { paddingVertical: moderateScale(8) }]}
          >
            A corpus of{" "}
            <Text style={styles.hightLightText}>
              {infostore.inflatedValue}*
            </Text>{" "}
            is required when turns <Text style={styles.hightLightText}>18</Text>{" "}
            years in age
          </Text>
          <Text style={[styles.textStyle]}>
            How much have you saved for him
          </Text>
        </View>

        <View
          style={{
            height: scale(55),
            paddingHorizontal: moderateScale(15),
            backgroundColor: "#969ea31a",
            borderRadius: scale(100),
            justifyContent: "center",
            marginVertical: moderateScale(10),
          }}
        >
          <View
            style={{
              height: scale(35),
              backgroundColor: colors.white,
              flexDirection: "row",
              borderRadius: scale(50),
            }}
          >
            <View
              style={{
                backgroundColor: colors.light_danger,
                borderRadius: scale(50),
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={[styles.textStyle, { textAlign: "center" }]}>
                {infostore.maturity} Saved
              </Text>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                marginStart: moderateScale(12),
              }}
            >
              <Text style={[styles.textStyle]}>
                {infostore.remain_val} remaining{" "}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: moderateScale(10),
          }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: scale(6),
              backgroundColor: colors.black,
              marginEnd: moderateScale(12),
              marginTop: scale(6),
            }}
          />
          <Text style={[styles.textStyle]}>
            To achieve your target, you need additional monthly savings of Rs.
            approximately.
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: moderateScale(10),
            paddingHorizontal: moderateScale(12),
          }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: scale(6),
              backgroundColor: colors.black,
              marginEnd: moderateScale(12),
              marginTop: scale(6),
            }}
          />
          <Text style={[styles.textStyle]}>
            When{" "}
            <Text style={styles.hightLightText}>{infostore.child_name} </Text>{" "}
            turns <Text style={styles.hightLightText}>18</Text>, considering
            your savings, if you would go for an Education Loan for remaining
            amount of <Text style={styles.hightLightText}>0</Text>, you would
            end up paying <Text style={styles.hightLightText}>0</Text> per month
            for 5 years to repay the loan (assuming 12% rate of interest)
          </Text>
        </View>

        <View style={{ flex: 1, marginTop: moderateScale(10) }}>
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
            title={"Why do you need to plan for your child education?"}
            content={`Child education planning is vital as it:
  * Ensures Financial Readiness: Planning helps financially prepare for educational expenses, avoiding unexpected financial burdens.
  * Minimizes Dependence on Loans: Reduces the need for student loans, preventing long-term debt for both parents and students.
  * Invests in Future Opportunities: Provides the means for higher education, expanding a child's career options and skill development.
  * Allows for Flexible Choices: Enables parents to choose the type of education that aligns with a child's goals, whether it's private schools, out-of-state colleges, or specialized programs.
  * Capitalizes on Compound Growth: Starting early allows investments to grow over time, maximizing the potential funds available for education.
  * Reduces Stress: Alleviates financial stress, allowing students to focus on their studies without worrying about funding constraints.
  * Sets and Achieves Goals: Establishes specific financial goals for education, providing a roadmap to meet a child's educational aspirations.
  
  In summary, child education planning is a strategic and proactive approach to securing a child's educational future, fostering opportunities, and minimizing financial stress.`}
            isClicked={openDropdown2 === 0}
            setIsClicked={() =>
              setOpenDropdown2(openDropdown2 === 0 ? null : 0)
            }
            index={0}
          />
          <CustomDrop
            DropdownContainer={{ paddingEnd: scale(12) }}
            title={"Products with these benefits."}
            content={`Products with these benefits:
  * Child Education Insurance Plans: Many insurance companies offer specialized child education insurance plans designed to fund your child's education. These plans typically provide a lump sum payout or periodic payouts to meet the educational expenses when your child reaches the age for higher education. This ensures that there are funds available when needed, even in your absence.
  * Risk Mitigation: Life insurance policies can provide financial protection for your child's future education. In the event of your untimely demise, the life insurance payout can serve as a source of funding for their education, helping them avoid financial hardships.
  * Savings and Investments: Some insurance-linked savings or investment plans can be used to accumulate funds for your child's education. These plans allow you to save and invest while also providing insurance coverage. Over time, the accumulated funds can be directed toward educational expenses.
  * Goal-Oriented Planning: Insurance-linked education plans encourage goal-oriented savings. By specifying the purpose as your child's education, it helps maintain focus on this financial objective and ensures that funds are allocated accordingly.
  * Tax Benefits: Premiums paid for life insurance policies or child education plans may be eligible for tax deductions or exemptions, providing additional financial relief. When incorporating insurance into your child's education planning, consider the following: -
  * Assessing Coverage Needs: Calculate the estimated cost of your child's education, including tuition fees, living expenses, and inflation. Ensure that the insurance coverage or savings plan aligns with your financial goals.
  * Choosing the Right Policy: Evaluate various insurance options, such as term insurance, endowment plans, or dedicated child education plans, based on your specific requirements and risk tolerance.
  * Regular Review: Periodically review and adjust your insurance and investment plans to ensure they remain in line with your child's educational needs and any changes in your financial situation. It's essential to strike a balance between insurance and Other savings or investment vehicles when planning for your child's education. Consult with a financial advisor to create a comprehensive and tailored education plan that integrates insurance effectively to secure your child's educational future..`}
            isClicked={openDropdown2 === 1}
            setIsClicked={() =>
              setOpenDropdown2(openDropdown2 === 1 ? null : 1)
            }
            index={1}
          />
          <CustomDrop
            DropdownContainer={{ paddingEnd: scale(12) }}
            title={"How to use Child Education Plan calculator?"}
            content={`* About You:
  Enter the Father and Child's Names.
  Select the Father and Child's Ages.
  Choose the Gender for both Father and Child.
  
  * Getting Started:
  Select the desired Course for your Child.
  Specify the Age at which your Child will require funds.
  Choose the Location of study.
  
  * Finance:
  Enter the required amount based on current rates.
  Input the monthly amount saved for your child's education.
  Provide the current savings for your child.
  Define your investor profile.
  
  * Calculate:
  1. Click the "Calculate" Button.
  Result:
  On clicking Calculate Button the results will be shown on the right side of the screen as Instructed below:
  
  1. Funding Education: Plan to fund 's education in the selected course with a default 4% inflation rate (adjustable).
  2. Required Corpus: A total corpus of (Total Amount Needed)* is needed when your child turns (Age at which money required).
  3. Savings Overview: Detailed view of your current savings, including the saved amount with FD rates based on the investor type, and the remaining balance.
  4. Additional Savings: Projection of required monthly savings based on Reverse RD rates linked to the investor type.
  5. Loan Scenario: If necessary, details of the option for an Education Loan, including the monthly repayment amount for 5 years at a 12% interest rate.`}
            isClicked={openDropdown2 === 2}
            setIsClicked={() =>
              setOpenDropdown2(openDropdown2 === 2 ? null : 2)
            }
            index={2}
          />
        </View>
      </ScrollView>
    </ChildScreenContainerWithBackGround>
  );
};

export default ChildEducationCal;

const AboutUsScreen = ({ storeinfo, infostore }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: fontSize.h6,
          color: colors.textPrimary,
          fontFamily: fontFamily.MEDIUM,
          paddingVertical: moderateScale(12),
        }}
      >
        First, lets talk about yourself
      </Text>
      <CustomTextInput2
        value={infostore.father_name}
        onChangeText={(value) => storeinfo(value, "father_name")}
        requiredLable={"*"}
        lable={"Full Name"}
      />
      <SelectedItem
        data={infostore.father_age}
        setData={(value) => storeinfo(value, "father_age")}
        dropItem={ageData}
        placeholder={"Age"}
      />
      <SelectedItem
        data={infostore.father_gender}
        setData={(value) => storeinfo(value, "father_gender")}
        dropItem={gender_data}
        placeholder={"Gender"}
      />

      <Text
        style={{
          fontSize: fontSize.h6,
          color: colors.textPrimary,
          fontFamily: fontFamily.MEDIUM,
          paddingVertical: moderateScale(12),
        }}
      >
        About your child
      </Text>

      <CustomTextInput2
        value={infostore.child_name}
        requiredLable={"*"}
        lable={"Full Name"}
        onChangeText={(value) => storeinfo(value, "child_name")}
      />
      <SelectedItem
        data={infostore.child_age}
        setData={(value) => storeinfo(value, "child_age")}
        dropItem={child_ageData}
        placeholder={"Age"}
      />
      <SelectedItem
        data={infostore.child_gender}
        setData={(value) => storeinfo(value, "child_gender")}
        dropItem={gender_data}
        placeholder={"Gender"}
      />
    </View>
  );
};
const GettingStated = ({ storeinfo, infostore }) => {
  // console.log(infostore.age2);
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: fontSize.h6,
          color: colors.textPrimary,
          fontFamily: fontFamily.MEDIUM,
          paddingVertical: moderateScale(12),
        }}
      >
        What do you want to be
      </Text>
      <View style={{}}>
        <FlatList
          data={getting_started_data}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => storeinfo(item.lable, "want_data")}
                style={{
                  justifyContent: "center",
                  width: "25%",
                  marginBottom: scale(10),
                }}
              >
                <Image
                  source={item?.img}
                  style={{
                    width: scale(40),
                    height: scale(40),
                    alignSelf: "center",
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: fontSize.t4,
                    color: "rgba(0,0,0,0.8)",
                    fontFamily: fontFamily.REGULAR,
                    paddingVertical: moderateScale(4),
                    textAlign: "center",
                  }}
                >
                  {item?.lable}
                </Text>
              </TouchableOpacity>
            );
          }}
          numColumns={4}
          scrollEnabled={false}
        />
      </View>

      <Text
        style={{
          fontSize: fontSize.h6,
          color: colors.textPrimary,
          fontFamily: fontFamily.MEDIUM,
          paddingVertical: moderateScale(12),
        }}
      >
        would need money at an age
      </Text>

      <SelectedItem
        data={infostore.age2}
        setData={(value) => storeinfo(value, "age2")}
        dropItem={ageData}
        placeholder={"Age"}
      />
      <SelectedItem
        data={infostore.location}
        setData={(value) => storeinfo(value, "location")}
        dropItem={location_data}
        placeholder={"Location"}
      />
    </View>
  );
};
const FinanceScreen = ({ storeinfo, infostore }) => {
  return (
    <View style={{ flex: 1, marginTop: moderateScale(10) }}>
      <CustomTextInput2
        value={infostore.current_amount_require}
        onChangeText={(value) => storeinfo(value, "current_amount_require")}
        lable={"The amount required at current rates"}
        requiredLable={"*"}
        keyboardType="number-pad"
        placeholder="0"
        placeholderTextColor={colors.placeholderColor}
      />
      <CustomTextInput2
        value={infostore.save_money}
        onChangeText={(value) => storeinfo(value, "save_money")}
        lable={"How much have you saved for hims"}
        keyboardType="number-pad"
        placeholder="0"
        placeholderTextColor={colors.placeholderColor}
      />
      <CustomTextInput2
        value={infostore.monthly_save_amount}
        onChangeText={(value) => storeinfo(value, "monthly_save_amount")}
        lable={"Amount you save each month for 's education"}
        keyboardType="number-pad"
        placeholder="0"
        placeholderTextColor={colors.placeholderColor}
      />
      <SelectedItem
        data={infostore.investor_type}
        setData={(value) => storeinfo(value, "investor_type")}
        dropItem={investor_data}
        placeholder={"What kind of investor are you"}
      />

      <View
        style={{
          flex: 1,
          paddingHorizontal: moderateScale(8),
          paddingVertical: moderateScale(6),
          backgroundColor: "#969ea31a",
          flexDirection: "row",
          borderRadius: scale(4),
        }}
      >
        {infostore.investor_type === "Moderate" ? (
          <Text style={[styles.result]}>
            Relatively balanced returns with limited risk (e.g. Gilt funds/ Debt
            MF, Balanced MF)
          </Text>
        ) : infostore.investor_type === "Aggressive" ? (
          <Text style={[styles.result]}>
            Potentially higher returns with high risk (e.g. Equity MF, Stocks &
            securities)
          </Text>
        ) : (
          <Text style={[styles.result]}>
            Average returns with lower risk (e.g. PPF/NSC/Post office/Bank FD)
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: colors.back_btn_color,
    height: scale(32),
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.s6,
    borderRadius: moderateScale(4),
  },
  btnText: {
    color: colors.white,
    fontSize: fontSize.t3,
    fontFamily: fontFamily.SEMI_BOLD,
    textAlign: "center",
  },
  result: {
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.8)",
    paddingHorizontal: moderateScale(4),
  },
  textStyle: {
    fontSize: fontSize.t4,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.9)",
    textAlign: "auto",
  },
  hightLightText: {
    fontSize: fontSize.t3,
    fontFamily: fontFamily.SEMI_BOLD,
    color: colors.back_btn_color,
  },
  errorContainer: {
    borderRadius: moderateScale(4),
    marginTop: moderateScale(4),
  },
  errorText: {
    color: colors.danger,
    fontFamily: fontFamily.REGULAR,
    fontSize: fontSize.t3,
  },
});
