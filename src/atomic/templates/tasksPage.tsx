import { FC, useState, useEffect } from 'react';
import { Fab, FlatList, Icon, Text, VStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import CreateTaskModal from 'atomic/organisms/createTaskModal';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/store';
import TaskCard from 'atomic/organisms/taskCard';
import { fetchApiTasks } from 'store/thunks/tasksThunk';
import { connectionSliceActions } from 'store/slices/connectionSlice';
import {
  fetchQueueActions,
  makeSynchronization
} from 'store/thunks/queueThunk';
import { Loading } from 'atomic/molecules/loading';
import { taskSliceActions } from 'store/slices/tasksSlice';
import NetInfo from '@react-native-community/netinfo';

export const TasksPage: FC = () => {
  const [isOpenModalCreateContact, setIsOpenModalCreateContact] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  const { hasInternetConnection } = useAppSelector((state) => state.connection);
  const { queueActions } = useAppSelector((state) => state.queue);
  const { tasks, createTaskLoading, getTasksLoading, finishTaskLoading } =
    useAppSelector((state) => state.tasks);
  const { makeSyncLoading } = useAppSelector((state) => state.connection);
  const { setInternetConnection } = connectionSliceActions;
  const { resetCreateTaskLoading, resetFinishTaskLoading } = taskSliceActions;
  const { resetMakeSyncLoading } = connectionSliceActions;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch(setInternetConnection(state.isConnected));
      if (state.isConnected) {
        //@ts-ignore
        dispatch(fetchQueueActions());
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    //@ts-ignore
    dispatch(makeSynchronization());
  }, [queueActions.length !== 0]);

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchApiTasks());
  }, [hasInternetConnection]);

  useEffect(() => {
    if (createTaskLoading === 'pending') {
      setIsOpenModalCreateContact(false);
    }
    if (createTaskLoading === 'succeeded') {
      dispatch(resetCreateTaskLoading());
      //@ts-ignore
      dispatch(fetchApiTasks());
    }
  }, [createTaskLoading]);

  useEffect(() => {
    if (makeSyncLoading === 'succeeded') {
      //@ts-ignore
      dispatch(fetchApiTasks());
      dispatch(resetMakeSyncLoading());
    }
  }, [makeSyncLoading]);

  useEffect(() => {
    if (finishTaskLoading === 'succeeded') {
      //@ts-ignore
      dispatch(fetchApiTasks());
      dispatch(resetFinishTaskLoading());
    }
  }, [finishTaskLoading]);

  return (
    <VStack
      backgroundColor={'background.dark'}
      flex={1}
      justifyContent={'flex-start'}
      alignItems={'center'}
      position={'relative'}
      p={2}
    >
      {makeSyncLoading == 'pending' ||
      getTasksLoading === 'pending' ||
      finishTaskLoading === 'pending' ? (
        <Loading text="Carregando tasks" />
      ) : (
        <>
          <Text
            color={'white'}
            marginY={4}
            fontSize={'2xl'}
            fontWeight={'extrabold'}
          >
            Minhas tasks
          </Text>

          <FlatList
            _contentContainerStyle={{
              paddingBottom: '8'
            }}
            flex={1}
            data={tasks}
            renderItem={({ item }) => <TaskCard data={item} />}
          />
          <Fab
            position={'absolute'}
            bottom={'1%'}
            right={'2%'}
            onPress={(): void => setIsOpenModalCreateContact(true)}
            renderInPortal={false}
            size={'lg'}
            backgroundColor={'purple.200'}
            icon={
              <Icon
                as={MaterialIcons}
                color={'white'}
                name={'add'}
                size={'md'}
              />
            }
          />

          <CreateTaskModal
            isOpen={isOpenModalCreateContact}
            onClose={(): void => setIsOpenModalCreateContact(false)}
          />
        </>
      )}
    </VStack>
  );
};
