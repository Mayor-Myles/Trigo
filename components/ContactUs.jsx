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
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEnvelope, FaUser } from "react-icons/fa";

const ContactUs = () => {
  const toast = useToast();

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

    // Replace with API later
    console.log(form);

    toast({
      title: "Message sent!",
      description: "We’ll get back to you shortly.",
      status: "success",
      duration: 3000,
    });

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Box py={20} px={6} bg="gray.50">
      <Heading textAlign="center" mb={4}>
        Contact Us
      </Heading>

      <Text textAlign="center" color="gray.600" mb={10}>
        Have questions or need help? Reach out to the Trigo team.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} maxW="900px" mx="auto">
        
        {/* LEFT SIDE */}
        <VStack align="start" spacing={5}>
          <Text fontSize="lg" fontWeight="bold">
            Get in touch
          </Text>

          <Text color="gray.600">
            Whether you're a business owner looking to send packages or a rider
            ready to earn, we're here to help.
          </Text>

          <Box display="flex" alignItems="center" gap={3}>
            <FaEnvelope />
            <Text>support@trigo.com</Text>
          </Box>

          <Box display="flex" alignItems="center" gap={3}>
            <FaUser />
            <Text>Customer Support Team</Text>
          </Box>
        </VStack>

        {/* RIGHT SIDE FORM */}
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Message</FormLabel>
            <Textarea
              name="message"
              placeholder="Write your message..."
              value={form.message}
              onChange={handleChange}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            width="100%"
            onClick={handleSubmit}
          >
            Send Message
          </Button>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default ContactUs;
