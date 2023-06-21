import { CardHeader } from 'atomic/molecules/cardHeader';
import { Task } from 'dto/task';
import { Text, VStack, useTheme } from 'native-base';
import { FC, useState } from 'react';
import { ConfirmationModal } from './confirmationModal';
import { useDispatch } from 'react-redux';
import { deleteTaskInApi } from 'store/thunks/tasksThunk';
import { finishTask } from 'store/thunks/tasksThunk';

interface ITaskCardProps {
  data: Task;
}

const TaskCard: FC<ITaskCardProps> = ({ data }) => {
  const { colors } = useTheme();
  const [isVisibleConfirmationModal, setIsVisibleConfirmationModal] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  const handleConfirm = () => {
    if (data.finished) {
      //@ts-ignore
      dispatch(deleteTaskInApi(data.id));
      setIsVisibleConfirmationModal(false);
    } else {
      dispatch(
        finishTask({
          title: data.title,
          description: data.description,
          finished: 1,
          id: data.id
        })
      );
      setIsVisibleConfirmationModal(false);
    }
  };

  return (
    <>
      <VStack
        marginY={4}
        w={'full'}
        backgroundColor={colors.gray[700]}
        rounded={'md'}
        px={2}
        py={4}
        space={2}
        minHeight={'26'}
      >
        <CardHeader
          onPress={(): void => setIsVisibleConfirmationModal(true)}
          title={data.title}
          finished={data.finished}
        />
        <Text
          w={'full'}
          color={'white'}
          fontSize={'sm'}
          fontWeight={'semibold'}
          adjustsFontSizeToFit
        >
          {data.description}
        </Text>
      </VStack>
      <ConfirmationModal
        text="Você tem deseja que deseja excluir essa task?"
        onConfirm={(): void => handleConfirm()}
        onRecuse={(): void => setIsVisibleConfirmationModal(false)}
        isOpen={isVisibleConfirmationModal}
        onClose={() => setIsVisibleConfirmationModal(false)}
      />
    </>
  );
};

export default TaskCard;
