/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import CardStack from './CardStack'
import {SafeAreaView, View, Text} from 'react-native'

const App = () => {
  const data = [
      { title: 'Title 1', description: 'Description 1'},
      { title: 'Title 2', description: 'Description 2'},
      { title: 'Title 3', description: 'Description 3'},
      { title: 'Title 4', description: 'Description 4'},
      { title: 'Title 5', description: 'Description 5'},
  ]

  return (
    <SafeAreaView style={{ flex: 1}}>
        <CardStack data={data}
                   renderItem={(item) => (
                       <View style={{ backgroundColor: 'pink', display: 'flex', flexDirection: 'column', flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                           <Text style={{ fontSize: 28}}>{item.title}</Text>
                           <Text style={{ fontSize: 15}}>{item.description}</Text>
                       </View>
                   )}
        />
    </SafeAreaView>
  );
};


export default App;
