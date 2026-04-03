// components/Navbar.jsx
import { Flex, Text, Button, HStack } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      px={6}
      py={4}
      align="center"
      justify="space-between"
      bg="white"
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Text fontSize="xl" fontWeight="bold" color="brand.500">
        Trigo
      </Text>

      <HStack spacing={4}>
        <Button variant="ghost">Login</Button>
        <Button colorScheme="blue">Get Started</Button>
      </HStack>
    </Flex>
  );
};

export default Navbar;

