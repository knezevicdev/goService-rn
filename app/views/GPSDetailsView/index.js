import React from "react";
import {Platform, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-navigation";
import Mapbox from "@mapbox/react-native-mapbox-gl";
import { Header } from "../../components";
import styles, { mapboxStyles } from './styles';
import FontAwesome, { Icons } from "react-native-fontawesome";
import turfBbox from "@turf/bbox";
import turfCenter from "@turf/center";
import * as turf from "@turf/helpers";
import { mapBox } from "../../config";
import { ModernButton } from "../../components";

Mapbox.setAccessToken(mapBox.ACCESS_TOKEN);

export default class Details extends React.Component {

    constructor(props) {
        super(props);

        const {
            vehicleLogEntries,
            userEventsLastRental
        } = props.navigation.state.params;

        const logEntries = vehicleLogEntries.filter(logEntry => logEntry && logEntry.position && logEntry.position.coordinates).map(logEntry => turf.point(logEntry.position.coordinates, {icon: "waypoint"}));

        let rentalEnd = userEventsLastRental.filter(userEvent => userEvent.type === "RENTAL_END" && userEvent.position && userEvent.position.coordinates);
        rentalEnd = rentalEnd.length > 0 ? turf.point(rentalEnd[0].position.coordinates, {icon: "rentalEnd"}) : null;

        let featuresArray = logEntries;

        if(rentalEnd) {
            featuresArray = [...featuresArray, rentalEnd];
        }

        const features = turf.featureCollection(featuresArray);
          
        const center = turfCenter(features);

        const bbox = turfBbox(features);

        this.state = {
            center: {
                lng: center.geometry.coordinates[0],
                lat: center.geometry.coordinates[1]
            },
            logEntries,
            bbox,
            rentalEnd
        }
    }

    getShape = () => {
        const logEntries = this.state.logEntries;
        let lineStringCollection = [];

        for(let i = 0; i < logEntries.length-1; i++) {
            lineStringCollection.push(turf.lineString([logEntries[i].geometry.coordinates, logEntries[i + 1].geometry.coordinates]));
        }

        return turf.featureCollection(lineStringCollection);
    };

    captureRef = (map) => {
        this._map = map;
        this.fitMap();
    };

    fitMap = async () => {
        if(this._map) {
            try {
                const _ = await this._map.getCenter();
            } catch(e) {}
            const bounds = this.state.bbox;
            this._map.fitBounds([bounds[2], bounds[3]], [bounds[0], bounds[1]], 20, 100);
        }
    };

    getFeaturesArray = () => {
        let featuresArray = this.state.logEntries;

        if(this.state.rentalEnd) {
            featuresArray = [...featuresArray, this.state.rentalEnd];
        }

        return turf.featureCollection(featuresArray);
    };

    render() {
        return (
            <SafeAreaView style={styles.containerStyle} forceInset={{ bottom: 'never' }}>
                <Header
                    onMenuPress={() => this.props.navigation.toggleDrawer()}
                />
                <View style={styles.containerStyle}>
                    <Mapbox.MapView
                        zoomLevel={15}
                        centerCoordinate={[
                            this.state.center.lng, this.state.center.lat
                        ]}
                        style={styles.containerStyle}
                        styleURL={mapBox.STYLE_URL}
                        rotateEnabled={false}
                        ref={this.captureRef}
                    >
                        <Mapbox.ShapeSource id='lineSource' shape={this.getShape()}>
                            <Mapbox.LineLayer id='lineLayer' style={mapboxStyles.lineLayerStyle} />
                        </Mapbox.ShapeSource>
                        <Mapbox.ShapeSource
                            id="shapeSource"
                            shape={this.getFeaturesArray()}
                            images={{ 
                                waypoint: require("../../../assets/images/mapbox/waypoint.png"), 
                                rentalEnd: require("../../../assets/images/mapbox/lastPoint.png") 
                            }}
                        >
                            <Mapbox.SymbolLayer
                                id="symbolLayer"
                                style={mapboxStyles.layerStyle}
                            />
                        </Mapbox.ShapeSource>
                    </Mapbox.MapView>
                    <ModernButton onPress={() => this.props.navigation.goBack()} containerStyle={styles.buttonStyle} textStyle={styles.buttonTextStyle}>
                        <FontAwesome>{Icons.longArrowAltLeft}</FontAwesome>
                    </ModernButton>
                </View>
            </SafeAreaView>
        );
    }
}