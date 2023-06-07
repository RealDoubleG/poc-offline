import { Spinner, VStack, Text } from 'native-base';
import { FC } from 'react';

interface ILoadingProps {
  text?: string;
}

export const Loading: FC<ILoadingProps> = ({ text }) => {
  return (
    <VStack
      alignItems={'center'}
      justifyContent={'center'}
      flex={1}
      backgroundColor={'background.dark'}
      space={4}
    >
      <Spinner size={'lg'} color="purple.200" fontSize="md" />
      <Text color="white" fontWeight={'bold'}>
        {text}
      </Text>
    </VStack>
  );
};
