import { forwardRef, ReactNode, useImperativeHandle } from 'react';
import { useForm, UseFormProps, SubmitHandler, FormProvider } from 'react-hook-form';
import classNames from 'classnames';
import { CommonProps } from 'types';
import styles from './Form.module.css';

export interface FormProps extends CommonProps {
  autoComplete?: 'on' | 'off';
  onSubmit: SubmitHandler<any>;
  formProps?: UseFormProps;
  error?: string;
  children?: ReactNode | ((props: object) => ReactNode);
}

function _Form(props: FormProps, ref) {
  const { autoComplete, onSubmit, formProps, error, className, style, children } = props;
  const useFormValues = useForm(formProps);
  const { handleSubmit } = useFormValues;

  useImperativeHandle(ref, () => useFormValues);

  return (
    <FormProvider {...useFormValues}>
      <form
        ref={ref}
        autoComplete={autoComplete}
        className={classNames(styles.form, className)}
        style={style}
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && <div className={styles.error}>{error}</div>}
        {typeof children === 'function' ? children(useFormValues) : children}
      </form>
    </FormProvider>
  );
}

const Form = forwardRef(_Form);

export { Form };

export default Form;
