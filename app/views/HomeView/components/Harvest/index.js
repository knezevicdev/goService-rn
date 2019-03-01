import React, { Component } from 'react'
import { View } from 'react-native'
import FontAwesome, { Icons } from "react-native-fontawesome";
import { ModernButton } from "../../../../components";
import styles from "./styles";

export default class Harvest extends Component {
    harvest = () => {
        this.props.navigation.navigate('QRScan');
    };

    render() {
        return (
            <View style={styles.containerStyle} pointerEvents="box-none">
                <ModernButton onPress={this.harvest} containerStyle={{}} textStyle={styles.textStyle}>
                    <FontAwesome>
                        {Icons.unlockAlt}
                    </FontAwesome>
                    &nbsp;
                    Harvest
                </ModernButton>
            </View>
        );
    }
}
