import { MaterialIcons } from '@expo/vector-icons';
import Button from 'atomic/atoms/button';
import TextInput from 'atomic/atoms/textInput';
import { IModalProps, Icon, Modal, Pressable, Text, VStack } from 'native-base';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTaskInApi } from 'store/thunks/tasksThunk';

type ICreateTaskModal = IModalProps;

const CreateTaskModal: FC<ICreateTaskModal> = ({ ...rest }) => {
  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');

  const handleSubmitTask = () => {
    dispatch(
      createTaskInApi({
        title: taskTitle,
        description: taskDescription,
        finished: 0
      })
    );
  };

  return (
    <Modal {...rest}>
      <Modal.Content w={'90%'} backgroundColor={'gray.700'} h={'40%'}>
        <Modal.Header
          w={'full'}
          backgroundColor={'gray.700'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          borderBottomColor={'gray.700'}
        >
          <Text color={'white'} fontSize={'xl'} fontWeight={'medium'}>
            Criar task
          </Text>
          <Pressable onPress={(): void => rest.onClose()}>
            <Icon size={'lg'} as={MaterialIcons} name="close" color={'white'} />
          </Pressable>
        </Modal.Header>
        <Modal.Body alignItems={'center'} flexDirection={'column'} flex={1}>
          <VStack
            space={8}
            alignItems={'center'}
            justifyContent={'center'}
            w={'full'}
          >
            <TextInput
              onChangeText={(text) => setTaskTitle(text)}
              title="Título da task"
            />
            <TextInput
              onChangeText={(text) => setTaskDescription(text)}
              title="Descrição da task"
            />
            <Button onPress={() => handleSubmitTask()} />
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default CreateTaskModal;
