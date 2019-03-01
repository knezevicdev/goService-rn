import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

class ModernButton extends React.Component {
    render() {
        return (
            <TouchableOpacity 
                style={{
                    ...styles.containerStyle,
                    ...this.props.containerStyle
                }}
                onPress={this.props.onPress}
            >
                <Text style={{
                    ...styles.textStyle,
                    ...this.props.textStyle
                }}>
                    {this.props.children}
                </Text>
            </TouchableOpacity>
        );
    }
}

export default ModernButton;