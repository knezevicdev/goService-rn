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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    alignItems: 'flex-end'
  }
});
