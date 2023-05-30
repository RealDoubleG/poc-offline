import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

const useInternetConnectivity = () => {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const checkConnectivity = async () => {
      const netInfoState = await NetInfo.fetch();
      setIsConnected(netInfoState.isConnected);
    };

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    checkConnectivity();

    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
};

export default useInternetConnectivity;
