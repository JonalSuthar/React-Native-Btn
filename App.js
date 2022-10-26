/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';

import {
  Button,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Colors,

} from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';

// Get user document with an ID of ABC




const App = () => {

  const isDarkMode = useColorScheme() === 'dark';

  const [isOn, setIsON] = React.useState(false);

  const OnTap = async () => {
    let btn = (isOn == true ? false : true);
    console.log("Hettt ", isOn);
    await firestore().collection("device").doc("12").set({
      light: btn
    });

    //xsetIsON(btn);
  }

  const listen =() => {
       firestore()
      .collection('device')
      .doc("12")
      .onSnapshot(documentSnapshot => {
        let {light} = documentSnapshot.data()
        setIsON(light);

        console.log('User data: ',light);
      });
  }

  // const setData=async()=>{
  //   console.log(isOn);
  //   const data =await firestore().collection("device").doc("12").get();
  //   var data1 = data.data();
  //   console.log(data1);
  //   if(data1.light=="on"){
  //    setIsON(true);
  //   }
  //   else {
  //    setIsON(false);
  //   }
  // }

  React.useEffect(() => {

    listen();
    // Stop listening for updates when no longer required

  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={styles.body}>
      <Text style={{
        fontSize: 40,
        color: "red",
        fontStyle: 'italic',
        margin: 10,
      }}>My First App j</Text>


      <TouchableOpacity onPressIn={async () => {
        await OnTap();
      }}
      onPressOut={async()=>{
        
      }}
      >
        <View style={{ height: 60, width: 100, padding: 10, backgroundColor: isOn ? "yellow" : "green", justifyContent: 'center' }}>
          <Text>Glow</Text>
        </View>

      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {

  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
