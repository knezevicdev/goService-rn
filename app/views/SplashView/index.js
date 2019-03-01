import React, { Component } from 'react';
import { ImageBackground, Image, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getAccessToken } from '../../lib/auth';
import styles from "./styles";

export default class SplashView extends Component {

    async componentDidMount() {
        const accessToken = await getAccessToken();
        setTimeout(() => {
            if (accessToken) {
                this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Home' }))
            } else {
                this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
            }
        }, 2000);
    }

    render() {
        return (
            <ImageBackground style={styles.container}
                             source={require('../../../assets/images/background/backgroundImage.png')}>

                <View style={styles.logoContainer}>
                    <Image style={{ width: '80%' }} resizeMode={'contain'}
                           source={require('../../../assets/images/logo/goUrbanMobilityWhiteLogo.png')} />
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.text}>Powered by goUrban Mobility</Text>
                </View>
            </ImageBackground>
        );
    }
}