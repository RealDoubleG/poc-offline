import { MaterialIcons } from '@expo/vector-icons';
import { HStack, Text, Checkbox, Pressable, Icon } from 'native-base';
import { FC, useState } from 'react';

interface ICardHeader {
  title: string;
  finished: number;
  onPress: () => void;
}

export const CardHeader: FC<ICardHeader> = ({ title, finished, onPress }) => {
  return (
    <HStack
      alignItems={'center'}
      borderBottomColor={'purple.500'}
      justifyContent={'space-between'}
      borderBottomWidth={2}
      paddingBottom={4}
    >
      <Text color={'white'} w={'90%'} fontSize={'lg'} fontWeight={'bold'}>
        {title}
      </Text>

      <HStack
        w={'10%'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        space={4}
      >
        <Pressable _pressed={{ backgroundColor: 'gray.600' }} onPress={onPress}>
          <Icon
            as={MaterialIcons}
            size={'xl'}
            name={finished ? 'delete' : 'done'}
            color={'white'}
          />
        </Pressable>
      </HStack>
    </HStack>
  );
};
