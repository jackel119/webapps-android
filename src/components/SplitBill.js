import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import MultiSelect from 'react-native-multiple-select';
import { Button } from './common';


class SplitBill extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedPeople: [],
      splitEqually: false,
      items: this.props.data
    };

    //update modalVisible for each item
    var i;
    for (i = 0; i < this.state.items.length; i++) {
      this.setModalVisibility(i, false);
    }

    this.people =
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
  }

  onSelectedItemsChange(selectedPeople) {
    this.setState({ selectedPeople });
    var i;
    for (i = 0; i < this.state.items.length; i++) {
      let temp = this.state.items.slice();
      temp[i].people = selectedPeople;
      this.setState({ items: temp });
    }
  }

  onSelectedItemsChangeInner(selectedPeople, index) {
    let temp = this.state.items.slice();
    temp[index].people = selectedPeople;
    this.setState({ items: temp });
  }

  setModalVisibility(index, visible) {
    let temp = this.state.items.slice();
    temp[index].modalVisible = visible;
    this.setState({ items: temp });
  }

  renderTop() {
    if (this.state.splitEqually) {
      const { selectedPeople } = this.state;
      return (
      <View style={styles.topStyle}>
        <MultiSelect
          hideTags
          fixedHeight
          items={this.people}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component; }}
          onSelectedItemsChange={this.onSelectedItemsChange.bind(this)}
          selectedItems={selectedPeople}
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
            Split Equally?
          </Button>
        </View>
      );
    }
  }

  renderInnerSelect(index) {
    const selectedPeople = this.state.items[index].people;
    return (
    <View style={styles.topStyle}>
      <MultiSelect
        hideTags
        fixedHeight
        items={this.people}
        uniqueKey="id"
        ref={(component) => { this.multiSelect = component; }}
        onSelectedItemsChange={(selected) => this.onSelectedItemsChangeInner(selected, index)}
        selectedItems={selectedPeople}
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
  }

  renderSplit(id) {
    if (this.state.splitEqually) {
      return (
        <Button onPress={() => this.setModalVisibility(id - 1, true)}>
          Modify Split
        </Button>
      );
    } 
    return (
      <Button onPress={() => this.setModalVisibility(id - 1, true)}>
        Select People
      </Button>
    );
  }

  render() {
    const renderData = this.props.data.map((data, index) => {
      return (
        <View style={styles.containerStyle} key={index}>
          <View style={styles.itemStyle}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 16 }}> {data.id}. </Text>
              <Text style={{ fontSize: 16 }}> {data.name} </Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Text style={{ fontSize: 20 }}> {parseFloat(data.price).toFixed(2)} </Text>
            </View>
          </View>
          <View style={styles.shareStyle}>
            {this.renderSplit(data.id)}
          </View>
          <Modal 
            isVisible={this.state.items[data.id - 1].modalVisible}
            backdropOpacity={0.5}
          >
            <View style={{ flex: 1 }}>
              <Text>{'Item: ' + data.name + '  ' + 'Price: ' + data.price }</Text>
              {this.renderInnerSelect(data.id - 1)}
              <Button
                onPress={() => this.setModalVisibility(data.id - 1, false)}
              >
                <Text>Complete Split</Text>
              </Button>
            </View>
          </Modal>
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
          <Button onPress={() => console.log(this.state)}>
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
