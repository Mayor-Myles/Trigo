// components/ContactUs.jsx
import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  VStack,
  FormControl,
  FormLabel,
  useToast,
  HStack,
  Icon,
  iuseColorMode
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEnvelope, FaUser, FaPaperPlane } from "react-icons/fa";

const ContactUs = () => {
  const toast = useToast();
  const {colorMode,toggleColorMode} = useColorMode();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "All fields are required",
        status: "error",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "Message sent!",
      description: "We’ll get back to you shortly.",
      status: "success",
      duration: 3000,
    });

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Box
      py={20}
      px={6}
      bgGradient={colorMode=="white" && "linear(to-b, blue.50, white)"}
    >
      {/* HEADER */}
      <VStack spacing={3} mb={12}>
        <Heading size="xl">Contact Us</Heading>
        <Text color="gray.600" textAlign="center" maxW="500px">
          Have questions about Trigo? Reach out and our team will respond quickly.
        </Text>
      </VStack>

      {/* MAIN CARD */}
      <Box
        maxW="1000px"
        mx="auto"
        bg={colorMode=="light" && "white"}
        borderRadius="xl"
        boxShadow="lg"
        p={{ base: 6, md: 10 }}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          
          {/* LEFT INFO */}
          <VStack align="start" spacing={6}>
            <Heading size="md">Let’s talk 👋</Heading>

            <Text color="gray.600">
              Whether you're sending packages or delivering them, we’re here to help
              you get started smoothly with Trigo.
            </Text>

            <VStack align="start" spacing={4}>
              <HStack>
                <Icon as={FaEnvelope} color="blue.500" />
                <Text>support@trigo.com</Text>
              </HStack>

              <HStack>
                <Icon as={FaUser} color="blue.500" />
                <Text>Customer Support</Text>
              </HStack>
            </VStack>

            <Box
              bg="blue.50"
              p={4}
              borderRadius="md"
              w="100%"
            >
              <Text fontSize="sm" color="gray.600">
                ⚡ We typically respond within a few hours.
              </Text>
            </Box>
          </VStack>

          {/* RIGHT FORM */}
          <VStack spacing={5}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                focusBorderColor="blue.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={handleChange}
                focusBorderColor="blue.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Message</FormLabel>
              <Textarea
                name="message"
                placeholder="Tell us what you need help with..."
                value={form.message}
                onChange={handleChange}
                focusBorderColor="blue.500"
                rows={5}
              />
            </FormControl>

            <Button
              colorScheme="blue"
              width="100%"
              size="lg"
              rightIcon={<FaPaperPlane />}
              onClick={handleSubmit}
              _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
              transition="0.2s"
            >
              Send Message
            </Button>
          </VStack>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default ContactUs;
