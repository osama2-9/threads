import { Box, Container } from '@chakra-ui/react'
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
import ChatPage from './pages/ChatPage'


function App() {
  const user = useRecoilValue(userAtom)
  return (
    <>
    <Box
    position={'relative'}
    w={'full'}
    >


      <Container maxH={'670px'} >

        <Header />
        <Routes >
          <Route path='/' element={user ? <HomePage /> : <Navigate to={'/auth'} />} />
          <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to={'/'} />} />
          <Route path='/update' element={user ? <UpdateProfile /> : <Navigate to={'/auth'} />} />
          <Route path='/:username' element={<UserPage />} />
          <Route path='/:username/post/:pid' element={<PostPage />} />
          <Route path='/chat' element={user ? <ChatPage /> : <Navigate to={'/auth'} />} />
        </Routes>


        {user && <CreatePost />}
      </Container>
    </Box>

    </>

  )
}

export default App
