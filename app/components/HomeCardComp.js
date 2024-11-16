import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Card} from 'react-native-paper';
import FontSize from '../constants/fontSize';
import colors from '../constants/colors';
import fontFamily from '../constants/fontFamily';

const HomeCardComp = ({
  image,
  title,
  cardContainer,
  imgStyle,
  onPress,
  textStyle,
  insideContainer,
  cardStyle,
}) => {
  return (
    <View style={[cardContainer]}>
      <Card style={[styles.cardStyle, cardStyle]}>
        <Pressable
          onPress={onPress}
          style={[
            {
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: verticalScale(10),
              width: '100%',
              height: '100%',
            },
            insideContainer,
          ]}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={[styles.icon]} source={image} />
          </View>
          {title && (
            <View style={styles.titleTextCont}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={[styles.titleTextStyle, textStyle]}>
                {title}
              </Text>
            </View>
          )}
        </Pressable>
      </Card>
    </View>
  );
};

export default HomeCardComp;

const styles = StyleSheet.create({
  icon: {
    height: scale(36),
    width: scale(36),
    resizeMode: 'contain',
  },
  titleTextCont: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: moderateScale(4),
  },
  titleTextStyle: {
    fontSize: FontSize.t5,
    fontFamily: fontFamily.MEDIUM,
    marginTop: verticalScale(8),
    color: colors.textPrimary,
    textAlign: 'center',
  },
  cardStyle: {
    flex: 1,
  },
});
