import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePostMutation } from '../hooks/usePostMutation';
import { SwalReact } from '../utils/SwalConfig';

export const SideBar = ({ user }) => {

    const sesionMutation = usePostMutation()
    const location = useLocation()
    const [pageActive, setPageActive] = useState('')

    const navClass = 'flex items-center gap-2 px-4 min-h-[80px] cursor-pointer hover:bg-slate-400 hover:bg-opacity-40';

    const handleLogout = () => {

        try {
            SwalReact.fire({
                title: '<div class="logout-title">¿Estás seguro que deseas cerrar sesión?</div>',
                html: ' <div class="logout-subtitle">Esta acción cerrará tu sesión actual y te llevará fuera del panel de administración.</div> ',
                showConfirmButton: true,
                confirmButtonText: '<div class="px-3 py-1 rounded-3xl border-none">Aceptar</div>',
                showCancelButton: true,
                cancelButtonText: '<div class="px-3 py-1 rounded-3xl">Cancelar</div>',
                allowOutsideClick: true,
                allowEscapeKey: true,
                allowEnterKey: true,
                showCloseButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    sesionMutation.mutate({
                        url: 'admin.logout'
                    })
                }
            });
        } catch (error) {
            SwalReact.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Error al cerrar sesión: ' + error,
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                window.location.reload();
            });
        }
    }

    useEffect(() => {
        setPageActive(location.pathname)
    }, [location.pathname])

    return (
        <header className="flex justify-between px-5 bg-primary-tec text-white min-h-[80px] items-center">
            <div className="flex items-center gap-10 h-full">
                <h1 className="text-4xl font-bold">EvaluaTec</h1>
                <nav>
                    <ol className="flex">
                        <Link to={'users'}>
                            <li className={`${navClass} ${pageActive.includes('users') ? 'bg-slate-400 bg-opacity-40 ' : ''}`}>
                                <i className="pi pi-users" /> Usuarios
                            </li>
                        </Link>
                        <Link to={'aspirants'}>
                            <li className={`${navClass} ${pageActive.includes('aspirants') ? 'bg-slate-400 bg-opacity-40 ' : ''}`}>
                                <i className="pi pi-clipboard" /> Aspirantes
                            </li>
                        </Link>
                        <Link to={'interviews'}>
                            <li className={`${navClass} ${pageActive.includes('interviews') ? 'bg-slate-400 bg-opacity-40 ' : ''}`}>
                                <i className="pi pi-comments" /> Entrevistas
                            </li>
                        </Link>
                        <Link to={'questions'}>
                            <li className={`${navClass} ${pageActive.includes('questions') ? 'bg-slate-400 bg-opacity-40 ' : ''}`}>
                                <i className="pi pi-question-circle" /> Preguntas
                            </li>
                        </Link>
                        <Link to={'results'}>
                            <li className={`${navClass} ${pageActive.includes('results') ? 'bg-slate-400 bg-opacity-40 ' : ''}`}>
                                <i className="pi pi-check-circle" /> Resultados
                            </li>
                        </Link>
                    </ol>
                </nav>
            </div>
            <button onClick={() => handleLogout()} className="flex items-center gap-2">
                <i className="pi pi-sign-out" /> log out
            </button>
        </header>
        // <>
        //     <aside
        //         id="sidebar"
        //         className="fixed bg-white h-screen md:block shadow-xl px-3 w-30 md:w-1/6 lg:w-1/6 overflow-x-hidden transition-transform duration-300 ease-in-out"
        //         x-show="sidenav"
        //     // @click.away="sidenav = false"
        //     >
        //         <div className="space-y-6 md:space-y-10 mt-10">
        //             <h1 className="font-bold text-4xl text-center md:hidden">
        //                 D<span className="text-teal-600">.</span>
        //             </h1>
        //             <h1 className="hidden md:block font-bold text-sm md:text-2xl text-center">
        //                 EvaluaTec<span className="text-teal-600">.</span>
        //             </h1>
        //             <div id="profile" className="space-y-2">
        //                 <img
        //                     src={user?.image_user ? user?.image_user?.url_image : "/assets/img/usuario.png"}
        //                     alt="usuario.png"
        //                     className='rounded-full overflow-hidden w-20 h-20 block m-auto object-cover'
        //                 />
        //                 <div>
        //                     <Link to={'profile'}>
        //                         <h2
        //                             className="font-medium text-lg  text-center text-tec"
        //                         >
        //                             {user?.full_name}
        //                         </h2>
        //                     </Link>
        //                     <p className="text-xs text-gray-500 text-center">{user?.profile?.name}</p>
        //                 </div>
        //             </div>

        //             <div id="menu" className="flex flex-col space-y-4">
        //                 {user?.profile?.name === 'Administrador' &&
        //                     <Link to='users'
        //                         className={`${pageActive.includes('users') ? 'bg-primary-tec text-white' : ''} text-sm font-medium text-gray-700 py-2 px-2 hover:bg-primary-tec hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center`}
        //                     >
        //                         <svg
        //                             className="w-3 h-6 fill-current inline-block"
        //                             fill="currentColor"
        //                             viewBox="0 0 20 20"
        //                             xmlns="http://www.w3.org/2000/svg"
        //                         >
        //                             <path
        //                                 d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        //                             ></path>
        //                         </svg>
        //                         <span className="text-lg">Usuarios</span>
        //                     </Link>
        //                 }

        //                 <Link to='interviews'
        //                     className={`${pageActive.includes('interviews') ? 'bg-primary-tec text-white' : ''} text-sm font-medium text-gray-700 py-2 px-2 hover:bg-primary-tec hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center`}
        //                 >
        //                     <svg
        //                         className="w-3 h-6 fill-current inline-block"
        //                         fill="currentColor"
        //                         viewBox="0 0 20 20"
        //                         xmlns="http://www.w3.org/2000/svg"
        //                     >
        //                         <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
        //                         <path
        //                             fillRule="evenodd"
        //                             d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
        //                             clipRule="evenodd"
        //                         ></path>
        //                     </svg>
        //                     <span className="text-lg">Entrevistas</span>
        //                 </Link>

        //                 {user?.profile?.name === 'Administrador' &&
        //                     <Link to='questions'
        //                         className={`${pageActive.includes('questions') ? 'bg-primary-tec text-white' : ''} text-sm font-medium text-gray-700 py-2 px-2 hover:bg-primary-tec hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center`}
        //                     >
        //                         <svg
        //                             className="w-3 h-6 fill-current inline-block"
        //                             fill="currentColor"
        //                             viewBox="0 0 20 20"
        //                             xmlns="http://www.w3.org/2000/svg"
        //                         >
        //                             <path
        //                                 d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
        //                             ></path>
        //                             <path
        //                                 d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
        //                             ></path>
        //                         </svg>
        //                         <span className="text-lg">Preguntas</span>
        //                     </Link>
        //                 }

        //                 <Link to='results'
        //                     className={`${pageActive.includes('results') ? 'bg-primary-tec text-white' : ''} text-sm font-medium py-2 px-2 hover:bg-primary-tec hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center`}
        //                 >
        //                     <svg
        //                         className="w-3 h-6 fill-current inline-block"
        //                         fill="currentColor"
        //                         viewBox="0 0 20 20"
        //                         xmlns="http://www.w3.org/2000/svg"
        //                     >
        //                         <path
        //                             fillRule="evenodd"
        //                             d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        //                             clipRule="evenodd"
        //                         ></path>
        //                     </svg>
        //                     <span className="text-lg">Resutados</span>
        //                 </Link>

        //                 {/* <Link to='dashboard'
        //                     className={`${pageActive.includes('dashboard') ? 'bg-primary-tec text-white' : ''} text-sm font-medium py-2 px-2 hover:bg-primary-tec hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center`}
        //                 >
        //                     <svg
        //                         className="w-3 h-6 fill-current inline-block"
        //                         fill="currentColor"
        //                         viewBox="0 0 20 20"
        //                         xmlns="http://www.w3.org/2000/svg"
        //                     >
        //                         <path
        //                             fillRule="evenodd"
        //                             d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        //                             clipRule="evenodd"
        //                         ></path>
        //                     </svg>
        //                     <span className="text-lg">Dashboard</span>
        //                 </Link> */}

        //                 <a
        //                     onClick={handleLogout}
        //                     className=" text-sm font-medium text-gray-700 py-2 px-2 hover:bg-rose-600 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center cursor-pointer"
        //                 >
        //                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 26" fill="currentColor" className="w-3 h-6 fill-current inline-block">
        //                         <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
        //                     </svg>
        //                     <span className="text-lg">Cerrar sesión</span>
        //                 </a>
        //             </div>
        //         </div>
        //     </aside>
        // </>

    )
}
