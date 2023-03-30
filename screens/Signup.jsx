import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Touchable,
  ActivityIndicator,
} from 'react-native';
import {ref, set} from 'firebase/database';
import {database} from '../config/firebaseConfig';

import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {auth} from '../config/firebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {ProgressBar, MD3Colors} from 'react-native-paper';
const Signup = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  useEffect(() => {}, []);
  const statecler = () => {
    // setError('');
    setGmail('');
    setUsername('');
    setPassword('');
    setLoader(false);
  };
  // const Checker = () => {

  // };
  // if (!username || !gmail || !password) {
  //   setError('All Fields Are Required !');
  // } else {
  //   setError('');
  // }
  const handleSignup = () => {
    setLoader(true);
    // setError('chalet');
    createUserWithEmailAndPassword(auth, gmail, password)
      .then(userCredential => {
        set(ref(database, 'users/' + userCredential.user.uid), {
          username: username,
          email: gmail,
          password: password,
          uid: userCredential.user.uid,
        });
        setError('User Created Successfully');
        const user = userCredential.user;

        statecler();
        navigation.navigate('Home');
        // ...
      })
      .catch(error => {
        setLoader(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };
  return (
    <View style={{flex: 1}}>
      {loader ? (
        <ProgressBar progress={0.7} color={MD3Colors.secondary10} />
      ) : null}
      <Text style={styles.head}>Signup</Text>
      <View style={{marginTop: 20}}>
        <View style={styles.container}>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
            Username:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={newtext => setUsername(newtext)}
            placeholderTextColor="black"
          />
          <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
            Email:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="black"
            value={gmail}
            onChangeText={newtext => setGmail(newtext)}
          />
          <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
            Password:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="black"
            value={password}
            onChangeText={newtext => setPassword(newtext)}
          />
        </View>
      </View>
      <Text style={styles.error}>{error}</Text>
      <TouchableOpacity
        style={styles.appButtonContainer}
        disabled={!username || !gmail || !password}
        onPress={handleSignup}>
        {loader ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            style={styles.appButtonText}
            onPress={handleSignup}
            disabled={!username || !gmail || !password}>
            Signup
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
const styles = StyleSheet.create({
  head: {
    alignItems: 'center',
    marginLeft: 150,
    marginTop: 100,
    fontSize: 32,
    color: 'black',
    // fontWeight: 'bolder',
  },
  error: {
    alignItems: 'center',
    marginLeft: 120,
    color: 'red',
  },
  input: {
    borderColor: 'gray',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: 'black',
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 30,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
// import {View, Text} from 'react-native';
// import React from 'react';

// const Signup = () => {
//   return (
//     <View>
//       <Text>Signup</Text>
//     </View>
//   );
// };

// export default Signup;
