import {StyleSheet, View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from '../config/firebaseConfig';
// import {getDatabase, ref, child, get, query} from 'firebase/database';
import {getDatabase, ref, child, get, query} from 'firebase/database';
import {useTheme} from 'react-native-paper';
import {Avatar} from 'react-native-paper';
import {Modal, Portal, Text, Button, Provider} from 'react-native-paper';
import ChatSc from './ChatSc';
const Home = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const theme = useTheme();
  const dbRef = ref(getDatabase());
  const [uid, setUid] = useState('');
  const [message, setMessage] = useState('');
  const [loggineduser, setLogginedUser] = useState([]);
  const [wholedata, setWholeData] = useState([]);
  const [checker, setChecker] = useState(true);
  const [data, setData] = useState({
    email: '',
    username: '',
  });
  const [allusers, setAllUsers] = useState({
    username: '',
    email: '',
  });
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const Signout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Signup');
      })
      .catch(error => {
        // An error happened.
      });
  };
  function startChat(values) {
    console.warn(values);
    navigation.navigate('ChatSc', {
      itemId: values,
      data: 'ptanhi ayega ',
    });
  }
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setChecker(true);
        const uid = user.uid;
        setUid(uid);
        get(child(dbRef, `users/${uid}`))
          .then(snapshot => {
            if (snapshot.exists()) {
              setData(snapshot.val());
              console.log(snapshot.val());
            } else {
              console.log('No data available');
            }
          })
          .catch(error => {
            console.error(error);
          });
        // ...
      } else {
        navigation.navigate('Signup');
        setChecker(false);
        // User is signed out
        // ...
      }
    });
  }, []);
  const getAllData = () => {
    get(child(dbRef, `users/`))
      .then(snapshot => {
        if (snapshot.exists()) {
          const alluser = [];
          let users = Object.values(snapshot.val());
          Object.values(users).forEach((user, index) => {
            // console.warn(user);
            var data = {
              username: user.username,
              password: user.password,
              email: user.email,
              id: user.uid,
            };
            if (user.id == uid) {
              setLogginedUser(user);
            }
            alluser.push(data);
          });
          setWholeData(alluser);
          // setAllUsers(snapshot.val());
        } else {
          console.warn('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  getAllData();

  return (
    <>
      {checker ? (
        <>
          {/* <View style={{backgroundColor: theme.colors.primary}}> */}
          {/* <View> */}
          <Provider>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}>
                {/* <Text>Example Modal. Click outside this area to dismiss.</Text> */}
                <Avatar.Text size={34} label="XD" />
                <Text style={styles.main}>Welcome Back: {data.username}</Text>
                <Text style={styles.main}>Uid: {uid}</Text>
                <Button onPress={Signout}>Logout</Button>
              </Modal>
            </Portal>
            <Button style={{}} onPress={showModal}>
              Show User Info
            </Button>
            <TextInput />
            <Text style={{color: 'black', marginLeft: 170}}>All Users</Text>
            {wholedata.map(values => {
              if (values.id == uid) {
                // console.warn('user found');
                return;
              } else {
                return (
                  <>
                    <View style={{display: 'flex'}} key={values.id}>
                      <Text style={{color: 'black'}}>{values.username}</Text>
                      <Text style={{color: 'black'}}>{values.email}</Text>
                      <Button
                        title="Send A Msg"
                        style={{color: 'black', backgroundColor: 'black'}}
                        // onPress={() => {
                        //   /* 1. Navigate to the Details route with params */
                        //   navigation.navigate('ChatSc', {
                        //     itemId: values,
                        //     otherParam: 'anything you want here',
                        //   });
                        // }}
                        onPress={() => startChat(values)}
                      />
                      <View style={{backgroundColor: 'black'}}></View>
                    </View>
                  </>
                );
              }
            })}
          </Provider>
          {/* </View> */}
        </>
      ) : (
        <>
          <View>
            <Text>Plz Login First To See Your Account Info</Text>
          </View>
        </>
      )}
    </>
  );
};

export default Home;
const styles = StyleSheet.create({
  main: {
    color: 'black',
  },
});
