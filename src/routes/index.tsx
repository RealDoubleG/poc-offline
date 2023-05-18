import { Box, StatusBar } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './AppRoutes';

export function Routes() {
  return (
    <Box flex={1}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <AppRoutes />
      </NavigationContainer>
    </Box>
  );
}
