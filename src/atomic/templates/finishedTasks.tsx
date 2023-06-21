import { FC, useEffect } from 'react';
import { FlatList, Text, VStack } from 'native-base';
import { useDispatch } from 'react-redux';
import { fetchApiFinishedTasks } from 'store/thunks/tasksThunk';
import { useAppSelector } from 'store/store';
import { Loading } from 'atomic/molecules/loading';
import TaskCard from 'atomic/organisms/taskCard';
import { makeSynchronization } from 'store/thunks/queueThunk';
import { taskSliceActions } from 'store/slices/tasksSlice';

const FinishedTasks: FC = () => {
  const dispatch = useDispatch();

  const {
    getFinishedTasksLoading,
    finishTaskLoading,
    finishedTasks,
    deleteTaskLoading
  } = useAppSelector((state) => state.tasks);
  const { hasInternetConnection } = useAppSelector((state) => state.connection);
  const { makeSyncLoading } = useAppSelector((state) => state.connection);
  const { resetDeleteTaskLoading, resetFinishTaskLoading } = taskSliceActions;
  const { queueActions } = useAppSelector((state) => state.queue);

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchApiFinishedTasks());
  }, []);

  useEffect(() => {
    if (deleteTaskLoading === 'succeeded') {
      //@ts-ignore
      dispatch(fetchApiFinishedTasks());
      //@ts-ignore
      dispatch(resetDeleteTaskLoading());
    }
  }, [deleteTaskLoading]);

  useEffect(() => {
    if (finishTaskLoading === 'succeeded') {
      //@ts-ignore
      dispatch(fetchApiFinishedTasks());
      dispatch(resetFinishTaskLoading());
    }
  }, [finishTaskLoading]);

  // useEffect(() => {
  //   //@ts-ignore
  //   dispatch(makeSynchronization());
  // }, [queueActions.length !== 0, hasInternetConnection]);

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
        {getFinishedTasksLoading === 'pending' ||
        makeSyncLoading === 'pending' ? (
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
