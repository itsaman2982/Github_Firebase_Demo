// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button,TouchableOpacity,Text,Alert } from 'react-native';
import firebase from './Firebase/firebase.config';
import auth from '@react-native-firebase/auth';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // User logged in successfully
        const user = userCredential.user;
        navigation.navigate('Nextscreen', { email: user.email });
      })
      .catch(error => {
        console.error(error);
      });
  };

const handleForgotPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      // Handle successful password reset email sent
      Alert.alert('Password Reset Email Sent', 'A password reset email has been sent to your inbox.');
    } catch (error) {
      console.error('Forgot Password Error:', error);
      // Handle password reset error
      Alert.alert('Password Reset Failed', 'An error occurred while sending the password reset email.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry      />
      <Button title="Login" onPress={handleLogin} />
<TouchableOpacity onPress={()=>handleForgotPassword()}>
<Text style={{textAlign:'center',margin:13,fontSize:18,}}>Reset password</Text>
                                    </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
