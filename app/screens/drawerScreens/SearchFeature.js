import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import ChildScreenContainerWithBackGround from "../../components/ChildScreenContainerWithBackGround";
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";
import fontFamily from "../../constants/fontFamily";
import { moderateScale, scale } from "react-native-size-matters";
import { HomePage, health_calculator } from "../../components/homeData";
import FastImage from "react-native-fast-image";
import { SCREEN } from "../../navigations/RoutesName";
import { useNavigation } from "@react-navigation/native";

const SearchFeature = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const combinedData = [
    ...HomePage.map((item) => ({ ...item, id: `home_${item.id}` })),
    ...health_calculator.map((item) => ({ ...item, id: `health_${item.id}` })),
  ];

  const filteredData = combinedData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const financialToolsScreenMapping = {
    home_1: SCREEN.FIX_DEPOSITE,
    home_2: SCREEN.TERM_INC,
    home_3: SCREEN.CHILD_EDUCATION,
    home_4: SCREEN.RD_CAL,
    home_5: SCREEN.SIP_CAL,
    home_6: SCREEN.RETIREMENT,
    home_7: SCREEN.PFF_CAL,
    home_8: SCREEN.INCOME_TAX,
    home_9: SCREEN.CAGR_CAL,
    home_10: SCREEN.FUTURE_CAL,
    home_11: SCREEN.PRESENT_CAL,
    home_12: SCREEN.HEALTH_CAL,
  };

  const healthToolsScreenMapping = {
    health_1: SCREEN.BodyMass,
    health_2: SCREEN.SegmentalWeightsCal,
    health_3: SCREEN.Idealbodyweight,
    health_4: SCREEN.FluidRequirementCal,
    health_5: SCREEN.eGFRCalculator,
    health_6: SCREEN.BodySurfaceArea,
  };

  const handleNavigation = (id, title) => {
    if (financialToolsScreenMapping[id]) {
      navigation.navigate(financialToolsScreenMapping[id], { title });
    } else if (healthToolsScreenMapping[id]) {
      navigation.navigate(healthToolsScreenMapping[id], { title });
    }
  };

  return (
    <ChildScreenContainerWithBackGround
      hideTopHeader={true}
      screen_name={"Search Tools"}
      showBgImage={true}
      topContainer={{ backgroundColor: colors.headerColor }}
    >
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          placeholderTextColor={"rgba(0,0,0,0.6)"}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const imageSource = item.image;
          // console.log(item.title);
          return (
            <TouchableOpacity
              onPress={() => handleNavigation(item.id, item.title)}
              style={[styles.itemContainer, { backgroundColor: item.bg_color }]}
            >
              <FastImage
                source={imageSource}
                style={styles.image}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{
          paddingHorizontal: moderateScale(12),
          paddingBottom: moderateScale(30),
          paddingTop: moderateScale(10),
        }}
        showsVerticalScrollIndicator={false}
      />
    </ChildScreenContainerWithBackGround>
  );
};

export default SearchFeature;

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
  },
  searchInput: {
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
    fontSize: fontSize.t3,
    fontFamily: fontFamily.REGULAR,
    color: "rgba(0,0,0,0.8)",
    borderRadius: moderateScale(4),
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: moderateScale(12),
    marginBottom: moderateScale(8),
    borderRadius: scale(4),
  },
  image: {
    width: scale(24),
    height: scale(24),
    marginRight: moderateScale(16),
  },
  title: {
    fontSize: fontSize.t3,
    color: colors.lightBlack,
  },
});
