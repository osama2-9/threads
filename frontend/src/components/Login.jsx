import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    InputRightElement,
    InputGroup,
    useToast,
} from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import authAtom from '../atoms/authAtom';
import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import userAtom from '../atoms/userAtom';

export default function Login() {
    const setAuthScreen = useSetRecoilState(authAtom)
    const [showPassword, setShowPassword] = useState(false)
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const setUser = useSetRecoilState(userAtom)
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    const handleOnChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const handleLogin = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/users/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs)
            });

            const data = await res.json();
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error,
                    status: "error",
                    duration: 3000,
                    isClosable: true
                });
            } else {
                localStorage.setItem('user-info', JSON.stringify(data));
                setUser(data);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Flex
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>

                </Stack>
                <Box
                    rounded={'lg'}

                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="user">
                            <FormLabel>Username</FormLabel>
                            <Input name='username' type="Username" onChange={handleOnChange} value={inputs.username} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input name='password' type={showPassword ? 'text' : 'password'} onChange={handleOnChange} value={inputs.password} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <BsEyeSlash size={24} /> : <BsEye size={24} />}

                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10}>

                            <Button
                                mt={5}
                                bg={'gray.500'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleLogin}
                                isLoading={loading}
                            >
                                Login
                            </Button>
                            <Box>
                                Dont have Account ?  <Link onClick={() => setAuthScreen('sign')} color={'blue.500'} >Sign Up</Link>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}