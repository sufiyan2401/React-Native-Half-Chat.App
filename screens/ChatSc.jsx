import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getDatabase, ref, child, get, query, set} from 'firebase/database';
import {database} from '../config/firebaseConfig';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import uuid from 'react-native-uuid';
const ChatSc = ({route, navigation}) => {
  const [login, setLogin] = useState('');
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const crnuid = user.uid;
        setLogin(crnuid);
      } else {
      }
    });
  }, []);
  const [myObject, setMyObject] = useState({
    username: '',
    password: '',
    email: '',
    id: '',
  });
  console.log('Route: ', route);
  const {itemId} = route.params;
  const dbRef = ref(getDatabase());
  const dbRefs = getDatabase();
  function Getdata() {
    get(child(dbRef, `users/${itemId.id}`))
      .then(snapshot => {
        if (snapshot.exists()) {
          var obj = {
            username: snapshot.val().username,
            password: snapshot.val().password,
            email: snapshot.val().email,
            id: snapshot.val().uid,
          };
          if (obj.id == login) {
            console.warn('this is same');
            return;
          } else {
            setMyObject(obj);
          }
          // console.log(obj.following.length);
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
        alert('data not received');
      });
  }
  useEffect(() => {
    Getdata();
  }, []);
  function sendChat() {
    set(ref(database, '/chats', uuid), {
      msgsentby: login,
      receivedby: myObject.id,
    });
  }
  return (
    <>
      <View>
        <Text>ChatSc</Text>
        <Text style={{color: 'black'}}>{myObject.id}</Text>
        <Text style={{color: 'black'}}>{myObject.username}</Text>
        <TextInput
          style={styles.input}
          placeholder="useless placeholder"
          // onChangeText={onChangeNumber}
          // value={number}
          keyboardType="numeric"
        />
        <Button title="Add" onPress={sendChat} />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
});

export default ChatSc;
