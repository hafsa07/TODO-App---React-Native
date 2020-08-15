import React, { useState } from 'react';
import { StyleSheet, Text, Button, View, TextInput, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';

import CustomButton from './components/ButtonComponent';
import { TodoItems } from "./constants/dummyTODOlist";

export default function App() {
  const [getText, setText] = useState('');
  const [getList, setList] = useState(TodoItems);
  const [getKey, setKey] = useState('');
  const [getButtonKey,setButtonKey] = useState('ADD');

  const itemPress = (item) => {
      setKey(item.key)
      setText(item.data)
      setButtonKey('UPDATE')
  }

  const addItem = () => {
      // if there is something to update
      if (getKey !== ''){
        var list= getList;
        for(let i = 0 ; i < list.length; i++){
          // If condition gets the item from the list that is to be updated
          if(list[i].key === getKey){
            list[i].data = getText
            setButtonKey('ADD');
          }
        }
        setKey('')
        setText('')
        setList(list)
        
        
      }
      else {
    console.log(getText);
    setList([
      ...getList,
      { key: Math.random().toString() , data: getText }
    ]);
    setText('');
  }
}

  const removeItem = (itemKey) => {
    //var list = getList.filter(item => item.key != itemKey);
    //setList(list);
    setList(list => getList.filter(item => item.key != itemKey));
  }

  const scrollview = (
    <ScrollView style={styles.scrollview}>
        {getList.map((item,i) =>
          <TouchableOpacity
            key={item.key}
            activeOpacity={0.7}
            onPress={() => itemPress(item)}
          >
            <View style={styles.scrollviewItem}>
              <Text  style={styles.scrollviewText}>{i+1}   {item.data}</Text>
              <TouchableOpacity
                onPress={() => removeItem(item.key)}
              >
                <View style={styles.crosstextcontainer}>
                  <Text style={styles.crosstext}>X</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
  );

  const emptyScrollView = (
    <View style={{paddingTop:30}}>
        <Text style={{color:'grey' , fontSize: 18 , fontStyle: 'italic'}}>No TODO Items! Enjoy!</Text>
      </View>
  );
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>TODO APP</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Item"
          onChangeText={text => setText(text)}
          value={getText}
        />

        <CustomButton
          text={getButtonKey}
          color='seagreen'
          textSize={20}
          textColor="white"
          onPressEvent={addItem}
          disabled = {getText.length <=0}
        />
      </View>
        {getList.length <=0 ? emptyScrollView : scrollview}
      
    </View>
  );
}

const styles = StyleSheet.create({
  crosstextcontainer: {
    backgroundColor: 'grey',
    borderRadius: 50,
    padding: 5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  crosstext: {
    fontSize: 16,
    color: 'red',
    fontWeight: "bold"
  },
  scrollviewText: {
    fontSize: 26,
    color: 'white'
  },
  scrollview: {
    paddingTop: 20,
    width: '100%'
  },
  scrollviewItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: 'seagreen',
    alignSelf: "center",
    padding: 10,
    margin: 5,
    width: '90%',
    borderRadius: 10
  },
  title: {
    fontSize: 64,
    color: 'white',
    paddingTop:40,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingTop: 40
  },
  inputContainer: {
    flexDirection: "row",
    width: '70%',
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
  },
  textInput: {
    color: 'white',
    borderColor: 'seagreen',
    //borderWidth: 2,
    borderBottomWidth: 2,
    width: '70%',
    // borderRadius: 50,
    fontSize: 16,
    padding: 10
  }
});