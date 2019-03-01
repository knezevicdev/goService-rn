import { StyleSheet, Platform } from "react-native";
import Mapbox from "@mapbox/react-native-mapbox-gl";
 
export default StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    buttonStyle: {
        position: "absolute",
        top: 20,
        left: 20,
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40
    },
    buttonTextStyle: {
        color: "black",
        fontSize: 20,
        padding: 10
    }
});

export const mapboxStyles = Mapbox.StyleSheet.create({
    layerStyle: {
        iconImage: "{icon}",
        iconSize: Platform.select({ios: 1, android: 2})
    },
    lineLayerStyle: {
        lineColor:'red', lineOpacity: 0.5
    }
});
