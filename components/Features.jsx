// components/Features.jsx
import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { LuMapPin,LuClock } from "react-icons/lu";
import { GrMoney } from "react-icons/gr";


const features = [
  {
    icon: LuMapPin,
    title: "Location-Based Matching",
    desc: "Riders get deliveries closest to them.",
  },
  {
    icon: LuClock,
    title: "Fast Delivery",
    desc: "Quick turnaround using local tricycle riders.",
  },
  {
    icon: GrMoney,
    title: "Affordable Pricing",
    desc: "Save money on every delivery.",
  },
];

const Features = () => {
  return (
    <Box py={16} px={6} color="white" backgroundImage="linear-gradient(180deg, #009aff 0.000%, #008bff 25.000%, #007bff 50.000%, #0068ff 75.000%, #0053ff 100.000%)">
      <Heading textAlign="center" mb={10}>
        Why Choose Trigo?
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {features.map((feature, index) => (
          <VStack key={index} spacing={4}>
            <Box fontSize="35px" color="white">
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
