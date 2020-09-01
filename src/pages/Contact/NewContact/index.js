import Axios from 'axios';
import React, { Component } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Input } from '../../../components';
import { baseUrl } from '../../../config';
import { colors, showError, showSuccess } from '../../../utils';

class NewContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
    };
  }

  onChangeValue = (field, value) => {
    this.setState({ [field]: value });
  };

  createContact = () => {
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
    };

    Axios.post(baseUrl, data)
      .then((res) => {
        showSuccess(res.data.message);
        this.props.navigation.navigate('ContactList');
      })
      .catch((err) => {
        if (err.status === 500) {
          showError('Internal Error');
        } else if (err.status === 400) {
          showError('Bad Request');
        } else {
          showError('Failed process your request');
        }
      });
  };

  render() {
    const { firstName, lastName, age } = this.state;
    return (
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        <StatusBar
          backgroundColor={colors.background.primary}
          barStyle="dark-content"
        />
        <View style={styles.headerWrapper}>
          <Text style={styles.title}>New Contact</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.avatarWrapper}>
            <Avatar size={60} />
          </View>
          <Input
            label="First Name"
            value={firstName}
            onChangeText={(value) => this.onChangeValue('firstName', value)}
          />
          <Input
            label="Last Name"
            value={lastName}
            onChangeText={(value) => this.onChangeValue('lastName', value)}
          />
          <Input
            label="Age"
            value={age}
            onChangeText={(value) => this.onChangeValue('age', value)}
          />
          <View>
            <Button title="Save" onPress={this.createContact} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default NewContact;

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
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    marginHorizontal: 20,
  },
  avatarWrapper: {
    height: 70,
    marginBottom: 20,
  },
});
