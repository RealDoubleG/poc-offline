import { MaterialIcons } from '@expo/vector-icons';
import Button from 'atomic/atoms/button';
import TextInput from 'atomic/atoms/textInput';
import { IModalProps, Icon, Modal, Pressable, Text, VStack } from 'native-base';
import { FC } from 'react';

type ICreateContactModal = IModalProps;

const CreateTaskModal: FC<ICreateContactModal> = ({ ...rest }) => {
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
            <TextInput title="Título da task" />
            <TextInput title="Descrição da task" />
            <Button />
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default CreateTaskModal;
