import 'react-native-gesture-handler';
import React from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Home from './screens/Home';
import ChatSc from './screens/ChatSc';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './config/firebaseConfig';
import {View, Text} from 'react-native';
// import {Provider as PaperProvider} from 'react-native-paper';
// import {MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {BottomBar} from './components/BottomBar';
// // const theme = {
// //   ...DefaultTheme,
// //   colors: {
// //     ...DefaultTheme.colors,
// //     primary: 'tomato',
// //     secondary: 'yellow',
// //   },
// // };
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const App = ({navigation}) => {
  const [han, setHan] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.uid;
        setHan(true);
      } else {
        setHan(false);
      }
    });
  }, [auth]);
  return (
    // <PaperProvider theme={theme}>
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Signup"
          component={Signup}
          options={{title: han ? 'Logout ' : 'Signup'}}
        />
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{title: han ? 'Logout ' : 'Login'}}
        />
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{title: han ? 'Acount Info' : ''}}
        />
        <Drawer.Screen
          name="ChatSc"
          component={ChatSc}
          options={{title: han ? 'ChatSc' : ''}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
    // </PaperProvider>
  );
};

export default App;

// const App = () => {
//   return (
//     <View>
//       <Text>App</Text>
//     </View>
//   );
// };

// export default App;
