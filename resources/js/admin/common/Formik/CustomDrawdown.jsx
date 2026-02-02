import { Dropdown } from 'primereact/dropdown';
import { CustonInputTextConfig } from '../../utils/Formik/CustomInputTextConfig';
import { ErrorMessage, useField } from 'formik';
import { CustomErrorMessage } from '../CustomErrorMessage';
import { CustomDrowdomConfig } from '../../utils/Formik/CustomDrowdomConfig';

export const CustomDrawdown = ({ label, ...props }) => {

    const [field] = useField(props)

    return (
        <div className='mb-3'>
            <p>{label} {props.required !== false && <span className='text-red-600'>*</span>}</p>
            <Dropdown
                {...field}
                {...props}
                id={props.id || props.name}
            />
            <ErrorMessage name={props.name} render={(msg) => <CustomErrorMessage message={msg} ></CustomErrorMessage>} />
        </div>
    )
}
