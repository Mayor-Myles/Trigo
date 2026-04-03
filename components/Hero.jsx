


// components/Hero.jsx
import { Box, Heading, Text, Button, Stack, Icon,useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import { GoPackage } from "react-icons/go";
import { CiDeliveryTruck } from "react-icons/ci";

const Hero = () => {

  const {colorMode,toggleColorMode} = useColorMode();
  
  
  return (
    <Box textAlign="center" py={20} px={6} bg={colorMode="light" && "gray.50"}>
      <Heading size="2xl" mb={4}>
        Fast & Reliable Tricycle Deliveries
      </Heading>

      <Text fontSize="lg" color="gray.600" maxW="600px" mx="auto">
        Trigo connects business owners with nearby tricycle riders for quick
        and affordable package delivery.
      </Text>

      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify="center"
        mt={6}
      >
        <Button as={Link} href="/login?&role=business" colorScheme="blue" size="lg">
         <GoPackage mx={4} size="md" /> Send a Package
        </Button>
        
        <Button href="/login?&role=rider" as={Link} color="white" bg="black" variant="solid" size="lg">
          <CiDeliveryTruck mx={4} size="md" /> Become a Rider
        </Button>
      </Stack>
    </Box>
  );
};

export default Hero;
