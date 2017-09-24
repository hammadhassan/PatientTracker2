import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Picker, AsyncStorage, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class PatientForm extends Component {
  constructor(props){
    super(props)
    this.state={
     // value: ""
     // List: [{
      name: "",
      problem: "",
      gender: "",
      doctor:"",
      day: ""
    // }]
};
    this.onGenderSelect = this.onGenderSelect.bind(this);
    this.onDaySelect = this.onDaySelect.bind(this);
  }
  
  static navigationOptions = {
        title: "Add Patients",
    };
// save data function
  // saveData() {
  //   var Data = this.state.value;
  //   AsyncStorage.setItem('key', Data)
  //     .then(() => {
  //       alert(Data)
  //     })
  //     .catch((err) => {
  //       alert("Error" + err)
  //     })
  // }

  // // get data function
  // getData() {
  //   AsyncStorage.getItem('key')
  //     .then((data) => {
  //       alert(data + " " + "this is your data")
  //     })
  //     .catch((err) => {
  //       alert("Error" + err)
  //     })
  // }

  // // remove data function
  // removeData() {
  //   AsyncStorage.removeItem('key')
  //     .then(() => {
  //       alert('Your Data has been removed');
  //     })
  //   //   .catech((err) => {
  //   //       alert(err)
  //   //   })
  // }

  addPatients() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var fullDate = day + "/" + month + "/" + year;
    var PatientsData = {          
      Patient: {
        name: this.state.name, 
        problem: this.state.problem,
        gender: this.state.gender,
        date: fullDate,
        doc: this.state.doc,
        day: this.state.day,
        Data: []
      }
    }
    this.setItems(PatientsData);
  }
  // addItems() {
  //   if(!this.state.value) return;
  //   const newItems = [
  //     ...this.state.items,
  //     {
  //       key: Date.now(),
  //       text: this.state.value,
  //       complete: false
  //     }
  //   ]
  //   this.setState({
  //     items: newItems,
  //     value: ""
  //   })
  // <Button title="get" onPress={this.getData} style={styles.Button}/>
            // <Button title="remove" onPress={this.removeData} style={styles.Button}/>
            // <Button title="save" onPress={this.saveData} style={styles.Button}/>
  // }
  

async componentDidMount() {
        //   try {
        //     const value = await AsyncStorage.getItem('Patients');
        //     if (value !== null) {
        //         // We have data!!
        //         parsedVal = JSON.parse(value);
        //         // console.log(parsedVal);
        //         this.setState({
        //             setAsyncData: parsedVal
        //         });
        //     }
        // } catch (error) {
        //     // Error retrieving data
        //     console.log('error get item', error);
        // }        
        var Data = this.state;
          AsyncStorage.setItem('key', Data)
            .then(() => {
                parsedVal = JSON.parse(Data);
                console.log(parsedVal);
                this.setState({
                    Data: parsedVal
                });
              alert(Data)
            })
            .catch((err) => {
              alert("Error" + err)
            })
}

    //async 
    setItems(obj) {
        arrayToPushedData = this.state.Data;
        arrayToPushedData.push(obj);
        try {
            AsyncStorage.setItem('Patients', JSON.stringify(arrayToPushedData));
            console.log(arrayToPushedData);
        }
        catch (error) {
            // Error saving data
            console.log('error in setItem', error)
        }
    }  
// }

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

  render() {
    return (
      <View>
            <ScrollView>
            <TextInput placeholder="Patient Name"
              onChangeText={(text) => { this.setState({ name: text }) }}></TextInput>
            <TextInput placeholder="Patient Problem" 
              onChangeText={(text) => { this.setState({ problem: text }) }}></TextInput>
            <Text>Gender</Text>
              <Picker 
            selectedValue={this.state.gender}
            onValueChange={(text) => this.onGenderSelect(text)}>
            <Picker.Item label="Select Gender" value="" />
             <Picker.Item label="Male" value="Male" />
             <Picker.Item label="Female" value="Female" />
            </Picker>
            <TextInput placeholder="Doctor Name" 
            onChangeText={(text) => { this.setState({ doc: text }) }}>
            </TextInput>
            <Text>Day of Appointment</Text>
            <Picker
            selectedValue={this.state.day}
            onValueChange={(text) => this.onDaySelect(text)}>
            <Picker.Item label="Select Day" value="" />
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
              <Picker.Item label="Sunday" value="Sunday" />
            </Picker>
            <Button title="Add Patients" onPress={this.addPatients} style={styles.Button}/>
            <Text>{this.state.name}</Text>
            <Text>{this.state.problem}</Text>
            <Text>{this.state.gender}</Text>
            <Text>{this.state.doc}</Text>
            <Text>{this.state.day}</Text>
            </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1
  },
  Button: {
    margin: 50,
    width: 50
  }
})