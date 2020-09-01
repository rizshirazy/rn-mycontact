import { showMessage } from 'react-native-flash-message';

export const showSuccess = (message) => {
  showMessage({ type: 'success', message });
};

export const showError = (message) => {
  showMessage({ type: 'danger', message });
};
