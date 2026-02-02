import { ErrorMessage, useField } from 'formik';
import { InputTextarea } from 'primereact/inputtextarea';
import { CustomErrorMessage } from '../CustomErrorMessage';
import { CustonInputTextConfig } from '../../utils/Formik/CustomInputTextConfig';

export const CustomTextArea = ({label, isInterview = false, ...props}) => {

    const [ field ] = useField(props);

  return (
    <div className='mb-3'>
      <p className={isInterview ? 'font-semibold text-xl' : ''}>{label} {props.required !== false && <span className='text-red-600'>*</span>}</p>
      <InputTextarea
        {...field}
        {...props}
        className='h-[10vh]'
        id={props.id || props.name}
        pt={CustonInputTextConfig}
      />
      <ErrorMessage name={props.name} render={(msg) => <CustomErrorMessage message={msg} ></CustomErrorMessage>} />
    </div>
  )
}
