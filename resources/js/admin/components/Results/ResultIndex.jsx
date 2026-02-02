import { DataTable } from "primereact/datatable"
import { TableConfig, paginatorConfig } from "../../utils/TableConfig"
import { useFetchQuery } from "../../hooks/useFetchQuery"
import { useEffect, useState } from "react"
import { Column } from "primereact/column"
import { ResulForm } from "./ResulForm"
import { InputText } from "primereact/inputtext"
import { CustomButtonFilterConfig } from "../../utils/Formik/CustomButtonFilterConfig"
import { Paginator } from "primereact/paginator"
import { Spinner } from '../../utils/Spinner';

export const ResultIndex = () => {

    const [filterName, setFilterName] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [page, setPage] = useState(0);

    const resultsQuery = useFetchQuery(
        'admin.results.index',
        {   filterName: filterName,
            'size': 3,
            'page': currentPage
         },
        'results'
    )

    const handleChangePage = (event) => {
        setCurrentPage(event.page);
        setPage(event.first);
    }

    useEffect(() => {
        resultsQuery.refetch()
    }, [filterName, currentPage])

    if (resultsQuery.isLoading) return <Spinner />
    if (resultsQuery?.data?.data?.length === 0) {
        return (
            <div className=''>
                <h1 className="text-4xl font-semibold mb-5 mt-10 capitalize">resultados finales de la evaluación de aspirantes</h1>
                <div className='mb-5 flex gap-3'>
                    <InputText
                        pt={CustomButtonFilterConfig}
                        placeholder='Nombre'
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />
                </div>
                <p>No hay aspirantes registrados</p>
            </div>
        )
    }

    const handleInputTemplates = (rowData) => {
        return (
            <div className='flex items-center gap-3'>
                <ResulForm
                    results={rowData}
                    resultQuery={resultsQuery}
                />
                <ResulForm
                    isUpdate={true}
                    results={rowData}
                    resultQuery={resultsQuery}
                />
                <ResulForm
                    isDelete={true}
                    results={rowData}
                    resultQuery={resultsQuery}
                />
            </div>
        )
    }

    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className="text-4xl font-semibold mb-5 mt-3 capitalize">resultados finales de la evaluación de aspirante</h1>
            </div>
            <div className='mb-5 flex gap-3'>
                <InputText
                    pt={CustomButtonFilterConfig}
                    placeholder='Nombre'
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                />
            </div>
            <DataTable
                pt={TableConfig()}
                value={resultsQuery?.data?.data}
                tableStyle={{ minWidth: '50rem' }}
                loading={resultsQuery.isFetching}
            >
                <Column field='full_name' header='Nombre' />
                <Column field={'result.course_score'} header='Curso propedéutico'/>
                <Column field={'result.course_score_percentage'} header='%Propedeútico' />
                <Column field={'result.correct_reagents'} header='EVALUATEC (REACTIVOS CORRETOS)'/>
                <Column field={'result.correct_reagents_percentage'} header='PORCENTAJE OBTENIDO EVALUATEC'/>
                <Column field={'result.weighing'} header='% EVALUATEC PONDERACIÓN'/>
                <Column field={'result.interview_score'} header='Entrevista' />
                <Column field={'result.interview_score_percentage'} header='%Entrevista' />
                <Column field={'result.final_score'} header='Resultado Final' />
                <Column body={handleInputTemplates} />
            </DataTable>
            <Paginator
                rows={3}
                totalRecords={resultsQuery.data?.total_rows}
                onPageChange={handleChangePage}
                // pt={paginatorConfig}
                first={page}
            ></Paginator>
        </>
    )
}
