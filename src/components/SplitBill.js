import React, { Component } from 'react';
import { Text, View, ScrollView, Picker } from 'react-native';
import MultiSelect from 'react-native-multiple-select'; 
import { CardSection, Button } from './common';


class SplitBill extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedPeople: [],
      splitEqually: false
    };
    this.items = 
      [{ id: '1',
        name: 'Jack',
      }, {
        id: '2',
        name: 'Cassie',
      }, {
        id: '3',
        name: 'Elain',
      }, {
        id: '4',
        name: 'David',
      }, {
        id: '5',
        name: 'Zicong',
      }];
    console.log(this.props);
  }

  onSelectedItemsChange(selectedItems) {
    this.setState({ selectedItems });
  }

  renderTop() {
    console.log(this.state.splitEqually);
    if (this.state.splitEqually) {
      const { selectedItems } = this.state;
      return (
      <View style={styles.container}>
        <MultiSelect
          hideTags
          fixedHeight
          items={this.items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component; }}
          onSelectedItemsChange={this.onSelectedItemsChange.bind(this)}
          selectedItems={selectedItems}
          selectText="Pick Friends"
          searchInputPlaceholderText="Search Friends..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
      </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Button onPress={() => { this.setState({ splitEqually: true }); }}>
            AA?
          </Button>
        </View>
      );
    }
  }

  render() {
    const renderData = this.props.data.map((data) => {
    return (
        <CardSection>
          <View style={{ flexDirection: 'row' }}>

            <View style={{ flexDirection: 'column' }}>
              <Text> {'Item ' + data.id} </Text>
              <Text> Amount </Text>
            </View>

            <View style={{ flexDirection: 'column' }}>
              <Text> {data.name} </Text>
              <Text> {data.amount} </Text>
            </View>

            <View style={styles.containerStyle}>
              <Text style={styles.labelStyle}>SharedWith</Text>
              <Picker
                style={styles.inputStyle}
              >
                <Picker.Item label="Jack1" value='1' />
                <Picker.Item label="Jack2" value='2' />
              </Picker>
            </View>

          </View>
        </CardSection>
      );
    });

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 0.2, paddingTop: 5 }}>
          {this.renderTop()}
        </View>
        <View style={{ flex: 0.8, paddingTop: 5 }}>
          <ScrollView>
            {renderData}
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 1
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40
  }
};


export default SplitBill;

