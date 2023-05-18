module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json'
          ],
          alias: {
            '@atomic': './src/atomic',
            '@data': './src/data',
            '@routes': './src/routes',
            '@store': './src/store'
          }
        }
      ]
    ]
  };
};
