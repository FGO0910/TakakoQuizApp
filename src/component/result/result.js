import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Container, Item, Input, Text, Button,
} from 'native-base';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  nameInput: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  buttonArea: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 300,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 2,
    borderColor: 'black',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 26,
  },
});

const ResultPage = (props) => {
  const { navigation } = props;
  return (
    <Container style={{ paddingLeft: 10, paddingRight: 10 }}>
      <Text>解答結果</Text>
    </Container>
  );
};

ResultPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ResultPage;
