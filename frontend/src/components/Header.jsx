import { Button, Flex, Image, Link, Text } from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import { BsChat, BsHouse, BsPerson } from "react-icons/bs";
import { Link as RouterLink } from 'react-router-dom'
import { IoExitOutline } from "react-icons/io5";
import useLogout from "../hooks/useLogout";

const Header = () => {
    const { handleLogout } = useLogout()
    const user = useRecoilValue(userAtom);

    return (
        <Flex justifyContent="space-between" alignItems="center" mt={6} mb={12}>
            <Flex alignItems="center">
                <Link to="/" as={RouterLink} mr={4}>
                    <BsHouse size={20} />
                </Link>
                <Image cursor="pointer" alt="logo" src="/light-logo.svg" w={5} />
            </Flex>

            {user ? (
                <Flex alignItems="center" gap={5}>
                    <Link to={`/${user.username}`} as={RouterLink}>
                        <BsPerson size={20} />
                    </Link>
                    <Link to="/chat" as={RouterLink}>
                        <BsChat size={20} />
                    </Link>
                    <Button
                        onClick={handleLogout}
                        size="sm"
                        bg="transparent"
                        leftIcon={<IoExitOutline size={20} />}
                    >
                        Logout
                    </Button>
                </Flex>
            ) : (
                <Link to="/auth" as={RouterLink}>
                    <Text fontSize="lg">Login</Text>
                </Link>
            )}
        </Flex>
    )
}

export default Header
