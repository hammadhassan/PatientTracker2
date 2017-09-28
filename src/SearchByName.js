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
            var array = []
            var foundedData = []
            axios.get('http://patienttracking.herokuapp.com/api/getAllPatient')
            // dataBase.on("value", (object) => {
              .then(({data}) => {
                // alert(data)
                var Data = data;
                var key = JSON.stringify(Data)
                // var pData = JSON.stringify(Data);
                // alert(Data)
                // for (var a in key) {
                //     array.push(key[a].data)
                // }
                // array.map((data) => {
                //     if (data.name === this.state.name) {
                //         foundedData.push(data)
                //   this.setState({
                //     Data: foundedData
                // })
                    // }  
                    // else {
                    //   alert("Data not found");
                    // }
                // })
                this.setState({
                    Data: Data
                })
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
                  <Text style={styles.pList}> Doctor : {value.doc}</Text>
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