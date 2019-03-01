import { StyleSheet, Platform } from "react-native";
import Mapbox from "@mapbox/react-native-mapbox-gl";
 
export default StyleSheet.create({
    containerStyle: {
        flex: 1
    }
});

export const mapboxStyles = Mapbox.StyleSheet.create({
    vehicleLayerStyle: {
        iconImage: "{icon}",
        iconSize: Platform.select({
            ios: 0.5,
            android: 1
        })
    }
});
