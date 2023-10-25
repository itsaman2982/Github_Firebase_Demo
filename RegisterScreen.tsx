import React, { useState } from 'react';
import { Text, TextInput, Button, View,Alert,  } from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import firebase from './Firebase/firebase.config';
import auth from '@react-native-firebase/auth';

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('male');
  const [hobbies, setHobbies] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleSignup = async () => {
    try {
      const user = await auth().createUserWithEmailAndPassword(email, password);
      // User created successfully
      console.log('User created:', user.user);
      navigation.navigate('LoginScreen', {  firstName,
                                                 lastName,
                                                 gender,
                                                 hobbies,
                                                 email, });
    } catch (error) {
      // Handle error
      console.error('Registration failed:', error);
      Alert.alert('Registration failed', error.message || 'An error occurred');
    }
  };


  return (
        <View>
        <TextInput
                placeholder="First Name"
                onChangeText={text => setFirstName(text)}/>
              <TextInput
                placeholder="Last Name"
                onChangeText={text => setLastName(text)}/>

          <TextInput
            placeholder="Email address"
            onChangeText={(text) => setEmail(text)}
            value={email}/>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}/>





          <Button
            title="Sign up"
            onPress={handleSignup}/>
        </View>
      );
    };

export default RegisterScreen;