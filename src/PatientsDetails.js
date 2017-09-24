import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button, ScrollView} from 'react-native';
import { StackNavigator } from 'react-navigation';

class PatientsDetails extends Component {
    constructor(props) {
        super(props)
    this.state = {
        PatientsData: []
    }
    this.showData = this.showData.bind(this);
}

// async 
showData() {
        // empty array where we push received data
        console.log('show data')
        var arrayToPushedData = [];
        try {
            const value = AsyncStorage.getItem('Patients');
            if (value !== null) {
                // We have data!!
                parsedVal = JSON.parse(value);
                // console.log(parsedVal);
                arrayToPushedData = parsedVal;
                this.setState({
                    PatientsData: arrayToPushedData
                })
            }
        } catch (error) {
            // Error retrieving data
            console.log('error get item', error);
        }
    }

static navigationOptions = {
        title: 'Your Patients',
    };

 componentDidMount() {
        console.log("PatientsData");
        this.showData();
    }

 render() {
    return (
      <View>
      <ScrollView>
        {this.state.PatientsData.map((value, i) => {
            return <View key={i}>
              <Text>Name: {value.Patient.name}</Text>
              <Text>Problem: {value.Patient.problem}</Text>
              <Text>Date: {value.Patient.date}</Text>
              <Text>Gender: {value.Patient.gender}</Text>
              <Text>Doctor: {value.Patient.doc}</Text>
              <Text>Day of Appointment: {value.Patient.day}</Text>
            </View>
          })}
       </ScrollView>   
      </View>
      );
    }
}

export default PatientsDetails;