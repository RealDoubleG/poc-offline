import { FC, useState } from 'react';
import { Fab, Icon, Pressable, Text, VStack, useTheme } from 'native-base';
import TaskCard from 'atomic/organisms/taskCard';
import { MaterialIcons } from '@expo/vector-icons';
import CreateTaskModal from 'atomic/organisms/createTaskModal';

const Tasks: FC = () => {
  const [isOpenModalCreateContact, setIsOpenModalCreateContact] =
    useState<boolean>(false);

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
      <TaskCard />

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

export default Tasks;