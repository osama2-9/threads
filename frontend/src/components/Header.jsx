import { Button, Flex, Image, Link } from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import { BsHouse, BsPerson } from "react-icons/bs";
import { Link as RouterLink } from 'react-router-dom'
import { IoExitOutline } from "react-icons/io5";
import useLogout from "../hooks/useLogout";

const Header = () => {
    const { handleLogout } = useLogout()
    const user = useRecoilValue(userAtom);


    return (
        <Flex justifyContent={'space-between'} mt={6} mb={12}>
            {user && (
                <Link to='/' as={RouterLink} >
                    <BsHouse size={'20px'} />
                </Link>
            )}
            {!user && (
                <Link to='/auth' as={RouterLink} >
                    Login
                </Link>
            )}

            <Image cursor={'pointer'} alt="logo" src="/light-logo.svg" w={10} />

            {user && (
                <Flex alignItems={'center'}>

                    <Link to={`/${user.username}`} as={RouterLink} >
                        <BsPerson size={'20px'} />
                    </Link>
                    <Button
                        onClick={handleLogout}
                        position={'fixed'}
                        top={'28px'}
                        right={{
                            base: "20px",
                            sm: "30px"
                        }}

                        size={'sm'}
                        bg={'transparent'}
                    >
                        <IoExitOutline size={20} />

                    </Button>
                </Flex>
            )}




        </Flex>
    )
}

export default Header
