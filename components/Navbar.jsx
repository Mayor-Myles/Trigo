// components/Navbar.jsx
import { Flex, Text, Button, HStack, IconButton,useColorMode } from "@chakra-ui/react";
import { CiLight, CiDark } from "react-icons/ci";
  import Link from "next/link";
import {useState} from "react";
import {userDataAtom} from "@/utils/atom";
import {useAtom} from "jotai";



const Navbar = () => {
const {colorMode,toggleColorMode} = useColorMode();
  const [loading,setLoading1] = useState(false);
 const [loading2,setLoading2] = useState(false);
 const setters = [setLoading1,setLoading2];
const[isUser,setIsUser] = useAtom(userDataAtom);
  const  load = (type) => {

  const setLoading = setters[type];
  setLoading(true)
  
setTimeout(()=>{setLoading(false)}, 1500);

  }

   return (
    <Flex
      px={6}
      py={4}
      align="center"
      justify="space-between"
      bg={colorMode=="light" ? "white" : "black"}
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Text fontFamily="'Georgia',serif" fontSize="2xl" fontWeight="bold" color="brand.500">
        Tri<Text color="#0096FF" as="span">go</Text>
      </Text>

      <HStack spacing={4}>
        
        <IconButton
      onClick={toggleColorMode}
      icon={colorMode=="light" ? <CiDark fontSize="25px" /> : <CiLight fontSize="25px" /> }
      aria-label="Toggle Color Mode"
    />
        <Button display={isUser && "none"} onClick={()=>load(0)} isLoading={loading} as={Link} href="/login" variant="ghost">Login</Button>
        <Button display={isUser && "none"} onClick={()=>load(1)} isLoading={loading2} as={Link} href="/register" colorScheme="blue">Get Started</Button>
      </HStack>

      
    </Flex>
  );
};

export default Navbar;

