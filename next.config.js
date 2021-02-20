const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');
const nextTranslate = require('next-translate');
const withFonts = require('next-fonts');

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (_) => {};
}

module.exports = nextTranslate(
  withFonts(
    withCSS({
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]___[hash:base64:5]',
      },
      ...withLess(
        withSass({
          enableSvg: true,
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
      ),
    })
  )
);
