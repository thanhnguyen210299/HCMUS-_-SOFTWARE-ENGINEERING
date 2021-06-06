import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import SignInScreen from './screens/SignIn'
import HomeScreen from './screens/Home'
import AuthLoadingScreen from './screens/Auth'
import SignUpScreen from './screens/SignUp'
import CircleScreen from './screens/Circle'
import CreateCircleScreen from './screens/CreateCircle'
const AuthStack = createStackNavigator({SignIn: SignInScreen, SignUp: SignUpScreen})
const AppStack = createStackNavigator({Home: HomeScreen, Circle: CircleScreen, Create: CreateCircleScreen});


export default createAppContainer(createSwitchNavigator(
  {
//    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
));