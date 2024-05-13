/* eslint-disable no-unused-vars */
import { Flex, Spinner, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Post from "../components/Post";

const HomePage = () => {
  const toast = useToast()
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const getFeedPosts = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/posts/feed')
        const data = await res.json()
        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            duration: 3000,
            status: "error",
            isClosable: true
          })
        }
        setPosts(data)



      } catch (error) {
        // toast({ title: "Error", isClosable: true, description: error.message, status: "error", duration: 3000 })


      } finally {
        setLoading(false)
      }
    }

    getFeedPosts()
  }, [toast])
  return (
    <>

      {
        !loading && posts.length === 0 && (
          <h1>Follow Some Users To see Posts</h1>
        )
      }
      {
        loading && (
          <Flex justify={'center'}>
            <Spinner size={'xl'} />
          </Flex>

        )
      }

     {posts.map((post) => (
        <Post key={post._id} post={post} postBy={post.postBy} />
      ))}

    </>
  )
}

export default HomePage
