import React, { Component } from 'react';
import { View } from 'react-native'
import FontAwesome, { Icons } from "react-native-fontawesome";
import { ModernButton } from "../../../../components";
import styles from "./styles";

export default class SideIcons extends Component {
    render() {
        return (
            <View style={styles.containerStyle} pointerEvents="box-none">
                <ModernButton containerStyle={styles.buttonStyle} textStyle={styles.smallTextStyle} onPress={this.props.refreshVehicleCollection}>
                    <FontAwesome>
                        {Icons.sync}
                    </FontAwesome>
                </ModernButton>
                <ModernButton containerStyle={styles.buttonStyle} textStyle={styles.textStyle} onPress={this.props.recenter}>
                    <FontAwesome>
                        {Icons.compass}
                    </FontAwesome>
                </ModernButton>
            </View>
        );
    }
}
