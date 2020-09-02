import Axios from 'axios';
import React, { Component } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Input } from '../../../components';
import { baseUrl } from '../../../config';
import {
  colors,
  isValidAge,
  isValidFirstName,
  isValidLastName,
  showError,
  showSuccess,
} from '../../../utils';

class NewContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      validation: {
        firstName: null,
        lastName: null,
        age: null,
      },
    };
  }

  onChangeValue = (field, value) => {
    this.setState({ [field]: value });
  };

  filterValidation = (obj) => {
    var propNames = Object.getOwnPropertyNames(obj);
    for (var i = 0; i < propNames.length; i++) {
      var propName = propNames[i];
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  };

  createContact = () => {
    const { firstName, lastName, age, id } = this.state;

    const validFirstName = isValidFirstName(firstName);
    const validLastName = isValidLastName(lastName);
    const validAge = isValidAge(age);

    const validation = {
      firstName: validFirstName,
      lastName: validLastName,
      age: validAge,
    };

    this.setState({ validation });
    this.filterValidation(validation);
    if (Object.keys(validation).length) return;

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

  firstNameValidator = (value) => {
    const result = isValidFirstName(value);
    this.setState({
      firstName: value,
      validation: { ...this.state.validation, firstName: result },
    });
  };

  lastNameValidator = (value) => {
    const result = isValidLastName(value);
    this.setState({
      lastName: value,
      validation: { ...this.state.validation, lastName: result },
    });
  };

  ageValidator = (value) => {
    const result = isValidAge(value);
    this.setState({
      age: value,
      validation: { ...this.state.validation, age: result },
    });
  };

  render() {
    const { firstName, lastName, age, validation } = this.state;
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
            onChangeText={(value) => this.firstNameValidator(value)}
            error={validation.firstName}
          />
          <Input
            label="Last Name"
            value={lastName}
            onChangeText={(value) => this.lastNameValidator(value)}
            error={validation.lastName}
          />
          <Input
            label="Age"
            value={age}
            onChangeText={(value) => this.ageValidator(value)}
            error={validation.age}
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
