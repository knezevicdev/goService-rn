import { reduxifyNavigator } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import AppNavigator from './AppNavigator';

const AppWithNavigationState = reduxifyNavigator(AppNavigator, 'root');

const mapStateToProps = state => ({
    state: state.navigation
});

export default connect(mapStateToProps)(AppWithNavigationState);
