// components/Footer.jsx
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box textAlign="center" py={6} color="white" bg="black">
      <Text fontSize="sm">
        © {new Date().getFullYear()} Trigo. All rights reserved.
    | Mylezic  </Text>
    </Box>
  );
};

export default Footer;
