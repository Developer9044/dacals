import { Image, StyleSheet, Text, Linking } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SCREEN } from "./RoutesName";
import HomeScreen from "../screens/drawerScreens/HomeScreen";
import ProfileScreens from "../screens/drawerScreens/ProfileScreens";
import fontFamily from "../constants/fontFamily";
import Colors from "../constants/colors";
import { scale } from "react-native-size-matters";

import FDCalculator from "../screens/drawerScreens/FDCalculator";
import TermInsurancCal from "../screens/drawerScreens/TermInsurancCal";
import ChildEducationCal from "../screens/drawerScreens/ChildEducationCal";
import RDCal from "../screens/drawerScreens/RDCal";
import SIPCal from "../screens/drawerScreens/SIPCal";
import RetirementCal from "../screens/drawerScreens/RetirementCal";
import PFFCal from "../screens/drawerScreens/PFFCal";
import IncomeTaxCal from "../screens/drawerScreens/IncomeTaxCal";
import CAGRCal from "../screens/drawerScreens/CAGRCal";
import FutureValueCal from "../screens/drawerScreens/FutureValueCal";
import PresentValueCal from "../screens/drawerScreens/PresentValueCal";
import HealthCal from "../screens/drawerScreens/HealthCal";
import BodyMassCal from "../screens/drawerScreens/BodyMassCal";
import SegmentalWeightsCal from "../screens/drawerScreens/SegmentalWeightsCal";
import Idealbodyweight from "../screens/drawerScreens/Idealbodyweight";
import FluidRequirementCal from "../screens/drawerScreens/FluidRequirementCal";
import EGFRCalculator from "../screens/drawerScreens/EGFRCalculator";
import BodySurfaceArea from "../screens/drawerScreens/BodySurfaceArea";
import colors from "../constants/colors";
import CustomDrawerContent from "./CustomDrawerContent";
import SearchFeature from "../screens/drawerScreens/SearchFeature";
import ProteinCal from "../screens/drawerScreens/ProteinCal";
import KetoCal from "../screens/drawerScreens/KetoCal";
import MealCal from "../screens/drawerScreens/MealCal";
import CalorieCal from "../screens/drawerScreens/CalorieCal";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name={SCREEN.HOME_SCREEN}
        component={HomeScreen}
        options={{
          drawerLabel: "DASHBOARD",
          headerShown: false,
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
          drawerIcon: ({ focused, size }) => (
            <Image
              style={{ width: scale(22), height: scale(22) }}
              source={require("../assets/drawerIcons/home.png")}
              tintColor={colors.black}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={SCREEN.PROFILE_SCREEN}
        options={{
          drawerLabel: "ABOUT US",
          headerShown: false,
          // drawerItemStyle: {display: 'none'},
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
          drawerIcon: ({ focused, size }) => (
            <Image
              style={{ width: scale(22), height: scale(22) }}
              source={require("../assets/drawerIcons/user.png")}
            />
          ),
        }}
        component={ProfileScreens}
      />

      {/* //todo Home screen drawer not display drwawer screen */}
      <Drawer.Screen
        name={SCREEN.SEARCH_SCREEN}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={SearchFeature}
      />
      <Drawer.Screen
        name={SCREEN.FIX_DEPOSITE}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={FDCalculator}
      />
      <Drawer.Screen
        name={SCREEN.TERM_INC}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={TermInsurancCal}
      />
      <Drawer.Screen
        name={SCREEN.CHILD_EDUCATION}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={ChildEducationCal}
      />
      <Drawer.Screen
        name={SCREEN.RD_CAL}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={RDCal}
      />
      <Drawer.Screen
        name={SCREEN.SIP_CAL}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={SIPCal}
      />
      <Drawer.Screen
        name={SCREEN.RETIREMENT}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={RetirementCal}
      />
      <Drawer.Screen
        name={SCREEN.PFF_CAL}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={PFFCal}
      />
      <Drawer.Screen
        name={SCREEN.INCOME_TAX}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={IncomeTaxCal}
      />
      <Drawer.Screen
        name={SCREEN.CAGR_CAL}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={CAGRCal}
      />
      <Drawer.Screen
        name={SCREEN.FUTURE_CAL}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={FutureValueCal}
      />
      <Drawer.Screen
        name={SCREEN.PRESENT_CAL}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={PresentValueCal}
      />
      <Drawer.Screen
        name={SCREEN.HEALTH_CAL}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={HealthCal}
      />

      {/* //Todo RAVi */}
      <Drawer.Screen
        name={SCREEN.BodyMass}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={BodyMassCal}
      />
      <Drawer.Screen
        name={SCREEN.SegmentalWeightsCal}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={SegmentalWeightsCal}
      />
      <Drawer.Screen
        name={SCREEN.Idealbodyweight}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={Idealbodyweight}
      />
      <Drawer.Screen
        name={SCREEN.FluidRequirementCal}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={FluidRequirementCal}
      />
      <Drawer.Screen
        name={SCREEN.eGFRCalculator}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={EGFRCalculator}
      />
      <Drawer.Screen
        name={SCREEN.BodySurfaceArea}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={BodySurfaceArea}
      />

{/* //Todo Helth */}

      <Drawer.Screen
        name={SCREEN.Protein_Calculator}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={ProteinCal}
      />
      <Drawer.Screen
        name={SCREEN.Keto_Calculator}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={KetoCal}
      />
      <Drawer.Screen
        name={SCREEN.Meal_Calorie_Calculator}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={MealCal}
      />
      <Drawer.Screen
        name={SCREEN.Calorie_Calculator}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
          drawerLabelStyle: { fontFamily: fontFamily.BOLD },
          drawerActiveTintColor: Colors.appColor,
        }}
        component={CalorieCal}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
