import Card from '@/components/atoms/Card';
import Link from '@/components/atoms/Link';

interface RouterFeedbackProps {
  actionNode?: React.ReactNode;
  children?: React.ReactNode;
}

const RouterFeedback = ({ actionNode, children }: RouterFeedbackProps) => {
  return (
    <Card className="m-4 flex flex-col items-center gap-4">
      <p className="font-semibold">{children}</p>
      {actionNode ?? (
        <Link to="/" replace>
          Powrót do strony głównej
        </Link>
      )}
    </Card>
  );
};

export default RouterFeedback;
