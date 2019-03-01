import React, { Component } from 'react';
import { 
    View, 
    TouchableOpacity, 
    Text
} from 'react-native';
import FontAwesome, { Icons } from "react-native-fontawesome";
import { VehicleApi } from '../../../../lib/api';
import styles from "./styles";
import { ModernButton } from "../../../../components";

export default class TopBar extends Component {
    state = {
        alarmOn: false,
        alarmText: "Alarm"
    };

    switchAlarm = () => {
        this.setState({
            alarmOn: this.state.alarmOn === false,
            alarmText: this.state.alarmText === "Alarm" ? "Alarm off" : "Alarm"
        }, () => this.ring());
    };

    ring = async () => {
        if(this.state.alarmOn === true){
            VehicleApi.alarmOn(this.props.currentVehicleId).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            });
        } else {
            VehicleApi.alarmOff(this.props.currentVehicleId).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            });
        }
    };

    locate = () => {
        try {
            VehicleApi.locate(this.props.currentVehicleId);
        } catch(e) {
            console.log("error", e);
        }
    };

    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={styles.topContainer}>
                    <TouchableOpacity style={styles.textContainer} onPress={this.props.openDetails}>
                        <Text style={styles.textTitle}>{this.props.lastGPS}</Text>
                        <Text style={styles.textSubtitle}>Last GPS Signal</Text>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>{this.props.lastRide}</Text>
                        <Text style={styles.textSubtitle}>Last Ride</Text>
                    </View>
                </View>
                <View style={styles.dividerStyle}></View>
                <View style={styles.bottomContainer}>
                    <ModernButton 
                        containerStyle={styles.bottomButton}
                        textStyle={styles.bottomButtonText}
                        onPress={this.locate}>
                            <FontAwesome>{Icons.bell}</FontAwesome>&nbsp;Ring
                    </ModernButton>
                    <ModernButton 
                        containerStyle={styles.bottomButton}
                        textStyle={styles.bottomButtonText}
                        onPress={this.props.navigate}>
                            <FontAwesome>{Icons.locationArrow}</FontAwesome>&nbsp;Navigate
                    </ModernButton>
                    <ModernButton 
                        containerStyle={styles.bottomButton}
                        textStyle={styles.bottomButtonText}
                        onPress={this.switchAlarm}>
                            <FontAwesome>{Icons.exclamationTriangle}</FontAwesome>&nbsp;{this.state.alarmText}
                    </ModernButton>
                </View>
            </View>
        );
    }
}
