const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#7F3803',
              '@font-size-base': '14px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
