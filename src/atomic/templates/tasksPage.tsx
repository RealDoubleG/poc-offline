import { FC, useState, useEffect } from 'react';
import { Fab, FlatList, Icon, Text, VStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import CreateTaskModal from 'atomic/organisms/createTaskModal';
import { fetchTasks } from 'store/thunk';
import { useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { setHaveInternetConnection } from 'store/tasksSlice';
import { useAppSelector } from 'store/store';
import TaskCard from 'atomic/organisms/taskCard';

const TasksPage: FC = () => {
  const [isOpenModalCreateContact, setIsOpenModalCreateContact] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());

    const checkInternetConnection = () => {
      NetInfo.addEventListener((state) => {
        const isConnected = state.isConnected;
        dispatch(setHaveInternetConnection(isConnected));
      });
    };

    checkInternetConnection();
  }, []);

  const { tasks } = useAppSelector((state) => state);

  return (
    <VStack
      backgroundColor={'background.dark'}
      flex={1}
      justifyContent={'flex-start'}
      alignItems={'center'}
      position={'relative'}
      p={2}
    >
      <Text
        color={'white'}
        marginY={4}
        fontSize={'2xl'}
        fontWeight={'extrabold'}
      >
        Minhas tasks
      </Text>

      {tasks ? (
        <FlatList
          flex={1}
          data={tasks}
          renderItem={({ item }) => <TaskCard data={item} />}
        />
      ) : null}
      <Fab
        position={'absolute'}
        bottom={'1%'}
        right={'2%'}
        onPress={(): void => setIsOpenModalCreateContact(true)}
        renderInPortal={false}
        size={'lg'}
        backgroundColor={'purple.200'}
        icon={
          <Icon as={MaterialIcons} color={'white'} name={'add'} size={'md'} />
        }
      />

      <CreateTaskModal
        isOpen={isOpenModalCreateContact}
        onClose={(): void => setIsOpenModalCreateContact(false)}
      />
    </VStack>
  );
};

export default TasksPage;
