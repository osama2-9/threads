/* eslint-disable react/prop-types */
import { Avatar, Divider, Flex, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
// import { formatDistanceToNow } from 'date-fns'

const Comment = ({ replay, lastReplay }) => {
    return (
        <>
            <Flex gap={4} py={2} my={2} w={'full'}>
                <Avatar src={replay.userProfilePic} name={replay.username} size={'sm'} />
                <Flex gap={1} w={'full'} flexDir={'column'}>
                    <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'}>
                        <Text fontSize={'sm'} fontWeight={'bold'}>{replay?.username}</Text>
                        <Flex gap={2} alignItems={'center'}>
                            <Text >
                                {/* {formatDistanceToNow(new Date(replay.createdAt))} */}
                            </Text>
                            <BsThreeDots />
                        </Flex>
                    </Flex>
                    <Text>{replay?.text}</Text>
                </Flex>

            </Flex>
            {!lastReplay && <Divider my={4} />}


        </>
    )
}

export default Comment
