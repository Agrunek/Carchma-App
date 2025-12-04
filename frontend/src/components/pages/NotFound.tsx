import Text from '@/components/atoms/Text';
import SimpleFeedback from '@/components/templates/SimpleFeedback';

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <SimpleFeedback>
        <Text as="h1" variant="heading">
          404 Zgubiliśmy się
        </Text>
        <Text>Ups! Proszę, sprawdź adres ponownie.</Text>
      </SimpleFeedback>
    </div>
  );
};

export default NotFound;
