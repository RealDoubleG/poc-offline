import {
  Button,
  HStack,
  IModalProps,
  Modal,
  Pressable,
  Text,
  VStack
} from 'native-base';
import { FC } from 'react';

type IConfirmationModal = IModalProps & {
  onConfirm: () => void;
  onRecuse: () => void;
  text: string;
};

export const ConfirmationModal: FC<IConfirmationModal> = ({
  text,
  onConfirm,
  onRecuse,
  ...rest
}) => {
  return (
    <Modal {...rest}>
      <Modal.Content w={'90%'} backgroundColor={'gray.700'}>
        <Modal.Body
          alignItems={'center'}
          flexDirection={'column'}
          flex={1}
          py={16}
        >
          <VStack space={8}>
            <Text
              color={'white'}
              fontWeight={'extrabold'}
              fontSize={'lg'}
              textAlign={'center'}
            >
              {text}
            </Text>
            <HStack w={'full'} justifyContent={'space-evenly'}>
              <Pressable
                onPress={onConfirm}
                w={'45%'}
                h={'14'}
                backgroundColor={'purple.200'}
                rounded={'md'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Text fontWeight={'bold'}>Sim</Text>
              </Pressable>
              <Pressable
                onPress={onRecuse}
                w={'45%'}
                h={'14'}
                backgroundColor={'purple.200'}
                rounded={'md'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Text fontWeight={'bold'}>Não</Text>
              </Pressable>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
