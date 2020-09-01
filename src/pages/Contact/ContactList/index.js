import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ContactItem } from '../../../components';
import { colors, sortArray } from '../../../utils';

const ContactList = () => {
  const url = 'https://simple-contact-crud.herokuapp.com/contact';
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchAllContacts();
  }, []);

  const fetchAllContacts = () => {
    Axios.get(url)
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
    </View>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background.primary,
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
});
