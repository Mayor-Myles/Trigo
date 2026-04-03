// components/CTA.jsx
import { Box, Heading, Button, Stack } from "@chakra-ui/react";

const CTA = () => {
  return (
    <Box textAlign="center" py={20} px={6}>
      <Heading mb={6}>
        Start Delivering or Sending Packages Today
      </Heading>

      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify="center"
      >
        <Button colorScheme="blue" size="lg">
          Get Started
        </Button>
        <Button variant="outline" size="lg">
          Learn More
        </Button>
      </Stack>
    </Box>
  );
};

export default CTA;
