import { IPressableProps, Pressable, Text } from 'native-base';
import { FC } from 'react';

type ButtonProps = IPressableProps;

const Button: FC<ButtonProps> = ({ ...rest }) => {
  return (
    <Pressable
      {...rest}
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
