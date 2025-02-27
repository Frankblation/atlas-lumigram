import React from "react";
import { TextInput, TextInputProps, StyleProp, TextStyle } from "react-native";

type CustomInputProps = {
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
  value: string;
  style?: StyleProp<TextStyle>;
};

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  placeholderTextColor,
  secureTextEntry = false,
  onChangeText,
  value,
  style = {},
}) => {
  const defaultStyle: TextStyle = {
    borderWidth: 1,
    borderColor: "#1ED2AF",
    padding: 20,
    width: "100%",
    borderRadius: 5,
  };

  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={placeholderTextColor}
      style={[defaultStyle, style]}
    />
  );
};

export default CustomInput;
