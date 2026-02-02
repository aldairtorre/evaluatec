import { useState } from 'react';
import { useField } from 'formik';
import { useDropzone } from 'react-dropzone';

export const CustomFormImageInput = ({ label,  ...props }) => {
    const [field, meta, helpers] = useField(props.name);
    const [imagePreview, setImagePreview] = useState('');

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: false,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            helpers.setValue([file]);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    });

    return (
        <div className='mb-3'>
            <div>
                {label && <label htmlFor={props.id || props.name}>{label}</label>}
            </div>
            <div {...getRootProps()} className={'dropzone' + (isDragActive ? 'active' : '')}>
                <input {...getInputProps()} />
                {imagePreview ? (
                    <div className='w-full p-2 border border-gray-400 bg-gray-100 cursor-pointer rounded'>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className='block h-28 m-auto rounded-lg' />
                    </div>
                ) : (
                    <>
                        {
                            props.userImage && props.userImage !== null ? (
                                <div className={'w-full p-2 border border-gray-400 bg-gray-100 cursor-pointer rounded'}>
                                    <img
                                        src={
                                            props.userImage.url_image ? (
                                                props.userImage.url_image
                                            ) : (
                                                "/assets/icons/add-user.svg"
                                            )
                                        }
                                        alt=""
                                        className='block h-28 m-auto rounded-lg'
                                    />
                                </div>
                            ) : (
                                <div className={'w-full p-2 border border-gray-400 bg-gray-100 cursor-pointer rounded'}>
                                    <img
                                        src="/assets/icons/add-user.svg"
                                        alt=""
                                        className='block h-28 m-auto rounded-lg'
                                    />
                                </div>
                            )
                        }

                    </>
                )
                }
            </div>
        </div>
    );
};
