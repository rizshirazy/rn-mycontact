import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconUser } from '../../assets';

const Avatar = ({ size = 25 }) => {
  return (
    <View style={styles.container}>
      <IconUser width={size} height={size} />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Avatar.propTypes = {
  size: PropTypes.number,
};
