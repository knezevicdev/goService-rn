import { StyleSheet } from "react-native";
import { colors } from "../../../../config";

export default StyleSheet.create({
    containerStyle: {
        position: "absolute",
        top: 10,
        left: "5%",
        width: "90%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    textContainer: {
        textAlign: "center",
        alignItems: "center"
    },
    textTitle: {
        color: colors.BLACK_TEXT,
        fontSize: 16
    },
    textSubtitle: {
        color: colors.GRAY_TEXT,
        fontSize: 12
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    bottomButton: {
        width: "32%",
        alignItems: "center"
    },
    bottomButtonText: {
        color: colors.BLUE_TEXT,
        fontSize: 14
    },
    dividerStyle: {
        width: "100%",
        borderBottomColor: "#ebebeb",
        borderBottomWidth: 1,
        marginVertical: 15
    }
})