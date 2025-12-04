import Text from '@/components/atoms/Text';
import SimpleFeedback from '@/components/templates/SimpleFeedback';

interface ErrorOccurredProps {
  errorMessage?: string;
}

const ErrorOccurred = ({ errorMessage }: ErrorOccurredProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <SimpleFeedback variant="error">
        <Text as="h1" variant="heading">
          Wystąpił błąd
        </Text>
        <Text>{errorMessage || 'Skontaktuj się z administratorem.'}</Text>
      </SimpleFeedback>
    </div>
  );
};

export default ErrorOccurred;
