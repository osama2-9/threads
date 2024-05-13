/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import UserHeadre from "../components/UserHeadre"
import { useParams } from "react-router-dom"
import { Flex, Spinner, useToast } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import Post from "../components/Post"
import useGetUser from "../hooks/useGetUser"

const UserPage = () => {
    const { user, loading } = useGetUser()
    const toast = useToast()
    const { username } = useParams()
    const [posts, setPosts] = useState([])
    const [fetchingPosts, setFetchingPosts] = useState(true)

    useEffect(() => {

        const getPosts = async () => {
            setFetchingPosts(true)
            try {
                const res = await fetch(`/api/posts/user/${username}`)
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                toast({ title: "Error", isClosable: true, description: error.message, status: "error", duration: 3000 })
                setPosts([])
            } finally {
                setFetchingPosts(false)
            }

        }



        getPosts()
    }, [username, toast])

    if (!user && loading) {
        return (
            <Flex justifyContent={'center'}>
                <Spinner size={'xl'} />

            </Flex>
        )
    }
    if (!user && !loading) {
        return (
            <h1 className="text-center" >User Not Found</h1>
        )
    }

    return (
        <>
            {user && (
                <UserHeadre user={user} />
            )}
            {!fetchingPosts && posts.length === 0 && <h1>User has not posts</h1>}
            {fetchingPosts && (
                <Flex justifyContent={'center'} my={12}>
                    <Spinner size={'xl'} />

                </Flex>
            )}
            {posts.map((post) => (
                <Post key={post._id} post={post} postBy={post.postBy} setPosts={setPosts} />
            ))}
        </>
    )
}

export default UserPage
