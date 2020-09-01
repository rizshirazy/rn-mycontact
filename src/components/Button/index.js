import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../utils';

const Button = ({ title, onPress, disabled }) => {
  if (disabled) {
    return (
      <View style={styles.disableBg}>
        <Text style={styles.disableText}>{title}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.button.primary.background,
    paddingVertical: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.button.primary.text,
  },
  disableBg: {
    backgroundColor: colors.button.disabled.background,
    paddingVertical: 10,
    borderRadius: 10,
  },
  disableText: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.button.disabled.text,
  },
});
