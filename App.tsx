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
import NetInfo from '@react-native-community/netinfo';

import { initDatabase } from 'database/database';
import { deleteTask, fetchTasks, insertTask } from 'database/tasks';

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
    // insertTask({
    //   id: 2,
    //   title: 'titulo',
    //   description: 'descricao',
    //   finished: 0
    // });
    // fetchTasks()
    //   .then((tasks) => {
    //     console.log('Dados da tabela "task":', tasks);
    //     // Lógica para manipular os dados da tabela "task"
    //   })
    //   .catch((error) => {
    //     console.error('Erro ao buscar os dados da tabela "task":', error);
    //   });
    // deleteTask(1)
    //   .then(() => {
    //     console.log('Exclusão concluída com sucesso!');
    //   })
    //   .catch((error) => {
    //     console.error('Erro ao excluir registro:', error);
    //   });
  }, []);

  NetInfo.fetch().then((state) => {
    console.log('Connection type', state.isInternetReachable);
    // console.log('Is connected?', state.isConnected);
  });

  const unsubscribe = NetInfo.addEventListener((state) => {
    console.log('Connection type', state.isInternetReachable);
    console.log('Is connected?', state.isConnected);
  });

  return (
    <NativeBaseProvider theme={THEME}>
      {fontsLoaded ? <Routes /> : <Text>fonts loading...</Text>}
    </NativeBaseProvider>
  );
}
