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

adddata(_){
                var Data= this.state.name.filter((Data)=> this.search(Data, _) )
                this.setState({
                    Data
                })
       }
	// getDataByName() {
    componentDidMount(){
            var array = []
            var foundedData = []
            axios.get('https://polar-waters-56947.herokuapp.com/details'
            // {
            //   params: {
            //     name: "hammad"
            //   }
            // }
            )
            // dataBase.on("value", (object) => {
              .then(({data}) => {
                // let key = data.val()
                // for (var a in key) {
                //     array.push(key[a].patient)
                // }
                // console.log(params.name);
                // console.log(data.name);
                // array.map((data) => {
                //     if (data.name === this.state.name) {
                //         foundedData.push(data)
                  // this.setState({
                //     Data: foundedData
                // })console.log(Data)
                    // }  
                    // else {
                    //   alert("Data not found");
                    // }
                // })
                var Data = data
                this.setState({
                    Data
                })
                this.adddata('')
              })
                .catch((err) => console.warn(err)
              )
    }

    search(Data, what){
           console.log(Data.date)
           if(Data.name.toLowerCase().search(what.toLowerCase()) !== -1 || Data.date.toLowerCase() == what.toLowerCase()){
               return true 
          } else{
              return false
      }
   }   
    
    render() {
        return (
            <Container style={styles.container}>
            <Content style={styles.container}>
          <Item bordered>
            <Input placeholder='Enter Name' 
                onChangeText={(Search)=> {this.adddata.call(this, Search)}}
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

              {/*onChangeText={(text) => {
                    this.setState({ name: text })
                }}*/}
     