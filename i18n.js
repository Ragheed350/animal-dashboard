module.exports = {
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  pages: {
    '*': ['common', 'messages', 'errors', 'crud-builder'],
    '/': ['home'],
    '/404': ['not-found'],
    '/error/auth': ['error-auth'],
  },
  interpolation: {
    prefix: '${',
    suffix: '}',
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./src/view/translations/${namespace}/${locale}`).then(
      (m) => m.default
    ),
};
