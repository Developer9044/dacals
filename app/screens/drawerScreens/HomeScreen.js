import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import HomeScreenContainerWithBackground from "../../components/HomeScreenContainerWithBackground";
import HomeCardComp from "../../components/HomeCardComp";
import colors from "../../constants/colors";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { health, health_calculator, HomePage } from "../../components/homeData";
import { useNavigation } from "@react-navigation/native";
import { SCREEN } from "../../navigations/RoutesName";
import fontFamily from "../../constants/fontFamily";
import fontSize from "../../constants/fontSize";

const { width, height } = Dimensions.get("screen");

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToScreen = (item, screenMapping) => {
    const screen = screenMapping[item.id];
    if (screen) {
      navigation.navigate(screen, { title: item.title, id: item.id });
    }
  };

  const renderCard = (item, screenMapping) => (
    <HomeCardComp
      title={item.title}
      image={item.image}
      cardContainer={{
        margin: moderateScale(8),
        borderRadius: 10,
        // width: width / 2.4 - 56,
        height: height / 8 + 5,
        flex: 1,
      }}
      onPress={() => navigateToScreen(item, screenMapping)}
      cardStyle={{ backgroundColor: colors.headerColor }}
    />
  );

  const financialToolsScreenMapping = {
    1: SCREEN.FIX_DEPOSITE,
    2: SCREEN.TERM_INC,
    3: SCREEN.CHILD_EDUCATION,
    4: SCREEN.RD_CAL,
    5: SCREEN.SIP_CAL,
    6: SCREEN.RETIREMENT,
    7: SCREEN.PFF_CAL,
    8: SCREEN.INCOME_TAX,
    9: SCREEN.CAGR_CAL,
    10: SCREEN.FUTURE_CAL,
    11: SCREEN.PRESENT_CAL,
    12: SCREEN.HEALTH_CAL,
  };

  const healthToolsScreenMapping = {
    1: SCREEN.BodyMass,
    2: SCREEN.SegmentalWeightsCal,
    3: SCREEN.Idealbodyweight,
    4: SCREEN.FluidRequirementCal,
    5: SCREEN.eGFRCalculator,
    6: SCREEN.BodySurfaceArea,
    7: SCREEN.Protein_Calculator,
    8: SCREEN.Keto_Calculator,
    9: SCREEN.Meal_Calorie_Calculator,
    10: SCREEN.Calorie_Calculator,
  };

  return (
    <HomeScreenContainerWithBackground
      hideTopHeader={true}
      screen_name={"Dashboard"}
      showBgImage={true}
      handleSearchPress={() => navigation.navigate(SCREEN.SEARCH_SCREEN)}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{}}>
          <Text style={styles.titleTextStyle}>Financial Tools</Text>
          <FlatList
            data={HomePage}
            contentContainerStyle={{
              marginHorizontal: moderateScale(8),
            }}
            renderItem={({ item }) =>
              renderCard(item, financialToolsScreenMapping)
            }
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
        <View style={{ marginTop: scale(-6) }}>
          <Text style={styles.titleTextStyle}>Health Tools</Text>
          <FlatList
            data={health_calculator}
            contentContainerStyle={{
              marginHorizontal: moderateScale(8),
              paddingBottom: 30,
            }}
            renderItem={({ item }) =>
              renderCard(item, healthToolsScreenMapping)
            }
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </HomeScreenContainerWithBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  titleTextStyle: {
    fontSize: fontSize.h5,
    fontFamily: fontFamily.MEDIUM,
    marginTop: verticalScale(8),
    color: colors.textPrimary,
    marginLeft: moderateScale(16),
  },
});
