import { FC, useState, useEffect } from 'react';
import { Fab, FlatList, Icon, Text, VStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import CreateTaskModal from 'atomic/organisms/createTaskModal';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/store';
import TaskCard from 'atomic/organisms/taskCard';
import { fetchApiTasks } from 'store/thunks/tasksThunk';
import { connectionSliceActions } from 'store/slices/connectionSlice';
import useInternetConnectivity from 'hooks/hasInternet';
import { fetchQueueActions, makeSync } from 'store/thunks/queueThunk';
import { Loading } from 'atomic/molecules/loading';
import { taskSliceActions } from 'store/slices/tasksSlice';

export const TasksPage: FC = () => {
  const [isOpenModalCreateContact, setIsOpenModalCreateContact] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { queueActions } = useAppSelector((state) => state.queue);
  const { tasks, createTaskLoading, getTasksLoading } = useAppSelector(
    (state) => state.tasks
  );
  const { makeSyncLoading } = useAppSelector((state) => state.connection);
  const { setInternetConnection } = connectionSliceActions;
  const { resetCreateTaskLoading } = taskSliceActions;
  const { resetMakeSyncLoading } = connectionSliceActions;

  const isConnected = useInternetConnectivity();

  useEffect(() => {
    dispatch(setInternetConnection(true));
    //@ts-expect-error
    dispatch(fetchQueueActions());
  }, []);

  useEffect(() => {
    console.log(queueActions);
    if (queueActions.length !== 0) {
      //@ts-expect-error
      dispatch(makeSync(queueActions));
    } else {
      //@ts-expect-error
      dispatch(fetchApiTasks());
    }
  }, [queueActions]);

  useEffect(() => {
    if (createTaskLoading === 'pending') {
      setIsOpenModalCreateContact(false);
    }
    if (createTaskLoading === 'succeeded') {
      dispatch(resetCreateTaskLoading());
      //@ts-expect-error
      dispatch(fetchApiTasks());
    }
  }, [createTaskLoading]);

  useEffect(() => {
    if (makeSyncLoading === 'succeeded') {
      //@ts-expect-error
      dispatch(fetchApiTasks());
      dispatch(resetMakeSyncLoading());
      setIsLoading(false);
    }
  }, [makeSyncLoading]);

  return (
    <VStack
      backgroundColor={'background.dark'}
      flex={1}
      justifyContent={'flex-start'}
      alignItems={'center'}
      position={'relative'}
      p={2}
    >
      {makeSyncLoading == 'pending' || getTasksLoading === 'pending' ? (
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
