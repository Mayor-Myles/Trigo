use


// components/Hero.jsx
import { Box, Heading, Text, Button, Stack } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Box textAlign="center" py={20} px={6} bg="gray.50">
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
        <Button colorScheme="blue" size="lg">
          Send a Package
        </Button>
        <Button variant="outline" size="lg">
          Become a Rider
        </Button>
      </Stack>
    </Box>
  );
};

export default Hero;
