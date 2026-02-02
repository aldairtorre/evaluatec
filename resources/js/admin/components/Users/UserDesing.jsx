import React from 'react'
import axios from 'axios';
import { Badge } from 'primereact/badge';
import { InputSwitch } from 'primereact/inputswitch';
import { UserForm } from './UserForm';
import { useSwalCustom } from '../../hooks/admin/useSwalCustom';
import { inputSwitchConfig } from '../../utils/TableConfig';

export const UserDesing = ({ name, email, rol, img, user = {} ,usersQuery = [] }) => {

    const handleSwitchButton = (rowData) => {
        useSwalCustom(
            null,
            `¿Deseas ${(rowData.active ? 'desactivar' : 'activar')} el usuario?`, null,
            true, true, 'Aceptar', 'Cancelar',
            null,
            handleChangeStatus,
            { userId: rowData.id }
        );
    }

    const handleChangeStatus = (params) => {
        axios.post(route('admin.users.change_status', params))
            .then(response => {
                if (response.data.success) {
                    useSwalCustom(null, response.data.title,
                        response.data.message,
                        false, false,
                        'Aceptar', 'Cancelar',
                        2000);
                    usersQuery.refetch();
                } else {
                    useSwalCustom(null, '¡Error!',
                        response.data.message,
                        false, false,
                        'Aceptar', 'Cancelar',
                        2000);
                }
            })
    }

    return (
        <div className='bg-white shadow-lg p-10 rounded-md border border-slate-300 w-96'>
            <p className='mb-3 font-semibold text-lg'>{ name }</p>
            <div className='flex items-center gap-2'>
                <img 
                    src={img !== null ? img.url_image : '/assets/img/usuario.png' } alt="" 
                    className='h-14 w-14 rounded-full object-cover' 
                />
                
                <div>
                    <p>{ email }</p>
                    <Badge
                        value={rol}
                        severity={'secondary'}
                    />
                </div>
            </div>
            <div className='mt-3 flex justify-between items-end'>
                <InputSwitch
                    checked={user.active ? true : false}
                    pt={inputSwitchConfig}
                    onChange={() => handleSwitchButton(user)}
                    disabled={user?.profile?.id === 1}
                ></InputSwitch>
                <UserForm
                    isUpdate={true}
                    userData={user}
                    usersQuery={usersQuery}
                />
            </div>
        </div>
    )
}
