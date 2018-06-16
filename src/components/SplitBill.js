import React, { Component } from 'react';
import { Text, View, ScrollView, Picker } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { Button } from './common';


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
      <View style={styles.topStyle}>
        <MultiSelect
          hideTags
          fixedHeight
          items={this.items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component; }}
          onSelectedItemsChange={this.onSelectedItemsChange.bind(this)}
          selectedItems={selectedItems}
          selectText="   Pick Friends"
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
        <View style={styles.topStyle}>
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
        <View style={styles.containerStyle}>
          <View style={styles.itemStyle}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 16 }}> {data.id}. </Text>
              <Text style={{ fontSize: 16 }}> {data.name} </Text>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 20 }}> {parseFloat(data.price).toFixed(2)} </Text>
            </View>
          </View>
          <View style={styles.shareStyle}>
            <Text style={styles.labelStyle}>shared with</Text>
            <Picker style={styles.inputStyle}>
              <Picker.Item label="Jack1" value='1' />
              <Picker.Item label="Jack2" value='2' />
            </Picker>
          </View>
        </View>
      );
    });

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 0.9 }}>
          <View style={{ flex: 0.2, paddingTop: 5 }}>
            {this.renderTop()}
          </View>
          <View style={{ flex: 0.8, paddingTop: 5 }}>
            <ScrollView>
              {renderData}
            </ScrollView>
          </View>
        </ScrollView>
        <View style={{ flex: 0.1 }}>
          <Button>
            Submit
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    //fontSize: 18,
    height: 23,
    flex: 0.4
  },
  labelStyle: {
    fontSize: 14,
    paddingRight: 14,
    //flex: 1,
  },
  containerStyle: {
    flexDirection: 'column',
    paddingVertical: 8,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderColor: '#ddd',
    position: 'relative',
  },
  itemStyle: {
    paddingLeft: 20,
    paddingRight: 30,
    flexDirection: 'row',
  },
  shareStyle: {
    paddingRight: 10,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  topStyle: {
    //paddingHorizontal: 10,
  }
};


export default SplitBill;
