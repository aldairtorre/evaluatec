import { Outlet } from "react-router-dom"
import { SideBar } from "./SideBar"
import { Footer } from "./Footer"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useFetchQuery } from "../hooks/useFetchQuery";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export const AdminLayout = () => {

    const { setUserAuthenticate } = useContext(UserContext);

    const userAuthenticateQuery = useFetchQuery(
        'admin.user_authenticate',
        {},
        'user-authenticate',
    )

    useEffect(() => {
        setUserAuthenticate(userAuthenticateQuery.data?.user)
    }, [userAuthenticateQuery.isSuccess])

    return (
        <>
            <div className="flex flex-col min-h-screen">
               
                <SideBar
                     user={userAuthenticateQuery.data?.user}
                />

                <main className="flex-grow px-10 mt-5">
                    <Outlet />
                </main>

                <Footer/>
            </div>
        </>
        // <>
        //     <div className="font-poppins antialiased">
        //         <div
        //             id="view"
        //             className="h-[95vh] w-screen flex flex-row"
        //             x-data="{sidenav: true }"
        //         >
        //             <div className='w-2/12'>
        //                 <SideBar
        //                     user={userAuthenticateQuery.data?.user}
        //                 />
        //             </div>
        //             <div className='bg-gray-50 w-10/12'>
        //                 <h1 className='font-poppins antialiased text-center capitalize bg-primary-tec text-white font-semibold p-3 text-2xl'>maestría en desarrollo regional e innovación tecnológica</h1>
        //                 <div className='px-10'>
        //                     <Outlet />
        //                     {/* <img className='fixed end-8 mt-3  h-12' src="/assets/img/logo-ita.png" alt="logo-ita" /> */}
        //                 </div>
        //             </div>
        //         </div>
        //         <Footer />
        //     </div>
        //     <ToastContainer autoClose={2000} />
        // </>
    )
}
