import { InputText } from 'primereact/inputtext';
import { CustonInputTextConfig } from '../../utils/Formik/CustomInputTextConfig';
import { ErrorMessage, useField } from 'formik';
import { CustomErrorMessage } from '../CustomErrorMessage';

export const CustonInputText = ({ label, ...props }) => {

  const [field] = useField(props)

  return (
    <div className='mb-3'>
      <p>{label} {props.required !== false && <span className='text-red-600'>*</span>}</p>
      <InputText
        {...field}
        {...props}
        id={props.id || props.name}
        pt={CustonInputTextConfig}
      />
      <ErrorMessage name={props.name} render={(msg) => <CustomErrorMessage message={msg} ></CustomErrorMessage>} />
    </div>
  )
}
