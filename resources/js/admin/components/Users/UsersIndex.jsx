import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { TableConfig, inputSwitchConfig, paginatorConfig } from '../../utils/TableConfig';
import { InputSwitch } from 'primereact/inputswitch';
import { UserForm } from './UserForm';
import { CustomButtonFilterConfig } from '../../utils/Formik/CustomButtonFilterConfig';
import { CustomDrowdomFilterConfig } from '../../utils/Formik/CustomDrowdomConfig';
import { useFetchQuery } from '../../hooks/useFetchQuery';
import { useSwalCustom } from '../../hooks/admin/useSwalCustom';
import { UserDesing } from './UserDesing';
import { Spinner } from '../../utils/Spinner';
import Log from 'laravel-mix/src/Log';

export const UsersIndex = () => {

    const [filterName, setFilterName] = useState('');
    const [filterStatus, setFilterStatus] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [page, setPage] = useState(0);

    const test = true;

    const usersQuery = useFetchQuery(
        'admin.users.index',
        {
            filterName: filterName,
            filterStatus: filterStatus?.id,
            'size': 3,
            'page': currentPage
        },
        'users'
    );

    const opt = [
        { id: 1, name: 'Activo' },
        { id: 0, name: 'Inactivo' }
    ]

    const handleChangePage = (event) => {
        setCurrentPage(event.page);
        setPage(event.first);
    }


    const handleNameTemplate = (rowData) => {
        return (
            <div className='flex items-center gap-2'>
                <img
                    src={rowData.image_user ? rowData.image_user.url_image : "/assets/img/usuario.png"}
                    alt="usuario.png"
                    className='rounded-full overflow-hidden w-14 h-14 object-cover'
                />
                <p>{rowData.full_name}</p>
            </div>
        )
    }

    const handleInputTemplates = (rowData) => {
        return (
            <div className='flex items-center gap-5'>
                <InputSwitch
                    checked={rowData.active === 1 ? true : false}
                    pt={inputSwitchConfig}
                    onChange={() => handleSwitchButton(rowData)}
                    disabled={rowData?.profile?.id === 1}
                ></InputSwitch>
                <UserForm
                    isUpdate={true}
                    userData={rowData}
                    usersQuery={usersQuery}
                ></UserForm>
            </div>
        )
    }

    useEffect(() => {
        usersQuery.refetch();
    }, [filterName, filterStatus, currentPage])

    if (usersQuery.isLoading) return <Spinner />

    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className="text-4xl font-bold mb-5 mt-3 "> Gestión de Usuarios</h1>
                <UserForm
                    userData={usersQuery.data}
                    usersQuery={usersQuery}
                ></UserForm>
            </div>

            <div className='mb-5 flex gap-3'>
                <InputText
                    pt={CustomButtonFilterConfig}
                    placeholder='Buscar usuarios'
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                >
                </InputText>
                <Dropdown
                    value={filterStatus}
                    placeholder='Filtrar por estado'
                    pt={CustomDrowdomFilterConfig}
                    options={opt}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    optionLabel="name"
                    showClear
                ></Dropdown>
            </div>
            {
                usersQuery?.data?.data.length === 0 ?
                    <h1>Sin resultados</h1> :
                    <>
                        <main className='gap-5 grid grid-cols-3 w-full'>
                            {usersQuery?.data?.data.map(user => (
                                <UserDesing
                                    key={user.id}
                                    name={user.full_name}
                                    email={user.email}
                                    rol={user.profile.name}
                                    img={user.image_user}
                                    user={user}
                                    usersQuery={usersQuery}
                                />
                            ))}
                        </main>
                        
                        <Paginator
                            rows={3}
                            totalRecords={usersQuery.data?.total_rows}
                            onPageChange={handleChangePage}
                            pt={paginatorConfig}
                            first={page}
                        ></Paginator>
                    </>
            }
        </>
    )
}
