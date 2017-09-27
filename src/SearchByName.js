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
                {this.state.Data.map((Data, index) => {
                    return    (
            <List key={index} style={styles.list}>
                <ListItem  bordered>
                  <Text style={styles.pList} >Name : {Data.name}</Text>
                </ListItem>
                <ListItem >
                  <Text style={styles.pList}>Problem : {Data.problem}</Text>
                </ListItem>
                <ListItem>
                  <Text style={styles.pList}> Date: {Data.date}</Text>
                </ListItem>
                <ListItem>
                  <Text style={styles.pList}>Gender : {Data.gender}</Text>
                </ListItem>
      		   <ListItem>
                  <Text style={styles.pList}> Doctor : {Data.doc}</Text>
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