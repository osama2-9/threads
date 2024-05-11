/* eslint-disable react/prop-types */
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react"
import { BsTrash2 } from "react-icons/bs"
import Actions from "./Actions"

const UserPost = ({ post }) => {
    return (
        <Flex gap={3} mb={4} py={5}>
            <Flex flexDirection={'column'} alignItems={'center'}>
                <Avatar size={'md'} name="osama alsrraj" src="/zuck-avatar.png" />
                <Box w={.5} h={'full'} bg={'gray'} my={2}></Box>
                <Box position={'relative'} w={'full'}>
                    <Avatar src="https://bit.io/broken-link"
                        position={'absolute'}
                        top={'-5px'}
                        left={'14px'}
                        padding={'2px'}
                        size={'xs'} />
                    <Avatar src="https://bit.io/broken-link"
                        position={'absolute'}
                        bottom={'2px'}
                        right={'-4px'}
                        padding={'2px'}
                        size={'xs'} />
                    <Avatar src="https://bit.io/broken-link"
                        position={'absolute'}
                        bottom={'2px'}
                        left={'-2px'}
                        padding={'2px'}
                        size={'xs'} />
                </Box>
            </Flex>
            <Flex flex={1} flexDirection={'column'} gap={2}>
                <Flex justifyContent={'space-between'} w={'full'}>
                    <Flex w={'full'} alignItems={'center'}>
                        <Text fontSize={'sm'} fontWeight={'bold'}> osama</Text>
                        <Image src="verified.png" w={4} ml={2} />
                    </Flex>
                    <Flex gap={4} alignItems={'center'}>
                        <Text fontSize={'sm'} color={'gray'}>1d</Text>
                        <BsTrash2 className="transition-all size-5 hover:text-pink-900" />


                    </Flex>
                </Flex>


                <Box cursor={'pointer'} onClick={() => {
                    window.location.href = `/osama/post/4`
                }}>

                    <Text></Text>
                    {true && (

                        <Box w={'full'} borderRadius={6} overflow={'hidden'} border={'1px solid gray'}>
                            <Image src={''} />

                        </Box>
                    )}
                </Box>
                <Actions post={post} />




            </Flex>
        </Flex>
    )
}

export default UserPost
