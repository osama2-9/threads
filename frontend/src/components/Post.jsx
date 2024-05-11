/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, Box, Flex, Image, Text, useToast } from "@chakra-ui/react"
import { BsTrash2 } from "react-icons/bs"
import Actions from "./Actions"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { formatDistanceToNow } from 'date-fns'
import { useRecoilState, useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import postsAtom from "../atoms/postsAtom"

const Post = ({ post, postBy }) => {

    const toast = useToast();
    const nav = useNavigate();
    const logged = useRecoilValue(userAtom)
    const [posts, setPosts] = useRecoilState(postsAtom)


    const [user, setUser] = useState(null)
    useEffect(() => {
        const getUser = async () => {
            try {

                const res = await fetch(`/api/users/profile/` + postBy)
                const data = await res.json();
                if (data.error) {
                    toast({ title: "Error", isClosable: true, description: data.error, status: "error", duration: 3000 })

                }
                console.log(data);
                setUser(data)

            } catch (error) {
                toast({ title: "Error", isClosable: true, description: error.message, status: "error", duration: 3000 })
                setUser(null)
            }
        }
        getUser()
    }, [postBy, toast])


    const handleDelete = async (e) => {
        e.preventDefault()
        if (!window.confirm('Are you sure you want to delete this post')) return
        try {
            const res = await fetch('/api/posts/' + post._id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "appliaction/json"
                }
            })
            const data = await res.json()
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error,
                    status: "error",
                    duration: 3000,
                    isClosable: true
                })
                return;
            }
            toast({
                title: "Deleted",
                description: "Post Deleted",
                duration: 3000,
                status: "success",
                isClosable: true

            })
            setPosts((prev) => prev.filter((p) => p._id !== post._id))
        } catch (error) {
            toast({ title: "Error", isClosable: true, description: error.message, status: "error", duration: 3000 })

        }
    }

    return (
        <Flex gap={3} mb={4} py={5}>
            <Flex flexDirection={'column'} alignItems={'center'}>
                <Avatar cursor={'pointer'} title="go to user profile" onClick={(e) => {
                    e.preventDefault()
                    nav(`/${user.username}`)
                }} size={'md'} name={user?.name} src={user?.profilePic} />
                <Box w={.5} h={'full'} bg={'gray'} my={2}></Box>
                <Box position={'relative'} w={'full'}>
                    {post.replies[0] && (

                        <Avatar src={post.replies[0].userProfilePic}
                            position={'absolute'}
                            top={'-5px'}
                            name={post.replies[0].username}

                            left={'14px'}
                            padding={'2px'}
                            size={'xs'} />

                    )}
                    {post.replies[1] && (

                        <Avatar src={post.replies[1].userProfilePic}
                            position={'absolute'}
                            top={'-5px'}
                            name={post.replies[1].username}
                            left={'14px'}
                            padding={'2px'}
                            size={'xs'} />

                    )}
                    {post.replies[2] && (

                        <Avatar src={post.replies[2].userProfilePic}
                            position={'absolute'}
                            top={'-5px'}
                            name={post.replies[2].username}
                            left={'14px'}
                            padding={'2px'}
                            size={'xs'} />

                    )}
                </Box>
            </Flex>
            <Flex flex={1} flexDirection={'column'} gap={2}>
                <Flex justifyContent={'space-between'} w={'full'}>
                    <Flex w={'full'} alignItems={'center'}>
                        <Text cursor={'pointer'} fontSize={'sm'} onClick={(e) => {
                            e.preventDefault()
                            nav(`/${user.username}`)
                        }
                        }
                            fontWeight={'bold'}>{user?.username}
                        </Text>
                        <Image src="verified.png" w={4} ml={2} />
                    </Flex>
                    <Flex gap={4} alignItems={'center'}>
                        <Text fontSize={'xs'} textAlign={'right'} w={'100px'} color={'gray'}>{formatDistanceToNow(new Date(post.createdAt))} </Text>
                        {logged?._id === user?._id && (
                            <BsTrash2 className="transition-all size-5 hover:text-pink-900" onClick={handleDelete} />


                        )}

                    </Flex>
                </Flex>

                <Box cursor={'pointer'} onClick={() => {
                    window.location.href = `/${user?.username}/post/${post?._id}`
                }}>
                    <Text mb={2} ml={.5}>{post.text}</Text>
                    {post.img && (
                        <Box w={'full'} borderRadius={6} overflow={'hidden'} border={'1px solid gray'}>
                            <Image src={post.img} />
                        </Box>
                    )}
                </Box>




                <Actions post={post} />




            </Flex>
        </Flex>
    )

}

export default Post
