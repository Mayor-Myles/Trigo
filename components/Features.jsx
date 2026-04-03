// components/Features.jsx
import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaClock, FaMoneyBill } from "react-icons/fa";

const features = [
  {
    icon: FaMapMarkerAlt,
    title: "Location-Based Matching",
    desc: "Riders get deliveries closest to them.",
  },
  {
    icon: FaClock,
    title: "Fast Delivery",
    desc: "Quick turnaround using local tricycle riders.",
  },
  {
    icon: FaMoneyBill,
    title: "Affordable Pricing",
    desc: "Save money on every delivery.",
  },
];

const Features = () => {
  return (
    <Box py={16} px={6} bg="301934">
      <Heading textAlign="center" mb={10}>
        Why Choose Trigo?
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {features.map((feature, index) => (
          <VStack key={index} spacing={4}>
            <Box fontSize="35px" color="blue.500">
              <feature.icon />
            </Box>
            <Text fontWeight="bold">{feature.title}</Text>
            <Text textAlign="center" color="gray.600">
              {feature.desc}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Features;
