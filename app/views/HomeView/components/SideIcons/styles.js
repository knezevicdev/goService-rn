import { StyleSheet } from "react-native";
import { colors } from "../../../../config";

export default StyleSheet.create({
    containerStyle: {
        position: "absolute",
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        paddingRight: 10,
        paddingBottom: 15
    },
    buttonStyle: {
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        marginBottom: 5
    },
    textStyle: {
        color: colors.BLUE_TEXT,
        fontSize: 28,
        padding: 10
    },
    smallTextStyle: {
        color: colors.BLUE_TEXT,
        fontSize: 22,
        padding: 12 
    }
})