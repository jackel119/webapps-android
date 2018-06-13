import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';

class TestComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedItems: []
    };
    this.items = 
      [{ id: '92iijs7yta',
        name: 'Ondo',
      }, {
        id: 'a0s0a8ssbsd',
        name: 'Ogun',
      }, {
        id: '16hbajsabsd',
        name: 'Calabar',
      }, {
        id: 'nahs75a5sg',
        name: 'Lagos',
      }, {
        id: '667atsas',
        name: 'Maiduguri',
      }, {
        id: 'hsyasajs',
        name: 'Anambra',
      }, {
        id: 'djsjudksjd',
        name: 'Benue',
      }, {
        id: 'sdhyaysdj',
        name: 'Kaduna',
      }, {
        id: 'suudydjsjd',
        name: 'Abuja',
      }];
  }

  onSelectedItemsChange(selectedItems) {
    this.setState({ selectedItems });
  }

  render() {
    const { selectedItems } = this.state;
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          MultiSelect Sample
        </Text>
        <MultiSelect
          hideTags
          items={this.items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component; }}
          onSelectedItemsChange={this.onSelectedItemsChange.bind(this)}
          selectedItems={selectedItems}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={(text) => console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
    </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
};

export default TestComponent;

