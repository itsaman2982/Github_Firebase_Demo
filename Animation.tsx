import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Animation = () => {
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const slideIn = Animated.timing(slideAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    });

    const slideOut = Animated.timing(slideAnim, {
      toValue: -300,
      duration: 2000,
      useNativeDriver: true,
    });

    Animated.sequence([slideIn, slideOut]).start(() => {
      // After the animation completes, navigate to the second screen
      navigation.navigate('Profilescreen');
    });
  }, [slideAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { transform: [{ translateY: slideAnim }] }]}>
        <Image
          source={require('./Images/android.png')} // Replace with your image path
          style={styles.image}        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default Animation;
