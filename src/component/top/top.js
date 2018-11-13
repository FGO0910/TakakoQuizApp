import React from 'react';
import { StyleSheet, TextInput, AsyncStorage } from 'react-native';
import { Container, Text, Button } from 'native-base';
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

class TopPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '名前' };
    this.storeData = this.storeData.bind(this);
  }

  componentDidMount() {
    this.storeData('answerCount', '0');
  }

  storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { navigation } = this.props;
    const { name } = this.state;
    return (
      <Container style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Container style={styles.nameInput}>
          <TextInput
            style={{
              width: 200,
              height: 50,
              borderWidth: 2,
              borderColor: 'black',
              fontSize: 22,
            }}
            onChangeText={value => this.setState({ name: value })}
            value={name}
          />
          <Text style={{ fontSize: 22 }}>さん</Text>
        </Container>
        <Container style={{ flex: 2 }}>
          <Container style={styles.buttonArea}>
            <Button
              style={styles.button}
              onPress={() => {
                this.storeData('name', name);
                this.storeData('language', 'english');
                navigation.navigate('Quiz', { language: 'english' });
              }}
            >
              <Text style={styles.buttonText}>英語</Text>
            </Button>
          </Container>
          <Container style={{ flex: 1 }} />
          <Container style={styles.buttonArea}>
            <Button
              style={styles.button}
              onPress={() => {
                this.storeData('name', name);
                this.storeData('language', 'italian');
                navigation.navigate('Quiz', { language: 'italian' });
              }}
            >
              <Text style={styles.buttonText}>イタリア語</Text>
            </Button>
          </Container>
        </Container>
        <Container style={{ flex: 2 }} />
      </Container>
    );
  }
}

TopPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default TopPage;
