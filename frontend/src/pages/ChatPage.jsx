/* eslint-disable no-unused-vars */
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useToast } from "@chakra-ui/react"
import { BsSearch } from "react-icons/bs"
import Conversation from "../components/Conversation"
import { GiConversation } from 'react-icons/gi'
import MessageContainer from "../components/MessageContainer"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom"
import userAtom from "../atoms/userAtom"

const ChatPage = () => {
    const [loadingConversations, setLoadingConvsersations] = useState(true)
    const toast = useToast()
    const [conversations, setConvsersations] = useRecoilState(conversationsAtom)
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom)
    const [search, setSearch] = useState('')
    const logged = useRecoilValue(userAtom);
<<<<<<< HEAD

=======
>>>>>>> 3d42c722071015894576ba73030903782d27a3d4
    useEffect(() => {
        const getConversations = async () => {
            try {
                setLoadingConvsersations(true)

                const res = await fetch('/api/messages/conversations')
                const data = await res.json()
                if (data.error) {
                    toast({
                        title: "error",
                        description: data.error,
                        duration: 3000,
                        status: "error",
                        isClosable: true
                    })
                }
                console.log(data);
                setConvsersations(data)

            } catch (error) {
                toast({
                    title: "error",
                    description: error.message,
                    duration: 3000,
                    status: "error",
                    isClosable: true
                })
            } finally {
                setLoadingConvsersations(false)
            }
        }
        getConversations()
    }, [toast, setConvsersations])

    const handleConversationSearch = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`/api/users/profile/${search}`)
            const data = await res.json()
            if (data.error) {
                toast({
                    title: "error",
                    description: data.error,
                    duration: 3000,
                    isClosable: true,
                    status: "error"

                })
                return;
            }
            const selfMessage = logged._id === data._id
            if (selfMessage) {
                toast({
                    position: "bottom-left",
                    title: "Error",
                    description: "Cannot Message Here",
                    duration: 3000,
                    status: "error",
                    isClosable: true


                })
            }
            const conversationExsist = conversations.find(conversation => conversation.participants[0]._id === data._id)
            if (conversationExsist) {
                setSelectedConversation({
                    _id: conversationExsist._id,
                    userId: data._id,
                    username: data.username,
                    userProfilePic: data.ProfilePic
                })
            }
            const mockConversation = {
                mock: true,
                lastMessage: {
                    text: "",
                    sender: ""
                },
                _id: Date.now(),
                username: search.username,
                profilePic: search.profilePic
            }
            setConvsersations((prev) => [...prev, mockConversation])

        } catch (error) {
            toast({
                title: "error",
                description: error.message,
                duration: 3000,
                isClosable: true,
                status: "error"
            })
        }
    }
    return (
        <Box position={'absolute'} left={'50%'} w={{
            lg: "750px",
            md: "80%",
            base: "100%"
        }} transform={'translate(-50%)'}
            p={4}
        >
            <Flex
                gap={4}
                flexDirection={{
                    base: "column",
                    md: "row",
                }}
                maxW={{
                    sm: "400px",
                    md: "100%"
                }}
                mx={'auto'}
            >
                <Flex flex={30} gap={2} flexDir={'column'} maxW={{
                    sm: "250px",
                    md: "full"
                }}
                    mx={'auto'}
                >
                    <Text fontWeight={'700'} className="text-sky-100" >Conversations</Text>
                    <form onSubmit={handleConversationSearch}>
                        <Flex alignItems={'center'} gap={2}>
                            <Input placeholder="search for user" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <Button onClick={handleConversationSearch} size={'sm'} ><BsSearch /></Button>
                        </Flex>
                    </form>
                    {loadingConversations && (
                        [1, 2, 3].map((_, i) => (
                            <Flex key={i} gap={4} alignItems={'center'} p={'1'} borderRadius={'md'}>
                                <Box>
                                    <SkeletonCircle size={10} />
                                </Box>
                                <Flex flexDirection={'column'} w={'full'} gap={3}>
                                    <Skeleton h={'10px'} w={'80px'} />
                                    <Skeleton h={'8px'} w={'90%'} />
                                </Flex>
                            </Flex>
                        ))
                    )}
                    {!loadingConversations && (
                        conversations.map((c) => (

                            <Conversation key={c?._id} conversation={c} />
                        ))
                    )}
                    {!selectedConversation._id && (
                        <Flex
                            flex={70}
                            borderRadius={'md'}
                            p={2}
                            flexDir={'column'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            height={'400px'}
                        >
                            <GiConversation size={100} />
                            <Text fontSize={12}>Selecte Conversation</Text>



                        </Flex>

                    )}
                </Flex>
                {selectedConversation ? <MessageContainer /> : ""}





            </Flex>
        </Box>
    )
}

export default ChatPage
