module.exports = {
  locales: ['en', 'ar'],
  defaultLocale: 'ar',
  pages: {
    '*': ['common', 'messages', 'errors', 'crud-builder', 'sider'],
    '/': ['home'],
    '/404': ['not-found'],
    '/error/auth': ['error-auth'],
  },
  interpolation: {
    prefix: '${',
    suffix: '}',
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./src/view/translations/${namespace}/${locale}`).then((m) => m.default),
};
