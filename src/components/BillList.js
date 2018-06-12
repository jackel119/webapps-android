import React, { Component } from 'react';
import { ListView } from 'react-native';
import BillItem from './BillItem';
import data from './billComponents/BillList.json';

class BillList extends Component {
  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(data);
  }

  renderRow(library) {
    return <BillItem library={library} />;
  }

  render() {
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

export default BillList;

