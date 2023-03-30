import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Touchable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {auth} from '../config/firebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {ProgressBar, MD3Colors} from 'react-native-paper';

const Login = ({navigation}) => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  // function handleLogin() {
  //   setError('hello');
  // }
  const handleLogin = () => {
    setLoader(true);
    // setError('chalet');
    signInWithEmailAndPassword(auth, gmail, password)
      .then(userCredential => {
        // Signed in
        setError('User Loggined Successfully');
        const user = userCredential.user;
        setLoader(false);
        navigation.navigate('Home');
        // setError('');
        // ...
      })
      .catch(error => {
        setLoader(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
    setTimeout(() => {
      setError('');
    }, 2000);
  };
  return (
    <View style={{flex: 1}}>
      {loader ? (
        <ProgressBar progress={0.7} color={MD3Colors.secondary10} />
      ) : null}

      <Text style={styles.head}>Login</Text>
      <Text
        style={{
          fontSize: 18,
          color: 'black',
          marginLeft: 120,
        }}>
        Welcome Back !{' '}
      </Text>
      <View style={{marginTop: 20}}>
        <View style={styles.container}>
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
        disabled={!gmail || !password}
        onPress={handleLogin}>
        {loader ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            style={styles.appButtonText}
            disabled={!gmail || !password}
            onPress={handleLogin}>
            Login
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

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

export default Login;
