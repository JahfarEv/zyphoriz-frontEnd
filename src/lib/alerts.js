import Swal from 'sweetalert2';

const defaults = {
  background: '#16292c',
  color: '#ffffff',
  confirmButtonColor: '#14b8a6',
  cancelButtonColor: '#475569',
  buttonsStyling: true,
};

export const showAlert = (options) =>
  Swal.fire({
    ...defaults,
    ...options,
  });

export const showError = (message) =>
  showAlert({
    icon: 'error',
    title: 'Something went wrong',
    text: message,
  });

export const confirmAction = ({ title, text }) =>
  showAlert({
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
  }).then((result) => result.isConfirmed);
