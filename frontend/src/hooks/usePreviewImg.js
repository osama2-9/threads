import { useState } from "react";
import { useToast } from "@chakra-ui/react";

const usePreviewImg = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const toast = useToast();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Error",
        description: "File Must Be png,jpg,...",
        duration: 3000,
        isClosable: true,
        status: "error",
      });
      setImgUrl(null);
    }
  };
  return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImg;
