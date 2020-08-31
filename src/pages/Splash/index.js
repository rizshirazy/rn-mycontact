import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Splash = () => {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>My Contact</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default Splash;
