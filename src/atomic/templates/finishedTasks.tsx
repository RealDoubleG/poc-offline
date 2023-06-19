import { FC, useEffect } from 'react';
import { FlatList, Text, VStack } from 'native-base';
import { useDispatch } from 'react-redux';
import { fetchApiFinishedTasks } from 'store/thunks/tasksThunk';
import { useAppSelector } from 'store/store';
import { Loading } from 'atomic/molecules/loading';
import TaskCard from 'atomic/organisms/taskCard';

const FinishedTasks: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApiFinishedTasks());
  }, []);

  const { getFinishedTasksLoading, finishedTasks } = useAppSelector(
    (state) => state.tasks
  );

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
        {getFinishedTasksLoading === 'pending' ? (
          <Loading text="Carregando tasks" />
        ) : (
          <>
            <FlatList
              _contentContainerStyle={{
                paddingBottom: '8'
              }}
              flex={1}
              data={finishedTasks}
              renderItem={({ item }) => <TaskCard data={item} />}
            />
          </>
        )}
      </VStack>
    </>
  );
};

export default FinishedTasks;
