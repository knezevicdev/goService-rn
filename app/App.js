import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator, { outerScreens } from './lib/Navigation';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './lib/store';
import { NavigationActions } from 'react-navigation';

class App extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            const { navigation } = store.getState();
            const route = navigation.routes[navigation.index];

            if (outerScreens.includes(route.routeName)) {
                return false;
            } else if (
                route.routeName === 'TabNavigator' &&
                route.hasOwnProperty('index') &&
                route.index === 0 &&
                navigation.routes[navigation.index].routes[route.index].index === 0
            ) {
                return false;
            } else {
                store.dispatch(NavigationActions.back());
                return true;
            }
        });
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <AppNavigator />
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
