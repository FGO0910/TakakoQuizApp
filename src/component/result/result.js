import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Container, Text, Button } from 'native-base';
import PropTypes from 'prop-types';

export default class ResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.retrieveData = this.retrieveData.bind(this);
    this.state = { correctCount: 0 };
  }

  componentDidMount() {
    const { correctCount } = this.state;
    for (let i = 0; i < 50; i += 1) {
      const value = this.retrieveData(i.toString());
      if (value === 1) {
        this.setState({ correctCount: correctCount + 1 });
      }
    }
    console.log(this.retrieveData('name'));
  }

  retrieveData = async (id) => {
    try {
      const value = await AsyncStorage.getItem(id);
      return value;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

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
              onPress={() => navigation.navigate('Quiz')}
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
              onPress={() => navigation.navigate('Top')}
            >
              <Text style={{ color: 'black' }}>トップに戻る</Text>
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
