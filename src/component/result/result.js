import React from 'react';
import { View, AsyncStorage, Linking } from 'react-native';
import { Container, Text, Button } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';

export default class ResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.countCorrect = this.countCorrect.bind(this);
    this.getName = this.getName.bind(this);
    this.getResult = this.getResult.bind(this);
    this.sendMail = this.sendMail.bind(this);
    this.state = { correctCount: 0, bodyText: '' };
  }

  componentWillMount() {
    for (let i = 0; i < 50; i += 1) {
      this.setBodyText(`Q${String(i + 1)},`);
    }
    this.setBodyText('\r\n');
  }

  async componentDidMount() {
    // 何回解答したかを読み込む
    const value = await AsyncStorage.getItem('answerCount');
    const answerCount = Number(value);
    const language = await AsyncStorage.getItem('language');
    this.setState({ language });
    this.getName();
    for (let i = 0; i < 50; i += 1) {
      this.countCorrect(`${answerCount.toString()}-${i.toString()}`);
    }
    for (let i = 1; i <= answerCount; i += 1) {
      for (let j = 0; j < 50; j += 1) {
        this.getResult(`${i.toString()}-${j.toString()}`);
      }
    }
  }

  setBodyText(text) {
    this.setState(prevState => ({
      bodyText: prevState.bodyText + text,
    }));
  }

  countCorrect = async (id) => {
    try {
      const value = await AsyncStorage.getItem(id);
      if (value === '1') {
        this.increment();
      }
    } catch (error) {
      console.log(error);
    }
  };

  getResult = async (id) => {
    try {
      const value = await AsyncStorage.getItem(id);
      switch (value) {
        case '1':
          this.setBodyText('1');
          break;
        case '0':
          this.setBodyText('0');
          break;
        default:
          this.setBodyText('null');
      }
      if (id.split('-')[1] === '49') {
        this.setBodyText('\r\n');
      } else {
        this.setBodyText(',');
      }
    } catch (error) {
      console.log(error);
    }
  };

  getName = async () => {
    try {
      const value = await AsyncStorage.getItem('name');
      this.setState({ name: value });
    } catch (error) {
      console.log(error);
    }
  };

  sendMail = () => {
    const { name, bodyText, language } = this.state;
    const body = `${bodyText}`;
    console.log(body);
    const address = 'fgo0910@gmail.com';
    const cc = 'fujio@puc.pu-toyama.ac.jp';
    Linking.openURL(`mailto:${address}?cc=${cc}&subject=${name}(${language})&body=${bodyText}`);
  };

  increment() {
    this.setState(prevState => ({
      correctCount: prevState.correctCount + 1,
    }));
  }

  render() {
    const { correctCount } = this.state;
    const { navigation } = this.props;
    return (
      <Container style={{ paddingLeft: 10, paddingRight: 10 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 3,
            borderColor: 'black',
          }}
        >
          <View>
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                flex: 1,
                borderBottomWidth: 5,
                borderBottomColor: 'black',
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-end',
                }}
              >
                <Text style={{ fontSize: 80 }}>{correctCount}</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <Text style={{ fontSize: 80 }}>50</Text>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 80, marginLeft: 20 }}>問</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 60 }}>
              {(() => {
                if (correctCount <= 20) {
                  return 'まだまだだね';
                }
                if (correctCount <= 40) {
                  return '頑張ったね';
                }
                return 'すごいね';
              })()}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              style={{
                flex: 1,
                backgroundColor: 'white',
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 0,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                // リセットするんです
                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Quiz' })],
                });
                navigation.dispatch(resetAction);
              }}
            >
              <Text style={{ color: 'black' }}>もう一度やる</Text>
            </Button>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              style={{
                flex: 1,
                backgroundColor: 'white',
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 0,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={this.sendMail}
            >
              <Text style={{ color: 'black' }}>メール送信</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

ResultPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};
