// components/Navbar.jsx
import { Flex, Text, Button, HStack, IconButton,useColorMode } from "@chakra-ui/react";
import { CiLight, CiDark } from "react-icons/ci";


const Navbar = () => {

  const {colorMode,toggleColorMode} = useColorMode();
  
  return (
    <Flex
      px={6}
      py={4}
      align="center"
      justify="space-between"
      bg={colorMode=="light" && "white"}
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
        <Button variant="ghost">Login</Button>
        <Button colorScheme="blue">Get Started</Button>
      </HStack>

      
    </Flex>
  );
};

export default Navbar;

