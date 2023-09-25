import {View, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigation/Navigation';
import Animated, {FadeIn} from 'react-native-reanimated';
import {LinearGradient} from 'react-native-linear-gradient';

interface Prop
  extends NativeStackScreenProps<RootStackParamsList, 'DetailsScreen'> {}

const {width, height} = Dimensions.get('window');

export default function DetailsScreen({route}: Prop) {
  const {image, id} = route.params;

  return (
    <View style={styles.container}>
      <Animated.Image
        sharedTransitionTag={id}
        source={{uri: image}}
        style={{width: width, height: height}}
      />
      <Animated.View entering={FadeIn.delay(100)}>
        <LinearGradient
          start={{x: 0, y: 0.8}}
          end={{x: 0, y: 0}}
          colors={['rgba(0,0,0,0.94)', 'transparent']}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  gradient: {
    width: width,
    height: height,
    position: 'absolute',
    bottom: 0,
  },
});
