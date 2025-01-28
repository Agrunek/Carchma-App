import clsx from 'clsx';
import { Fieldset, Legend } from '@headlessui/react';
import Button from '@/components/atoms/Button';
import { tw } from '@/utils/string';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  disabled?: boolean;
  loading?: boolean;
  submitTitle: string;
  submitClassName?: string;
  title?: string;
  titleClassName?: string;
}

const titleBaseClassName = tw`w-full text-center text-xl font-semibold`;

const Form = ({ children, loading, submitTitle, submitClassName, title, titleClassName, ...props }: FormProps) => {
  const titleStyle = clsx(titleBaseClassName, titleClassName);

  return (
    <Fieldset as="form" {...props}>
      {title && <Legend className={titleStyle}>{title}</Legend>}
      {children}
      <Button className={submitClassName} loading={loading} type="submit">
        {submitTitle}
      </Button>
    </Fieldset>
  );
};

export default Form;
