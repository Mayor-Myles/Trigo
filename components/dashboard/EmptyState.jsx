import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const EmptyState = ({ onPostPackage }) => {
  return (
    <Flex direction="column" align="center" justify="center" py={16} px={4}>
      <Flex
        w="80px" h="80px"
        borderRadius="2xl"
        bg="gray.100"
        align="center"
        justify="center"
        fontSize="36px"
        mb={5}
      >
        📦
      </Flex>
      <Text fontWeight="bold" fontSize="lg" mb={2}>
        No packages here
      </Text>
      <Text color="gray.500" fontSize="sm" mb={6} textAlign="center">
        Post your first package to get started.
      </Text>
      <Button
        leftIcon={<AddIcon />}
        bgGradient="linear(to-r, blue.400, blue.600)"
        color="white"
        borderRadius="xl"
        px={8}
        _hover={{ bgGradient: "linear(to-r, blue.500, blue.700)" }}
        onClick={onPostPackage}
      >
        Post a Package
      </Button>
    </Flex>
  );
};

export default EmptyState;
