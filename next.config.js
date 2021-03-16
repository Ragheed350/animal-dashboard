const withLess = require('@zeit/next-less');
const nextTranslate = require('next-translate');
const withFonts = require('next-fonts');

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (_) => {};
}

module.exports = nextTranslate(
  withFonts(
    withLess({
      lessLoaderOptions: {
        javascriptEnabled: true,
      },
      webpack(config, _) {
        config.module.rules.push({
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
        });

        return config;
      },
    })
  )
);
