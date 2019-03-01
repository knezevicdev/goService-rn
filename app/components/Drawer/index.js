import React, { Component } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from "react-navigation"; 
import { Button } from '..';
import { removeAccessToken } from '../../lib/auth';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../config';
import styles from "./styles";

export default class DrawerComponent extends Component {

  logout = () => {
    removeAccessToken().then(
      this.props.navigation.navigate('Login')
    )
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>
        <LinearGradient colors={[colors.BLUE_LIGHT, colors.BLUE_DARK]} style={styles.container}>
          <View style={styles.header}>

          </View>

          <View style={styles.body}>
            <View style={styles.bodyContainer}>
              <Button title={'Main'}
                      containerStyles={styles.buttonContainer}
                      textStyles={{ color: colors.WHITE }}
                      onPress={() => {
                        this.props.navigation.closeDrawer();
                        this.props.navigation.navigate('Home');
                      }}><MaterialIcon name={'home'} size={18} color={colors.WHITE} /></Button>
            </View>
            <View>
              <Button title={'Logout'}
                      containerStyles={{ alignItems: 'flex-start' }}
                      textStyles={{ color: colors.WHITE }}
                      onPress={() => this.logout()}>
                <MaterialIcon name={'power-settings-new'} size={18} color={colors.WHITE} /></Button>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}