import React, { useState } from 'react';
import { View, Text, TextInput, Button,Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function UserProfile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('male');
  const userID = 'Lr2iDIycrR2tK6grFDSB';
  const navigation = useNavigation();


const handleSaveProfile = () => {
  if (name && age && fullname && email && password) {
        firestore()
          .collection('Users')
          .add({
            name: name,
            age: parseInt(age),
            fullname: fullname,
            email: email,
            password: password,
            gender: gender,
          })

          .then((docRef) => {
            console.log('User added with ID: ', docRef.id);
            alert('User added with ID: ' + docRef.id);

            setName('');
                    setAge('');
                    setFullname('');
                    setEmail('');
                    setPassword('');
                    setGender('male');

                    // Navigate to the second screen and pass user details as params
                    navigation.navigate('Valuescreen', {
                      userId: docRef.id,
                      userName: name,
                      userAge: age,
                      userFullname: fullname,
                      userEmail: email,
                      userPassword: password,
                      userGender: gender,
                    });
                  })
                  .catch((error) => {
                    console.error('Error adding user: ', error);
                  });
              } else {
                console.log('Please fill in all required fields');
              }
            };

    const handleUpdateProfile = () => {
      if (name && age && fullname && email && password) {



        firestore()
          .collection('Users')
          .doc(userID)
          .update({
            name: name,
            age: parseInt(age),
            fullname: fullname,
            email: email,
            password: password,
            gender: gender,
          })
          .then(() => {
            console.log('User profile updated');
            alert('User profile updated');
          })
          .catch((error) => {
            console.error('Error updating user profile: ', error);
          });
      } else {
        console.log('Please fill in all required fields');
      }
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
               .doc(userID)
               .delete()
               .then(() => {
                 console.log('User profile deleted');
                 alert('User profile deleted');
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
    <View style={{backgroundColor:'white'}}>
      <Text style={{marginLeft:30,fontSize:20,}}>User Profile</Text>
           <TextInput style={{borderRadius:5,  borderBottomWidth: 3, width:370, height:45, margin:10, marginLeft:30, flexDirection: 'row', alignItems:'center' }}
             placeholder="Name"
             value={name}
             onChangeText={(text) => setName(text)}
           />
           <TextInput style={{borderRadius:5,  borderBottomWidth: 3, width:370, height:45, margin:10, marginLeft:30, flexDirection: 'row', alignItems:'center' }}
             placeholder="Age"
             value={age}
             onChangeText={(text) => {
                 if (/^\d+$/.test(text) || text === '') {
                   setAge(text);
                 }
               }}
             keyboardType="numeric"
           />
           <TextInput style={{borderRadius:5,  borderBottomWidth: 3, width:370, height:45, margin:10, marginLeft:30, flexDirection: 'row', alignItems:'center' }}
             placeholder="Full Name"
             value={fullname}
             onChangeText={(text) => setFullname(text)}
           />
           <TextInput style={{borderRadius:5,  borderBottomWidth: 3, width:370, height:45, margin:10, marginLeft:30, flexDirection: 'row', alignItems:'center' }}
             placeholder="Email"
             value={email}
             onChangeText={(text) => setEmail(text)}
              onBlur={() => {
                 if (email && !/^\S+@\S+\.\S+$/.test(email)) {
                   // Display an error message or alert for an invalid email format.
                   Alert.alert('Invalid Email', 'Please enter a valid email address.');
                 }
               }}
           />
           <TextInput style={{borderRadius:5,  borderBottomWidth: 3, width:370, height:45, margin:10, marginLeft:30, flexDirection: 'row', alignItems:'center' }}
             placeholder="Password"
             secureTextEntry
             value={password}
             onChangeText={(text) => setPassword(text)}
              onBlur={() => {
                 if (password.length < 6) {
                   Alert.alert('Weak Password', 'Password must be at least 6 characters.');
                 }
               }}
           />
<Text style={{marginLeft:30,fontSize:16,}}>Gender</Text>
      <RadioButton.Group onValueChange={(value) => setGender(value)} value={gender}>
        <View style={{marginLeft:30,fontSize:20,}}>
          <Text>Male</Text>
          <RadioButton value="male" />
        </View>
        <View style={{marginLeft:30,fontSize:20,}}>
          <Text>Female</Text>
          <RadioButton value="female" />
        </View>
      </RadioButton.Group>

      <Button title="Save Profile" onPress={handleSaveProfile} />


    </View>
  );
}

