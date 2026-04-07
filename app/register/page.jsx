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

const Register = () => {
  const [step, setStep] = useState("role");
  const [role, setRole] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");

  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const toast = useToast();

  const selectRole = (selected) => {
    setRole(selected);
    setStep("form");
  };

  const submit = async () => {
    if (!fullname.trim() || !phone.trim() || !password.trim() || !email.trim()) {
      toast({
        title: "Info",
        description: "Please fill in all required fields.",
        position: "top",
        duration: 3000,
        status: "warning",
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        fullname,
        phone,
        email,
        password,
        role,
        businessName,
      };

      const res = await api.post("/user/register", payload);

      if (res.data.status) {
        toast({
          title: "Success",
          description: res.data.message,
          position: "top",
          duration: 3000,
          status: "success",
        });
        localStorage.setItem("jwt", res.data.token);
      } else {
        toast({
          title: "Error",
          description: res.data.message,
          position: "top",
          duration: 3000,
          status: "error",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        position: "top",
        duration: 3000,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Flex minH={["1vh","100vh"]} bg={bg} align="center" justify="center" px={4} py={8}>
        <Box w="100%" maxW="420px">

          {/* STEP 1: Role Selection */}
          {step === "role" && (
            <>
              <ChakraLink
                as={NextLink}
                href="/"
                display="flex"
                alignItems="center"
                mb={6}
                color="gray.500"
                _hover={{ color: "blue.500" }}
              >
                <ArrowBackIcon mr={2} /> Back to home
              </ChakraLink>

              <Box textAlign="center" mb={8}>
                <Box
                  bgGradient="linear(to-r, blue.400, blue.600)"
                  p={3}
                  borderRadius="xl"
                  display="inline-flex"
                  mb={4}
                >
                  🛺
                </Box>
                <Heading size="lg" mb={2}>Join Trigo</Heading>
                <Text color="gray.500">Who are you signing up as?</Text>
              </Box>

              <VStack spacing={4}>
                {[
                  { key: "business", icon: "📦", label: "Business Owner", sub: "Send packages, manage deliveries" },
                  { key: "rider", icon: "🛺", label: "Tricycle Rider", sub: "Earn by delivering packages" },
                ].map((item) => (
                  <Box
                    key={item.key}
                    w="100%"
                    bg={cardBg}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="xl"
                    p={5}
                    cursor="pointer"
                    display="flex"
                    alignItems="center"
                    gap={4}
                    _hover={{ borderColor: "blue.400" }}
                    transition="border-color 0.2s"
                    onClick={() => selectRole(item.key)}
                  >
                    <Box
                      bg={item.key === "business" ? "blue.50" : "green.50"}
                      p={3}
                      borderRadius="lg"
                      fontSize="xl"
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Text fontWeight="semibold">{item.label}</Text>
                      <Text fontSize="sm" color="gray.500">{item.sub}</Text>
                    </Box>
                  </Box>
                ))}
              </VStack>

              <Text textAlign="center" mt={6} color="gray.500" fontSize="sm">
                Already have an account?{" "}
                <ChakraLink as={NextLink} href="/login" color="blue.500">
                  Sign in
                </ChakraLink>
              </Text>
            </>
          )}

          {/* STEP 2: Form */}
          {step === "form" && (
            <>
              <ChakraLink
                display="flex"
                alignItems="center"
                mb={6}
                color="gray.500"
                cursor="pointer"
                _hover={{ color: "blue.500" }}
                onClick={() => setStep("role")}
              >
                <ArrowBackIcon mr={2} /> Back
              </ChakraLink>

              <Box bg={cardBg} p={{ base: 6, md: 8 }} borderRadius="xl" boxShadow="lg">

                <Flex align="center" mb={4}>
                  <Box bgGradient="linear(to-r, blue.400, blue.600)" p={3} borderRadius="xl" mr={3}>
                    🛺
                  </Box>
                  <Heading size="md">
                    Tri<Text as="span" color="blue.500">go</Text>
                  </Heading>
                </Flex>

                <Flex align="center" gap={2} mb={5}>
                  <Box
                    bg={role === "business" ? "blue.50" : "green.50"}
                    px={3}
                    py={1}
                    borderRadius="full"
                    display="inline-flex"
                    alignItems="center"
                    gap={1}
                  >
                    <Text fontSize="xs">{role === "business" ? "📦" : "🛺"}</Text>
                    <Text
                      fontSize="xs"
                      fontWeight="semibold"
                      color={role === "business" ? "blue.600" : "green.600"}
                    >
                      {role === "business" ? "Business Owner" : "Tricycle Rider"}
                    </Text>
                  </Box>

                  <Text fontSize="xs" color="gray.400">·</Text>

                  <Text
                    fontSize="xs"
                    color="blue.500"
                    cursor="pointer"
                    onClick={() => setStep("role")}
                  >
                    Change
                  </Text>
                </Flex>

                <Heading size="md" mb={1}>Create your account</Heading>

                <Text color="gray.500" fontSize="sm" mb={6}>
                  Already have an account?{" "}
                  <ChakraLink as={NextLink} href="/login" color="blue.500">
                    Sign in
                  </ChakraLink>
                </Text>

                <VStack spacing={4}>

                  <Box w="100%">
                    <Text mb={2} fontWeight="medium" fontSize="sm">Full Name</Text>
                    <Input
                      placeholder="e.g. Ada Okafor"
                      size="lg"
                      borderRadius="lg"
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </Box>

                  <Box w="100%">
                    <Text mb={2} fontWeight="medium" fontSize="sm">Phone Number</Text>
                    <Input
                      placeholder="e.g. 07014443254"
                      size="lg"
                      borderRadius="lg"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Box>

                  <Box w="100%">
                    <Text mb={2} fontWeight="medium" fontSize="sm">Email Address</Text>
                    <Input
                      placeholder="you@example.com"
                      size="lg"
                      borderRadius="lg"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Box>

                  {role === "business" && (
                    <Box w="100%">
                      <Text mb={2} fontWeight="medium" fontSize="sm">Business Name</Text>
                      <Input
                        placeholder="e.g. Ada's Fashion Store"
                        size="lg"
                        borderRadius="lg"
                        onChange={(e) => setBusinessName(e.target.value)}
                      />
                    </Box>
                  )}

                  <Box w="100%">
                    <Text mb={2} fontWeight="medium" fontSize="sm">Password</Text>
                    <InputGroup size="lg">
                      <Input
                        type={show ? "text" : "password"}
                        placeholder="Create a password"
                        borderRadius="lg"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputRightElement>
                        <Icon
                          as={show ? ViewOffIcon : ViewIcon}
                          onClick={() => setShow(!show)}
                          cursor="pointer"
                        />
                      </InputRightElement>
                    </InputGroup>
                  </Box>

                  <Button
                    onClick={submit}
                    isLoading={loading}
                    w="100%"
                    size="lg"
                    bgGradient="linear(to-r, blue.400, blue.600)"
                    color="white"
                    _hover={{ bgGradient: "linear(to-r, blue.500, blue.700)" }}
                    mt={2}
                  >
                    Create Account
                  </Button>

                </VStack>
              </Box>
            </>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Register;
