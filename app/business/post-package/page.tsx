
import {
  Box, Button, FormControl, FormLabel, Input, InputGroup,
  InputLeftElement, InputRightElement, Select, Textarea,
  VStack, HStack, Text
} from "@chakra-ui/react";
import { FiMapPin, FiDollarSign } from "react-icons/fi";
import { LuWeight } from "react-icons/lu";

export default function PostPackage() {
  return (
    <Box maxW="480px" mx="auto" px={4} py={6} bg="white" minH="100vh">
      <Text fontSize="xl" fontWeight="bold" mb={6}>Post a Package</Text>

      <VStack spacing={5} align="stretch">

        {/* Package Weight */}
        <FormControl isRequired>
          <FormLabel fontWeight="semibold">Package Weight</FormLabel>
          <HStack>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LuWeight color="gray" />
              </InputLeftElement>
              <Input type="number" defaultValue="0.0" bg="gray.50" border="none" rounded="xl" />
            </InputGroup>
            <Select w="110px" bg="gray.50" border="none" rounded="xl" flexShrink={0}>
              <option>kg</option>
              <option>lbs</option>
            </Select>
          </HStack>
        </FormControl>

        {/* Pickup Location */}
        <FormControl isRequired>
          <FormLabel fontWeight="semibold">Pickup Location</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiMapPin color="green" />
            </InputLeftElement>
            <Input placeholder="e.g. 12 Broad Street, Lagos Island" bg="gray.50" border="none" rounded="xl" />
          </InputGroup>
        </FormControl>

        {/* Delivery Location */}
        <FormControl isRequired>
          <FormLabel fontWeight="semibold">Delivery Location</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiMapPin color="red" />
            </InputLeftElement>
            <Input placeholder="e.g. 5 Ikeja Avenue, Ikeja" bg="gray.50" border="none" rounded="xl" />
          </InputGroup>
        </FormControl>

        {/* Service Price */}
        <FormControl isRequired>
          <FormLabel fontWeight="semibold">Service Price (₦)</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiDollarSign color="gray" />
            </InputLeftElement>
            <Input type="number" placeholder="e.g. 1500" bg="gray.50" border="none" rounded="xl" />
          </InputGroup>
        </FormControl>

        {/* Package Description */}
        <FormControl>
          <FormLabel fontWeight="semibold">Package Description</FormLabel>
          <Textarea
            placeholder="Describe the contents, fragility, or any special handling notes..."
            bg="gray.50"
            border="none"
            rounded="xl"
            rows={4}
            resize="none"
          />
        </FormControl>

        {/* Submit Button */}
        <Button
          bgGradient="linear(to-r, blue.400, blue.600)"
          color="white"
          size="lg"
          rounded="xl"
          _hover={{ bgGradient: "linear(to-r, blue.500, blue.700)" }}
          mt={2}
        >
          Proceed
        </Button>

      </VStack>
    </Box>
  );
}
