import { useRecoilValue } from 'recoil'
import Login from '../components/Login'
import authAtom from '../atoms/authAtom'
import Signup from '../components/Signup'

const AuthPage = () => {
    const authScreen = useRecoilValue(authAtom)
   
    return (
        <div>
            {authScreen === 'login' ? <Login /> : <Signup />}

        </div>
    )
}

export default AuthPage
