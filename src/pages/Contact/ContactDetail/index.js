import Axios from 'axios';
import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import { Avatar, Button, Input } from '../../../components';
import { baseUrl } from '../../../config';
import {
  colors,
  isValidAge,
  isValidFirstName,
  isValidImageUri,
  isValidLastName,
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

  getImage = () => {
    ImagePicker.launchImageLibrary(
      {
        quality: 0.2,
        maxWidth: 200,
        maxHeight: 200,
      },
      (response) => {
        if (response.didCancel || response.error) {
          showError('Ooops, no photo has been selected!');
        } else {
          const photoBase64 = `data:${response.type};base64, ${response.data}`;
          this.setState({ photo: photoBase64 });
        }
      },
    );
  };

  updateContact = () => {
    const { firstName, lastName, age, id, photo } = this.state;

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
      photo: this.state.photo,
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

  deleteContact = () => {
    Axios.delete(baseUrl + '/' + this.state.id)
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
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center' }}
              onPress={this.getImage}>
              {isValidImageUri(photo) ? (
                <Image source={{ uri: photo }} style={styles.avatar} />
              ) : (
                <Avatar size={60} photo={photo} />
              )}
            </TouchableOpacity>
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
            <Button title="Save" onPress={this.updateContact} />
            <View style={{ height: 10 }} />
            <Button
              title="Delete"
              onPress={this.deleteContact}
              type="secondary"
            />
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
