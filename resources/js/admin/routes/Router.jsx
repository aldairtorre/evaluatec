import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AdminLayout } from "../layout/AdminLayout"
import { UsersHome } from "../pages/UsersHome"
import { InterviewHome } from "../pages/InterviewHome"
import { QuestionsHome } from "../pages/QuestionsHome"
import { ResultsHome } from "../pages/ResultsHome"
import { ProfileHome } from "../pages/ProfileHome"
import { DashboardHome } from "../pages/DashboardHome"
import { Prueba } from "../pages/Prueba"
import { AspitantsHome } from "../pages/AspitantsHome"

const ProtectedRoutes = ({ children}) => {

  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.profile.name !== 'Administrador' ) {
      return <Navigate to="/admin/interviews"/>;
  } else {
      return children;
  }
}

export const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="admin" element={<AdminLayout/>}>
                <Route path="users" element={<ProtectedRoutes children={<UsersHome/>}/>}/>
                <Route path="aspirants" element={<AspitantsHome/>}/>
                <Route path="interviews" element={<InterviewHome/>}/>
                <Route path="questions" element={<ProtectedRoutes children={<QuestionsHome/>}/>}/>
                <Route path="results" element={<ResultsHome/>}/>
                <Route path="dashboard" element={<DashboardHome/>}/>
            </Route>
            <Route path="admin/profile" element={<ProfileHome/>}/>
            <Route path="admin/prueba" element={<Prueba/>}/>
        </Routes>
    </BrowserRouter>
  )
}
