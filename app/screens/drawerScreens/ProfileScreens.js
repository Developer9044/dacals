import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import HomeScreenContainerWithBackground from "../../components/HomeScreenContainerWithBackground";
import { moderateScale } from "react-native-size-matters";
import fontSize from "../../constants/fontSize";
import fontFamily from "../../constants/fontFamily";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { SCREEN } from "../../navigations/RoutesName";

const ProfileScreens = () => {
  const navigation = useNavigation();
  return (
    <HomeScreenContainerWithBackground
      hideTopHeader={true}
      screen_name={"ABOUT US"}
      showBgImage={false}
      handleSearchPress={() => navigation.navigate(SCREEN.SEARCH_SCREEN)}
      topContainer={{ backgroundColor: colors.bgPlaceholder }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Welcome to DaCalculator!</Text>
        <Text style={styles.subtitle}>
          Your All-in-One Solution for Financial and Health Calculations
        </Text>

        <Text style={styles.sectionTitle}>What You Can Do with Our App:</Text>
        <Text style={styles.text}>
          Stay on Top of Your Finances: Use our range of financial calculators
          to plan and manage your money effectively. From Fixed Deposits and
          Term Insurance to Retirement Planning and Income Tax, we've got you
          covered.
        </Text>
        <Text style={styles.text}>
          Optimize Your Health: Track your health metrics with our specialized
          calculators. Whether you want to know your Body Mass Index, calculate
          your ideal body weight, or estimate your fluid requirements, our app
          provides accurate and easy-to-use tools.
        </Text>
        <Text style={styles.text}>
          Navigate with Ease: Our intuitive drawer navigation ensures you can
          quickly access any feature you need. With clear icons and labels,
          finding your way around is a breeze.
        </Text>
        <Text style={styles.text}>
          Customizable Experience: Enjoy a personalized experience with our
          custom drawer content, designed to meet your needs and preferences.
        </Text>

        <Text style={styles.sectionTitle}>Key Features:</Text>
        <Text style={styles.text}>
          Financial Calculators: Estimate and plan for various financial goals,
          including savings, investments, and taxes.
        </Text>
        <Text style={styles.text}>
          Health Calculators: Measure and analyze different health metrics to
          stay on track with your wellness goals.
        </Text>
        <Text style={styles.text}>
          User-Friendly Design: A clean and intuitive interface makes navigation
          effortless.
        </Text>

        <Text style={styles.sectionTitle}>Why Choose Us?</Text>
        <Text style={styles.text}>
          Comprehensive Tools: All the calculators you need, all in one app.
        </Text>
        <Text style={styles.text}>
          Easy Navigation: Quickly find and use the features you need.
        </Text>
        <Text style={styles.text}>
          Customizable: Tailor your experience to suit your preferences.
        </Text>
      </ScrollView>
    </HomeScreenContainerWithBackground>
  );
};

export default ProfileScreens;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(12),
    paddingBottom: moderateScale(25),
  },
  title: {
    fontSize: fontSize.h4,
    fontFamily: fontFamily.MEDIUM,
    color: colors.textPrimary,
    marginBottom: moderateScale(7),
  },
  subtitle: {
    fontSize: fontSize.t1,
    fontFamily: fontFamily.MEDIUM,
    color: colors.lightBlack,
    marginBottom: moderateScale(15),
  },
  sectionTitle: {
    fontSize: fontSize.h6,
    fontFamily: fontFamily.MEDIUM,
    color: colors.textPrimary,
    marginBottom: moderateScale(6),
  },
  text: {
    fontSize: fontSize.t3,
    fontFamily: fontFamily.MEDIUM,
    color: colors.lightBlack,
    marginBottom: moderateScale(6),
  },
  button: {
    marginTop: 24,
    padding: 8,
  },
});
