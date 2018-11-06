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

const TopPage = (props) => {
  const { navigation } = props;
  return (
    <Container style={{ paddingLeft: 10, paddingRight: 10 }}>
      <Container style={styles.nameInput}>
        <Item regular style={{ width: 200 }}>
          <Input placeholder="（例）山田　太郎" />
        </Item>
        <Text style={{ fontSize: 22 }}>さん</Text>
      </Container>
      <Container style={{ flex: 2 }}>
        <Container style={styles.buttonArea}>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('Quiz', { language: 'english' })}
          >
            <Text style={styles.buttonText}>英語</Text>
          </Button>
        </Container>
        <Container style={{ flex: 1 }} />
        <Container style={styles.buttonArea}>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('Quiz', { language: 'italian' })}
          >
            <Text style={styles.buttonText}>イタリア語</Text>
          </Button>
        </Container>
      </Container>
      <Container style={{ flex: 2 }} />
    </Container>
  );
};

TopPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default TopPage;
