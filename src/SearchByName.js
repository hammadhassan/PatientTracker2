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
    }

	getDataByName() {
            axios.get('https://polar-waters-56947.herokuapp.com/details')
              .then(({data}) => {
                // .then((data) => {
                let array = []
                var foundedData = []
                // let mydata = JSON.parse(data)
                let mydata = data
                console.log(mydata)   
                // console.log(mydata.length)             
                console.log(array)
                for ( i = 0; i < mydata.length; i++) {
                  array.push(mydata[i]);
                  console.log(array)
                  console.log(array.data.name)
                  console.log(this.state.Data)
                }
                array.map((obj) => {
                  if (obj.name === this.state.Data) {
                    foundedData.push(obj)
                  }
                })
                this.setState({
                    Data: foundedData
                })
              //   .catch((err) => console.warn(err)
              // )
            })
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
              style={styles.pList}
               onPress={this.getDataByName.bind(this)}>
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
})