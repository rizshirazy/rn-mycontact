import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IconPencil } from '../../../assets';
import { ContactItem } from '../../../components';
import { baseUrl } from '../../../config';
import { colors, sortArray } from '../../../utils';

const ContactList = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchAllContacts();
  }, []);

  const fetchAllContacts = () => {
    Axios.get(baseUrl)
      .then((res) => {
        const response = res.data.data;
        const sortedResponse = sortArray(response);
        setContacts(sortedResponse);
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.page}>
      <StatusBar
        backgroundColor={colors.background.primary}
        barStyle="dark-content"
      />
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>Contact</Text>
      </View>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {contacts.map((contact) => (
            <ContactItem key={contact.id} {...contact} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.floatingButton}>
          <IconPencil width={28} height={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background.primary,
    position: 'relative',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
  },
  headerWrapper: {
    height: 125,
    padding: 20,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  buttonWrapper: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  floatingButton: {
    backgroundColor: colors.primary,
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
