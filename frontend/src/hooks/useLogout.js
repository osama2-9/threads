import { useToast } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const toast = useToast();
  const setUser = useSetRecoilState(userAtom);
  const nav = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      localStorage.removeItem("user-info");
      setUser(null);
      nav("/auth");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return { handleLogout };
};

export default useLogout;
