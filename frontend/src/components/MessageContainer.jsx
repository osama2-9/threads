/* eslint-disable no-unused-vars */
import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useToast } from "@chakra-ui/react"
import Message from "./Message"
import MessageInput from "./MessageInput"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { selectedConversationAtom } from "../atoms/messagesAtom"
import userAtom from "../atoms/userAtom"

const MessageContainer = () => {
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom)
    const [loadingMessages, setLoadingMessaegs] = useState(true)
    const [messages, setMessages] = useState([])
    const toast = useToast()
    const logged = useRecoilValue(userAtom)
    useEffect(() => {
        const getMessages = async () => {
            try {
                setLoadingMessaegs(true)
                setMessages([])
                if (selectedConversation.mock) return;
                const res = await fetch(`/api/messages/${selectedConversation.userId}`)
                const data = await res.json()
                if (data.error) {
                    toast({
                        title: "error",
                        description: data.error,
                        duration: 3000,
                        isClosable: true,
                        status: "error"
                    })
                }
                setMessages(data)

            } catch (error) {
                // toast({
                //     title: "error",
                //     description: error.message,
                //     duration: 3000,
                //     isClosable: true,
                //     status: "error"
                // })
            } finally {
                setLoadingMessaegs(false)
            }

        }
        getMessages()
    }, [toast, selectedConversation.userId, selectedConversation.mock])
    return (
        <Flex p={2} ml={2} gap={2} flex={70} px={1} borderRadius={'md'} flexDir={'column'}>

            <Flex w={'full'} h={12} alignItems={'center'} gap={2}>
                <Avatar src={selectedConversation?.userProfilePic} name={selectedConversation.username} size={'sm'} />
                <Text display={'flex'} alignItems={'center'}>
                    {selectedConversation?.username}

                    <Image src="/verified.png" w={4} h={4} ml={1} />
                </Text>

            </Flex>
            <Divider />
            <Flex flexDir={'column'} gap={4} my={4} h={'400px'} overflowY={'auto'}>

                {loadingMessages &&
                    (
                        [0, 1, 2].map((_, i) => (
                            <Flex key={i} gap={2} alignItems={'center'} p={1} borderRadius={'md'} alignSelf={i % 2 === 0 ? 'flex-start' : "flex-end"}>
                                {i % 2 === 0 && <SkeletonCircle size={7} />}

                                <Flex flexDir={'column'}>
                                    <Skeleton h={'8px'} w={'200px'} />
                                    <Skeleton h={'8px'} w={'200px'} />
                                    <Skeleton h={'8px'} w={'200px'} />
                                </Flex>
                                {i % 2 !== 0 && <SkeletonCircle size={7} />}
                            </Flex>
                        ))
                    )}
                {!loadingMessages && messages.map((m) => (

                    <Message key={m._id} ownMessage={logged._id === m.sender} message={m} />
                ))}


            </Flex>

            <MessageInput setMessages={setMessages} />


        </Flex>
    )
}

export default MessageContainer
