import React, { Component } from 'react';
import { View,  TextInput, StyleSheet } from 'react-native';
import axios from "axios";
import { Container, Header, Content, List, ListItem, Text, Separator , Item, Input, Button } from 'native-base';

class SearchByName extends Component {
    componentWillMount() {
        console.disableYellowBox = true
    }
    static navigationOptions = {
        title: "Search By Name",
    }
    constructor() {
        super()
        this.state = {
            Data: [],
            name: ""
        }
       this.getDataByName = this.getDataByName.bind(this);
    }

getDataByName() {
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
                  if (obj.name === this.state.name) {
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
          <Item bordered>
            <Input placeholder='Enter Name' 
                   onChangeText={(text) => {
                    this.setState({ name: text })
                }}
            />
          </Item>
              <Button 
              style={styles.list}
               onPress={this.getDataByName}>
               <Text>Search Patient</Text>
             </Button>
                {this.state.Data.map((value, index) => {
                    return    (
            <List key={index} style={styles.list}>
                <ListItem  bordered>
                  <Text style={styles.pList} >Name : {value.name}</Text>
                </ListItem>
                <ListItem >
                  <Text style={styles.pList}>Problem : {value.problem}</Text>
                </ListItem>
                <ListItem>
                  <Text style={styles.pList}> Date: {value.date}</Text>
                </ListItem>
                <ListItem>
                  <Text style={styles.pList}>Gender : {value.gender}</Text>
                </ListItem>
      		   <ListItem>
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
export default SearchByName;

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
  list: {
    marginTop :20,
    marginLeft :20,  
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    flex: 2
  }
})