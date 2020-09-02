import Axios from 'axios';
import React, { Component } from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Input } from '../../../components';
import { baseUrl } from '../../../config';
import {
  colors,
  isValidAge,
  isValidFirstName,
  isValidLastName,
  isValidUrl,
  showError,
  showSuccess,
} from '../../../utils';

class ContactDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      firstName: this.props.route.params.firstName,
      lastName: this.props.route.params.lastName,
      age: '' + this.props.route.params.age,
      photo: this.props.route.params.photo,
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

    this.filterValidation(validation);
    if (Object.keys(validation).length) return;

    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
    };

    Axios.put(baseUrl + '/' + id, data)
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
    const { firstName, lastName, age, photo, validation } = this.state;
    return (
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        <StatusBar
          backgroundColor={colors.background.primary}
          barStyle="dark-content"
        />
        <View style={styles.headerWrapper}>
          <Text style={styles.title}>Contact Detail</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.avatarWrapper}>
            {isValidUrl(photo) ? (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: photo }} style={styles.avatar} />
              </View>
            ) : (
              <Avatar size={60} photo={photo} />
            )}
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

export default ContactDetail;

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
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
});
