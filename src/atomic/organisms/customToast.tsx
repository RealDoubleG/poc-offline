import { MaterialIcons } from '@expo/vector-icons';
import { Alert, VStack, Text } from 'native-base';

interface CustomToastProps {
  variant?: 'error' | 'info' | 'success' | 'warning';
  text: string;
}

export const CustomToast: React.FC<CustomToastProps> = ({
  variant = 'success',
  text
}) => {
  const objectVariantIcon: Record<string, string> = {
    error: 'error',
    info: 'info',
    success: 'check-circle',
    warning: 'warning'
  };

  return (
    <Alert
      alignSelf="center"
      bgColor="darkGray"
      flexDirection="row"
      maxW="full"
      status={variant}
      variant="left-accent"
    >
      <Alert.Icon
        as={MaterialIcons}
        mr={4}
        name={objectVariantIcon[variant]}
        size="md"
      />

      <VStack alignItems="center" justifyContent="center" space={2} w="80%">
        <Text
          fontSize="sm"
          fontWeight="normal"
          numberOfLines={3}
          textAlign="center"
        >
          {text}
        </Text>
      </VStack>
    </Alert>
  );
};
