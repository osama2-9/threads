/* eslint-disable no-unused-vars */
import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Avatar, AvatarBadge, IconButton, Center, useToast } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import usePreviewImg from '../hooks/usePreviewImg'

export default function UpdateProfile() {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useRecoilState(userAtom)
    const { handleImageChange, imgUrl } = usePreviewImg()
    const toast = useToast()

    const [inputs, setInputs] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profilePic: user.profilePic,
    })

    const handleOnChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const file = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await fetch(`/api/users/update/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({ ...inputs, profilePic: imgUrl })
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
            }
            toast({

            })

            setUser(data)
            toast({
                title: "Updated !",
                description: "Profile Updated Successfully",
                status: "success",
                duration: 3000,
                isClosable: true


            })



        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true

            })

        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <Flex
                align={'center'}
                justify={'center'}
            >
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={12}>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                        User Profile Edit
                    </Heading>
                    <FormControl id="userName">
                        <FormLabel>User Avatar</FormLabel>
                        <Stack direction={['column', 'row']} spacing={6}>
                            <Center>
                                <Avatar size="xl" src={imgUrl || inputs.profilePic}>
                                    <AvatarBadge
                                        as={IconButton}
                                        size="sm"
                                        rounded="full"
                                        top="-10px"
                                        colorScheme="red"
                                        aria-label="remove Image"
                                    />
                                </Avatar>
                            </Center>
                            <Center w="full">
                                <Button onClick={() => file.current.click()} w="full">Change Avatar</Button>
                                <Input name='profilePic' hidden type='file' ref={file} onChange={handleImageChange} />
                            </Center>
                        </Stack>
                    </FormControl>
                    <FormControl id="Fullname" >
                        <FormLabel>Full name</FormLabel>
                        <Input
                            name='name'
                            onChange={handleOnChange}
                            value={inputs.name}
                            placeholder="ex: Osama Alsrraj"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                        />
                    </FormControl>
                    <FormControl id="userName" >
                        <FormLabel>Username</FormLabel>
                        <Input
                            name='username'
                            value={inputs.username}
                            onChange={handleOnChange}
                            placeholder="Username"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                        />
                    </FormControl>
                    <FormControl id="email" >
                        <FormLabel>Email address</FormLabel>
                        <Input
                            name='email'
                            value={inputs.email}
                            onChange={handleOnChange}
                            placeholder="your-email@example.com"
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                        />
                    </FormControl>
                    <FormControl id="bio" >
                        <FormLabel>Bio</FormLabel>
                        <Input
                            name='bio'
                            onChange={handleOnChange}
                            value={inputs.bio}
                            placeholder="Bio"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                        />
                    </FormControl>
                    <Stack spacing={6} direction={['column', 'row']}>
                        <Button
                            bg={'red.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'red.600',
                            }}>
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            bg={'green.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'green.600',
                            }}
                            onClick={handleSubmit}
                            isLoading={loading}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    )
}
