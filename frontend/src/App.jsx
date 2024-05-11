import { Container } from '@chakra-ui/react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import Header from './components/Header'
import AuthPage from './pages/AuthPage'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom'
import HomePage from './pages/HomePage'
import UpdateProfile from './pages/UpdateProfile'
import CreatePost from './components/CreatePost'


function App() {
  const user = useRecoilValue(userAtom)
  return (
    <>
      <Container maxH={'670px'} >

        <Header />
        <Routes >
          <Route path='/' element={user ? <HomePage /> : <Navigate to={'/auth'} />} />
          <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to={'/'} />} />
          <Route path='/update' element={user ? <UpdateProfile /> : <Navigate to={'/auth'} />} />
          <Route path='/:username' element={<UserPage />} />
          <Route path='/:username/post/:pid' element={<PostPage />} />
        </Routes>

        
        {user && <CreatePost />}
      </Container>

    </>

  )
}

export default App
