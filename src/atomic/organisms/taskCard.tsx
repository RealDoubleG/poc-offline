import { CardHeader } from 'atomic/molecules/cardHeader';
import { Task } from 'dto/task';
import { Text, VStack, useTheme } from 'native-base';
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
      <CardHeader title={data.title} finished={data.finished} />
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
