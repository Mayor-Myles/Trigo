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
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowBackIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import NextLink from "next/link";

const Login = () => {
  const [show, setShow] = useState(false);

  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Flex minH="100vh" bg={bg} align="center" justify="center" px={4}>
      
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
              📦
            </Box>

            <Heading size="md">
              Tri<Text as="span" color="blue.500">Send</Text>
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

          {/* Form */}
          <VStack spacing={4}>
            
            {/* Email */}
            <Box w="100%">
              <Text mb={2} fontWeight="medium">
                Email Address
              </Text>
              <Input
                placeholder="you@example.com"
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
  );
};

export default Login;

