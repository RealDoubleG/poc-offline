import { MaterialIcons } from '@expo/vector-icons';
import { Task } from 'dto/task';
import {
  Box,
  Checkbox,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
  useTheme
} from 'native-base';
import { FC } from 'react';

interface ITaskCardProps {
  data: Task;
}

const TaskCard: FC<ITaskCardProps> = ({ data }) => {
  const { colors } = useTheme();

  return (
    <VStack
      marginY={4}
      w={'full'}
      backgroundColor={colors.gray[700]}
      rounded={'md'}
      px={2}
      py={4}
      space={2}
      minHeight={'26'}
    >
      <HStack
        alignItems={'center'}
        borderBottomColor={'purple.500'}
        justifyContent={'space-between'}
        borderBottomWidth={2}
        paddingBottom={4}
      >
        <Text color={'white'} w={'80%'} fontSize={'lg'} fontWeight={'bold'}>
          {data.title}
        </Text>

        <HStack w={'20%'} alignItems={'center'} space={4}>
          <Checkbox
            isChecked={data.finished === 1 ? true : false}
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
      <Text
        w={'full'}
        color={'white'}
        fontSize={'sm'}
        fontWeight={'semibold'}
        adjustsFontSizeToFit
      >
        {data.description}
      </Text>
    </VStack>
  );
};

export default TaskCard;
