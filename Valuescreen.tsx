import React from 'react';
import { useState } from 'react';
import { View, Text ,TextInput,Button,Alert,TouchableOpacity,Image,StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function Valuescreen({ route }) {
const navigation = useNavigation();
  const {
    userId,
    userName,
    userAge,
    userFullname,
    userEmail,
    userPassword,
    userGender,
  } = route.params;

  const [updatedName, setUpdatedName] = useState(userName);
  const [updatedAge, setUpdatedAge] = useState(userAge);
  const [updatedFullname, setUpdatedFullname] = useState(userFullname);
  const [updatedEmail, setUpdatedEmail] = useState(userEmail);
  const [updatedPassword, setUpdatedPassword] = useState(userPassword);
  const [updatedGender, setUpdatedGender] = useState(userGender);

const handleUpdateProfile = () => {
    // Update the user's profile in Firestore with the updated values
    firestore()
      .collection('Users')
      .doc(userId)
      .update({
        name: updatedName,
        age: updatedAge,
        fullname: updatedFullname,
        email: updatedEmail,
        password: updatedPassword,
        gender: updatedGender,
      })
      .then(() => {
        console.log('User profile updated successfully');
        alert('User profile updated successfully');

      })
      .catch((error) => {
        console.error('Error updating user profile: ', error);
      });
  };

 const handleDeleteProfile = () => {
      // Replace 'userID' with the actual user ID you want to delete.
       // Change this to the correct user ID

      Alert.alert(
        'Delete Profile',
        'Are you sure you want to delete your profile?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              // User confirmed deletion
              firestore()
                .collection('Users')
                .doc(userId)
                .delete()
                .then(() => {
                  console.log('User profile deleted');
                  alert('User profile deleted');
                   navigation.navigate('Profilescreen');
                })
                .catch((error) => {
                  console.error('Error deleting user profile: ', error);
                });
            },
          },
        ]
      );
    };

  return (
    <View>
      <Text>User ID: {userId}</Text>
      <Text>Name: {userName}</Text>
      <Text>Age: {userAge}</Text>
      <Text>Full Name: {userFullname}</Text>
      <Text>Email: {userEmail}</Text>
      <Text>Password: {userPassword}</Text>
      <Text>Gender: {userGender}</Text>

      <Text>User Profile</Text>
            <TextInput
              placeholder="Name"
              value={updatedName}
              onChangeText={(text) => setUpdatedName(text)}            />
            <TextInput
              placeholder="Age"
              value={updatedAge}
              onChangeText={(text) => setUpdatedAge(text)}
              keyboardType="numeric"            />
            <TextInput
              placeholder="Full Name"
              value={updatedFullname}
              onChangeText={(text) => setUpdatedFullname(text)}            />
            <TextInput
              placeholder="Email"
              value={updatedEmail}
              onChangeText={(text) => setUpdatedEmail(text)}            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={updatedPassword}
              onChangeText={(text) => setUpdatedPassword(text)}            />
            <Text>Gender:</Text>
            <RadioButton.Group onValueChange={(value) => setUpdatedGender(value)} value={updatedGender}>
              <View>
                <Text>Male</Text>
                <RadioButton value="male" />
              </View>
              <View>
                <Text>Female</Text>
                <RadioButton value="female" />
              </View>
            </RadioButton.Group>

<TouchableOpacity onPress={handleUpdateProfile}>
        <Image
          source={require('./Images/plus.png')}
          style={styles.image}/>
    </TouchableOpacity>

<TouchableOpacity onPress={handleDeleteProfile}>
            <Image
              source={require('./Images/minus-sign.png')}
              style={styles.image1}/>
   </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({

  image:{
  marginLeft:400,
  width:50,
  height:50,
  margin:20,
  },
  image1:{
  marginLeft:400,
    width:50,
    height:50,
    },
});

export default Valuescreen;
