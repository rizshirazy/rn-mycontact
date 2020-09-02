import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from '..';
import { IconNext } from '../../assets';
import { colors, isValidUrl } from '../../utils';

const ContactItem = ({ id, firstName, lastName, photo, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatarWrapper}>
        {isValidUrl(photo) ? (
          <Image source={{ uri: photo }} style={styles.avatar} />
        ) : (
          <Avatar />
        )}
      </View>
      <View style={styles.mainWrapper}>
        <Text style={styles.firstName}>{firstName}</Text>
        <Text style={styles.lastName}>{lastName}</Text>
      </View>
      <View style={styles.iconWrapper}>
        <IconNext width={17} height={17} />
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
    width: 50,
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
