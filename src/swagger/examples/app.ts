export default {
  login: {
    Default: {
      value: {
        email: 'email@jam.studio',
        password: 'password',
      },
    },
    'Wrong credentials': {
      value: {
        email: 'email@jam.studio',
        password: 'wrongpassword',
      },
    },
  },
  register: {
    Default: {
      value: {
        email: 'email@jam.studio',
        password: 'password',
        firstName: 'Jan',
        lastName: 'Dunno',
        country: 'GE',
        city: 'Hamburg',
      },
    },
    'Invalid email': {
      value: {
        email: 'email',
        password: 'password',
        firstName: 'Jan',
        lastName: 'Dunno',
        country: 'GE',
        city: 'Hamburg',
      },
    },
  },
};
