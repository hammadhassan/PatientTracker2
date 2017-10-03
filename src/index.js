import React, { Component } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Details from "./Details";
import PatientForm from "./Form";
import Home from "./Home";
import SearchByName from "./SearchByName";
import SearchByDate from "./SearchByDate";
import SearchScreen from "./SearchScreen";

class Main extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
          <Home
          Add={() => navigate("AddPatients")}
          View={() => navigate("Patients")}
          />
      </View>
    );
  }
}

const AppHome = TabNavigator({
  Home: {screen: Main},
  Patients: {screen: Details},
  AddPatients: {screen: PatientForm},
  searchscreen: { 
    screen: StackNavigator({
      Search: {screen: SearchScreen},
      Searchbyname : { screen: SearchByName },
      Searchbydate: {screen: SearchByDate},
    }),
   }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default (Main, AppHome);