import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../utils';

const Input = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  disabled,
  error,
}) => {
  const [border, setBorder] = useState(colors.border);

  const onFocusForm = () => {
    setBorder(error ? colors.error : colors.primary);
  };

  const onBlurForm = () => {
    setBorder(error ? colors.error : colors.border);
  };
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={{ ...styles.input, borderColor: error ? colors.error : border }}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlurForm}
        onFocus={onFocusForm}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        selectTextOnFocus={!disabled}
      />
      {error && (
        <View>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 6,
  },
  errorMessage: {
    color: colors.error,
    marginTop: -20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
});
