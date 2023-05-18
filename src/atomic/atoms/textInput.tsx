import { IInputProps, Input, Text, VStack } from 'native-base';
import { FC } from 'react';

type TextInputProps = IInputProps & {
  title: string;
};

const TextInput: FC<TextInputProps> = ({ title, ...rest }) => {
  return (
    <VStack w={'full'} alignItems={'flex-start'}>
      <Text color={'white'} fontWeight={'extraBlack'}>
        {title}
      </Text>
      <Input
        {...rest}
        h={8}
        w={'full'}
        color={'white'}
        _focus={{
          borderWidth: 1,
          borderColor: 'purple.200',
          backgroundColor: 'none'
        }}
      />
    </VStack>
  );
};

export default TextInput;
