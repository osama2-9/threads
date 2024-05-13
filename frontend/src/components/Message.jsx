/* eslint-disable react/prop-types */
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";

const Message = ({ ownMessage, message }) => {
    const selectedConversation = useRecoilValue(selectedConversationAtom)
    const logged = useRecoilValue(userAtom)
    return (
        <>
            {ownMessage ? (
                <Flex ps={1} gap={2} alignSelf={"flex-end"}>
                    <Text maxW={"350px"} className="bg-green-800" borderRadius={'md'} p={1}>
                        {message?.text}
                    </Text>
                    <Avatar name={logged.username} src={logged.profilePic} w={7} h={7} />
                </Flex>
            ) : (
                <Flex pe={1} gap={2} >
                    <Avatar src={selectedConversation.userProfilePic} w={7} h={7} />
                    <Text maxW={"350px"} className="bg-slate-500" borderRadius={'md'} p={1}>
                        {message?.text}
                    </Text>
                </Flex>
            )}
        </>
    );
};

export default Message;
