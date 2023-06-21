import {
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  useFonts
} from '@expo-google-fonts/montserrat';
import { NativeBaseProvider } from 'native-base';
import { useEffect } from 'react';
import { Text } from 'react-native';
import { Routes } from 'routes';
import { THEME } from 'theme';
import { initDatabase } from 'database/database';
import { Provider } from 'react-redux';

import store from 'store/store';

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black
  });

  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={THEME}>
        {fontsLoaded ? <Routes /> : <Text>fonts loading...</Text>}
      </NativeBaseProvider>
    </Provider>
  );
}
