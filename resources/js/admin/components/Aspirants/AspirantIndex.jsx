import React, { useEffect, useState } from 'react'
import { AspirantsForm } from './AspirantsForm'
import { useFetchQuery } from '../../hooks/useFetchQuery';
import { paginatorConfig, TableConfig } from '../../utils/TableConfig';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { Column } from 'primereact/column';

export const AspirantIndex = () => {
    const [filterName, setFilterName] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [page, setPage] = useState(0);

    const aspirantsQuery = useFetchQuery(
        'admin.aspirants.index',
        {
            filterName: filterName,
            'size': 5,
            'page': currentPage
        },
        'aspirants'
    )

    const handleChangePage = (event) => {
        setCurrentPage(event.page);
        setPage(event.first);
    }

    useEffect(() => {
        aspirantsQuery.refetch();
    }, [filterName])

    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className="text-4xl font-semibold mb-5 mt-10">Gestión de aspirantes </h1>
                <AspirantsForm
                    aspirantsQuery={aspirantsQuery}
                />
            </div>


            <DataTable
                pt={TableConfig()}
                value={aspirantsQuery?.data?.data}
                tableStyle={{ minWidth: '50rem' }}
                loading={aspirantsQuery.isFetching}
            >
                <Column field='id' header='Número' />
                <Column field='full_name' header='Nombre' />
                <Column field='email' header='Correo electrónico' />
                {/* <Column body={handleInputTemplates} /> */}
            </DataTable>
            <Paginator
                rows={5}
                totalRecords={aspirantsQuery.data?.total_rows}
                onPageChange={handleChangePage}
                pt={paginatorConfig}
                first={page}
            ></Paginator>
        </>
    )
}
