import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

const useInternetConnectivity = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log(isConnected);
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
};

export default useInternetConnectivity;
