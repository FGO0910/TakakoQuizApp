import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Container, Item, Input, Text, Button,
} from 'native-base';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({});

const QuizPage = (props) => {
  const { navigation } = props;
  return (
    <Container style={{ paddingLeft: 10, paddingRight: 10 }}>
      <Container style={{ flex: 1 }}>
        <Text style={{ fontSize: 22 }}>1/50問</Text>
      </Container>
      <Container style={{ flex: 10 }}>
        <Text> ほげほげ</Text>
      </Container>
    </Container>
  );
};

QuizPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default QuizPage;
