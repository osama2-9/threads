import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useGetUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const { username } = useParams();
  const toast = useToast();

  useEffect(() => {
    setLoading(true)
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          toast({
            title: "Error",
            isClosable: true,
            description: data.error,
            status: "error",
            duration: 3000,
          });
        } else {
          setUser(data);
        }
      } catch (error) {
        toast({
          title: "Error",
          isClosable: true,
          description: error.message,
          status: "error",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username, toast]);
  return {loading ,user};
};

export default useGetUser;
