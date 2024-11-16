module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./app/assets/fonts'],
  dependencies: {
    'some-unsupported-package': {
      platforms: {
        android: null,
      },
    },
  },
};
