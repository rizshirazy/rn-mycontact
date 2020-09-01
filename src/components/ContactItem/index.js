import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconNext } from '../../assets';
import { colors } from '../../utils';

const ContactItem = ({ id, firstName, lastName, photo, navigation }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: photo }} style={styles.avatar} />
      </View>
      <View style={styles.mainWrapper}>
        <Text style={styles.firstName}>{firstName}</Text>
        <Text style={styles.lastName}>{lastName}</Text>
      </View>
      <View style={styles.iconWrapper}>
        <IconNext />
      </View>
    </TouchableOpacity>
  );
};

export default ContactItem;

const styles = StyleSheet.create({
  container: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingTop: 25,
    paddingBottom: 25,
    flexDirection: 'row',
  },
  avatarWrapper: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  firstName: {
    fontSize: 18,
    color: colors.text.primary,
  },
  lastName: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  mainWrapper: {
    flex: 1,
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
  },
});

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  photo: PropTypes.string,
};
