import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const MainRoute = createStackNavigator({
    Main: {
        screen:Main,
        navigationOptions: {
            title:'DevRadar'
        }
    },
    Profile: {
        screen:Profile,
        navigationOptions:{
            title:'Perfil no Github'
        }
    }
}, { 
    initialRouteName: 'Main',
    defaultNavigationOptions: {
        headerTintColor:'#fff',
        headerStyle:{
            backgroundColor:'#7d40e7'
        }
        
    }
})

const Routes = createAppContainer(createSwitchNavigator({ MainRoute }));

export default Routes;

