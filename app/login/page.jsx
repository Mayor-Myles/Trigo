
"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useState,useEffect } from "react";
import {
  MdOutlineEmail,
  MdOutlineLock,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";
import NextLink from "next/link";
import Navbar from "@/components/navbar";
import {supabase} from "@/lib/supabaseClient";
import {useRouter} from "next/navigation";



export default function Login() {
  const [show, setShow] = useState(false);
  const bg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("orange.200", "gray.700");
  const inputBg = useColorModeValue("orange.50", "gray.700");
  const iconColor = useColorModeValue("orange.500", "orange.300");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const toast = useToast();
  const[loading,setLoading] = useState(false);
  const router = useRouter();
  const[formData,setFormData] = useState({

  email:null,
  password:null,

  });
 // const[id,setid] = useState(null);

  const updateFormData = (e,data) => {

    setFormData((prev) => ({...prev,[data]:e.target.value}));

  }

          
const handleLogin = async () => {
  setLoading(true);
  toast.closeAll();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  
  if (error) {
    toast({
      title: "Error",
      description:"Login Failed! " + error.message,
      status: "error",
      position:"top"
    });
    setLoading(false);
    return;
  }

  //get rhe id of logged innieer
const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email",formData.email)
         .single();
    
        
      if(error) { 
      console.error(error); 
      } 

   // setId(data.id);//logged in user id

}
  
fetchUser();
  
   
  setLoading(false);
  router.push("/profile");
  
};//login method
  

  
  return (

    <>
      <Navbar />
    <Flex mt={{base:"2em",md:0}} minH={{base:0,md:"100vh"}} align="center" justify="center" px={4}>
     
      <Box
        maxW="md"
        w="full"
        bg={bg}
        borderRadius="2xl"
        borderWidth="1px"
        borderColor={cardBorder}
        p={8}
        boxShadow="lg"
      >
        <Stack spacing={6}>
          {/* Header */}
          <Stack spacing={1} textAlign="center">
            <Heading size="lg">Welcome Back</Heading>
            <Text color={textColor} fontSize="sm">
              Login to continue booking your journey
            </Text>
          </Stack>

          {/* Email */}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <MdOutlineEmail size={22} color={iconColor} />
              </InputLeftElement>
              <Input
                onChange={(e)=>updateFormData(e,"email")}
                type="email"
                bg={inputBg}
                pl={12}
                height="52px"
                borderRadius="lg"
                placeholder="Enter your email"
              />
            </InputGroup>
          </FormControl>

          {/* Password */}
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <MdOutlineLock size={22} color={iconColor} />
              </InputLeftElement>
              <Input
                onChange={(e)=>updateFormData(e,"password")}
                type={show ? "text" : "password"}
                bg={inputBg}
                pl={12}
                pr={12}
                height="52px"
                borderRadius="lg"
                placeholder="Enter your password"
              />
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  aria-label="Toggle password visibility"
                  icon={show ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                  onClick={() => setShow(!show)}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {/* Login Button */}
          <Button
            isLoading={loading}
            onClick={()=>handleLogin()}
            mt={2}
            height="56px"
            borderRadius="xl"
            bg="orange.600"
            color="white"
            fontSize="lg"
            _hover={{ bg: "orange.700" }}
            _active={{ transform: "scale(0.98)" }}
          >
            Login
          </Button>

          {/* Register Link */}
          <Text textAlign="center" fontSize="sm" color={textColor}>
            New here?{" "}
            <Link
              as={NextLink}
              href="/register"
              color="orange.600"
              fontWeight="semibold"
            >
              Create an account
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
    </>
  );
}
