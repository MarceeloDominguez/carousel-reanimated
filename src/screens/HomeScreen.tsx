import {View, StyleSheet} from 'react-native';
import React from 'react';
import Card from '../components/Card';
import {useSharedValue} from 'react-native-reanimated';
import ITEMS from '../data/Item';

export default function HomeScreen() {
  const animatedValue = useSharedValue(0);
  const currentIndex = useSharedValue(0);
  const prevIndex = useSharedValue(0);

  return (
    <View style={styles.container}>
      <View style={styles.contentItems}>
        {ITEMS.map((item, index) => (
          <Card
            key={item.id}
            index={index}
            animatedValue={animatedValue}
            currentIndex={currentIndex}
            prevIndex={prevIndex}
            dataLength={ITEMS.length}
            item={item}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    flex: 1,
  },
  contentItems: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
