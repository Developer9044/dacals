import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const CustomSlider = ({
  minimumValue = 1000,
  maximumValue = 10000000,
  step = 1000,
  value = 5000,
  onValueChange,
  minimumTrackTintColor = 'lightblue',
  maximumTrackTintColor = '#d3d3d3',
  thumbTintColor = 'gray',
}) => {
  const sliderWidth = 300; // Adjust the width of the slider
  const knobSize = 30; // Adjust the size of the knob

  const translateX = useSharedValue(
    ((value - minimumValue) / (maximumValue - minimumValue)) *
      (sliderWidth - knobSize),
  );

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.offsetX = translateX.value;
    },
    onActive: (event, context) => {
      let newValue = event.translationX + context.offsetX;
      newValue = Math.max(0, Math.min(newValue, sliderWidth - knobSize));

      const valueRatio = newValue / (sliderWidth - knobSize);
      newValue =
        Math.round((valueRatio * (maximumValue - minimumValue)) / step) * step +
        minimumValue;

      translateX.value = newValue;
      if (onValueChange) {
        runOnJS(onValueChange)(newValue);
      }
    },
    onEnd: () => {
      // Optionally, you can add spring animation on release
      translateX.value = withSpring(translateX.value);
    },
  });

  const knobStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
      backgroundColor: thumbTintColor,
    };
  });

  const trackFillStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value,
      backgroundColor: minimumTrackTintColor,
      borderRadius: 10, // Ensure track fill has rounded corners
    };
  });

  return (
    <View style={styles.container}>
      <View style={[styles.track, {width: sliderWidth}]}>
        {/* Minimum Track */}
        <Animated.View style={[styles.trackFill, trackFillStyle]} />
        {/* Knob */}
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.knob, knobStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  track: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    height: 20,
    overflow: 'hidden', // Ensure knob doesn't get clipped when moving
    position: 'relative',
  },
  trackFill: {
    position: 'absolute',
    height: '100%',
    borderRadius: 10,
  },
  knob: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    top: -5, // Adjust position to center knob vertically within track
  },
});

export default CustomSlider;
