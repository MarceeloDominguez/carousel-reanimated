import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import {Item} from '../interface/items';
import ITEMS from '../data/Item';
import {RootStackParamsList} from '../navigation/Navigation';

type Props = {
  index: number;
  animatedValue: SharedValue<number>;
  currentIndex: SharedValue<number>;
  prevIndex: SharedValue<number>;
  dataLength: number;
  maxVisibleItems?: number;
  item: Item;
};

export default function Card({
  index,
  animatedValue,
  currentIndex,
  prevIndex,
  dataLength,
  maxVisibleItems = 3,
  item,
}: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [-30, 1, 30],
    );

    const translateY2 = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [-200, 1, 200],
    );

    const scale = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [0.9, 1, 1.1],
    );

    const opacity = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [1, 1, 0],
    );

    return {
      transform: [
        {translateY: index === prevIndex.value ? translateY2 : translateY},
        {scale},
      ],
      opacity:
        index < currentIndex.value + maxVisibleItems - 1
          ? opacity
          : index === currentIndex.value + maxVisibleItems - 1
          ? withTiming(1)
          : withTiming(0),
    };
  });

  return (
    <FlingGestureHandler
      key={'up'}
      direction={Directions.UP}
      onHandlerStateChange={e => {
        if (e.nativeEvent.state === State.END) {
          if (currentIndex.value !== 0) {
            animatedValue.value = withTiming((currentIndex.value -= 1));
            prevIndex.value = currentIndex.value - 1;
          }
        }
      }}>
      <FlingGestureHandler
        key={'down'}
        direction={Directions.DOWN}
        onHandlerStateChange={e => {
          if (e.nativeEvent.state === State.END) {
            if (currentIndex.value !== dataLength - 1) {
              animatedValue.value = withTiming((currentIndex.value += 1));
              prevIndex.value = currentIndex.value;
            }
          }
        }}>
        <Animated.View
          style={[
            styles.image,
            {
              zIndex: dataLength - index,
            },
          ]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DetailsScreen', ITEMS[currentIndex.value])
            }
            activeOpacity={1}>
            <Animated.Image
              sharedTransitionTag={item.id}
              style={[
                animatedStyle,
                styles.image,
                {
                  zIndex: dataLength - index,
                },
              ]}
              source={{uri: item.image}}
            />
          </TouchableOpacity>
        </Animated.View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 450,
    position: 'absolute',
    borderRadius: 20,
  },
});
