import { Pressable, Text } from 'native-base';

const Button = () => {
  return (
    <Pressable
      alignItems={'center'}
      w={'full'}
      backgroundColor={'purple.200'}
      justifyContent={'center'}
      padding={2}
      rounded={'md'}
    >
      <Text color={'#000'}>Salvar</Text>
    </Pressable>
  );
};

export default Button;
