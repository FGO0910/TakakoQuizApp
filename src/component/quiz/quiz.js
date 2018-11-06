/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  StyleSheet, Image, AsyncStorage, Animated, Platform, View,
} from 'react-native';
import { Container, Text, Button } from 'native-base';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  question: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerButton: {
    width: 300,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  answerText: {
    color: 'black',
  },
  answerBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultImage: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 2,
    left: 0,
    zIndex: 1,
  },
});

export default class QuizPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLimit: 3000,
      isAnswer: false,
      isLoading: false,
      question: '',
      questionCount: 0,
      questionIdList: [...Array(50).keys()],
      answers: [],
      correctId: 1,
      zoomAnim: new Animated.Value(40),
      moveAnim: new Animated.ValueXY({ x: -50, y: -50 }),
      gauge: new Animated.Value(0),
      remarks: '',
    };
    this.Answer = this.answer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.storeData = this.storeData.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
  }

  componentWillMount() {
    // 問題文の読み込み
    const { navigation } = this.props;
    const language = navigation.getParam('language');
    console.log(language);
    if (language === 'english') {
      const questions = require('../../json/english.json');
      this.setState({ questions, isLoading: true });
    } else {
      const questions = require('../../json/italian.json');
      this.setState({ questions, isLoading: true });
    }
  }

  componentDidMount() {
    for (let i = 0; i < 50; i += 1) {
      this.removeAllData(i.toString());
    }
    // 1問目の表示
    this.nextQuestion();
  }

  answer = (num) => {
    const { navigation } = this.props;
    const {
      timeLimit, questionCount, correctId, questionId, gauge,
    } = this.state;
    this.setState({ isAnswer: true });
    const str = questionId.toString();
    if (num === correctId) {
      this.storeData(str, '1');
    } else {
      this.storeData(str, '0');
    }
    Animated.timing(gauge, {
      toValue: 1,
      duration: 0,
    }).start();
    console.log(num);
    questionCount === 50
      ? setTimeout(() => {
        navigation.navigate('Result');
      }, timeLimit)
      : setTimeout(this.nextQuestion, timeLimit);
  };

  nextQuestion = () => {
    const {
      questionCount, questionIdList, questions, zoomAnim, moveAnim, gauge,
    } = this.state;
    const randomId = Math.floor(Math.random() * questionIdList.length);
    const questionId = questionIdList[randomId];
    // 解答のリスト
    const answerList = [
      questions[questionId].correct,
      questions[questionId].wrong1,
      questions[questionId].wrong2,
      questions[questionId].wrong3,
    ];
    // ランダムに並べた後の解答を格納する配列
    const answers = [];
    // 解答群をランダムに並び替え
    while (answerList.length !== 0) {
      const random = Math.floor(Math.random() * answerList.length);
      answers.push(answerList[random]);
      if (answerList[random] === questions[questionId].correct) {
        this.setState({ correctId: answers.length });
      }
      answerList.splice(random, 1);
    }
    // eslint-disable-next-line prefer-destructuring
    const remarks = questions[questionId].remarks;
    switch (remarks) {
      case '問題全体の文字を大きく':
        Animated.timing(zoomAnim, {
          toValue: 60,
          duration: 2000,
        }).start();
        break;
      case '問題全体の文字が動く':
        Animated.timing(moveAnim, {
          toValue: { x: 50, y: 50 },
          duration: 2000,
        }).start();
        break;
      default:
    }
    Animated.timing(gauge, {
      toValue: 0,
      duration: 0,
    }).start();
    Animated.timing(gauge, {
      toValue: 1,
      duration: 3000,
    }).start();

    this.setState({
      question: questions[questionId].word,
      questionCount: questionCount + 1,
      questionId,
      isAnswer: false,
      answers,
      remarks,
    });
    questionIdList.splice(randomId, 1);

    this.setTimer();
  };

  setTimer = () => {
    const { timeLimit } = this.state;
    this.setState({ timer: setTimeout(this.answer, timeLimit) });
  };

  clearTimer = () => {
    const { timer } = this.state;
    clearTimeout(timer);
  };

  storeData = async (id, isCorrect) => {
    try {
      await AsyncStorage.setItem(id, isCorrect);
    } catch (error) {
      console.log(error);
    }
  };

  retrieveData = async (id) => {
    try {
      const value = await AsyncStorage.getItem(id);
      console.log(value);
    } catch (error) {
      console.log(error);
    }
  };

  removeAllData = async (id) => {
    try {
      await AsyncStorage.removeItem(id);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      isLoading,
      questionCount,
      isAnswer,
      answers,
      question,
      correctId,
      zoomAnim,
      moveAnim,
      gauge,
      remarks,
    } = this.state;

    if (isLoading) {
      console.log(moveAnim.getLayout());
      return (
        <Container style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Container style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={{ fontSize: 22 }}>
              {questionCount}
              /50問
            </Text>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1 }}>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: 'black',
                  flex: 1,
                  flexDirection: 'row',
                }}
              >
                <Animated.View style={{ flex: gauge, backgroundColor: 'black' }} />
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{}}>0</Text>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}
                >
                  <Text style={{ flex: 1 }}>1</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}
                >
                  <Text style={{ flex: 1 }}>2</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}
                >
                  <Text style={{ flex: 1 }}>3</Text>
                </View>
              </View>
            </View>
          </Container>
          <Container style={{ flex: 10 }}>
            <Container style={styles.question}>
              <Animated.View
                style={remarks === '問題全体の文字が動く' ? moveAnim.getLayout() : null}
              >
                <Animated.Text
                  style={{
                    fontSize: remarks === '問題全体の文字を大きく' ? zoomAnim : 40,
                    color: remarks === '問題全体の文字の色を変える' ? 'orange' : 'blue',
                    fontWeight: remarks === '問題全体の文字を太くする' ? '900' : undefined,
                    fontFamily:
                      remarks === '問題全体の書式を変える'
                        ? Platform.select({ ios: 'HiraMinProN-W3', android: 'serif' })
                        : undefined,
                  }}
                >
                  {question}
                </Animated.Text>
              </Animated.View>
            </Container>
            <Container style={{ flex: 1 }} />
            <Container style={{ flex: 8 }}>
              <Container style={styles.answerBlock}>
                {isAnswer ? (
                  correctId === 1 ? (
                    <Image source={require('../../images/maru.png')} style={styles.resultImage} />
                  ) : (
                    <Image source={require('../../images/batsu.png')} style={styles.resultImage} />
                  )
                ) : null}
                <Button
                  style={styles.answerButton}
                  onPress={
                    !isAnswer
                      ? () => {
                        this.answer(1);
                        this.clearTimer();
                      }
                      : null
                  }
                >
                  <Text style={styles.answerText}>{answers[0]}</Text>
                </Button>
              </Container>
              <Container style={styles.answerBlock}>
                {isAnswer ? (
                  correctId === 2 ? (
                    <Image source={require('../../images/maru.png')} style={styles.resultImage} />
                  ) : (
                    <Image source={require('../../images/batsu.png')} style={styles.resultImage} />
                  )
                ) : null}
                <Button
                  style={styles.answerButton}
                  onPress={
                    !isAnswer
                      ? () => {
                        this.answer(2);
                        this.clearTimer();
                      }
                      : null
                  }
                >
                  <Text style={styles.answerText}>{answers[1]}</Text>
                </Button>
              </Container>
              <Container style={styles.answerBlock}>
                {isAnswer ? (
                  correctId === 3 ? (
                    <Image source={require('../../images/maru.png')} style={styles.resultImage} />
                  ) : (
                    <Image source={require('../../images/batsu.png')} style={styles.resultImage} />
                  )
                ) : null}
                <Button
                  style={styles.answerButton}
                  onPress={
                    !isAnswer
                      ? () => {
                        this.answer(3);
                        this.clearTimer();
                      }
                      : null
                  }
                >
                  <Text style={styles.answerText}>{answers[2]}</Text>
                </Button>
              </Container>
              <Container style={styles.answerBlock}>
                {isAnswer ? (
                  correctId === 4 ? (
                    <Image source={require('../../images/maru.png')} style={styles.resultImage} />
                  ) : (
                    <Image source={require('../../images/batsu.png')} style={styles.resultImage} />
                  )
                ) : null}
                <Button
                  style={styles.answerButton}
                  onPress={
                    !isAnswer
                      ? () => {
                        this.answer(4);
                        this.clearTimer();
                      }
                      : null
                  }
                >
                  <Text style={styles.answerText}>{answers[3]}</Text>
                </Button>
              </Container>
            </Container>
          </Container>
        </Container>
      );
    }
    return (
      <Container style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Container style={{ flex: 1 }}>
          <Text style={{ fontSize: 22 }}>1/50問</Text>
        </Container>
        <Container style={{ flex: 10 }}>
          <Container style={styles.question}>
            <Text style={{ fontSize: 40 }} />
          </Container>
          <Container style={{ flex: 4 }}>
            <Button style={styles.answerButton}>
              <Text style={styles.answerText} />
            </Button>
            <Button style={styles.answerButton}>
              <Text style={styles.answerText} />
            </Button>
            <Button style={styles.answerButton}>
              <Text style={styles.answerText} />
            </Button>
            <Container style={{ flex: 1 }}>
              <Button style={styles.answerButton}>
                <Text style={styles.answerText} />
              </Button>
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }
}

QuizPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};
