import {
  Box, Flex, Heading, Text, Button, useColorModeValue,
} from "@chakra-ui/react";
import { RepeatIcon, AddIcon } from "@chakra-ui/icons";

const DashboardHeader = ({ name, onRefresh, onPostPackage }) => {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box bg={bg} px={4} pt={6} pb={4}>
      <Heading size="lg" mb={1}>
        Good day, {name} 👋
      </Heading>
      <Text color="gray.500" mb={5}>
        Manage your delivery orders
      </Text>
      <Flex gap={3}>
        <Button
          onClick={onRefresh}
          leftIcon={<RepeatIcon />}
          variant="outline"
          borderRadius="xl"
          flex={1}
        >
          Refresh
        </Button>
        <Button
          onClick={onPostPackage}
          leftIcon={<AddIcon />}
          bgGradient="linear(to-r, blue.400, blue.600)"
          color="white"
          borderRadius="xl"
          flex={2}
          _hover={{ bgGradient: "linear(to-r, blue.500, blue.700)" }}
        >
          Post Package
        </Button>
      </Flex>
    </Box>
  );
};

export default DashboardHeader;
