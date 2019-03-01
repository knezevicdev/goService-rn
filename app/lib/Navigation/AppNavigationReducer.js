import AppNavigator from './AppNavigator';

const initial = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams('Splash')
);

const navigation = (state = initial, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

export default navigation;
