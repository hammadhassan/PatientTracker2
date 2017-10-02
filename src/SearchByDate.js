import React, { Component } from 'react';
import { View,  TextInput, StyleSheet } from 'react-native';
import axios from "axios";
import { Container, Header, Content, List, ListItem, Text, Separator , Item, Input, Button } from 'native-base';

class SearchByDate extends Component {

    componentWillMount() {
        console.disableYellowBox = true
    }
    static navigationOptions = {
        title: "Search By Date",
    }
    constructor() {
        super()
        this.state = {
            Data: [],
            date: ""
        }
        this.getDataByDate = this.getDataByDate.bind(this);
    }

	getDataByDate() {
            axios.get('https://polar-waters-56947.herokuapp.com/details')
              .then(({data}) => {
              console.log(data)
              let newdata = []
              var foundedData = []
              for ( i = 0; i < data.length; i++) {
                  newdata.push(data[i]);
                  // console.log(newdata)
                  // console.log(this.state.data)
              }
              newdata.map((obj) => {
                  if (obj.date === this.state.date) {
                      foundedData.push(obj)
                      // console.log(obj)
                  }
                })                 
                 this.setState({
                 Data: foundedData  
               })
      })
          .catch((err) => console.warn(err)
          )
    }

    render() {
        return (
          <Container style={styles.container}>
          <Content style={styles.container}>
          <Item>
            <Input placeholder='Enter Date : 11/9/2017' 
                  onChangeText={(text) => {
                    this.setState({ date: text })
                }}
            />
          </Item>
              <Button 
              style={styles.pList}
               onPress={this.getDataByDate}>
               <Text>Search Patient</Text>
             </Button>
                {this.state.Data.map((value, index) => {
                    return    (    
            <List key={index} style={styles.list}>
                <ListItem  bordered>
                  <Text style={styles.pList} >Name : {value.name}</Text>
                </ListItem>
                <ListItem bordered>
                  <Text style={styles.pList}>Problem : {value.problem}</Text>
                </ListItem>
                <ListItem bordered>
                  <Text style={styles.pList}> Date: {value.date}</Text>
                </ListItem>
                <ListItem bordered>
                  <Text style={styles.pList}>Gender : {value.gender}</Text>
                </ListItem >
      		   <ListItem bordered>
                  <Text style={styles.pList}> Doctor : {value.doctor}</Text>
                </ListItem>
           </List>
                    )
                })}
                </Content>
            </Container>
        )
    }
}
export default SearchByDate;

const styles = StyleSheet.create({
  pList: {
   marginTop :20,
   marginLeft :20,
  },
  list: {
    borderWidth: 1
  },
  container: {
    backgroundColor: "white"
  },
})