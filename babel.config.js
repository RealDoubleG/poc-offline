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
            '@hooks': './src/hooks',
            '@atomic': './src/atomic',
            '@data': './src/data',
            '@database': './src/database',
            '@dto': './src/dto',
            '@routes': './src/routes',
            '@store': './src/store'
          }
        }
      ]
    ]
  };
};
