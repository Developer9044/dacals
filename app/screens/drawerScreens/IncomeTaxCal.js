import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChildScreenContainerWithBackGround from "../../components/ChildScreenContainerWithBackGround";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";
import fontFamily from "../../constants/fontFamily";
import SelectedItem from "../../components/SelectedItem";
import {
  age_category_data,
  financial_data,
  metroYesNo,
  residentail_data,
} from "../../components/dropdownData";
import CustomDropdown from "../../custom_hooks/CustomDropdown";
import CustomDrop from "../../custom_hooks/CustomDrop";
import LableTextInput from "../../components/Income/LableTextInput";
import ResultLableCom from "../../components/ResultLableCom";

const IncomeTaxCal = ({ route }) => {
  const { title } = route?.params;
  // const [ageCategory, setAgeCategory] = useState(
  //   "Below 60 years (Regular Citizen)"
  // );
  const [financialYear, setFinancialYear] = useState("2022-2023");
  const [residentialStatus, setResidentialStatus] = useState("RES (Resident)");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openDropdown2, setOpenDropdown2] = useState(null);

  //TODO ====================INCOME DETAILS==================
  const [gross, setGross] = useState(0);
  const [incomeVal, setIncomeVal] = useState(0);
  const [intertainmentAllownce, setIntertainmentAllownce] = useState(0);
  const [professinalTax, setProfessinalTax] = useState(0);
  const [incomefromInterest, setIncomeFromInterest] = useState(0);
  const [otherInterest, setOtherInterest] = useState(0);
  const [rentalIncomeReceived, setRentalIncomeReceived] = useState(0);
  const [incomeFromDigitalAssets, setIncomeFromDigitalAssets] = useState(0);
  const [shortTermCapitalGain, setShortTermCapitalGain] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [businessImcome, setBusinessImcome] = useState(0);
  const [exemptAllowances, setExemptAllowances] = useState(0);
  const [interestOnHomeLoanLetOut, setInterestOnHomeLoanLetOut] = useState(0);
  //TODO ====================New Regim==================
  const [taxAtNormal, setTaxAtNormal] = useState(0);
  const [taxBeforeRebate, setTaxBeforeRebate] = useState(0);
  const [taxRebate, setTaxRebate87A] = useState(0);
  const [taxAfterRebate, setTaxAfterRebate] = useState(0);
  const [surcharge, setSurcharge] = useState(0);
  const [healthEducation, setHealthEducation] = useState(0);
  const [totalTaxOnIncome, setTotalTaxOnIncome] = useState(0);

  //TODO ==================== Old Regim==================
  const [oldTaxAtNormal, setOldTaxAtNormal] = useState(0);
  const [oldTaxBeforeRebate, setOldTaxBeforeRebate] = useState(0);
  const [oldTaxRebate, setOldTaxRebate87A] = useState(0);
  const [oldTaxAfterRebate, setOldTaxAfterRebate] = useState(0);
  const [oldTurcharge, setOldSurcharge] = useState(0);
  const [oldTealthEducation, setOldHealthEducation] = useState(0);
  const [oldTotalTaxOnIncome, setOldTotalTaxOnIncome] = useState(0);
  //TODO ====================HRA DEATILS==================
  const [basicHRA, setBasicHRA] = useState(0);
  const [dearnessHRA, setDearnessHRA] = useState(0);
  const [receivedHRA, setReceivedHRA] = useState(0);
  const [rentPaidHRA, setRentPaidHRA] = useState(0);
  const [metroCityHRA, setMetroCityHRA] = useState("yes");
  const [displayValue, setDisplayValue] = useState("yes");
  const [ageCategory, setAgeCategory] = useState("60");
  const [hraFinal, setHraFinal] = useState(0);

  // console.log("ageCategory", ageCategory);

  const [newRegime, setNewRegime] = useState(false);
  const [lessIncomeVal, setLessIncomeVal] = useState(0);
  const [capGain, setCapGain] = useState(0);

  //TODO ====================DEDUCTION DEATILS==================
  const [d80C, setD80C] = useState(0);
  const [d80D, setD80D] = useState(0);
  const [d80E, setD80E] = useState(0);
  const [d80CCD, setD80CCD] = useState(0);
  const [d80TTA, setD80TTA] = useState(0);
  const [d80G, setD80G] = useState(0);
  const [d80EEA, setD80EEA] = useState(0);
  const [interestOnHomeLoanSelfOccupied, setInterestOnHomeLoanSelfOccupied] =
    useState(0);

  //TODO ====================All Function old code==================

  useEffect(() => {
    let shorPer = (parseInt(shortTermCapitalGain) * 15) / 100;
    let longPer = (parseInt(incomeFromDigitalAssets) * 10) / 100;
    let totalPer = parseInt(shorPer) + parseInt(longPer);
    setCapGain(totalPer);
  }, [incomeFromDigitalAssets, shortTermCapitalGain]);

  useEffect(() => {
    let sum =
      parseInt(incomeVal) -
      parseInt(lessIncomeVal) +
      parseInt(incomefromInterest) +
      parseInt(rentalIncomeReceived) +
      parseInt(incomeFromDigitalAssets) +
      parseInt(otherIncome) +
      parseInt(exemptAllowances) +
      parseInt(shortTermCapitalGain) +
      parseInt(otherInterest) +
      parseInt(businessImcome) -
      parseInt(professinalTax) -
      parseInt(intertainmentAllownce);

    let deduct =
      parseInt(d80C) +
      parseInt(professinalTax) +
      parseInt(intertainmentAllownce) +
      parseInt(d80D) +
      parseInt(d80E) +
      parseInt(d80CCD) +
      parseInt(incomefromInterest >= d80TTA ? d80TTA : 0) +
      parseInt(d80G) +
      parseInt(d80EEA);
    // - parseInt(interestOnHomeLoanSelfOccupied)
    // - parseInt(interestOnHomeLoanLetOut)
    let hrsPer = 0;
    if (metroCityHRA == "yes") {
      hrsPer = 50;
    } else {
      hrsPer = 40;
    }
    let baisc = parseInt(basicHRA) + parseInt(dearnessHRA);
    let perAll = (baisc * hrsPer) / 100;
    let basic10 = (baisc * 10) / 100;
    let hra = parseInt(rentPaidHRA) - basic10;
    let arr = [perAll, parseInt(receivedHRA), hra < 0 ? 0 : hra];

    setDisplayValue(sum);

    arr.sort(function (a, b) {
      return a - b;
    });
    setHraFinal(arr[0]);
    if (sum > deduct && sum > arr[0]) {
      setGross(sum - deduct - arr[0]);
    } else {
      setGross(0);
    }
  }, [
    incomeVal,
    incomefromInterest,
    rentalIncomeReceived,
    incomeFromDigitalAssets,
    otherIncome,
    exemptAllowances,
    interestOnHomeLoanSelfOccupied,
    interestOnHomeLoanLetOut,
    d80C,
    d80D,
    d80E,
    d80CCD,
    d80TTA,
    d80G,
    d80EEA,
    basicHRA,
    dearnessHRA,
    receivedHRA,
    rentPaidHRA,
    metroCityHRA,
    otherInterest,
    businessImcome,
    shortTermCapitalGain,
    intertainmentAllownce,
    professinalTax,
  ]);

  const clearState = () => {
    setTaxAtNormal(0);
    setTaxBeforeRebate(0);
    setTaxRebate87A(0);
    setTaxAfterRebate(0);
    setSurcharge(0);
    setHealthEducation(0);
    setTotalTaxOnIncome(0);
    setOldTaxAtNormal(0);
    setOldTaxBeforeRebate(0);
    setOldTaxRebate87A(0);
    setOldTaxAfterRebate(0);
    setOldSurcharge(0);
    setOldHealthEducation(0);
    setOldTotalTaxOnIncome(0);
  };

  useEffect(() => {
    calculateIncomeTax();
    oldRegimCalculator();
  }, [
    incomeVal,
    incomefromInterest,
    rentalIncomeReceived,
    incomeFromDigitalAssets,
    otherIncome,
    gross,
    ageCategory,
    businessImcome,
    shortTermCapitalGain,
  ]);

  const calculateIncomeTax = () => {
    if (
      businessImcome > 0 &&
      incomeVal == 0 &&
      incomefromInterest == 0 &&
      rentalIncomeReceived == 0 &&
      incomeFromDigitalAssets == 0 &&
      shortTermCapitalGain == 0 &&
      otherIncome == 0 &&
      interestOnHomeLoanSelfOccupied == 0 &&
      interestOnHomeLoanLetOut == 0 &&
      otherInterest == 0 &&
      professinalTax == 0 &&
      intertainmentAllownce == 0
    ) {
      let tax = 0;
      clearState();
      let income = businessImcome;
      if (income <= 300000) {
        tax = 0;
      } else if (income > 300000 && income <= 600000) {
        tax = (income - 300000) * 0.05;
      } else if (income > 600001 && income <= 900000) {
        tax = 300000 * 0.05 + (income - 600000) * 0.1;
      } else if (income > 900001 && income <= 1200000) {
        tax = 300000 * 0.05 + 300000 * 0.1 + (income - 900000) * 0.15;
      } else if (income > 1200001 && income <= 1500000) {
        tax =
          300000 * 0.05 +
          300000 * 0.1 +
          300000 * 0.15 +
          (income - 1200000) * 0.2;
      } else {
        tax =
          300000 * 0.05 +
          300000 * 0.1 +
          300000 * 0.15 +
          300000 * 0.2 +
          (income - 1500000) * 0.3;
      }
      if (income > 0 && income <= 700000) {
        setTaxAtNormal(parseInt(tax));
        setTaxBeforeRebate(parseInt(tax));
        setTaxRebate87A(parseInt(tax));
        setTaxAfterRebate(0);
        setSurcharge(0);
        setHealthEducation(0);
        setTotalTaxOnIncome(0);
      } else if (income > 700000 && income <= 10000000) {
        if (income > 700000 && income <= 727776) {
          let diff = 0;
          diff = income - 700000;
          let A = 0;
          A = tax - diff;
          let H = 0;
          H = (diff * 4) / 100;
          let N = 0;
          N = diff + H;
          setTaxAtNormal(parseInt(tax));
          setTaxBeforeRebate(parseInt(tax));
          setTaxRebate87A(parseInt(A));
          setTaxAfterRebate(parseInt(diff));
          setSurcharge(0);
          setHealthEducation(parseInt(H));
          setTotalTaxOnIncome(parseInt(N));
        } else if (income > 727776 && income <= 5000000) {
          let HE = 0;
          HE = (tax * 4) / 100;
          setTaxAtNormal(parseInt(tax));
          setTaxBeforeRebate(parseInt(tax));
          setTaxRebate87A(0);
          setTaxAfterRebate(parseInt(tax));
          setSurcharge(0);
          setHealthEducation(parseInt(HE));
          setTotalTaxOnIncome(parseInt(Math.floor(tax) + HE));
        } else if (income > 5000000 && income <= 10000000) {
          let difference = 0;
          difference = income - 5000000;
          difference = (difference * 70) / 100;
          let HE = 0;
          let Surcharge = 0;
          Surcharge = (parseInt(tax) * 10) / 100;
          if (
            difference < Surcharge &&
            income >= 5000001 &&
            income <= 5179103
          ) {
            HE = ((tax + difference) * 4) / 100;
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(0);
            setTaxAfterRebate(parseInt(tax));
            setSurcharge(Math.ceil(difference));
            setHealthEducation(parseInt(HE));
            setTotalTaxOnIncome(
              parseInt(Math.floor(tax) + HE + Math.ceil(difference))
            );
          } else if (
            difference > Surcharge &&
            income > 5179103 &&
            income <= 10000000
          ) {
            HE = ((tax + Surcharge) * 4) / 100;
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(0);
            setTaxAfterRebate(parseInt(tax));
            setSurcharge(parseInt(Surcharge));
            setHealthEducation(parseInt(HE));
            setTotalTaxOnIncome(
              parseInt(Math.floor(tax) + HE + Math.floor(Surcharge))
            );
          }
        }
      } else if (income > 10000000 && income <= 20000000) {
        let Surcharge = 0;
        let difference = 0;
        let HE = 0;
        if (income > 10000000 && income <= 10206105) {
          Surcharge = (2700000 * 10) / 100;
          difference = income - 10000000;
          difference = (difference * 70) / 100;
          difference = difference + Surcharge;
          HE = ((tax + difference) * 4) / 100;
          setTaxAtNormal(parseInt(tax));
          setTaxBeforeRebate(parseInt(tax));
          setTaxRebate87A(0);
          setTaxAfterRebate(parseInt(tax));
          setSurcharge(Math.ceil(difference));
          setHealthEducation(parseInt(HE));
          setTotalTaxOnIncome(
            parseInt(Math.floor(tax) + HE + Math.ceil(difference))
          );
        } else if (income > 10206105 && income <= 20000000) {
          Surcharge = (tax * 15) / 100;
          HE = ((tax + Surcharge) * 4) / 100;
          setTaxAtNormal(parseInt(tax));
          setTaxBeforeRebate(parseInt(tax));
          setTaxRebate87A(0);
          setTaxAfterRebate(parseInt(tax));
          setSurcharge(Math.ceil(Surcharge));
          setHealthEducation(parseInt(HE));
          setTotalTaxOnIncome(
            parseInt(Math.floor(tax) + HE + parseInt(Surcharge))
          );
        }
      } else if (income > 20000000) {
        let Surcharge = 0;
        let HE = 0;
        let difference = 0;
        if (income >= 20000001 && income <= 20912000) {
          Surcharge = (5700000 * 15) / 100;
          difference = income - 20000000;
          difference = (difference * 70) / 100;
          difference = difference + Surcharge;
          HE = ((tax + difference) * 4) / 100;

          setTaxAtNormal(parseInt(tax));
          setTaxBeforeRebate(parseInt(tax));
          setTaxRebate87A(0);
          setTaxAfterRebate(parseInt(tax));
          setSurcharge(Math.ceil(difference));
          setHealthEducation(parseInt(HE));
          setTotalTaxOnIncome(
            parseInt(Math.floor(tax) + HE + Math.ceil(difference))
          );
        } else if (income > 20912000) {
          let Surcharge = 0;
          let HE = 0;
          // let difference=0;
          Surcharge = (tax * 25) / 100;
          HE = ((tax + Surcharge) * 4) / 100;
          setTaxAtNormal(parseInt(tax));
          setTaxBeforeRebate(parseInt(tax));
          setTaxRebate87A(0);
          setTaxAfterRebate(parseInt(tax));
          setSurcharge(parseInt(Surcharge));
          setHealthEducation(parseInt(HE));
          setTotalTaxOnIncome(
            parseInt(Math.floor(tax) + HE + parseInt(Surcharge))
          );
        }
      }

      // End bussiness calculation
    } else {
      clearState();
      let tax = 0;
      const income =
        displayValue +
        parseInt(professinalTax) +
        parseInt(intertainmentAllownce);
      if (ageCategory == "60") {
        // debugger
        if (income > 0 && income <= 10000000) {
          if (income > 0 && income < 300000) {
            tax = 0;
          } else if (income >= 300000 && income <= 650000) {
            tax = (income - 300000) * 0.05;
          } else if (income > 650000 && income <= 900000) {
            tax = 300000 * 0.05 + (income - 600000) * 0.1;
          } else if (income > 900000 && income <= 1200000) {
            tax = 300000 * 0.05 + 300000 * 0.1 + (income - 900000) * 0.15;
          } else if (income > 1200000 && income <= 1500000) {
            tax =
              300000 * 0.05 +
              300000 * 0.1 +
              300000 * 0.15 +
              (income - 1200000) * 0.2;
          } else {
            tax =
              300000 * 0.05 +
              300000 * 0.1 +
              300000 * 0.15 +
              300000 * 0.2 +
              (income - 1500000) * 0.3;
          }
          // console.log(tax)
          // debugger
          const diff = income - 5000000 - (tax - 1200000);
          const diff1 = income - 1500000 - (tax - 750000);
          const y = Math.abs(diff1) - 50000;
          let D = 0;
          D = ((tax - y) * 4) / 100;
          let Surcharge = 0;
          let Edu_Cess = 0;
          let sur = 0;
          Surcharge = (tax * 10) / 100;
          Edu_Cess = ((tax + diff) * 4) / 100;
          sur = ((tax + Surcharge) * 4) / 100;
          let Education_Cess = 0;
          Education_Cess = (tax * 4) / 100;
          const Totalpaytax = tax + Education_Cess;
          let b = 0;
          b = income - 750000;
          let c = 0;

          c = income;
          let tttt = 300000 * 0.05 + (c - 600000) * 0.1;
          const aaaaaa = income - 700000;
          // console.log(income)
          const ooo = tax - aaaaaa;

          if (income > 0 && income <= 300019) {
            setTaxAtNormal(parseInt(0));
            setTaxBeforeRebate(parseInt(0));
            setTaxRebate87A(parseInt(0));
            setTaxAfterRebate(0);
            setSurcharge(0);
            setHealthEducation(parseInt(0));
            setTotalTaxOnIncome(0);
          }
          // else if (income > 300019 && income <= 600008) {
          //     setTaxAtNormal(parseInt(0));
          //     setTaxBeforeRebate(parseInt(0));
          //     setTaxRebate87A(parseInt(0));
          //     setTaxAfterRebate(0);
          //     setSurcharge(0);
          //     setHealthEducation(parseInt(0));
          //     setTotalTaxOnIncome(0);
          // }
          else if (c > 300019 && c <= 600009) {
            // console.log("hi")
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(parseInt(tax));
            setTaxAfterRebate(0);
            setSurcharge(0);
            setHealthEducation(parseInt(0));
            setTotalTaxOnIncome(0);
          } else if (c > 600009 && c <= 700000) {
            // console.log(income)
            setTaxAtNormal(parseInt(tttt));
            setTaxBeforeRebate(parseInt(tttt));
            setTaxRebate87A(parseInt(tttt));
            setTaxAfterRebate(0);
            setSurcharge(0);
            setHealthEducation(parseInt(0));
            setTotalTaxOnIncome(0);
          } else if (income > 700000 && income <= 700024) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(parseInt(ooo));
            setTaxAfterRebate(parseInt(aaaaaa));
            setSurcharge(0);
            setHealthEducation(0);
            setTotalTaxOnIncome(parseInt(aaaaaa));
          } else if (income > 700024 && income <= 727777) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(parseInt(ooo));
            setTaxAfterRebate(Math.round(aaaaaa));
            setSurcharge(0);
            setHealthEducation(Math.round((aaaaaa * 4) / 100));
            setTotalTaxOnIncome(
              parseInt(aaaaaa + Math.round((aaaaaa * 4) / 100))
            );
          } else if (income > 727777 && income <= 775000) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(0);
            setTaxAfterRebate(parseInt(tax));
            setSurcharge(0);
            setHealthEducation(parseInt((tax * 4) / 100));
            setTotalTaxOnIncome(
              parseInt(parseInt(tax) + parseInt(tax * 4) / 100)
            );
          } else if (income > 775000 && income < 1500000) {
            const sur = 0;
            const E = (b * 4) / 100;

            if (tax - b < 0) {
              const T = parseInt(tax);
              const F = parseInt((tax * 4) / 100);
              setTaxAtNormal(parseInt(T));
              setTaxBeforeRebate(parseInt(T));
              setTaxRebate87A(0);
              setTaxAfterRebate(parseInt(T));
              setSurcharge(parseInt(sur));
              setHealthEducation(parseInt(F));
              setTotalTaxOnIncome(parseInt(T + F));
            } else if (tax - b > 0) {
              setTaxAtNormal(parseInt(tax));
              setTaxBeforeRebate(parseInt(tax));
              setTaxRebate87A(parseInt(tax - b));
              setTaxAfterRebate(parseInt(b));
              setSurcharge(parseInt(sur));
              setHealthEducation(parseInt(D));
              setTotalTaxOnIncome(parseInt(D + b));
            }
          } else if (income >= 1500000 && income <= 5000000) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(0);
            setTaxAfterRebate(parseInt(tax));
            setSurcharge(0);
            setHealthEducation(parseInt(Education_Cess));
            setTotalTaxOnIncome(parseInt(Education_Cess + tax));
          } else if (
            diff > Surcharge &&
            income > 5000000 &&
            income <= 10000000
          ) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(0);
            setTaxAfterRebate(parseInt(tax));
            setSurcharge(parseInt(Surcharge));
            setHealthEducation(parseInt(sur));
            setTotalTaxOnIncome(parseInt(tax + Surcharge + sur));
          } else if (
            diff < Surcharge &&
            income > 5000000 &&
            income <= 10000000
          ) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(0);
            setTaxAfterRebate(parseInt(tax));
            setSurcharge(parseInt(diff));
            setHealthEducation(parseInt(Edu_Cess));
            setTotalTaxOnIncome(parseInt(tax + Edu_Cess + diff));
          }
        } else if (income > 10000000 && income < 20000000) {
          // tax = (300000 * 0.05) + (300000 * 0.10) + (300000 * 0.15) + (300000 * 0.20) + ((income - 50000) - 1500000) * 0.30
          if (income > 10000000 && income < 20050000) {
            tax =
              300000 * 0.05 +
              300000 * 0.1 +
              300000 * 0.15 +
              300000 * 0.2 +
              (income - 1500000) * 0.3;
          }
          let diff = 0;
          let sur = 0;
          let edu_cess1 = 0;
          if (income > 10000000 && income <= 10050000) {
            diff = income - 10000000 - (tax - 2700000);
            sur = (tax * 10) / 100;
            edu_cess1 = ((sur + parseInt(tax)) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sur);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 10050000 && income <= 10060000) {
            diff = income - 10000000 - (tax - 2700000);
            sur = 270000 + diff;
            edu_cess1 = ((sur + parseInt(tax)) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sur);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 10060000 && income <= 10110000) {
            diff = income - 10000000 - (tax - 2700000);
            sur = 270000 + diff;
            edu_cess1 = ((sur + parseInt(tax)) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sur);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 10110000 && income < 20000000) {
            const sssss = parseInt((tax * 15) / 100);
            diff = income - 10000000 - (tax - 2700000);
            sur = 270000 + diff;
            edu_cess1 = ((sssss + parseInt(tax)) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sur);

            // console.log("sur",tax*15/100)
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(sssss);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + sssss + E1);
          }
        } else if (income >= 20000000 && income < 50000000) {
          if (income >= 20000000 && income <= 50000000) {
            tax =
              300000 * 0.05 +
              300000 * 0.1 +
              300000 * 0.15 +
              300000 * 0.2 +
              (income - 1500000) * 0.3;
          }

          let diff = 0;
          let sur = 0;
          let edu_cess1 = 0;
          if (income >= 20000000 && income <= 20050000) {
            diff = income - 20000000 - (tax - 855000);
            sur = (tax * 15) / 100;
            edu_cess1 = ((sur + parseInt(tax)) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sur);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 20050000 && income <= 20060000) {
            const C = income - 50000 - 20000000;
            const A = 5700000 + (C * 30) / 100;
            const B = (A * 25) / 100;
            const D = C - (A - 5700000);
            const sss = (5700000 * 15) / 100 + D;
            edu_cess1 = ((tax + sss) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sss);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 20060000 && income <= 20110000) {
            const C = income - 50000 - 20000000;
            const A = 5700000 + (C * 30) / 100;
            const B = (A * 25) / 100;
            const D = C - (A - 5700000);
            const sss = (5700000 * 15) / 100 + D;
            edu_cess1 = ((tax + sss) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sss);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 20110000 && income < 50000000) {
            const T = parseInt(tax);
            const sss = (T * 25) / 100;
            const S = parseInt(sss);
            edu_cess1 = ((T + S) * 4) / 100;
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(T);
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          }
        } else if (income >= 50000000) {
          let edu_cess1 = 0;
          if (income >= 50000000) {
            tax =
              300000 * 0.05 +
              300000 * 0.1 +
              300000 * 0.15 +
              300000 * 0.2 +
              (income - 1500000) * 0.3;
          }
          const T = parseInt(tax);
          const sss = (T * 25) / 100;
          // console.log(T * 30 / 100)
          const S = parseInt(sss);
          edu_cess1 = ((T + S) * 4) / 100;
          const E1 = parseInt(edu_cess1);
          setTaxAtNormal(T);
          setTaxBeforeRebate(T);
          setTaxRebate87A("0");
          setTaxAfterRebate(T);
          setSurcharge(S);
          setHealthEducation(E1);
          setTotalTaxOnIncome(T + S + E1);
        }
      } else if (ageCategory == "60-79") {
        if (income > 0 && income <= 10000000) {
          if (income > 0 && income <= 300000) {
            tax = 0;
          } else if (income > 300000 && income <= 650000) {
            tax = (income - 300000) * 0.05;
          } else if (income > 650000 && income <= 900000) {
            tax = 300000 * 0.05 + (income - 600000) * 0.1;
          } else if (income > 900000 && income <= 1200000) {
            tax = 300000 * 0.05 + 300000 * 0.1 + (income - 900000) * 0.15;
          } else if (income > 1200000 && income <= 1500000) {
            tax =
              300000 * 0.05 +
              300000 * 0.1 +
              300000 * 0.15 +
              (income - 1200000) * 0.2;
          } else {
            tax =
              300000 * 0.05 +
              300000 * 0.1 +
              300000 * 0.15 +
              300000 * 0.2 +
              (income - 1500000) * 0.3;
          }
          // debugger
          const diff = income - 5000000 - (tax - 1200000);
          const diff1 = income - 1500000 - (tax - 750000);
          const y = Math.abs(diff1) - 50000;
          let D = 0;
          D = ((tax - y) * 4) / 100;
          let Surcharge = 0;
          let Edu_Cess = 0;
          let sur = 0;
          Surcharge = (tax * 10) / 100;
          Edu_Cess = ((tax + diff) * 4) / 100;
          sur = ((tax + Surcharge) * 4) / 100;
          let Education_Cess = 0;
          Education_Cess = (tax * 4) / 100;
          const Totalpaytax = tax + Education_Cess;
          let b = 0;
          b = income - 750000;
          let c = 0;

          c = income;
          let tttt = 300000 * 0.05 + (c - 600000) * 0.1;
          const aaaaaa = income - 700000;
          // console.log(income)
          const ooo = tax - aaaaaa;

          // console.log("newwww",parseInt(tax))
          // console.log("income",income)
          // const aaa=tax-2500;

          if (income > 0 && income <= 300019) {
            setTaxAtNormal(parseInt(0));
            setTaxBeforeRebate(parseInt(0));
            setTaxRebate87A(parseInt(0));
            setTaxAfterRebate(0);
            setSurcharge(0);
            setHealthEducation(parseInt(0));
            setTotalTaxOnIncome(0);
          } else if (income > 300019 && income <= 500004) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(parseInt(tax));
            setTaxAfterRebate(0);
            setSurcharge(0);
            setHealthEducation(parseInt(0));
            setTotalTaxOnIncome(0);
          } else if (c > 500004 && c <= 600009) {
            // console.log("hi")
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(parseInt(tax));
            setTaxAfterRebate(0);
            setSurcharge(0);
            setHealthEducation(parseInt(0));
            setTotalTaxOnIncome(0);
          } else if (c > 600009 && c <= 700000) {
            // console.log(income)
            setTaxAtNormal(parseInt(tttt));
            setTaxBeforeRebate(parseInt(tttt));
            setTaxRebate87A(parseInt(tttt));
            setTaxAfterRebate(0);
            setSurcharge(0);
            setHealthEducation(parseInt(0));
            setTotalTaxOnIncome(0);
          } else if (income > 700000 && income <= 700024) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(parseInt(ooo));
            setTaxAfterRebate(parseInt(aaaaaa));
            setSurcharge(0);
            setHealthEducation(0);
            setTotalTaxOnIncome(parseInt(aaaaaa));
          } else if (income > 700024 && income <= 727777) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(parseInt(ooo));
            setTaxAfterRebate(Math.round(aaaaaa));
            setSurcharge(0);
            setHealthEducation(Math.round((aaaaaa * 4) / 100));
            setTotalTaxOnIncome(
              parseInt(aaaaaa + Math.round((aaaaaa * 4) / 100))
            );
          } else if (income > 727777 && income <= 775000) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(0);
            setTaxAfterRebate(parseInt(tax));
            setSurcharge(0);
            setHealthEducation(parseInt((tax * 4) / 100));
            setTotalTaxOnIncome(
              parseInt(parseInt(tax) + parseInt(tax * 4) / 100)
            );
          } else if (income > 775000 && income < 1500000) {
            const sur = 0;
            const E = (b * 4) / 100;
            if (tax - b < 0) {
              const T = parseInt(tax);
              const F = parseInt((tax * 4) / 100);
              setTaxAtNormal(parseInt(T));
              setTaxBeforeRebate(parseInt(T));
              setTaxRebate87A(0);
              setTaxAfterRebate(parseInt(T));
              setSurcharge(parseInt(sur));
              setHealthEducation(parseInt(F));
              setTotalTaxOnIncome(parseInt(T + F));
            } else if (tax - b > 0) {
              setTaxAtNormal(parseInt(tax));
              setTaxBeforeRebate(parseInt(tax));
              setTaxRebate87A(parseInt(tax - b));
              setTaxAfterRebate(parseInt(b));
              setSurcharge(parseInt(sur));
              setHealthEducation(parseInt(D));
              setTotalTaxOnIncome(parseInt(D + b));
            }
          } else if (income >= 1500000 && income <= 5000000) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(0);
            setTaxAfterRebate(parseInt(tax));
            setSurcharge(0);
            setHealthEducation(parseInt(Education_Cess));
            setTotalTaxOnIncome(parseInt(Education_Cess + tax));
          } else if (
            diff > Surcharge &&
            income > 5000000 &&
            income <= 10000000
          ) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(0);
            setTaxAfterRebate(parseInt(tax));
            setSurcharge(parseInt(Surcharge));
            setHealthEducation(parseInt(sur));
            setTotalTaxOnIncome(parseInt(tax + Surcharge + sur));
          } else if (
            diff < Surcharge &&
            income > 5000000 &&
            income <= 10000000
          ) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(0);
            setTaxAfterRebate(parseInt(tax));
            setSurcharge(parseInt(diff));
            setHealthEducation(parseInt(Edu_Cess));
            setTotalTaxOnIncome(parseInt(tax + Edu_Cess + diff));
          }
        } else if (income > 10000000 && income < 20000000) {
          // tax = (300000 * 0.05) + (300000 * 0.10) + (300000 * 0.15) + (300000 * 0.20) + ((income - 50000) - 1500000) * 0.30
          if (income > 10000000 && income < 20050000) {
            tax =
              300000 * 0.05 +
              300000 * 0.1 +
              300000 * 0.15 +
              300000 * 0.2 +
              (income - 1500000) * 0.3;
          }
          let diff = 0;
          let sur = 0;
          let edu_cess1 = 0;
          if (income > 10000000 && income <= 10050000) {
            diff = income - 10000000 - (tax - 2700000);
            sur = (tax * 10) / 100;
            edu_cess1 = ((sur + parseInt(tax)) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sur);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 10050000 && income <= 10060000) {
            diff = income - 10000000 - (tax - 2700000);
            sur = 270000 + diff;
            edu_cess1 = ((sur + parseInt(tax)) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sur);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 10060000 && income <= 10110000) {
            diff = income - 10000000 - (tax - 2700000);
            sur = 270000 + diff;
            edu_cess1 = ((sur + parseInt(tax)) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sur);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 10110000 && income < 20000000) {
            diff = income - 10000000 - (tax - 2700000);
            sur = 270000 + diff;
            edu_cess1 = ((sur + parseInt(tax)) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sur);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          }
        } else if (income >= 20000000 && income < 50000000) {
          if (income >= 20000000 && income <= 50000000) {
            tax =
              300000 * 0.05 +
              300000 * 0.1 +
              300000 * 0.15 +
              300000 * 0.2 +
              (income - 1500000) * 0.3;
          }

          let diff = 0;
          let sur = 0;
          let edu_cess1 = 0;
          if (income >= 20000000 && income <= 20050000) {
            diff = income - 20000000 - (tax - 855000);
            sur = (tax * 15) / 100;
            edu_cess1 = ((sur + parseInt(tax)) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sur);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 20050000 && income <= 20060000) {
            const C = income - 50000 - 20000000;
            const A = 5700000 + (C * 30) / 100;
            const B = (A * 25) / 100;
            const D = C - (A - 5700000);
            const sss = (5700000 * 15) / 100 + D;
            edu_cess1 = ((tax + sss) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sss);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 20060000 && income <= 20110000) {
            const C = income - 50000 - 20000000;
            const A = 5700000 + (C * 30) / 100;
            const B = (A * 25) / 100;
            const D = C - (A - 5700000);
            const sss = (5700000 * 15) / 100 + D;
            edu_cess1 = ((tax + sss) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sss);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 20110000 && income < 50000000) {
            const T = parseInt(tax);
            const sss = (T * 25) / 100;
            const S = parseInt(sss);
            edu_cess1 = ((T + S) * 4) / 100;
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(T);
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          }
        } else if (income >= 50000000) {
          let edu_cess1 = 0;
          if (income >= 50000000) {
            tax =
              300000 * 0.05 +
              300000 * 0.1 +
              300000 * 0.15 +
              300000 * 0.2 +
              (income - 1500000) * 0.3;
          }
          const T = parseInt(tax);
          const sss = (T * 25) / 100;
          const S = parseInt(sss);
          edu_cess1 = ((T + S) * 4) / 100;
          const E1 = parseInt(edu_cess1);
          setTaxAtNormal(T);
          setTaxBeforeRebate(T);
          setTaxRebate87A("0");
          setTaxAfterRebate(T);
          setSurcharge(S);
          setHealthEducation(E1);
          setTotalTaxOnIncome(T + S + E1);
        }
      } else if (ageCategory == "80") {
        //   debugger
        if (income > 0 && income <= 10000000) {
          if (income > 0 && income <= 350000) {
            tax = 0;
          } else if (income > 350000 && income <= 600000) {
            tax = (income - 300000) * 0.05;
          } else if (income > 600000 && income <= 900000) {
            tax = 300000 * 0.05 + (income - 600000) * 0.1;
          } else if (income > 900000 && income <= 1200000) {
            tax = 300000 * 0.05 + 300000 * 0.1 + (income - 900000) * 0.15;
          } else if (income > 1200000 && income <= 1500000) {
            tax =
              300000 * 0.05 +
              300000 * 0.1 +
              300000 * 0.15 +
              (income - 1200000) * 0.2;
          } else {
            tax =
              300000 * 0.05 +
              300000 * 0.1 +
              300000 * 0.15 +
              300000 * 0.2 +
              (income - 1500000) * 0.3;
          }
          //  console.log(tax)
          // debugger
          const diff = income - 5000000 - (tax - 1200000);
          const diff1 = income - 1500000 - (tax - 750000);
          const y = Math.abs(diff1) - 50000;
          let D = 0;
          D = ((tax - y) * 4) / 100;
          let Surcharge = 0;
          let Edu_Cess = 0;
          let sur = 0;
          Surcharge = (tax * 10) / 100;
          Edu_Cess = ((tax + diff) * 4) / 100;
          sur = ((tax + Surcharge) * 4) / 100;
          let Education_Cess = 0;
          Education_Cess = (tax * 4) / 100;
          const Totalpaytax = tax + Education_Cess;
          let b = 0;
          b = income - 750000;
          let c = 0;

          // console.log(tax)
          // console.log(income)
          c = income - 50000;
          let tttt = 300000 * 0.05 + (c - 600000) * 0.1;
          // console.log(tax)
          // console.log(tttt)
          // console.log(aaaaa)
          // console.log(tax-10000)
          // const A=  (income - 300000) * 0.05;
          // console.log(income)
          let tx = 0;
          tx = tax - 10000;
          // console.log(tax)
          // debugger
          //    console.log(income)
          if (income > 1 && income <= 500019) {
            //    console.log("hi")
            setTaxAtNormal(parseInt(0));
            setTaxBeforeRebate(parseInt(0));
            setTaxRebate87A(parseInt(0));
            setTaxAfterRebate(0);
            setSurcharge(0);
            setHealthEducation(parseInt(0));
          } else if (income > 500019 && income <= 600000) {
            // console.log(income)
            // console.log("yes")
            setTaxAtNormal(parseInt(tx));
            setTaxBeforeRebate(parseInt(tx));
            setTaxRebate87A(parseInt(tx));
            setTaxAfterRebate(0);
            setSurcharge(0);
            setHealthEducation(parseInt(0));
          } else if (income > 600000 && income <= 750000) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(0);
            setTaxAfterRebate(parseInt(tax));
            setSurcharge(0);
            setHealthEducation(parseInt((tax * 4) / 100));
            setTotalTaxOnIncome(parseInt(tax + (tax * 4) / 100));
          } else if (income > 750000 && income <= 775000) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(parseInt(tax - b));
            setTaxAfterRebate(parseInt(b));
            setSurcharge(0);
            setHealthEducation(parseInt((b * 4) / 100));
            setTotalTaxOnIncome(parseInt(b + (b * 4) / 100));
          } else if (income > 775000 && income < 1500000) {
            // console.log("income",income)
            // console.log("tax",tax)
            const sur = 0;
            const E = (b * 4) / 100;
            if (tax - b < 0) {
              const T = parseInt(tax);
              const F = parseInt((tax * 4) / 100);
              setTaxAtNormal(parseInt(T));
              setTaxBeforeRebate(parseInt(T));
              setTaxRebate87A(0);
              setTaxAfterRebate(parseInt(T));
              setSurcharge(parseInt(sur));
              setHealthEducation(parseInt(F));
              setTotalTaxOnIncome(parseInt(T + F));
            } else if (tax - b > 0) {
              setTaxAtNormal(parseInt(tax));
              setTaxBeforeRebate(parseInt(tax));
              setTaxRebate87A(parseInt(tax - b));
              setTaxAfterRebate(parseInt(b));
              setSurcharge(parseInt(sur));
              setHealthEducation(parseInt(D));
              setTotalTaxOnIncome(parseInt(D + b));
            }
          } else if (income >= 1500000 && income <= 5000000) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(0);
            setTaxAfterRebate(parseInt(tax));
            setSurcharge(0);
            setHealthEducation(parseInt(Education_Cess));
            setTotalTaxOnIncome(parseInt(Education_Cess + tax));
          } else if (
            diff > Surcharge &&
            income > 5000000 &&
            income <= 10000000
          ) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(0);
            setTaxAfterRebate(parseInt(tax));
            setSurcharge(parseInt(Surcharge));
            setHealthEducation(Math.round(sur));
            setTotalTaxOnIncome(parseInt(tax + Surcharge + Math.round(sur)));
          } else if (
            diff < Surcharge &&
            income > 5000000 &&
            income <= 10000000
          ) {
            setTaxAtNormal(parseInt(tax));
            setTaxBeforeRebate(parseInt(tax));
            setTaxRebate87A(0);
            setTaxAfterRebate(parseInt(tax));
            setSurcharge(Math.round(diff));
            setHealthEducation(parseInt(Edu_Cess));
            setTotalTaxOnIncome(parseInt(tax + Edu_Cess + Math.round(diff)));
          }
        } else if (income > 10000000 && income < 20000000) {
          // tax = (300000 * 0.05) + (300000 * 0.10) + (300000 * 0.15) + (300000 * 0.20) + ((income - 50000) - 1500000) * 0.30
          if (income > 10000000 && income < 20050000) {
            tax =
              300000 * 0.05 +
              300000 * 0.1 +
              300000 * 0.15 +
              300000 * 0.2 +
              (income - 1500000) * 0.3;
          }
          let diff = 0;
          let sur = 0;
          let edu_cess1 = 0;
          if (income > 10000000 && income <= 10050000) {
            diff = income - 10000000 - (tax - 2700000);
            sur = (tax * 10) / 100;
            edu_cess1 = ((sur + parseInt(tax)) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sur);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 10050000 && income <= 10060000) {
            diff = income - 10000000 - (tax - 2700000);
            sur = 270000 + diff;
            edu_cess1 = ((sur + parseInt(tax)) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sur);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 10060000 && income <= 10110000) {
            diff = income - 10000000 - (tax - 2700000);
            sur = 270000 + diff;
            edu_cess1 = ((sur + parseInt(tax)) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sur);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 10110000 && income < 20000000) {
            diff = income - 10000000 - (tax - 2700000);
            sur = 270000 + diff;
            edu_cess1 = ((sur + parseInt(tax)) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sur);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          }
        } else if (income >= 20000000 && income < 50000000) {
          if (income >= 20000000 && income <= 50000000) {
            tax =
              300000 * 0.05 +
              300000 * 0.1 +
              300000 * 0.15 +
              300000 * 0.2 +
              (income - 1500000) * 0.3;
          }

          let diff = 0;
          let sur = 0;
          let edu_cess1 = 0;
          if (income >= 20000000 && income <= 20050000) {
            diff = income - 20000000 - (tax - 855000);
            sur = (tax * 15) / 100;
            edu_cess1 = ((sur + parseInt(tax)) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sur);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 20050000 && income <= 20060000) {
            const C = income - 50000 - 20000000;
            const A = 5700000 + (C * 30) / 100;
            const B = (A * 25) / 100;
            const D = C - (A - 5700000);
            const sss = (5700000 * 15) / 100 + D;
            edu_cess1 = ((tax + sss) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sss);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 20060000 && income <= 20110000) {
            const C = income - 50000 - 20000000;
            const A = 5700000 + (C * 30) / 100;
            const B = (A * 25) / 100;
            const D = C - (A - 5700000);
            const sss = (5700000 * 15) / 100 + D;
            edu_cess1 = ((tax + sss) * 4) / 100;
            const T = parseInt(tax);
            const S = parseInt(sss);
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(parseInt(T));
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          } else if (income > 20110000 && income < 50000000) {
            const T = parseInt(tax);
            const sss = (T * 25) / 100;
            const S = parseInt(sss);
            edu_cess1 = ((T + S) * 4) / 100;
            const E1 = parseInt(edu_cess1);
            setTaxAtNormal(T);
            setTaxBeforeRebate(T);
            setTaxRebate87A("0");
            setTaxAfterRebate(T);
            setSurcharge(S);
            setHealthEducation(E1);
            setTotalTaxOnIncome(T + S + E1);
          }
        } else if (income >= 50000000) {
          let edu_cess1 = 0;
          if (income >= 50000000) {
            tax =
              300000 * 0.05 +
              300000 * 0.1 +
              300000 * 0.15 +
              300000 * 0.2 +
              (income - 1500000) * 0.3;
          }
          const T = parseInt(tax);
          const sss = (T * 25) / 100;
          const S = parseInt(sss);
          edu_cess1 = ((T + S) * 4) / 100;
          const E1 = parseInt(edu_cess1);
          setTaxAtNormal(T);
          setTaxBeforeRebate(T);
          setTaxRebate87A("0");
          setTaxAfterRebate(T);
          setSurcharge(S);
          setHealthEducation(E1);
          setTotalTaxOnIncome(T + S + E1);
        }
      }
    }
  };

  const oldRegimCalculator = () => {
    if (
      businessImcome > 0 &&
      incomeVal == 0 &&
      incomefromInterest == 0 &&
      rentalIncomeReceived == 0 &&
      incomeFromDigitalAssets == 0 &&
      shortTermCapitalGain == 0 &&
      otherIncome == 0 &&
      interestOnHomeLoanSelfOccupied == 0 &&
      interestOnHomeLoanLetOut == 0 &&
      otherInterest == 0
    ) {
      let Surcharge = 0;
      let HE = 0;
      let difference = 0;
      let taxableSum = businessImcome;
      let tax = 0;
      if (taxableSum > 0 && taxableSum <= 250019) {
        tax = 0;
      } else if (taxableSum > 250019 && taxableSum <= 500000) {
        tax = (taxableSum - 250000) * 0.05;
      } else if (taxableSum > 500000 && taxableSum <= 1000000) {
        tax = (taxableSum - 500000) * 0.2 + 250000 * 0.05;
      } else if (taxableSum > 1000000 && taxableSum <= 5000000) {
        tax = (taxableSum - 1000000) * 0.3 + 500000 * 0.2 + 250000 * 0.05;
      } else if (taxableSum > 5000000) {
        tax = (taxableSum - 1000000) * 0.3 + 500000 * 0.2 + 250000 * 0.05;
      }
      // console.log(tax)
      // debugger
      if (taxableSum > 0 && taxableSum <= 250019) {
        setOldTaxAtNormal(parseInt(tax));
        setOldTaxBeforeRebate(0);
        setOldTaxRebate87A(0);
        setOldTaxAfterRebate(0);
        setOldSurcharge(0);
        setOldHealthEducation(parseInt(0));
        setOldTotalTaxOnIncome(0);
      } else if (taxableSum > 250019 && taxableSum <= 500004) {
        // console.log("hi")
        setOldTaxAtNormal(parseInt(tax));
        setOldTaxBeforeRebate(parseInt(tax));
        setOldTaxRebate87A(parseInt(tax));
        setOldTaxAfterRebate(0);
        setOldSurcharge(0);
        setOldHealthEducation(parseInt(0));
        setOldTotalTaxOnIncome(0);
      } else if (taxableSum > 500004 && taxableSum <= 1000003) {
        // console.log("hi")
        const educess = (tax * 4) / 100;
        setOldTaxAtNormal(parseInt(tax));
        setOldTaxBeforeRebate(parseInt(tax));
        setOldTaxRebate87A(0);
        setOldTaxAfterRebate(parseInt(tax));
        setOldSurcharge(0);
        setOldHealthEducation(parseInt(educess));
        setOldTotalTaxOnIncome(parseInt(educess) + parseInt(tax));
      } else if (taxableSum > 1000003 && taxableSum <= 5000000) {
        const educess = (tax * 4) / 100;
        setOldTaxAtNormal(parseInt(tax));
        setOldTaxBeforeRebate(parseInt(tax));
        setOldTaxRebate87A(0);
        setOldTaxAfterRebate(parseInt(tax));
        setOldSurcharge(0);
        setOldHealthEducation(parseInt(educess));
        setOldTotalTaxOnIncome(parseInt(educess) + parseInt(tax));
      } else if (taxableSum > 5000000 && taxableSum <= 10000000) {
        let Surcharge = 0;
        Surcharge = (parseInt(tax) * 10) / 100;
        let difference = 0;
        difference = taxableSum - 5000000;
        difference = (difference * 70) / 100;

        let edu = 0;

        if (
          difference < Surcharge &&
          taxableSum > 5000000 &&
          taxableSum <= 10000000
        ) {
          edu = ((tax + difference) * 4) / 100;
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(Math.ceil(difference));
          setOldHealthEducation(parseInt(edu));
          setOldTotalTaxOnIncome(
            parseInt(edu) + parseInt(tax) + Math.ceil(difference)
          );
        } else if (
          difference > Surcharge &&
          taxableSum > 5000000 &&
          taxableSum <= 10000000
        ) {
          edu = ((tax + Surcharge) * 4) / 100;
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(parseInt(Surcharge));
          setOldHealthEducation(parseInt(edu));
          setOldTotalTaxOnIncome(
            parseInt(edu) + parseInt(tax) + parseInt(Surcharge)
          );
        }
      } else if (taxableSum > 10000000 && taxableSum <= 20000000) {
        let Surcharge = 0;
        let difference = 0;
        let HE = 0;
        if (taxableSum > 10000000 && taxableSum <= 10206105) {
          Surcharge = (2812500 * 10) / 100;
          difference = taxableSum - 10000000;
          difference = (difference * 70) / 100;
          difference = difference + Surcharge;
          HE = ((tax + difference) * 4) / 100;
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(Math.ceil(difference));
          setOldHealthEducation(parseInt(HE));
          setOldTotalTaxOnIncome(
            parseInt(Math.floor(tax) + HE + Math.ceil(difference))
          );
        } else if (taxableSum > 10206105 && taxableSum <= 20000000) {
          Surcharge = (tax * 15) / 100;
          HE = ((tax + Surcharge) * 4) / 100;
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(parseInt(Surcharge));
          setOldHealthEducation(parseInt(HE));
          setOldTotalTaxOnIncome(
            parseInt(Math.floor(tax) + HE + parseInt(Surcharge))
          );
        }
      } else if (taxableSum > 20000000 && taxableSum <= 50000000) {
        let Surcharge = 0;
        let HE = 0;
        let difference = 0;
        if (taxableSum >= 20000001 && taxableSum <= 20912000) {
          Surcharge = (5812500 * 15) / 100;
          difference = taxableSum - 20000000;
          difference = (difference * 70) / 100;
          difference = difference + Surcharge;
          HE = ((tax + difference) * 4) / 100;
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(Math.ceil(difference));
          setOldHealthEducation(parseInt(HE));
          setOldTotalTaxOnIncome(
            parseInt(Math.floor(tax) + HE + Math.ceil(difference))
          );
        } else if (taxableSum > 20912000 && taxableSum <= 50000000) {
          let Surcharge = 0;
          let HE = 0;
          // let difference=0;
          Surcharge = (tax * 25) / 100;
          HE = ((tax + Surcharge) * 4) / 100;
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(parseInt(Surcharge));
          setOldHealthEducation(parseInt(HE));
          setOldTotalTaxOnIncome(
            parseInt(Math.floor(tax) + HE + parseInt(Surcharge))
          );
        }
      } else if (taxableSum > 50000000) {
        if (taxableSum > 50000000 && taxableSum <= 53017825) {
          Surcharge = (14812500 * 25) / 100;
          difference = taxableSum - 50000000;
          difference = (difference * 70) / 100;
          difference = difference + Surcharge;
          let HE = 0;
          HE = ((tax + difference) * 4) / 100;
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(Math.ceil(difference));
          setOldHealthEducation(parseInt(HE));
          setOldTotalTaxOnIncome(
            parseInt(HE) + parseInt(tax) + Math.ceil(difference)
          );
        } else if (taxableSum > 53017825) {
          Surcharge = (parseInt(tax) * 37) / 100;
          let HE = 0;
          HE = ((tax + Surcharge) * 4) / 100;
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(parseInt(Surcharge));
          setOldHealthEducation(parseInt(HE));
          setOldTotalTaxOnIncome(
            parseInt(HE) + parseInt(tax) + parseInt(Surcharge)
          );
        }
      }
    } else {
      let taxableSum = gross;
      let tax = 0;

      if (ageCategory == "60") {
        // debugger

        if (taxableSum > 0 && taxableSum <= 250000) {
          tax = 0;
        } else if (taxableSum > 250000 && taxableSum <= 500000) {
          tax = (taxableSum - 250000) * 0.05;
        } else if (taxableSum > 500000 && taxableSum <= 1000000)
          tax = (taxableSum - 500000) * 0.2 + 250000 * 0.05;
        else if (taxableSum > 1000000 && taxableSum <= 5000000) {
          tax = (taxableSum - 1000000) * 0.3 + 500000 * 0.2 + 250000 * 0.05;
        } else if (taxableSum > 5000000) {
          tax = (taxableSum - 1000000) * 0.3 + 500000 * 0.2 + 250000 * 0.05;
        }

        if (taxableSum > 0 && taxableSum <= 250019) {
          // console.log("hi")

          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(0);
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(0);
          setOldSurcharge(0);
          setOldHealthEducation(parseInt(0));
          setOldTotalTaxOnIncome(0);
        } else if (taxableSum > 250019 && taxableSum <= 500004) {
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(parseInt(tax));
          setOldTaxAfterRebate(0);
          setOldSurcharge(0);
          setOldHealthEducation(parseInt(0));
          setOldTotalTaxOnIncome(0);
        } else if (taxableSum > 500004 && taxableSum <= 1000003) {
          console.log("hi");
          const educess = (tax * 4) / 100;
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(0);
          setOldHealthEducation(parseInt(educess));
          setOldTotalTaxOnIncome(parseInt(educess) + parseInt(tax));
        } else if (taxableSum > 1000003 && taxableSum <= 5000000) {
          const educess = (tax * 4) / 100;
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(0);
          setOldHealthEducation(parseInt(educess));
          setOldTotalTaxOnIncome(parseInt(educess) + parseInt(tax));
        } else if (taxableSum > 5000000 && taxableSum <= 10000000) {
          let Surcharge = 0;
          Surcharge = (parseInt(tax) * 10) / 100;
          let difference = 0;
          difference = taxableSum - 5000000;
          difference = (difference * 70) / 100;

          let edu = 0;

          if (
            difference < Surcharge &&
            taxableSum > 5000000 &&
            taxableSum <= 10000000
          ) {
            edu = ((tax + difference) * 4) / 100;
            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(Math.ceil(difference));
            setOldHealthEducation(parseInt(edu));
            setOldTotalTaxOnIncome(
              parseInt(edu) + parseInt(tax) + Math.ceil(difference)
            );
          } else if (
            difference > Surcharge &&
            taxableSum > 5000000 &&
            taxableSum <= 10000000
          ) {
            edu = ((tax + Surcharge) * 4) / 100;
            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(parseInt(Surcharge));
            setOldHealthEducation(parseInt(edu));
            setOldTotalTaxOnIncome(
              parseInt(edu) + parseInt(tax) + parseInt(Surcharge)
            );
          }
        } else if (taxableSum > 10000000 && taxableSum <= 20000000) {
          let Surcharge = 0;
          let difference = 0;
          let HE = 0;
          if (taxableSum > 10000000 && taxableSum <= 10206105) {
            Surcharge = (2812500 * 10) / 100;
            difference = taxableSum - 10000000;
            difference = (difference * 70) / 100;
            difference = difference + Surcharge;
            HE = ((tax + difference) * 4) / 100;
            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(Math.ceil(difference));
            setOldHealthEducation(parseInt(HE));
            setOldTotalTaxOnIncome(
              parseInt(Math.floor(tax) + HE + Math.ceil(difference))
            );
          } else if (taxableSum > 10206105 && taxableSum <= 20000000) {
            Surcharge = (tax * 15) / 100;
            HE = ((tax + Surcharge) * 4) / 100;
            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(parseInt(Surcharge));
            setOldHealthEducation(parseInt(HE));
            setOldTotalTaxOnIncome(
              parseInt(Math.floor(tax) + HE + parseInt(Surcharge))
            );
          }
        } else if (taxableSum > 20000000 && taxableSum <= 50000000) {
          let Surcharge = 0;
          let HE = 0;
          let difference = 0;
          if (taxableSum >= 20000001 && taxableSum <= 20912000) {
            Surcharge = (5812500 * 15) / 100;
            difference = taxableSum - 20000000;
            difference = (difference * 70) / 100;
            difference = difference + Surcharge;
            HE = ((tax + difference) * 4) / 100;
            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(Math.ceil(difference));
            setOldHealthEducation(parseInt(HE));
            setOldTotalTaxOnIncome(
              parseInt(Math.floor(tax) + HE + Math.ceil(difference))
            );
          } else if (taxableSum > 20912000 && taxableSum <= 50000000) {
            let Surcharge = 0;
            let HE = 0;
            // let difference=0;
            Surcharge = (tax * 25) / 100;
            HE = ((tax + Surcharge) * 4) / 100;
            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(parseInt(Surcharge));
            setOldHealthEducation(parseInt(HE));
            setOldTotalTaxOnIncome(
              parseInt(Math.floor(tax) + HE + parseInt(Surcharge))
            );
          }
        } else if (taxableSum > 50000000) {
          let Surcharge = 0;
          let difference = 0;
          if (taxableSum > 50000000 && taxableSum <= 53017825) {
            Surcharge = (14812500 * 25) / 100;
            difference = taxableSum - 50000000;
            difference = (difference * 70) / 100;
            difference = difference + Surcharge;
            let HE = 0;
            HE = ((tax + difference) * 4) / 100;
            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(Math.ceil(difference));
            setOldHealthEducation(parseInt(HE));
            setOldTotalTaxOnIncome(
              parseInt(HE) + parseInt(tax) + Math.ceil(difference)
            );
          } else if (taxableSum > 53017825) {
            Surcharge = (parseInt(tax) * 37) / 100;
            let HE = 0;
            HE = ((tax + Surcharge) * 4) / 100;
            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(parseInt(Surcharge));
            setOldHealthEducation(parseInt(HE));
            setOldTotalTaxOnIncome(
              parseInt(HE) + parseInt(tax) + parseInt(Surcharge)
            );
          }
        }
      } else if (ageCategory == "60-79") {
        if (taxableSum > 0 && taxableSum <= 250000) {
          tax = 0;
        } else if (taxableSum > 250000 && taxableSum <= 500000) {
          tax = (taxableSum - 250000) * 0.05;
        } else if (taxableSum > 500000 && taxableSum <= 1000000)
          tax = (taxableSum - 500000) * 0.2 + 250000 * 0.04;
        else if (taxableSum > 1000000 && taxableSum <= 5000000) {
          tax = (taxableSum - 1000000) * 0.3 + 500000 * 0.2 + 250000 * 0.04;
        } else if (taxableSum > 5000000) {
          tax = (taxableSum - 1000000) * 0.3 + 500000 * 0.2 + 250000 * 0.04;
        }
        const aaa = tax - 2500;
        // console.log("ttttt",tax)
        // console.log("tatatata",taxableSum)

        if (taxableSum > 0 && taxableSum <= 300019) {
          // console.log("hi")

          setOldTaxAtNormal(parseInt(0));
          setOldTaxBeforeRebate(0);
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(0);
          setOldSurcharge(0);
          setOldHealthEducation(parseInt(0));
          setOldTotalTaxOnIncome(0);
        }

        //    else if (taxableSum > 350019 && taxableSum <= 250019) {
        //         // console.log("hi")

        //         setOldTaxAtNormal(parseInt(tax));
        //         setOldTaxBeforeRebate(0);
        //         setOldTaxRebate87A(0);
        //         setOldTaxAfterRebate(0);
        //         setOldSurcharge(0);
        //         setOldHealthEducation(parseInt(0));
        //         setOldTotalTaxOnIncome(0);
        //     }
        else if (taxableSum > 300019 && taxableSum <= 500004) {
          setOldTaxAtNormal(parseInt(aaa));
          setOldTaxBeforeRebate(parseInt(aaa));
          setOldTaxRebate87A(parseInt(aaa));
          setOldTaxAfterRebate(0);
          setOldSurcharge(0);
          setOldHealthEducation(parseInt(0));
          setOldTotalTaxOnIncome(0);
        } else if (taxableSum > 500004 && taxableSum <= 1000003) {
          const educess = (tax * 4) / 100;
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(0);
          setOldHealthEducation(parseInt(educess));
          setOldTotalTaxOnIncome(parseInt(educess) + parseInt(tax));
        } else if (taxableSum > 1000003 && taxableSum <= 5000000) {
          const educess = (tax * 4) / 100;
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(0);
          setOldHealthEducation(parseInt(educess));
          setOldTotalTaxOnIncome(parseInt(educess) + parseInt(tax));
        } else if (taxableSum > 5000000 && taxableSum <= 10000000) {
          let Surcharge = 0;
          Surcharge = (parseInt(tax) * 10) / 100;
          let difference = 0;
          difference = taxableSum - 5000000;
          difference = (difference * 70) / 100;

          let edu = 0;

          if (
            difference < Surcharge &&
            taxableSum > 5000000 &&
            taxableSum <= 10000000
          ) {
            edu = ((tax + difference) * 4) / 100;
            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(Math.ceil(difference));
            setOldHealthEducation(parseInt(edu));
            setOldTotalTaxOnIncome(
              parseInt(edu) + parseInt(tax) + Math.ceil(difference)
            );
          } else if (
            difference > Surcharge &&
            taxableSum > 5000000 &&
            taxableSum <= 10000000
          ) {
            edu = ((tax + Surcharge) * 4) / 100;
            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(parseInt(Surcharge));
            setOldHealthEducation(parseInt(edu));
            setOldTotalTaxOnIncome(
              parseInt(edu) + parseInt(tax) + parseInt(Surcharge)
            );
          }
        } else if (taxableSum > 10000000 && taxableSum <= 20000000) {
          let Surcharge = 0;
          let difference = 0;
          let HE = 0;
          if (taxableSum > 10000000 && taxableSum <= 10206105) {
            Surcharge = (2812500 * 10) / 100;
            difference = taxableSum - 10000000;
            difference = (difference * 70) / 100;
            difference = difference + Surcharge;
            HE = ((tax + difference) * 4) / 100;
            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(Math.ceil(difference));
            setOldHealthEducation(parseInt(HE));
            setOldTotalTaxOnIncome(
              parseInt(Math.floor(tax) + HE + Math.ceil(difference))
            );
          } else if (taxableSum > 10206105 && taxableSum <= 20000000) {
            Surcharge = (tax * 15) / 100;
            HE = ((tax + Surcharge) * 4) / 100;
            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(parseInt(Surcharge));
            setOldHealthEducation(parseInt(HE));
            setOldTotalTaxOnIncome(
              parseInt(Math.floor(tax) + HE + parseInt(Surcharge))
            );
          }
        } else if (taxableSum > 20000000 && taxableSum <= 50000000) {
          let Surcharge = 0;
          let HE = 0;
          let difference = 0;
          if (taxableSum >= 20000001 && taxableSum <= 20912000) {
            Surcharge = (5812500 * 15) / 100;
            difference = taxableSum - 20000000;
            difference = (difference * 70) / 100;
            difference = difference + Surcharge;
            HE = ((tax + difference) * 4) / 100;
            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(Math.ceil(difference));
            setOldHealthEducation(parseInt(HE));
            setOldTotalTaxOnIncome(
              parseInt(Math.floor(tax) + HE + Math.ceil(difference))
            );
          } else if (taxableSum > 20912000 && taxableSum <= 50000000) {
            let Surcharge = 0;
            let HE = 0;
            // let difference=0;
            Surcharge = (tax * 25) / 100;
            HE = ((tax + Surcharge) * 4) / 100;
            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(parseInt(Surcharge));
            setOldHealthEducation(parseInt(HE));
            setOldTotalTaxOnIncome(
              parseInt(Math.floor(tax) + HE + parseInt(Surcharge))
            );
          }
        } else if (taxableSum > 50000000) {
          let Surcharge = 0;
          let difference = 0;
          if (taxableSum > 50000000 && taxableSum <= 53017825) {
            Surcharge = (14812500 * 25) / 100;
            difference = taxableSum - 50000000;
            difference = (difference * 70) / 100;
            difference = difference + Surcharge;
            let HE = 0;
            HE = ((tax + difference) * 4) / 100;
            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(Math.ceil(difference));
            setOldHealthEducation(parseInt(HE));
            setOldTotalTaxOnIncome(
              parseInt(HE) + parseInt(tax) + Math.ceil(difference)
            );
          } else if (taxableSum > 53017825) {
            Surcharge = (parseInt(tax) * 37) / 100;
            let HE = 0;
            HE = ((tax + Surcharge) * 4) / 100;
            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(parseInt(Surcharge));
            setOldHealthEducation(parseInt(HE));
            setOldTotalTaxOnIncome(
              parseInt(HE) + parseInt(tax) + parseInt(Surcharge)
            );
          }
        }
      } else if (ageCategory == "80") {
        if (taxableSum > 0 && taxableSum <= 250000) {
          tax = 0;
        } else if (taxableSum > 250000 && taxableSum <= 500000) {
          tax = (taxableSum - 250000) * 0.05;
        } else if (taxableSum > 500000 && taxableSum <= 1000000)
          tax = (taxableSum - 500000) * 0.2 + 250000 * 0.0;
        else if (taxableSum > 1000000 && taxableSum <= 5000000) {
          tax = (taxableSum - 1000000) * 0.3 + 500000 * 0.1 + 250000 * 0.2;
        } else if (taxableSum > 5000000) {
          tax = (taxableSum - 1000000) * 0.3 + 500000 * 0.1 + 250000 * 0.2;
        }

        if (taxableSum > 0 && taxableSum <= 500000) {
          setOldTaxAtNormal(parseInt(0));
          setOldTaxBeforeRebate(0);
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(0);
          setOldSurcharge(0);
          setOldHealthEducation(parseInt(0));
          setOldTotalTaxOnIncome(0);
        } else if (taxableSum > 500000 && taxableSum <= 500124) {
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(parseInt(tax));
          setOldTaxAfterRebate(0);
          setOldSurcharge(0);
          setOldHealthEducation(parseInt(0));
          setOldTotalTaxOnIncome(0);
        } else if (taxableSum > 500124 && taxableSum <= 550000) {
          const educess = (tax * 4) / 100;

          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(0);
          setOldHealthEducation(parseInt(educess));
          setOldTotalTaxOnIncome(parseInt(tax + educess));
        } else if (taxableSum > 550000 && taxableSum <= 1000000) {
          const educess = (tax * 4) / 100;
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(0);
          setOldHealthEducation(parseInt(educess));
          setOldTotalTaxOnIncome(parseInt(tax + educess));
        } else if (taxableSum > 1000000 && taxableSum <= 5000000) {
          const educess = (tax * 4) / 100;

          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(0);
          setOldHealthEducation(parseInt(educess));
          setOldTotalTaxOnIncome(parseInt(educess) + parseInt(tax));
        } else if (taxableSum > 5000000 && taxableSum <= 10000000) {
          // console.log("hi")
          let S = 0;
          S = taxableSum - 5000000;
          let Surcharge = 0;
          Surcharge = (tax * 10) / 100;
          const sur = (S * 70) / 100;
          const edu = ((tax + sur) * 4) / 100;
          const edu1 = ((tax + Surcharge) * 4) / 100;
          const ssssssssss = taxableSum - 5000000;
          // console.log(ssssssssss)
          console.log(Surcharge);
          if (S < Surcharge && taxableSum > 5000000 && taxableSum <= 10000000) {
            // console.log("hi")

            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(parseInt(ssssssssss));
            setOldHealthEducation(parseInt(edu));
            setOldTotalTaxOnIncome(
              parseInt(edu) + parseInt(tax) + parseInt(ssssssssss)
            );
          } else if (
            S > Surcharge &&
            taxableSum > 5000000 &&
            taxableSum <= 10000000
          ) {
            // console.log("bye")
            setOldTaxAtNormal(parseInt(tax));
            setOldTaxBeforeRebate(parseInt(tax));
            setOldTaxRebate87A(0);
            setOldTaxAfterRebate(parseInt(tax));
            setOldSurcharge(parseInt(Surcharge));
            setOldHealthEducation(parseInt(edu1));
            setOldTotalTaxOnIncome(
              parseInt(edu1) + parseInt(tax) + parseInt(Surcharge)
            );
          }
        } else if (taxableSum > 10000000 && taxableSum <= 20000000) {
          let Surcharge = 0;
          Surcharge = (tax * 15) / 100;
          let educess = 0;
          educess = ((tax + Surcharge) * 4) / 100;
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(parseInt(Surcharge));
          setOldHealthEducation(parseInt(educess));
          setOldTotalTaxOnIncome(
            parseInt(educess) + parseInt(tax) + parseInt(Surcharge)
          );
        } else if (taxableSum > 20000000 && taxableSum <= 50000000) {
          let Surcharge = 0;
          Surcharge = (tax * 25) / 100;
          let educess = 0;
          educess = ((tax + Surcharge) * 4) / 100;
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(parseInt(Surcharge));
          setOldHealthEducation(parseInt(educess));
          setOldTotalTaxOnIncome(
            parseInt(educess) + parseInt(tax) + parseInt(Surcharge)
          );
        } else if (taxableSum > 50000000) {
          let Surcharge = 0;
          Surcharge = (tax * 37) / 100;
          let educess = 0;
          educess = ((tax + Surcharge) * 4) / 100;
          // console.log(Surcharge)
          setOldTaxAtNormal(parseInt(tax));
          setOldTaxBeforeRebate(parseInt(tax));
          setOldTaxRebate87A(0);
          setOldTaxAfterRebate(parseInt(tax));
          setOldSurcharge(parseInt(Surcharge));
          setOldHealthEducation(parseInt(educess));
          setOldTotalTaxOnIncome(
            parseInt(educess) + parseInt(tax) + parseInt(Surcharge)
          );
        }
      }
    }
  };

  //TODO ====================INCOME DETAILS handle function START==================
  const MAX_VALUE = 150000000000;

  const handleIncomeChange = (text) => {
    if (isNaN(text)) {
    } else if (text.includes("+") || text.includes("-") || text.includes(".")) {
    } else {
      const value = parseFloat(text);

      if (value > MAX_VALUE) {
        setIncomeVal(MAX_VALUE.toString());
        setLessIncomeVal(50000);
      } else if (text === "") {
        setIncomeVal("0");
        setLessIncomeVal(0);
      } else if (value === 0) {
        setIncomeVal("0");
        setLessIncomeVal(0);
      } else {
        if (text.startsWith("0") && text.length > 1) {
          let va = text.substring(1);
          setIncomeVal(va);
          setLessIncomeVal(parseFloat(va) > 50000 ? 50000 : parseFloat(va));
        } else {
          setIncomeVal(value.toString());
          setLessIncomeVal(value > 50000 ? 50000 : value);
        }
      }
    }
  };

  const handleIntertainmentChange = (text) => {
    if (isNaN(text)) {
    } else if (text.includes("+") || text.includes("-") || text.includes(".")) {
    } else {
      const value = parseFloat(text);
      if (value > 5000) {
        setIntertainmentAllownce(5000);
      } else if (text === "") {
        setIntertainmentAllownce(0);
      } else if (value === 0) {
        setIntertainmentAllownce(0);
      } else {
        if (text.startsWith("0") && text.length > 1) {
          let va = text.substring(1);
          setIntertainmentAllownce(parseFloat(va));
        } else if (intertainmentAllownce === 0 && text[1] === "0") {
          let va = text[0];
          setIntertainmentAllownce(parseFloat(va));
        } else {
          setIntertainmentAllownce(value);
        }
      }
    }
  };
  const handleProfessinalChange = (text) => {
    if (isNaN(text)) {
    } else if (text.includes("+") || text.includes("-") || text.includes(".")) {
    } else {
      const value = parseFloat(text);
      if (value > 5000) {
        setProfessinalTax("5000");
      } else if (text === "") {
        setProfessinalTax("0");
      } else if (value === 0) {
        setProfessinalTax("0");
      } else {
        if (text.startsWith("0") && text.length > 1) {
          let va = text.substring(1);
          setProfessinalTax(va);
        } else if (professinalTax === "0" && text[1] === "0") {
          let va = text[0];
          setProfessinalTax(va);
        } else {
          setProfessinalTax(text);
        }
      }
    }
  };
  const handleIncomefromInterestChange = (text) => {
    if (isNaN(text)) {
    } else if (text.includes("+") || text.includes("-") || text.includes(".")) {
    } else {
      let value = parseFloat(text);
      if (value > 150000000000) {
        setIncomeFromInterest("150000000000");
      } else if (text === "") {
        setIncomeFromInterest("0");
      } else if (value === 0) {
        setIncomeFromInterest("0");
      } else {
        if (text.startsWith("0") && text.length > 1) {
          let va = text.substring(1);
          setIncomeFromInterest(va);
        } else if (incomefromInterest === "0" && text[1] === "0") {
          let va = text[0];
          setIncomeFromInterest(va);
        } else {
          setIncomeFromInterest(text);
        }
      }

      // Delay logic to set d80TTA
      setTimeout(() => {
        if (ageCategory == 60) {
          if (parseInt(text) > 10000) {
            setD80TTA("10000");
          } else {
            setD80TTA(text);
          }
        } else if (ageCategory != 60) {
          if (parseInt(text) > 50000) {
            setD80TTA("50000");
          } else {
            setD80TTA(text);
          }
        }
      }, 500);
    }
  };
  const handleOtherInterestChange = (text) => {
    if (isNaN(text)) {
      // Handle non-numeric input
    } else if (text.includes("+") || text.includes("-") || text.includes(".")) {
      // Handle input containing "+", "-", or "."
    } else {
      const value = parseFloat(text);
      if (value > 150000000000) {
        setOtherInterest("150000000000");
      } else if (text === "") {
        setOtherInterest("0");
      } else if (value === 0) {
        setOtherInterest("0");
      } else {
        if (text.startsWith("0") && text.length > 1) {
          let va = text.substring(1);
          setOtherInterest(va);
        } else if (otherInterest === "0" && text[1] === "0") {
          let va = text[0];
          setOtherInterest(va);
        } else {
          setOtherInterest(text);
        }
      }
    }
  };
  const handleRentalIncomeChange = (text) => {
    if (isNaN(text)) {
    } else if (text.includes("+") || text.includes("-") || text.includes(".")) {
    } else {
      const value = parseFloat(text);

      if (value > 150000000000) {
        setRentalIncomeReceived("150000000000");
      } else if (text === "") {
        setRentalIncomeReceived("0");
      } else if (value === 0) {
        setRentalIncomeReceived("0");
      } else {
        if (text.startsWith("0") && text.length > 1) {
          let va = text.substring(1);
          setRentalIncomeReceived(va);
        } else if (rentalIncomeReceived === "0" && text[1] === "0") {
          let va = text[0];
          setRentalIncomeReceived(va);
        } else {
          setRentalIncomeReceived(text);
        }
      }
    }
  };

  const handleIncomeFromDigitalAssetsChange = (text) => {
    if (isNaN(text)) {
    } else if (text.includes("+") || text.includes("-") || text.includes(".")) {
    } else {
      const value = parseFloat(text);

      if (value > 150000000000) {
        setIncomeFromDigitalAssets("150000000000");
      } else if (text === "") {
        setIncomeFromDigitalAssets("0");
      } else if (value === 0) {
        setIncomeFromDigitalAssets("0");
      } else {
        if (text.startsWith("0") && text.length > 1) {
          let va = text.substring(1);
          setIncomeFromDigitalAssets(va);
        } else if (incomeFromDigitalAssets === "0" && text[1] === "0") {
          let va = text[0];
          setIncomeFromDigitalAssets(va);
        } else {
          setIncomeFromDigitalAssets(text);
        }
      }
    }
  };
  const handleShortTermCapitalGainChange = (text) => {
    if (isNaN(text)) {
    } else if (text.includes("+") || text.includes("-") || text.includes(".")) {
    } else {
      const value = parseFloat(text);

      if (value > 150000000000) {
        setShortTermCapitalGain("150000000000");
      } else if (text === "") {
        setShortTermCapitalGain("0");
      } else if (value === 0) {
        setShortTermCapitalGain("0");
      } else {
        if (text.startsWith("0") && text.length > 1) {
          let va = text.substring(1);
          setShortTermCapitalGain(va);
        } else if (shortTermCapitalGain === "0" && text[1] === "0") {
          let va = text[0];
          setShortTermCapitalGain(va);
        } else {
          setShortTermCapitalGain(text);
        }
      }
    }
  };
  const handleOtherIncomeChange = (text) => {
    if (
      isNaN(text) ||
      text.includes("+") ||
      text.includes("-") ||
      text.includes(".")
    ) {
      return;
    }
    const value = parseFloat(text);

    if (value > 150000000000) {
      setOtherIncome("150000000000");
    } else if (text === "") {
      setOtherIncome("0");
    } else if (value === 0) {
      setOtherIncome("0");
    } else {
      // Handle cases with leading zeros
      if (text.startsWith("0") && text.length > 1) {
        let va = text.substring(1);
        setOtherIncome(va);
      } else if (otherIncome === "0" && text.length > 1 && text[1] === "0") {
        let va = text[0];
        setOtherIncome(va);
      } else {
        setOtherIncome(text);
      }
    }
  };
  const handleBusinessIncomeChange = (text) => {
    if (
      isNaN(text) ||
      text.includes("+") ||
      text.includes("-") ||
      text.includes(".")
    ) {
      return;
    }
    const value = parseFloat(text);

    if (value > 150000000000) {
      setBusinessImcome("150000000000");
    } else if (text === "") {
      setBusinessImcome("0");
    } else if (value === 0) {
      setBusinessImcome("0");
    } else {
      // Handle cases with leading zeros
      if (text.startsWith("0") && text.length > 1) {
        let va = text.substring(1);
        setBusinessImcome(va);
      } else if (businessImcome === "0" && text.length > 1 && text[1] === "0") {
        let va = text[0];
        setBusinessImcome(va);
      } else {
        setBusinessImcome(text);
      }
    }
  };

  //TODO ====================Deductions handle function END==================

  const handleBasicDeductionChange = (text) => {
    if (
      isNaN(text) ||
      text.includes("+") ||
      text.includes("-") ||
      text.includes(".")
    ) {
      return;
    }
    const value = parseFloat(text);
    if (value > 150000) {
      setD80C("150000");
    } else if (text === "") {
      setD80C("0");
    } else if (value === 0) {
      setD80C("0");
    } else {
      if (text.startsWith("0") && text.length > 1) {
        let va = text.substring(1);
        setD80C(va);
      } else if (d80C === "0" && text.length > 1 && text[1] === "0") {
        let va = text[0];
        setD80C(va);
      } else {
        setD80C(text);
      }
    }
  };

  const handleMedicalInsuranceChange = (text) => {
    if (
      isNaN(text) ||
      text.includes("+") ||
      text.includes("-") ||
      text.includes(".")
    ) {
      return;
    }
    const value = parseFloat(text);

    if (value > 25000) {
      setD80D("25000");
    } else if (text === "") {
      setD80D("0");
    } else if (value === 0) {
      setD80D("0");
    } else {
      if (text.startsWith("0") && text.length > 1) {
        let va = text.substring(1);
        setD80D(va);
      } else if (d80D === "0" && text.length > 1 && text[1] === "0") {
        let va = text[0];
        setD80D(va);
      } else {
        setD80D(text);
      }
    }
  };
  const handleInterestOnEduChange = (text) => {
    if (
      isNaN(text) ||
      text.includes("+") ||
      text.includes("-") ||
      text.includes(".")
    ) {
      return;
    }

    const value = parseFloat(text);

    if (value > 150000000000) {
      setD80E("150000000000");
    } else if (text === "") {
      setD80E("0");
    } else if (value === 0) {
      setD80E("0");
    } else {
      if (text.startsWith("0") && text.length > 1) {
        let va = text.substring(1);
        setD80E(va);
      } else if (d80E === "0" && text.length > 1 && text[1] === "0") {
        let va = text[0];
        setD80E(va);
      } else {
        setD80E(text);
      }
    }
  };
  const handleEmployeeChange = (text) => {
    if (
      isNaN(text) ||
      text.includes("+") ||
      text.includes("-") ||
      text.includes(".")
    ) {
      return;
    }
    const value = parseFloat(text);
    if (value > 50000) {
      setD80CCD("50000");
    } else if (text === "") {
      setD80CCD("0");
    } else if (value === 0) {
      setD80CCD("0");
    } else {
      if (text.startsWith("0") && text.length > 1) {
        let va = text.substring(1);
        setD80CCD(va);
      } else if (d80CCD === "0" && text.length > 1 && text[1] === "0") {
        let va = text[0];
        setD80CCD(va);
      } else {
        setD80CCD(text);
      }
    }
  };
  const handleDonationsChange = (text) => {
    if (
      isNaN(text) ||
      text.includes("+") ||
      text.includes("-") ||
      text.includes(".")
    ) {
      return;
    }
    const value = parseFloat(text);

    if (value > 10) {
      setD80G("10");
    } else if (text === "") {
      setD80G("0");
    } else if (value === 0) {
      setD80G("0");
    } else {
      if (text.startsWith("0") && text.length > 1) {
        let va = text.substring(1);
        setD80G(va);
      } else if (d80G === "0" && text.length > 1 && text[1] === "0") {
        let va = text[0];
        setD80G(va);
      } else {
        setD80G(text);
      }
    }
  };
  const handleInterestOnHousingChange = (text) => {
    if (
      isNaN(text) ||
      text.includes("+") ||
      text.includes("-") ||
      text.includes(".")
    ) {
      return;
    }

    const value = parseFloat(text);

    if (value > 150000) {
      setD80EEA("150000");
    } else if (text === "") {
      setD80EEA("0");
    } else if (value === 0) {
      setD80EEA("0");
    } else {
      if (text.startsWith("0") && text.length > 1) {
        let va = text.substring(1);
        setD80EEA(va);
      } else if (d80EEA === "0" && text.length > 1 && text[1] === "0") {
        let va = text[0];
        setD80EEA(va);
      } else {
        setD80EEA(text);
      }
    }
  };
  const handleInterestOnHomeChange = (text) => {
    if (
      isNaN(text) ||
      text.includes("+") ||
      text.includes("-") ||
      text.includes(".")
    ) {
      return;
    }

    const value = parseFloat(text);

    if (value > 200000) {
      setInterestOnHomeLoanSelfOccupied("200000");
    } else if (text === "") {
      setInterestOnHomeLoanSelfOccupied("0");
    } else if (value === 0) {
      setInterestOnHomeLoanSelfOccupied("0");
    } else {
      if (text.startsWith("0") && text.length > 1) {
        let va = text.substring(1);
        setInterestOnHomeLoanSelfOccupied(va);
      } else if (
        interestOnHomeLoanSelfOccupied === "0" &&
        text.length > 1 &&
        text[1] === "0"
      ) {
        let va = text[0];
        setInterestOnHomeLoanSelfOccupied(va);
      } else {
        setInterestOnHomeLoanSelfOccupied(text);
      }
    }
  };

  //TODO ====================HRA handle function END==================
  const handleBasicHRAChange = (text) => {
    if (
      isNaN(text) ||
      text.includes("+") ||
      text.includes("-") ||
      text.includes(".")
    ) {
      return;
    }

    const value = parseFloat(text);

    if (value > 150000000000) {
      setBasicHRA("150000000000");
    } else if (text === "") {
      setBasicHRA("0");
    } else if (value === 0) {
      setBasicHRA("0");
    } else {
      if (text.startsWith("0") && text.length > 1) {
        let va = text.substring(1);
        setBasicHRA(va);
      } else if (basicHRA === "0" && text.length > 1 && text[1] === "0") {
        let va = text[0];
        setBasicHRA(va);
      } else {
        setBasicHRA(text);
      }
    }
  };
  const handleDearnessHRAChange = (text) => {
    if (
      isNaN(text) ||
      text.includes("+") ||
      text.includes("-") ||
      text.includes(".")
    ) {
      return;
    }

    const value = parseFloat(text);

    if (value > 150000000000) {
      setDearnessHRA("150000000000");
    } else if (text === "") {
      setDearnessHRA("0");
    } else if (value === 0) {
      setDearnessHRA("0");
    } else {
      // Handle cases with leading zeros
      if (text.startsWith("0") && text.length > 1) {
        let va = text.substring(1);
        setDearnessHRA(va);
      } else if (dearnessHRA === "0" && text.length > 1 && text[1] === "0") {
        let va = text[0];
        setDearnessHRA(va);
      } else {
        setDearnessHRA(text);
      }
    }
  };

  const handleReceivedHRAChange = (text) => {
    if (
      isNaN(text) ||
      text.includes("+") ||
      text.includes("-") ||
      text.includes(".")
    ) {
      return;
    }

    const value = parseFloat(text);

    if (value > 150000000000) {
      setReceivedHRA("150000000000");
    } else if (text === "") {
      setReceivedHRA("0");
    } else if (value === 0) {
      setReceivedHRA("0");
    } else {
      if (text.startsWith("0") && text.length > 1) {
        let va = text.substring(1);
        setReceivedHRA(va);
      } else if (receivedHRA === "0" && text.length > 1 && text[1] === "0") {
        let va = text[0];
        setReceivedHRA(va);
      } else {
        setReceivedHRA(text);
      }
    }
  };
  const handleRentPaidHRAChange = (text) => {
    if (
      isNaN(text) ||
      text.includes("+") ||
      text.includes("-") ||
      text.includes(".")
    ) {
      return;
    }

    const value = parseFloat(text);

    if (value > 150000000000) {
      setRentPaidHRA("150000000000");
    } else if (text === "") {
      setRentPaidHRA("0");
    } else if (value === 0) {
      setRentPaidHRA("0");
    } else {
      if (text.startsWith("0") && text.length > 1) {
        let va = text.substring(1);
        setRentPaidHRA(va);
      } else if (rentPaidHRA === "0" && text.length > 1 && text[1] === "0") {
        let va = text[0];
        setRentPaidHRA(va);
      } else {
        setRentPaidHRA(text);
      }
    }
  };

  const handleFinancialYearChange = (value) => {
    if (value?.split("-")[0] >= "2024") {
      setNewRegime(false);
      setExemptAllowances(0);
      setInterestOnHomeLoanSelfOccupied(0);
      setInterestOnHomeLoanLetOut(0);
    } else {
      setNewRegime(false);
    }
    setFinancialYear(value);
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
        <View style={{ flex: 1 }}>
          <View>
            <Text
              style={{
                flex: 1,
                color: colors.black,
                fontSize: fontSize.t3,
                fontFamily: fontFamily.REGULAR,
                marginBottom: moderateScale(4),
              }}
            >
              Age Category
            </Text>
            <SelectedItem
              data={
                ageCategory === "60"
                  ? "Below 60 years (Regular Citizen)"
                  : ageCategory === "60 -79"
                  ? "Between 60 - 79 years (Senior Citizen)"
                  : ageCategory === "80"
                  ? "80 and above (Super Senior Citizen)"
                  : "Below 60 years (Regular Citizen)"
              }
              setData={(d) => {
                if (d === "Below 60 years (Regular Citizen)") {
                  setAgeCategory("60");
                } else if (d === "Between 60 - 79 years (Senior Citizen)") {
                  setAgeCategory("60-79");
                } else if (d === "80 and above (Super Senior Citizen)") {
                  setAgeCategory("80");
                }
                setTimeout(() => {
                  if (d == 60) {
                    if (parseInt(incomefromInterest) > 10000) {
                      setD80TTA(10000);
                    } else {
                      setD80TTA(incomefromInterest);
                    }
                  } else if (d != 60) {
                    if (parseInt(incomefromInterest) > 50000) {
                      setD80TTA(50000);
                    } else {
                      setD80TTA(incomefromInterest);
                    }
                  }
                }, 500);
              }}
              dropItem={age_category_data}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: moderateScale(12),
            }}
          >
            <Text
              style={{
                flex: 1,
                color: colors.black,
                fontSize: fontSize.t3,
                fontFamily: fontFamily.REGULAR,
              }}
            >
              Financial Year
            </Text>
            <SelectedItem
              dropItem={financial_data}
              data={financialYear}
              setData={handleFinancialYearChange}
              dropDownStyle={{ flex: 1.6, marginBottom: moderateScale(0) }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: moderateScale(4),
            }}
          >
            <Text
              style={{
                flex: 1,
                color: colors.black,
                fontSize: fontSize.t3,
                fontFamily: fontFamily.REGULAR,
                marginBottom: moderateScale(6),
              }}
            >
              Residential Status
            </Text>
            <SelectedItem
              data={residentialStatus}
              setData={setResidentialStatus}
              dropItem={residentail_data}
              dropDownStyle={{ flex: 1.6, marginBottom: moderateScale(0) }}
            />
          </View>

          <View style={{ marginVertical: moderateScale(2) }}>
            <CustomDropdown
              title={"Income Details"}
              content={
                <View style={styles.container}>
                  <LableTextInput
                    onChangeText={handleIncomeChange}
                    value={incomeVal}
                    title="Income from Salary"
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor="#888"
                    key="incomeVal"
                    maxLength={12}
                  />
                  {lessIncomeVal > 0 ? (
                    <LableTextInput
                      value={lessIncomeVal.toString()}
                      title="Less: Standard deduction u/s 16(ia)"
                      keyboardType="numeric"
                      placeholder="0"
                      placeholderTextColor="#888"
                      key="lessIncomeVal" // Unique key
                      editable={false}
                    />
                  ) : null}
                  <LableTextInput
                    onChangeText={handleIntertainmentChange}
                    value={intertainmentAllownce}
                    title="Less: Entertainment allowance u/s 16(ii)"
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor="#888"
                    key="intertainmentAllownce"
                    maxLength={5}
                  />

                  <LableTextInput
                    onChangeText={handleProfessinalChange}
                    value={professinalTax}
                    title="Less : Professional Tax 16(iii)"
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor="#888"
                    key="professinalTax"
                    maxLength={5}
                  />
                  <LableTextInput
                    onChangeText={handleIncomefromInterestChange}
                    value={incomefromInterest}
                    title="Interest from Saving’s bank account"
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor="#888"
                    key="incomefromInterest"
                    maxLength={15}
                  />
                  <LableTextInput
                    onChangeText={handleOtherInterestChange}
                    value={otherInterest}
                    title="Other Interest"
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor="#888"
                    key="otherInterest"
                    maxLength={15}
                  />
                  <LableTextInput
                    onChangeText={handleRentalIncomeChange}
                    value={rentalIncomeReceived}
                    title="Rental Income Received"
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor="#888"
                    key="rentalIncomeReceived"
                  />
                  <LableTextInput
                    onChangeText={handleIncomeFromDigitalAssetsChange}
                    value={incomeFromDigitalAssets}
                    title="Income from long term gain"
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor="#888"
                    key="incomeFromDigitalAssets"
                    maxLength={15}
                  />
                  <LableTextInput
                    onChangeText={handleShortTermCapitalGainChange}
                    value={shortTermCapitalGain}
                    title="Short term capital gain"
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor="#888"
                    key="shortTermCapitalGain"
                  />
                  <LableTextInput
                    onChangeText={handleOtherIncomeChange}
                    value={otherIncome}
                    title="Other Income"
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor="#888"
                    key="otherIncome"
                    maxLength={15}
                  />
                  <LableTextInput
                    onChangeText={handleBusinessIncomeChange}
                    value={businessImcome}
                    title="Business Income"
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor="#888"
                    key="businessImcome"
                  />
                  <LableTextInput
                    value={displayValue.toString()}
                    title="Total income"
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor="#888"
                    editable={false}
                    key="displayValue"
                  />
                </View>
              }
              isClicked={openDropdown === 0}
              setIsClicked={() =>
                setOpenDropdown(openDropdown === 0 ? null : 0)
              }
              index={0}
            />
            {newRegime === true ? null : (
              <>
                <CustomDropdown
                  title={"Deductions"}
                  content={
                    <View
                      style={{
                        flex: 1,
                        borderBottomWidth: 0.4,
                        paddingHorizontal: moderateScale(6),
                        marginTop: moderateScale(10),
                        paddingBottom: moderateScale(10),
                      }}
                    >
                      <LableTextInput
                        onChangeText={handleBasicDeductionChange}
                        value={d80C}
                        title={"Basic Deductions - 80C"}
                        keyboardType="numeric"
                        maxLength={6}
                        key="d80C" // Unique key
                      />
                      <LableTextInput
                        onChangeText={handleMedicalInsuranceChange}
                        value={d80D}
                        title={"Medical Insurance - 80D"}
                        keyboardType="numeric"
                        maxLength={5}
                        key="d80D" // Unique key
                      />
                      <LableTextInput
                        onChangeText={handleInterestOnEduChange}
                        value={d80E}
                        title={"Interest on Educational Loan - 80E"}
                        keyboardType="numeric"
                        maxLength={16}
                        key="d80E" // Unique key
                      />
                      <LableTextInput
                        onChangeText={handleEmployeeChange}
                        value={d80CCD}
                        title={"Employee's contribution to NPS - 80CCD 1B"}
                        keyboardType="numeric"
                        maxLength={10}
                        key="d80CCD" // Unique key
                      />
                      <LableTextInput
                        value={d80TTA}
                        title={"Interest from Deposits - 80TTA"}
                        keyboardType="numeric"
                        editable={false}
                        key="d80TTA" // Unique key
                      />
                      <LableTextInput
                        onChangeText={handleDonationsChange}
                        value={d80G}
                        title={"Donations to Charity - 80G"}
                        keyboardType="numeric"
                        maxLength={5}
                        key="d80G" // Unique key
                      />
                      <LableTextInput
                        onChangeText={handleInterestOnHousingChange}
                        value={d80EEA}
                        title={"Interest on Housing Loan - 80EE"}
                        keyboardType="numeric"
                        maxLength={6}
                        key="d80EEA" // Unique key
                      />
                      <LableTextInput
                        onChangeText={handleInterestOnHomeChange}
                        value={interestOnHomeLoanSelfOccupied}
                        title={"Interest on Home Loan- Self occupied"}
                        keyboardType="numeric"
                        maxLength={6}
                        key="interestOnHomeLoanSelfOccupied" // Unique key
                      />
                    </View>
                  }
                  isClicked={openDropdown === 1}
                  setIsClicked={() =>
                    setOpenDropdown(openDropdown === 1 ? null : 1)
                  }
                  index={0}
                />
                <CustomDropdown
                  title={"HRA"}
                  content={
                    <View
                      style={{
                        flex: 1,
                        borderBottomWidth: 0.4,
                        paddingHorizontal: moderateScale(6),
                        marginTop: moderateScale(10),
                        paddingBottom: moderateScale(10),
                      }}
                    >
                      <LableTextInput
                        onChangeText={handleBasicHRAChange}
                        value={basicHRA}
                        title={"Basic salary received per annum"}
                        keyboardType="numeric"
                        maxLength={15}
                        key="basicHRA" // Unique key
                      />
                      <LableTextInput
                        onChangeText={handleDearnessHRAChange}
                        value={dearnessHRA}
                        title={"Dearness allowance (DA) received per annum"}
                        keyboardType="numeric"
                        maxLength={15}
                        key="dearnessHRA" // Unique key
                      />
                      <LableTextInput
                        onChangeText={handleReceivedHRAChange}
                        value={receivedHRA}
                        title={"HRA received per annum"}
                        keyboardType="numeric"
                        maxLength={15}
                        key="receivedHRA" // Unique key
                      />
                      <LableTextInput
                        onChangeText={handleRentPaidHRAChange}
                        value={rentPaidHRA}
                        title={"Total rent paid per annum"}
                        keyboardType="numeric"
                        maxLength={15}
                        key="rentPaidHRA" // Unique key
                      />

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: moderateScale(10),
                        }}
                      >
                        <Text
                          style={{
                            flex: 1,
                            color: colors.black,
                            fontSize: fontSize.t3,
                            fontFamily: fontFamily.REGULAR,
                          }}
                        >
                          Do you live in a metro city?
                        </Text>
                        <SelectedItem
                          data={metroCityHRA}
                          setData={(value) => setMetroCityHRA(value)}
                          dropItem={metroYesNo}
                          dropDownStyle={{
                            flex: 1.2,
                            marginBottom: moderateScale(0),
                          }}
                        />
                      </View>
                      <LableTextInput
                        editable={false}
                        value={hraFinal}
                        title={"HRA deduction allowed"}
                        keyboardType="numeric"
                        key="hraFinal" // Unique key
                      />
                    </View>
                  }
                  isClicked={openDropdown === 2}
                  setIsClicked={() =>
                    setOpenDropdown(openDropdown === 2 ? null : 2)
                  }
                  index={0}
                />
                <CustomDrop
                  title={"Note"}
                  content={`Not so fast! Please enter your salary and deductions details to help us calculate your tax implications`}
                  isClicked={openDropdown === 3}
                  setIsClicked={() =>
                    setOpenDropdown(openDropdown === 3 ? null : 3)
                  }
                  index={0}
                />
              </>
            )}
          </View>

          <View style={{ marginVertical: moderateScale(10) }}>
            <ItemList
              oldRes={oldTaxAtNormal}
              newRes={taxAtNormal}
              title="Tax at Normal Rates"
            />
            <ItemList
              oldRes={
                oldTotalTaxOnIncome > 0 && totalTaxOnIncome > 0 ? capGain : 0
              }
              newRes={
                oldTotalTaxOnIncome > 0 && totalTaxOnIncome > 0 ? capGain : 0
              }
              title="Tax at Special Rates (Capital Gains, Lottery, etc.)"
            />
            <ItemList
              oldRes={oldTaxBeforeRebate}
              newRes={taxBeforeRebate}
              title="Total Tax before Rebate"
            />
            <ItemList
              oldRes={oldTaxRebate}
              newRes={taxRebate}
              title="Less: Tax Rebate u/s 87A"
            />
            <ItemList
              oldRes={oldTaxAfterRebate}
              newRes={taxAfterRebate}
              title="Net Tax after Rebate"
            />
            <ItemList
              oldRes={oldTurcharge}
              newRes={surcharge}
              title="Add: Surcharge"
            />
            <ItemList
              oldRes={oldTealthEducation}
              newRes={healthEducation}
              title="Add: Health & Education Cess"
            />
            <ItemList
              oldRes={oldTotalTaxOnIncome}
              newRes={totalTaxOnIncome}
              title="Total Tax on Income"
            />
          </View>

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
              title={"How can Insurance help?"}
              content={`Insurance can indeed offer opportunities to save on income tax through various provisions and sections of the tax code. Here are ways insurance can help you save income tax:

** Section 80C Deductions: Under Section 80C of the Income Tax Act in India, the premium paid for life insurance policies, including policies for yourself, your spouse, and your children, is eligible for deductions up to a specified limit (which is subject to change and should be verified each financial year). This deduction is part of the overall limit for various eligible investments and expenses.
The maturity proceeds or death benefits received from a life insurance policy, including policies from both government and private insurers, are generally tax-free under Section 10(10D) of the Income Tax Act, provided certain conditions are met.

** Health Insurance Premium (Section 80D): Premiums paid for health insurance policies for yourself, your family, or parents can be claimed as deductions under Section 80D of the Income Tax Act in India. This deduction helps reduce your taxable income.

** Pension Plans (Section 80CCC and 10(10A)): Contributions made to pension plans offered by insurance companies can be eligible for deductions under Section 80CCC of the Income Tax Act. Additionally, the commuted value of pension received under these plans is partially exempted from tax under Section 10(10A).

** Tax-Saving Riders: Some insurance policies offer riders (additional benefits) that qualify for tax deductions. For example, critical illness riders and disability riders may be eligible for deductions.

** Income Replacement: Insurance provides financial protection in the event of unforeseen events, reducing the need for setting aside emergency funds, which could potentially be invested in tax- saving options. It's important to note that the tax benefits offered by insurance policies can vary based on the specific policy type, premium amount, and the provisions of the Income Tax Act in your country. Additionally, insurance should primarily be considered for its intended purpose, which is risk protection and financial security, rather than solely for tax-saving purposes. Before purchasing an insurance policy for tax-saving purposes, it's advisable to consult with a tax advisor or financial planner to ensure that it aligns with your overall financial goals and tax planning strategy. Tax laws and regulations can change, so staying informed about the latest updates is also essential.`}
              isClicked={openDropdown2 === 0}
              setIsClicked={() =>
                setOpenDropdown2(openDropdown2 === 0 ? null : 0)
              }
              index={0}
            />
            <CustomDrop
              DropdownContainer={{ paddingEnd: scale(12) }}
              title={
                "How to use the Income tax calculator for FY 2023-24 (AY 2024-25)?"
              }
              content={`Using the tax calculator involves these steps:

1.Select Your Age Category: Tax liability in India varies based on age groups.
2.Choose the Financial Year: Select the applicable financial year for tax calculation.
3.Enter Taxable Salary: If using old tax slabs, enter salary after deducting exemptions like HRA, LTA, etc.
4.Or Enter Gross Salary: For new tax slabs, enter the salary without availing exemptions.
5.Additional Income Details: Enter interest income, rental income, home loan interest for rented/self-occupied property, and income from digital assets.
6.Investment Declaration: For old tax slabs, enter tax-saving investments under sections 80C, 80D, 80G, 80E, and 80TTA.

Note:
➔ If a field isn't applicable, enter "0".
➔ The results will display instantly upon entering required details, showing a comparison between Old and New Regime for:

1. Tax at Normal Rates
2. Tax at Special Rates (e.g., Capital Gains)
3. Total Tax before Rebate
4. Less: Tax Rebate u/s 87A
5. Net Tax after Rebate
6. Additional Surcharge
7. Health & Education Cess
8. Total Tax on Income
Effortlessly compute your tax liability under different regimes!`}
              isClicked={openDropdown2 === 1}
              setIsClicked={() =>
                setOpenDropdown2(openDropdown2 === 1 ? null : 1)
              }
              index={1}
            />
          </View>
        </View>
      </ScrollView>
    </ChildScreenContainerWithBackGround>
  );
};

const ItemList = ({ title, oldRes, newRes }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: "rgba(0,0,0,0.7)",
            fontSize: fontSize.t3,
            fontFamily: fontFamily.REGULAR,
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          flex: 2.5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "49.6%" }}>
          <ResultLableCom result={oldRes} />
        </View>
        <View style={{ width: "49.4%" }}>
          <ResultLableCom
            resContainer={{ backgroundColor: "#08136c22" }}
            result={newRes}
          />
        </View>
      </View>
    </View>
  );
};

export default IncomeTaxCal;

const styles = StyleSheet.create({});
