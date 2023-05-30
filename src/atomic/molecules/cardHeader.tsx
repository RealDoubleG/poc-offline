import { MaterialIcons } from '@expo/vector-icons';
import { HStack, Text, Checkbox, Pressable, Icon } from 'native-base';
import { FC } from 'react';

interface ICardHeader {
  title: string;
  finished: number;
}

export const CardHeader: FC<ICardHeader> = ({ title, finished }) => {
  return (
    <HStack
      alignItems={'center'}
      borderBottomColor={'purple.500'}
      justifyContent={'space-between'}
      borderBottomWidth={2}
      paddingBottom={4}
    >
      <Text color={'white'} w={'80%'} fontSize={'lg'} fontWeight={'bold'}>
        {title}
      </Text>

      <HStack w={'20%'} alignItems={'center'} space={4}>
        <Checkbox
          isChecked={finished === 1 ? true : false}
          size={'md'}
          colorScheme="purple"
          accessibilityLabel="taskFinalizada"
        />
        <Pressable _pressed={{ backgroundColor: 'gray.600' }}>
          <Icon
            as={MaterialIcons}
            size={'xl'}
            name={'delete'}
            color={'white'}
          />
        </Pressable>
      </HStack>
    </HStack>
  );
};
