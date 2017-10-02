import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Dimensions, ActivityIndicator, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import axios from "axios";
// import { List, ListItem } from 'react-native-elements';
import { Container, Header, Content, List, ListItem, Text, Separator , Item, Input, } from 'native-base';

export default class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
    Data : [],
    date: this.props.addPatients,
    // isLoading: false
  };
  this.PatientsData = this.PatientsData.bind(this);
  this.refreshList = this.refreshList.bind(this);
}

static navigationOptions = {
    title: 'Patients Details',
  };

PatientsData() {
  axios.get('https://polar-waters-56947.herokuapp.com/details')
  .then(({data}) => {
    // alert(data);
    var Data = data;
    this.setState({
      Data,
      isLoading: false
    })
  })
    .catch((err) => {
      alert(err);
    })
};

refreshList() {
  if (!this.state.isLoading === false) {
    return <ActivityIndicator size={50}/>
  } return (
          <Button 
          title="Refresh List"
          onPress={this.PatientsData} 
          />
    )
};

componentDidMount() {
  this.PatientsData();
    console.disableYellowBox = true
};

  render() {
    return (
        <ScrollView style={styles.container}>
          <View style={styles.Rlist}>
          {this.refreshList()}
          </View>
          <Container style={styles.container}>
          <Content style={styles.container}>
          {this.state.Data.map((value, i) => {
            return <List style={styles.list} key={i}>
              <ListItem>
              <Text style={styles.text}>Name: {value.name}</Text>
              </ListItem>
              <ListItem>
              <Text style={styles.text}>Problem: {value.problem}</Text>
              </ListItem>
              <ListItem>
              <Text style={styles.text}>Date: {value.date}</Text>
              </ListItem>
              <ListItem>
              <Text style={styles.text}>Gender: {value.gender}</Text>
              </ListItem>
              <ListItem>
              <Text style={styles.text}>Doctor: {value.doctor}</Text>
              </ListItem>
              <ListItem>
              <Text style={styles.text}>Day of Appointment: {value.day}</Text>
              </ListItem>
            </List>
          })}
          </Content>
          </Container>
          </ScrollView>
      
      );
    }
  }

const { height, width } = Dimensions.get('window') ;

const styles = StyleSheet.create({
  container: {
  backgroundColor: "white"
  },
  list: {
    borderWidth: 1
  },
  text: {
    marginTop :20,
    marginLeft :20,
    marginRight: 20
  },
  Rlist: {
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    flex: 2
  }
})