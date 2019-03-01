import React, { Component } from "react";
import { Linking, PermissionsAndroid, Platform, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Header } from "../../components";
import Mapbox from "@mapbox/react-native-mapbox-gl";
import Geolocation from "react-native-geolocation-service";
import TopBar from './components/TopBar';
import Harvest from './components/Harvest';
import SideIcons from "./components/SideIcons";
import moment from "moment";
import styles, { mapboxStyles } from "./styles";
import { VehicleApi } from '../../lib/api';
import { mapBox } from "../../config";

Mapbox.setAccessToken(mapBox.ACCESS_TOKEN);

export default class MainComponent extends Component {
    state = {
        longitude: 0,
        latitude: 0,
        loadedCoords: false,
        vehicleCollection: null,
        error: null,
        currentVehicleId: null,
        vehicleDetails: null,
        featureCollection: {
            type: "FeatureCollection",
            features: []
        }
    };

    async componentDidMount() {
        this.fetchVehicleCollection();

        if (Platform.OS === "android") {
            await PermissionsAndroid.requestMultiple(
                [
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
                ],
                {
                    title: "Give Location Permission",
                    message: "App needs location permission to find your position."
                }
            ).then(granted => {
                console.log(granted);
            }).catch(err => {
                console.warn(err);
            });
        }
        await Geolocation.getCurrentPosition(
            position => {
                this.setState({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    loadedCoords: true
                });
            },
            error => {
                console.warn(error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    fetchVehicleCollection = () => {
        VehicleApi.list(3).then(response => {
            this.setState({
                vehicleCollection: response.data
            }, () => this.generateVehicleCollection());
        }).catch(error => {
            this.setState({
                error
            });
            console.log(error)
        });
    };

    generateVehicleCollection = async () => {
        const featureCollection = {...this.state.featureCollection};
        if(this.state.vehicleCollection && this.state.vehicleCollection.length > 0){
            this.state.vehicleCollection.forEach((vehicle) => {
                let icon = "maintainance";
                if(vehicle.serviceState === "LOW_SOC")
                    icon = "lowSoc";
                else if(vehicle.serviceState === "OPERATIONAL")
                    icon = "fullBattery";


                featureCollection.features.push(
                    {
                        type: "Feature",
                        id: vehicle.id,
                        properties: {
                            icon
                        },
                        geometry: {
                            type: "Point",
                            coordinates: vehicle.position.coordinates
                        }
                    });
            });
            this.setState({featureCollection});
        }
    };

    onSourceLayerPress = (e) => {
        const feature = e.nativeEvent.payload;

        VehicleApi.details(feature.id)
            .then(({data}) => {
                console.log(data);
                this.setState({
                    currentVehicleId: feature.id,
                    vehicleDetails: data
                });
            })
            .catch(error => {
                console.log("erorr", error);
            })
    };

    onMapviewPress = (e) => {
        this.setState({currentVehicleId: null});
    };

    recenter = () => {
        Geolocation.getCurrentPosition(
            position => {
                try {
                    this._map.flyTo([position.coords.longitude, position.coords.latitude], 1000);
                } catch (error) {
                    console.log(error);
                }
            },
            error => {
                console.warn(error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    navigateLink = (url) => {
        const currentVehicle = this.state.vehicleCollection.filter(vc => vc.id == this.state.currentVehicleId)[0];

        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${currentVehicle.position.coordinates[1]},${currentVehicle.position.coordinates[0]}`;
        const label = `Vehicle ${currentVehicle.code}`;
        const mapUrl = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });

        const link = `comgooglemapsurl://maps.google.com/?q=Vehicle ${currentVehicle.code}@${latLng}`;

        Linking
            .openURL(link)
            .then(d => {})
            .catch(e =>{
                Linking
                    .openURL(mapUrl)
                    .then(d => {})
                    .catch(e =>{
                        console.log("error", e);
                    })
            })

    };

    getLastRide = () => {
        const vehicleDetails = this.state.vehicleDetails;
        
        if(vehicleDetails && Array.isArray(vehicleDetails.userEventsLastRental) && vehicleDetails.userEventsLastRental.length > 0) {
            return moment(vehicleDetails.userEventsLastRental[0].time).fromNow();
        }

        return "Never";
    };

    getLastGPSSignal = () => {
        const vehicleDetails = this.state.vehicleDetails;
        
        if(vehicleDetails && Array.isArray(vehicleDetails.vehicleLogEntries) && vehicleDetails.vehicleLogEntries.length > 0) {
            return moment(vehicleDetails.vehicleLogEntries[0].time).fromNow();
        }

        return "Never";
    };

    openDetails = () => {
        this.props.navigation.navigate("GPSDetails", this.state.vehicleDetails);
    };

    render() {
        return (
            <SafeAreaView style={styles.containerStyle} forceInset={{ bottom: 'never' }}>
                <Header
                    onMenuPress={() => this.props.navigation.toggleDrawer()}
                />
                <View style={{flex: 1}}>
                    {this.state.loadedCoords && (
                        <>
                            <Mapbox.MapView
                                zoomLevel={15}
                                centerCoordinate={[
                                    this.state.longitude,
                                    this.state.latitude
                                ]}
                                style={styles.containerStyle}
                                styleURL={mapBox.STYLE_URL}
                                showUserLocation={true}
                                onPress={this.onMapviewPress}
                                ref={(c) => this._map = c}
                                rotateEnabled={false}
                            >
                                <Mapbox.ShapeSource
                                    id="vehicles"
                                    shape={this.state.featureCollection}
                                    images={{ 
                                        fullBattery: require("../../../assets/images/mapbox/available.png"), 
                                        lowSoc: require("../../../assets/images/mapbox/lowSOC.png"), 
                                        maintainance: require("../../../assets/images/mapbox/outOfOrder.png") 
                                    }}
                                    onPress={this.onSourceLayerPress}
                                >
                                    <Mapbox.SymbolLayer
                                        id="vehicleLayer"
                                        style={mapboxStyles.vehicleLayerStyle}
                                    />
                                </Mapbox.ShapeSource>
                                
                            </Mapbox.MapView>

                            {this.state.currentVehicleId && (
                                <TopBar currentVehicleId={this.state.currentVehicleId} navigate={this.navigateLink} lastGPS={this.getLastGPSSignal()} lastRide={this.getLastRide()} openDetails={this.openDetails} />
                            )}
                            <Harvest navigation={this.props.navigation} />
                            <SideIcons refreshVehicleCollection={this.fetchVehicleCollection} recenter={this.recenter}/>
                        </>
                    )}
                </View>
            </SafeAreaView>
        );
    }
}

