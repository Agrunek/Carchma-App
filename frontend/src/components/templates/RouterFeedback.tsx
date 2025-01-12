import Card from '@/components/atoms/Card';
import Link from '@/components/atoms/Link';

interface RouterFeedbackProps {
  children?: React.ReactNode;
}

const RouterFeedback = ({ children }: RouterFeedbackProps) => {
  return (
    <Card className="m-4 flex flex-col items-center gap-4">
      <p className="font-semibold">{children}</p>
      <Link to="/" replace>
        Powrót do strony głównej
      </Link>
    </Card>
  );
};

export default RouterFeedback;
