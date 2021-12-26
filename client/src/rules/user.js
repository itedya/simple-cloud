export const usernameRules = [
  v => !!v || 'Required',
  v => !!v && v.length > 3 || 'Min 3 letters',
  v => !!v && v.length < 64 || 'Max 3 letters'
];

export const passwordRules = [
  v => !!v || 'Required',
  v => !!v && v.length > 8 || 'Min 8 letters',
  v => !!v && v.length < 255 || 'Max 255 letters'
];
