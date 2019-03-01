import { StyleSheet } from "react-native";
import { colors } from "../../config";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20
    },
    text: {
        alignSelf: 'center',
        color: colors.WHITE
    },
    logoContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelContainer: {
        alignItems: 'flex-end'
    },
    button: {
        backgroundColor: colors.BUTTON_TRANSPARENT_COLOR,
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10
    }
});
