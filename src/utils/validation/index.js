import validator from 'validator';

export const isValidUrl = (url) => {
  return validator.isURL(url);
};

export const isValidFirstName = (text) => {
  if (validator.isEmpty(text)) {
    return 'required';
  } else if (!validator.isLength(text, { min: 3 })) {
    return 'minimum 3 characters';
  } else {
    return null;
  }
};

export const isValidLastName = (text) => {
  if (validator.isEmpty(text)) {
    return 'required';
  } else if (!validator.isLength(text, { min: 3 })) {
    return 'minimum 3 characters';
  } else {
    return null;
  }
};

export const isValidAge = (text) => {
  if (validator.isEmpty(text)) {
    return 'required';
  } else if (!validator.isInt(text)) {
    return 'age must be muneric';
  } else if (!validator.isInt(text, { min: 1 })) {
    return 'age must be larger than or equal to 1 year';
  } else if (!validator.isInt(text, { max: 200 })) {
    return 'age must be less than or equal to 200';
  } else {
    return null;
  }
};

export const isValidImageUri = (text) => {
  const regex = /data:image\/([a-zA-Z]*);base64,([^\"]*)/;
  if (validator.isURL(text) || regex.test(text)) {
    return true;
  }
  return false;
};
