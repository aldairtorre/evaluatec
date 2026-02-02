import { classNames } from 'primereact/utils';

export const TableConfig = (classHeaderCell = '', classBodyCell = '', classWrapper = '', classPaginator = '') => {
    return {
        table: {
            className: 'w-full m-auto rounded shadow',
            paginator: {
                className:  classPaginator 
            }
        },
        column: {
            headerCell: {
                className: 'bg-primary-tec border-b-2 border-gray-200 text-white font-semibold uppercase tracking-wider ' + classHeaderCell
            },
            bodyCell: {
                className: 'border-b border-gray-200 bg-white' + classBodyCell
            }
        },
        wrapper: {
            className: 'scroll-red ' + classWrapper
        }
    };
}

export const paginatorConfig = {
    root: {
        className: 'py-2 px-4 rounded-lg w-1/3 m-auto fixed bottom-12 left-1/2 transform -translate-x-1/2'
    },
    paginatorElement: {
        className: 'flex gap-2'
    },
    firstPageLink: {
        className: 'bg-blue-500 text-white hover:bg-blue-600 rounded-lg w-8 h-8 flex justify-center items-center'
    },
    lastPageLink: {
        className: 'bg-blue-500 text-white hover:bg-blue-600 rounded-lg w-8 h-8 flex justify-center items-center'
    },
    previousPageLink: {
        className: 'bg-blue-500 text-white hover:bg-blue-600 rounded-lg w-8 h-8 flex justify-center items-center'
    },
    nextPageLink: {
        className: 'bg-blue-500 text-white hover:bg-blue-600 rounded-lg w-8 h-8 flex justify-center items-center'
    },
    pageLinks: {
        className: 'bg-blue-500 text-white hover:bg-blue-600 rounded-lg w-8 h-8 flex justify-center items-center'
    },
    currentPageReport: {
        className: 'text-sm text-gray-400 ml-4'
    }
};

export const inputSwitchConfig = {
    root: ({ props }) => ({
        className: 'h-20px w-40px'
    }),
    slider:({props}) => ({
        className: classNames(
            'transition-colors duration-200 rounded-2xl',
            {
                'bg-green-400': props.checked
            }
        )
    })
};