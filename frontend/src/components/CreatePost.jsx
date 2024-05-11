/* eslint-disable no-unused-vars */
import { Button, CloseButton, Flex, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import React, { useRef, useState } from "react"
import { BsFillImageFill, BsImageFill, BsPlus, BsX } from "react-icons/bs"
import usePreviewImg from "../hooks/usePreviewImg"
import { useRecoilState, useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import postsAtom from "../atoms/postsAtom"
import { useParams } from "react-router-dom"
const CreatePost = () => {
    const MAX = 500
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg()
    const file = useRef();
    const toast = useToast()
    const [postText, setPostText] = useState("");
    const [remainingChar, setRemainingChar] = useState(MAX);
    const user = useRecoilValue(userAtom)
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useRecoilState(postsAtom)
const {username} = useParams()

    const handleTextChange = (e) => {
        const inputText = e.target.value;

        if (inputText.length > MAX) {
            const truncatedText = inputText.slice(0, MAX);
            setPostText(truncatedText);
            setRemainingChar(0);
        } else {
            setPostText(inputText);
            setRemainingChar(MAX - inputText.length);
        }
    };

    const handleCreatePost = async (e) => {
        try {
            setLoading(true);
            const res = await fetch('/api/posts/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ postBy: user._id, text: postText, img: imgUrl || null })
            });

            const data = await res.json();
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error,
                    status: "error",
                    duration: 3000,
                    isClosable: true
                });
                return;
            }
            if (username === user.username) {

                setPost([data, ...post])
            }
            onClose();
            setImgUrl('')
            setPostText('')
            toast({
                title: "Posted",
                description: "New Post Added",
                status: "success",
                duration: 3000,
                isClosable: true
            })
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <Button
                position={'fixed'}
                bottom={'10px'}
                right={'10px'}
                title="add post"
                onClick={onOpen}
                w={'20px'}
                rounded={'full'}

                leftIcon={<BsPlus size={30} className="ml-3" />}
            >

            </Button>

            <Modal

                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Post Content</FormLabel>
                            <Textarea onChange={handleTextChange} value={postText} placeholder='...' />
                            <Text fontSize={'xs'} fontWeight={'bold'} textAlign={'right'} color={'white'}>
                                {remainingChar}/{MAX}
                            </Text>
                            <Input type="file" hidden ref={file} onChange={handleImageChange} />

                            <BsFillImageFill
                                style={{ marginLeft: "5px", cursor: "pointer" }}
                                size={16}
                                onClick={() => file.current.click()}
                                title="Add Img"

                            />



                        </FormControl>
                        {imgUrl && (
                            <Flex mt={5} w={'full'} position={'relative'}>
                                <Image src={imgUrl} alt="selected img" />
                                <CloseButton onClick={() => setImgUrl("")}
                                    title="remove img" position={'absolute'} />
                            </Flex>

                        )}


                    </ModalBody>


                    <ModalFooter>
                        <Button colorScheme='blue' isLoading={loading} onClick={handleCreatePost} mr={3}>
                            Post
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export default CreatePost
