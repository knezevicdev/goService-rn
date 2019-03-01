import React, { Component } from 'react';
import { Alert, View, Switch, Text } from 'react-native';
import { SafeAreaView } from "react-navigation";
import { RNCamera } from 'react-native-camera';
import { Button } from '../../components';
import { colors } from '../../config';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { VehicleApi } from '../../lib/api'
import styles from "./styles";

const serviceStates = ['OPERATIONAL', 'OUT_OF_ORDER'];

export default class ScanComponent extends Component {
    state = {
        setOperational: true,
        location: {
            coords: {
                latitude: null,
                longitude: null
            }
        },
    };

    toggleOperational = () => {
        this.setState(({ setOperational }) => ({ setOperational: !setOperational }))
    };

    getServiceState = () => {
        return serviceStates[this.state.setOperational ? 0 : 1]
    };

    onBarcodeRead = async barcode => {
        this.camera.pausePreview();
        if (!this.isBarcodeRead) {
            this.isBarcodeRead = true;
            VehicleApi.changeState(barcode.data, this.getServiceState(), this.state.location).then(response => {
                  this.props.navigation.goBack();
                }
            ).catch(() => {
                Alert.alert(
                    'Something went wrong!',
                    'Scan failed!',
                    [
                        {
                            text: 'OK', onPress: () => {
                                this.isBarcodeRead = false;
                                this.camera.resumePreview();
                            }
                        },
                    ],
                    { cancelable: false }
                )
            });
        }
    };

  render() {
    return (
      <SafeAreaView style={styles.container} forceInset={{ bottom: 'never' }}>
        <Button containerStyles={styles.backButtonContainer}
                onPress={() => this.props.navigation.goBack()}>
          <MaterialIcon name={'keyboard-arrow-left'} size={40} color={colors.WHITE} />
        </Button>

        <View style={styles.cameraContainer}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onBarCodeRead={barcode => this.onBarcodeRead(barcode)}
            captureAudio={false}
          />

        </View>
        <View style={styles.switchContainer}>
          <Text style={[styles.switchText, { color: this.state.setOperational ? colors.WHITE_TRANSPARENT : colors.WHITE }]}>OUT
            OF ORDER</Text>
          <Switch
            onValueChange={this.toggleOperational}
            value={this.state.setOperational} />
          <Text
            style={[styles.switchText, { color: this.state.setOperational ? colors.WHITE : colors.WHITE_TRANSPARENT }]}>OPERATIONAL</Text>
        </View>

      </SafeAreaView>
    );
  }
}