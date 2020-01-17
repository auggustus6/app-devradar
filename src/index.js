import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';

import Routes from './routes';

const App = () => {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
            <Routes />
        </>
    )
}

export default App;