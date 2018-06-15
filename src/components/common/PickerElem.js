import React from 'react';
import { View, Text, Picker } from 'react-native';

const PickerElem = ({ label, value, onChangeValue }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <Picker
        selectedValue={value}
        style={inputStyle}
        onValueChange={onChangeValue}
      >
        <Picker.Item label="Pound" value='1' />
        <Picker.Item label="RMB" value='2' />
      </Picker>
    </View>
  );
};


const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    //fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { PickerElem };
