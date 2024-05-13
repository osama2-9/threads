/* eslint-disable react/prop-types */
import { Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5"
import { 
     useRecoilValue, useSetRecoilState } from "recoil";
import { conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom";

const MessageInput = ({ setMessages }) => {
    const toast = useToast();
    const [messageT, setMessageT] = useState('')
    const selectedConversation = useRecoilValue(selectedConversationAtom)
    const setConversations = useSetRecoilState(conversationsAtom)
    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!messageT) return
        try {

            const res = await fetch('/api/messages/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: messageT,
                    recipientId: selectedConversation.userId
                })
            })
            const data = await res.json();
            if (data.error) {
                toast({
                    title: "error",
                    description: data.error,
                    duration: 3000,
                    isClosable: true,
                    status: "error"
                })
            }
            setMessages((message) => [...message, data])
            setConversations((prevConversation) => {
                const updatedConversation = prevConversation.map((conv) => {
                    if (conv._id === selectedConversation._id) {
                        return {
                            ...conv,
                            lasMessage: {
                                text: messageT,
                                sender: data.sender
                            }
                        }
                    }
                    return conv;
                })
                return updatedConversation;
            })
            setMessageT('')

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
        <form onSubmit={handleSendMessage}>
            <InputGroup>
                <Input w={'full'} placeholder="message here" value={messageT} onChange={(e) => setMessageT(e.target.value)} />
                <InputRightElement onClick={handleSendMessage} cursor={'pointer'}>
                    <IoSendSharp className="text-green-500" />
                </InputRightElement>
            </InputGroup>

        </form>
    )
}

export default MessageInput
