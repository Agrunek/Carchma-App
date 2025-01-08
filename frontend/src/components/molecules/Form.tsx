import { Fieldset, Legend } from '@headlessui/react';
import Button from '@/components/atoms/Button';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  disabled?: boolean;
  loading?: boolean;
  submitTitle: string;
  title?: string;
}

const Form = ({ children, loading, submitTitle, title, ...props }: FormProps) => {
  return (
    <Fieldset as="form" {...props}>
      {title && <Legend className="w-full text-center text-xl font-semibold">{title}</Legend>}
      {children}
      <Button loading={loading} type="submit">
        {submitTitle}
      </Button>
    </Fieldset>
  );
};

export default Form;
