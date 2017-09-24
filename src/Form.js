import React, { Component } from 'react';
import {View, Alert, TextInput, StyleSheet, FlatList, Picker, ScrollView } from 'react-native';
// import firebase from "firebase";
import { FormLabel, FormInput } from 'react-native-elements';
import { Container, Content, Text, Button } from 'native-base';
// import { Container, Content, Item, Input, Form, Label, Button, Text } from 'native-base';
import axios from 'axios';

export default class PatientForm extends Component {
  static navigationOptions = {
    title: 'Patient Form',
};

  constructor(props){
    super(props)
    this.state={
      name: "",
      problem: "",
      gender: "",
      doctor:"",
      day: ""
};
    this.onGenderSelect = this.onGenderSelect.bind(this);
    this.onDaySelect = this.onDaySelect.bind(this);
    // this.setItem = this.setItem.bind(this);
    console.ignoredYellowBx =['Setting a timer'];
  }

  addPatients() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var fullDate = day + '/' + month + '/' + year;
    var PatientsData = {
        name: this.state.name, 
        problem: this.state.problem,
        gender: this.state.gender,
        date: fullDate,
        doc: this.state.doc,
        day: this.state.day,
    }
    console.log("data Obj", PatientsData)
    
    // axios({
    //         method: 'post',
    //         url: 'https://patientapp-server.herokuapp.com/addpatient',
    //         data: PatientsData
    //     })
       return axios.post('https://patientapp-server.herokuapp.com/addpatient', PatientsData)
            .then((data) => {
              this.setState({
              name: "",
              problem: "",
              gender: "",
              doctor:"",
              day: ""
              })
              alert("Success")
            })
            .catch((err) => {
                alert("Error")
            })
    // this.props.navigation.navigate('Details');
  }

  // setItem(obj) {
  //       arrayToPushedData = this.state.setData;
  //       arrayToPushedData.push(obj);
  //       // console.log(obj)
  //   }

  onGenderSelect = (gender) => {
    this.setState({
      gender: gender
    });
  }
  onDaySelect = (day) => {
    this.setState({
      day: day
    });
  }
componentWillMount() {
        console.disableYellowBox = true
    }
  render() {
    return (
      <View>
          <ScrollView>
                <FormLabel>Full Name</FormLabel>
                  <FormInput
                    value={this.state.name}
                    onChangeText={(text) => { this.setState({ name: text }) }}
                    placeholder="Patient Name"
                  />
                 <FormLabel>Problem</FormLabel>
                  <FormInput
                    value={this.state.problem} 
                    onChangeText={(text) => { this.setState({ problem: text }) }}
                    placeholder="Patient Problem"
                    placeholderTextColor= {'#dc143c'}
                    selectionColor= {'#660000'}
                    underlineColorAndroid= {'#660000'}    
                    />
            <FormLabel>Gender</FormLabel>
            <Picker 
            selectedValue={this.state.gender}
            onValueChange={(text) => this.onGenderSelect(text)}
            >
            <Picker.Item label="Select Gender" value="" />
             <Picker.Item label="Male" value="Male" />
             <Picker.Item label="Female" value="Female" />
            </Picker>
                  <FormLabel>Doctor</FormLabel>
                    <FormInput 
                    value={this.state.doc} 
                    placeholder="Doctor Name" 
                    onChangeText={(text) => { this.setState({ doc: text }) }}
                    />
            <FormLabel>Day of Appointment</FormLabel>
            <Picker
            selectedValue={this.state.day}
            onValueChange={(text) => this.onDaySelect(text)}
            >
            <Picker.Item label="Select Day" value="" />
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
              <Picker.Item label="Sunday" value="Sunday" />
            </Picker>
            
            <Container>
          <Content>
            <Button primary
            onPress={this.addPatients.bind(this)}
            style={styles.button}
            ><Text> Add Patients </Text></Button>
          </Content>
      </Container>
          </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center"
  }
})