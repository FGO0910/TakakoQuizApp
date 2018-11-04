import { createStackNavigator } from 'react-navigation';
// 自作コンポーネント
import TopPage from './src/component/top/top';
import QuizPage from './src/component/quiz/quiz';

const MainScreenNavigator = createStackNavigator(
  {
    Top: { screen: TopPage },
    Quiz: { screen: QuizPage },
  },
  {
    initialRouteName: 'Top',
    navigationOptions: {
      headerStyle: {
        borderBottomWidth: 0,
      },
    },
  },
);

export default MainScreenNavigator;
