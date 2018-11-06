import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Container, Text, Button } from 'native-base';
import PropTypes from 'prop-types';

export default class ResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { position: new Animated.ValueXY({ x: 100, y: 100 }) };
  }

  componentDidMount() {
    const { position } = this.state;
    Animated.timing(position, {
      toValue: { x: 300, y: 500 },
      duration: 3000,
    }).start();
  }

  render() {
    const { position } = this.state;
    return (
      <Container style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Animated.Text
          style={
            ({
              width: 250,
              height: 50,
              backgroundColor: 'powderblue',
            },
            position.getLayout())
          }
        >
          解答結果
        </Animated.Text>
      </Container>
    );
  }
}
