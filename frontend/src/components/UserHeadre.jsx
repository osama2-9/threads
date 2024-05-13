/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar, Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack } from "@chakra-ui/react"
import { useToast } from '@chakra-ui/toast'
import { BsInstagram, BsThreeDots } from 'react-icons/bs'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { Link } from "react-router-dom"
import { useState } from "react"
const UserHeadre = ({ user }) => {
    const logged = useRecoilValue(userAtom)
    const toast = useToast()
    console.log('logged', logged);
    const [following, setFollowing] = useState(user.followers.includes(logged?._id))
    const [update, setUpdate] = useState(false)
    const copyLink = () => {


        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                toast({ description: "Link Copied", status: "info", duration: 3000 })
            })
            .catch((error) => {
                toast({ title: "Error", description: error.message, status: "error", duration: 3000 })
            });

    }

    const handleFollow = async (e) => {
        if (!logged) {
            toast({ title: "Error", description: "Please Login To Follow", status: "error", duration: 3000 })

        }
        if (update) return
        e.preventDefault();
        try {
            setUpdate(true)
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json()
            if (data.error) {

                toast({ title: "Error", description: data.errro, status: "error", duration: 3000 })


            }
            if (following) {
                user.followers.pop()
            } else {
                user.followers.push(logged._id)
            }
            setFollowing(!following)

        } catch (error) {
            toast({ title: "Error", description: error.message, status: "error", duration: 3000 })

        } finally {
            setUpdate(false)
        }
    }

    const createConversation = async () => {
        try {
            const res = await fetch(`/api/messages/create/${user?._id}`, {
                method: "POST",
                headers: {
                    "Contect-Type": "application/json"
                },
            })
            const data = await res.json();
            console.log(data);

        } catch (error) {
            toast({ title: "Error", description: error.message, status: "error", duration: 3000 })

        }
    }
    return (
        <VStack gap={4} alignItems={'start'}>
            <Flex justifyContent={'space-between'} w={'full'}>
                <Box>
                    <Text fontSize={'2xl'} fontWeight={'bold'}>
                        {user.name}
                    </Text>
                    <Flex gap={2}>
                        <Text fontSize={'sm'}>{user.username}</Text>
                    </Flex>

                </Box>
                <Box >
                    {user.profilePic && (

                        <Avatar w={20} h={20} name={user.name} src={user.profilePic} />
                    )}
                    {!user.profilePic && (

                        <Avatar w={20} h={20} name={user.name} src='' />
                    )}
                </Box>

            </Flex>
            <Text>{user.bio}</Text>
            {logged?._id === user?._id && (
                <Link to={`/update`}>
                    <Button >
                        Update Profile
                    </Button>
                </Link>
            )}
            <Flex gap={2}>

                {logged?._id !== user?._id && (
                    <Button size={'sm'} isLoading={update} onClick={handleFollow}>
                        {following ? "Unfollow" : "Follow"}
                    </Button>
                )}
                {logged?._id !== user?._id && (
                    <Link to={'/chat'}>
                        <Button onClick={createConversation} size={'sm'} bg={'green.600'}>
                            Message
                        </Button>
                    </Link>
                )}
            </Flex>
            <Flex w={'full'} justifyContent={'space-between'} >
                <Flex gap={2} color={'gray.400'} alignItems={'center'}>
                    <Text>{user.followers ? user.followers.length : 0} Followers</Text>
                    <Box borderRadius={'50%'} bg={'gray'} w={1} mt={1} h={1}></Box>
                    <Text>instgram</Text>

                </Flex>
                <Flex gap={3} className="icon-container">
                    <Box >
                        <BsInstagram size={24} />
                    </Box>
                    <Box  >
                        <Menu >
                            <MenuButton>

                                <BsThreeDots size={24} cursor={'pointer'} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={'dark'}>
                                    <MenuItem onClick={copyLink} bg={'dark'} _hover={{
                                        bg: "gray.800"
                                    }}>Copy Profile Link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>


                </Flex>
            </Flex>
            <Flex w={'full'}>
                <Flex flex={1} borderBottom={'2px solid white'} justifyContent={'center'} pb={3} cursor={'pointer'}>
                    <Text fontWeight={'bold'}>Threads</Text>
                </Flex>
                <Flex flex={1} borderBottom={'1px solid white'} color={'gray'} justifyContent={'center'} pb={3} cursor={'pointer'}>
                    <Text fontWeight={'bold'}>Replies</Text>
                </Flex>

            </Flex>
        </VStack>
    )
}

export default UserHeadre
