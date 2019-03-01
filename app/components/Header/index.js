import React, { Component } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '..';
import { colors } from '../../config';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import styles from "./styles";

export default class HeaderComponent extends Component {
  static propTypes = {
    onMenuPress: PropTypes.func,
  };

  render() {
    return (
      <LinearGradient colors={[colors.BLUE_LIGHT, colors.BLUE_DARK]} style={styles.container}>
        <View style={styles.leftContainer}>
          <Button onPress={this.props.onMenuPress}>
            <MaterialIcon name={'menu'} size={32} color={colors.WHITE} /></Button>
        </View>

        <View style={styles.centerContainer}>
          <Image style={{ height: 30, width: 100 }} resizeMode={'contain'}
                 source={require('../../../assets/images/logo/goUrbanMobilityWhiteLogo.png')} />
        </View>

        <View style={styles.rightContainer}>{this.props.children}</View>
      </LinearGradient>
    );
  }
};