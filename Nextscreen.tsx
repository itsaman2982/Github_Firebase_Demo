
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import firebase from './Firebase/firebase.config';
import auth from '@react-native-firebase/auth';

const ProfileScreen = ({ route, navigation }) => {
  const { email,firstName,lastName } = route.params;
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const user = auth.currentUser;


  const handleDelete = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      user.delete()
        .then(() => {
          // User account deleted successfully
          alert('User account deleted successfully');
          navigation.navigate('RegisterScreen'); // Navigate to the Login screen after deletion
        })
        .catch(error => {
          // Handle Firebase-specific error codes
          switch (error.code) {
            case 'auth/requires-recent-login':
              alert('Please reauthenticate before deleting your account.');
              // You can navigate the user to the login screen here for reauthentication.
              break;
            default:
              console.error(error);
              alert('An error occurred while deleting your account. Please try again.');
          }
        });
    } else {
      console.error("User is not authenticated.");
      alert("You must be authenticated to delete your account.");
    }
  };


  return (
    <View>
    <Text>Welcome, {firstName} {lastName}!</Text>
      <Text>Email: {email}</Text>

      <Button title="Delete Account" onPress={handleDelete} />
    </View>
  );
};

export default ProfileScreen;
