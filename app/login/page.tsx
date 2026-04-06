"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  InputGroup,
  InputRightElement,
  Icon,
  useToast,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowBackIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import NextLink from "next/link";
import Navbar from "@/components/Navbar";
import api from "@/utils/axios";



const Login = () => {

  const [loading,setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const url = "/user/login";
  const toast = useToast();
  const[phone,setPhone] = useState("");
  const[password,setPassword] = useState("");
  const[role,setRole] = useState("");
  const submit = async () => {

    setLoading(true);

    try{
      
const res = await api.post(url,
            {

              phone:phone,
              password:password,
              role:role,

            });

      

    if(res.data.status){
    toast.closeAll();
      
      toast(
        {
        title: "Info",
        description: res.data.message,
        position:"top",
        duration: 3000,
          status:response.status,

    });

      //save jwt
      localStorage.setItem("jwt",response.token);

    }}//try
      
      catch(error){

toast(
        {
        title: "Info",
        description: "Something went wrong",
        position:"top",
        duration: 3000,
          status:"error",

    });

    }finally{

      setLoading(false);

    }

   }//submit 
  
  return (
    <>
    <Navbar />
    <Flex my={[4,1]} minH={["0vh","100vh"]} bg={bg} align="center" justify="center" px={4}>
      
      <Box w="100%" maxW="420px">
        
        {/* Back */}
        <ChakraLink
          as={NextLink}
          href="/"
          display="flex"
          alignItems="center"
          mb={6}
          color="gray.500"
          _hover={{ color: "blue.500" }}
        >
          <ArrowBackIcon mr={2} />
          Back to home
        </ChakraLink>

        {/* Card */}
        <Box
          bg={cardBg}
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          boxShadow="lg"
        >
          
          {/* Logo */}
          <Flex align="center" mb={6}>
            <Box
              bgGradient="linear(to-r, blue.400, blue.600)"
              p={3}
              borderRadius="xl"
              mr={3}
            >
         🛺
            </Box>

            <Heading size="md">
              Tri<Text as="span" color="blue.500">go</Text>
            </Heading>
          </Flex>

          {/* Heading */}
          <Heading size="lg" mb={2}>
            Welcome back
          </Heading>

          <Text color="gray.500" mb={6}>
  No account yet?{" "}
  <ChakraLink as={NextLink} href="/signup" color="blue.500">
    Create one
  </ChakraLink>
</Text>

          
{/* Role Selector */}
<Box
  bg={useColorModeValue("gray.100", "gray.700")}
  borderRadius="2xl"
  p={1}
  mb={6}
>
  <Flex gap="3">
    <Button
      flex={1}
      size="md"
      borderRadius="xl"
      bg={role === "business" ? "white" : "transparent"}
      color={role === "business" ? "blue.500" : "gray.500"}
      fontWeight={role === "business" ? "bold" : "medium"}
      boxShadow={role === "business" ? "sm" : "none"}
      leftIcon={<span>📦</span>}
      onClick={() => setRole("business")}
      _hover={{ bg: role === "business" ? "white" : "gray.200" }}
    >
      Business Owner 
    </Button>
    <Button
      
      flex={1}
      size="md"
      borderRadius="xl"
      bg={role === "rider" ? "white" : "transparent"}
      color={role === "rider" ? "blue.500" : "gray.500"}
      fontWeight={role === "rider" ? "bold" : "medium"}
      boxShadow={role === "rider" ? "sm" : "none"}
      leftIcon={<span>🛺</span>}
      onClick={() => setRole("rider")}
      _hover={{ bg: role === "rider" ? "white" : "gray.200" }}
    >
      Tricycle Rider
    </Button>
  </Flex>
</Box>
          {/* Form */}
          <VStack spacing={4}>
            
            {/* Phone number */}
            <Box w="100%">
              <Text mb={2} fontWeight="medium">
                Phone Number
              </Text>
              <Input
                
                onChange={(e)=> {setPhone(e.target.value)}}
                placeholder="e.g 07014443254"
                size="lg"
                borderRadius="lg"
              />
            </Box>

            {/* Password */}
            <Box w="100%">
              <Text mb={2} fontWeight="medium">
                Password
              </Text>
              <InputGroup size="lg">
                <Input
                  
                  onChange={(e)=> {setPassword(e.target.value)}}
                  type={show ? "text" : "password"}
                  placeholder="Your password"
                  borderRadius="lg"
                />
                <InputRightElement>
                  <Icon
                    as={show ? ViewOffIcon : ViewIcon}
                    cursor="pointer"
                    onClick={() => setShow(!show)}
                  />
                </InputRightElement>
              </InputGroup>
            </Box>

            {/* Button */}
            <Button
              onClick={submit}
              isLoading={loading}
              w="100%"
              size="lg"
              bgGradient="linear(to-r, blue.400, blue.600)"
              color="white"
              _hover={{
                bgGradient: "linear(to-r, blue.500, blue.700)",
              }}
              mt={4}
            >
              Sign In
            </Button>
          </VStack>
        </Box>
      </Box>
    </Flex>
    </>
  );
};

export default Login;

