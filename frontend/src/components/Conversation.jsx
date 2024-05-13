/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, AvatarBadge, Flex, Image, Stack, Text, WrapItem, useColorMode } from "@chakra-ui/react"
import { useRecoilState, useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import { RiCheckDoubleLine } from "react-icons/ri";
import { selectedConversationAtom } from "../atoms/messagesAtom";

const Conversation = ({ conversation }) => {
    const user = conversation?.participants[0];
    const lastMessage = conversation?.lastMessage;
    const logged = useRecoilValue(userAtom);
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);

    return (
        <Flex
            gap={4}
            alignItems={'center'}
            p={1}
            className="hover:cursor-pointer hover:bg-zinc-900 transition-all"
            borderRadius={'md'}
            onClick={() => setSelectedConversation({
                _id: conversation._id,
                userId: user._id,
                userProfilePic: user.ProfilePic,
                username: user.username,
                mock: conversation.mock
            })}
        >
            <WrapItem>
                <Avatar
                    size={{
                        base: "xs",
                        sm: "sm",
                        md: "md"
                    }}
                    src={user.profilePic}
                    name={user.username}
                >
                    <AvatarBadge boxSize={'12px'} bg={'green.500'} />
                </Avatar>
            </WrapItem>

            <Stack direction={'column'} fontSize={'sm'} >
                <Text fontWeight={'700'} display={'flex'} alignItems={'center'}>
                    {user.username}
                    <Image src='/verified.png' w={4} h={4} ml={1} />
                </Text>
                <Text fontSize={'xs'} display={'flex'} alignItems={'center'} gap={1}>
                    {logged._id === lastMessage?.sender ? <RiCheckDoubleLine /> : ""}
                    {lastMessage?.text.length > 18 ? lastMessage?.text.substring(0, 18) + " .." : lastMessage?.text}
                </Text>
            </Stack>
        </Flex>
    )
}

export default Conversation;
