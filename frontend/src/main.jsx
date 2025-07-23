import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from "react-router-dom"

//auth

import AdminRoutes from './pages/Admin/AdminRoutes.jsx'
import GenreList from './pages/Admin/GenreList.jsx'



// restricted
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import PrivateRoute from './pages/Auth/PrivateRoute.jsx'
import CreateMovie from './pages/Admin/CreateMovie.jsx'
import AdminMoviesList from './pages/Admin/AdminMoviesList.jsx'
import UpdateMovie from './pages/Admin/UpdateMovieList.jsx'



import { Home } from './pages/Home.jsx'
import Profile from './pages/User/Profile.jsx'
import AllMovies from './pages/Movies/AllMovies.jsx'
import MovieDetails from './pages/Movies/MovieDetails.jsx'
import AllComments from './pages/Admin/AllComments.jsx'
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} element={<Home/>} />
      <Route path="/movies" element={<AllMovies/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='' element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>}/>
      <Route path="/movies/:id" element={<MovieDetails/>} />

      </Route>


      <Route path="" element={<AdminRoutes/>}>
        <Route path='/admin/movies/genre' element={<GenreList/>}/>
        <Route path='/admin/movies/create' element={<CreateMovie/>}/>
        <Route path="/admin/movies-list" element={<AdminMoviesList />} />
        <Route path="/admin/movies/update/:id" element={<UpdateMovie/>} />
        <Route path="/admin/movies/comments" element={<AllComments/>} />
        <Route path="/admin/movies/dashboard" element={<AdminDashboard/>} />
      </Route>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
