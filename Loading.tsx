import React, { useState, useEffect,useRef } from 'react';
import { View, Text, ActivityIndicator, Button, StyleSheet,Image,Animated } from 'react-native';

const Loading = ({ navigation }) => {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
      const timer = setTimeout(() => {
        // Navigate to the SecondScreen after a 2-second delay
        navigation.navigate('Animation');
      }, 2000); // 2000 milliseconds = 2 seconds

      // Clear the timeout to prevent memory leaks
      return () => clearTimeout(timer);
    }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
        <Text>Loading...</Text>
      </View>
    );
  }

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  i1:{
  width:200,
  height:200,
  justifyContent: 'center',
  },
});
export default Loading;