import { FC } from 'react';
import { Text, VStack } from 'native-base';
import TaskCard from 'atomic/organisms/taskCard';

const FinishedTasks: FC = () => {
  return (
    <>
      <VStack
        backgroundColor={'background.dark'}
        flex={1}
        justifyContent={'flex-start'}
        alignItems={'center'}
        p={2}
        position={'relative'}
      >
        <Text
          color={'white'}
          marginY={4}
          fontSize={'2xl'}
          fontWeight={'extrabold'}
        >
          Tasks finalizadas
        </Text>
        <TaskCard />
      </VStack>
    </>
  );
};

export default FinishedTasks;
