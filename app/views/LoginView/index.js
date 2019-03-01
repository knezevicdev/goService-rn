import React, { Component } from 'react';
import { Text, ImageBackground, Image, View, TextInput } from 'react-native';
import { Button } from '../../components';
import Auth0 from 'react-native-auth0';
import { storeAccessToken } from '../../lib/auth';
import { colors, api, auth } from '../../config';
import styles from "./styles";

const auth0 = new Auth0({
    domain: auth.DOMAIN,
    clientId: auth.CLIENT_ID
});

export default class LoginComponent extends Component {
    state = {
        result: ""
    };

    login = () => {
        auth0.webAuth.authorize({ scope: 'offline_access', audience: api.API_URL })
        .then(credentials => {
            this.setState({
                result: JSON.stringify(credentials)
            });

            storeAccessToken(credentials.accessToken).then(
                this.props.navigation.navigate('Home')
            )
        }).catch(error => console.log(error));
    };

    render() {
        return (
            <ImageBackground 
                    style={styles.container}
                    source={require('../../../assets/images/background/backgroundImage.png')}
                >
                <View style={styles.logoContainer}>
                    <Image 
                        style={{ width: '80%' }} resizeMode={'contain'}
                        source={require('../../../assets/images/logo/goUrbanMobilityWhiteLogo.png')} 
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <TextInput value={this.state.result} />
                    <Button
                        containerStyles={styles.button}
                        textStyles={{ color: colors.WHITE }}
                        title={'Login'} onPress={() => this.login()} 
                    />
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.text}>Powered by goUrban Mobility</Text>
                </View>
            </ImageBackground>
        );
    }
}