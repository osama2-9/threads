/* eslint-disable no-unused-vars */
import { Avatar, Box, Divider, Flex, Image, Spinner, Text, useToast } from "@chakra-ui/react"
import { BsTrash2 } from "react-icons/bs"
import Actions from "../components/Actions"
import Comment from "../components/Comment"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useGetUser from "../hooks/useGetUser"
import { formatDistanceToNow } from 'date-fns'
import { useRecoilState, useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import postsAtom from "../atoms/postsAtom"

const PostPage = () => {
  const { user, loading } = useGetUser()
  const { pid } = useParams()
  const toast = useToast()
  const [post, setPost] = useRecoilState(postsAtom)
  const logged = useRecoilValue(userAtom)
  const navigate = useNavigate()

  useEffect(() => {

    const getPosts = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`)
        const data = await res.json();
        if (data.error) {
          toast({ title: "Error", isClosable: true, description: data.error, status: "error", duration: 3000 })

        }
        setPost(data)

      } catch (error) {
        toast({ title: "Error", isClosable: true, description: error.message, status: "error", duration: 3000 })
      }
    }
    getPosts()
  }, [toast, pid, setPost])

  const handleDelete = async (e) => {
    e.preventDefault()
    if (!window.confirm('Are you sure you want to delete this post')) return
    try {
      const res = await fetch('/api/posts/' + post._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
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
      setPost(data)
      navigate(`/${user.username}`)

    } catch (error) {
      toast({ title: "Error", isClosable: true, description: error.message, status: "error", duration: 3000 })
    }
  }

  if (!user && loading) {
    return (
      <Flex>
        <Spinner size={'xl'} />
      </Flex>
    )
  }
  if (!user) return null
  if (!post) return null
  return (
    <>
      <Flex>
        <Flex w={'full'} alignItems={'center'} gap={3}>

          <Avatar src={user?.profilePic} size={'md'} name={user?.name} />

          <Flex>
            <Text fontSize={'sm'} fontWeight={'bold'} >{user?.username}</Text>
            <Image src="/verified.png" w={4} h={4} ml={4} mt={1} />


          </Flex>
        </Flex>
        <Flex gap={4} alignItems={'center'}>
          {/* <Text fontSize={'xs'} textAlign={'right'} w={'100px'} color={'gray'}>{formatDistanceToNow(new Date(post?.createdAt))} </Text> */}
          {logged?.uid === user?._id && (
            <BsTrash2 className="transition-all size-5 hover:text-pink-900" onClick={handleDelete} />


          )}

        </Flex>
      </Flex>

      <Text mt={4}>{post?.text}</Text>
      <Box mt={2} w={'full'} borderRadius={6} overflow={'hidden'} >
        {post.img && (

          <Image src={post?.img} w={'full'} />


        )}
        {!post.img && (
          <></>
        )}

      </Box>

      <Flex gap={4} my={3}>
        <Actions post={post} />
      </Flex>


      <Divider my={4} />
      {post?.replies.map((rep, index) => (
        <Comment
          key={rep._id}
          replay={rep}
          lastReplay={index === post.replies.length - 1}
        />
      ))}

    </>
  )
}

export default PostPage
