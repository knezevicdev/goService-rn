import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      padding: 5
    },
    leftContainer: {
      flex: 1,
      alignItems: 'flex-start'
    },
    centerContainer: {
      flex: 3,
      alignItems: 'center'
    },
    rightContainer: {
      flex: 1,
      alignItems: 'flex-end'
    }
});