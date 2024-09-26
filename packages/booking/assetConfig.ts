// assetConfig.ts
const ReactNativeAsset = require('react-native-asset');

ReactNativeAsset({
  rootPath: './src/assets', // Cambia esta ruta a la ubicación de tus activos
  shouldUnlink: true,
  platforms: {
    ios: {
      enabled: true,
      assets: ['./src/ios'], // Ruta donde están tus activos de iOS
    },
    android: {
      enabled: true,
      assets: ['./src/android'], // Ruta donde están tus activos de Android
    },
  },
});
