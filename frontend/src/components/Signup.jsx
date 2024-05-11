/* eslint-disable no-unused-vars */
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    Link,
    Toast,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import authAtom from '../atoms/authAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';


export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const setUser = useSetRecoilState(userAtom)
    const setAuthScreen = useSetRecoilState(authAtom)
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({

        name: "",
        username: "",
        email: "",
        password: ""
    })

    const handleOnChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const toast = useToast()

    const handleSignup = async () => {
        try {
            setLoading(true)

            const res = await fetch('/api/users/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs)

            })
            const data = await res.json();
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error,
                    status: "error",
                    duration: 3000,
                    isClosable: true

                })
                console.log(data.error, data);
                return
            }

            toast({
                title: "Signup"
            })
            localStorage.setItem('user-info', JSON.stringify(data))
            setUser(data)



        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true

            })

            console.log(error);

        } finally {
            setLoading(false)
        }
    }

    return (
        <Flex

            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up Here
                    </Heading>

                </Stack>
                <Box
                    rounded={'lg'}

                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>Fullname</FormLabel>
                                    <Input type="text" name='name' onChange={handleOnChange} value={inputs.name} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl isRequired id="lastName">
                                    <FormLabel>Username</FormLabel>
                                    <Input type="text" name='username' onChange={handleOnChange} value={inputs.username} />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" name='email' onChange={handleOnChange} value={inputs.email} />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} name='password' onChange={handleOnChange} value={inputs.password} />
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
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'gray.500'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',

                                }}
                                isLoading={loading}
                                onClick={handleSignup}>

                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link onClick={() => setAuthScreen('login')} color={'blue.400'}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}