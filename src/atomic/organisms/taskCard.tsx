import { MaterialIcons } from '@expo/vector-icons';
import {
  Checkbox,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
  useTheme
} from 'native-base';

const TaskCard = () => {
  const { colors } = useTheme();

  return (
    <VStack
      w={'full'}
      backgroundColor={colors.gray[700]}
      rounded={'md'}
      px={2}
      py={4}
      space={2}
      minHeight={'26'}
    >
      <HStack
        alignItems={'center'}
        borderBottomColor={'purple.500'}
        justifyContent={'space-between'}
        borderBottomWidth={2}
        paddingBottom={4}
      >
        <Text color={'white'} fontSize={'lg'} fontWeight={'bold'}>
          Titulo da task adadssa dadsa
        </Text>
        <HStack alignItems={'center'} space={4}>
          <Checkbox
            size={'md'}
            colorScheme="purple"
            accessibilityLabel="taskFinalizada"
          />
          <Pressable _pressed={{ backgroundColor: 'gray.600' }}>
            <Icon
              as={MaterialIcons}
              size={'xl'}
              name={'delete'}
              color={'white'}
            />
          </Pressable>
        </HStack>
      </HStack>
      <Text
        w={'full'}
        color={'white'}
        fontSize={'sm'}
        fontWeight={'semibold'}
        adjustsFontSizeToFit
      >
        Descricao da task Descricao da task Descricao da task Descricao da task
        Descricao da task a a a a a a a a a a a a a a Descricao da task
      </Text>
    </VStack>
  );
};

export default TaskCard;
