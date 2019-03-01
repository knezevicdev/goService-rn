import { StyleSheet } from "react-native";
import { colors } from "../../config"; 

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  switchContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height:80,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 30,
    backgroundColor: colors.SWITCH_TRANSPARENT_COLOR
  },
  switchText: {
    fontSize: 16
  },
  backButtonContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1
  }
});
