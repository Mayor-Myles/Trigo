// components/HowItWorks.jsx
import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { GoPackage, } from "react-icons/go";
import { PiBicycleThin } from "react-icons/pi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";


const steps = [
  {
    icon: GoPackage,
    title: "Post a Package",
    desc: "Upload package details, weight, price and delivery location.",
  },
  {
    icon: PiBicycleThin,
    title: "Rider Accepts",
    desc: "Nearby tricycle riders see and accept delivery requests.",
  },
  {
    icon: IoCheckmarkDoneCircleOutline ,
    title: "Delivered Fast",
    desc: "Your package gets delivered safely and quickly.",
  },
];

const HowItWorks = () => {
  return (
    <Box py={8} px={6}>
      <Heading textAlign="center" mb={10}>
        How Trigo Works
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {steps.map((step, index) => (
          <VStack key={index} spacing={4}>
            <Box fontSize="40px" color="blue.500">
              <step.icon />
            </Box>
            <Text fontWeight="bold">{step.title}</Text>
            <Text textAlign="center" color="gray.600">
              {step.desc}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default HowItWorks;
