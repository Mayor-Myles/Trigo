

import {
  Box, Flex, Text, Badge, Image, useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const STATUS_COLORS = {
  pending:   { bg: "orange.100", color: "orange.600" },
  transit:   { bg: "purple.100", color: "purple.600" },
  delivered: { bg: "green.100",  color: "green.600"  },
};

const PackageCard = ({ pkg, onClick }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const status = pkg.status?.toLowerCase().replace(" ", "") || "pending";
  const colors = STATUS_COLORS[status] || STATUS_COLORS.pending;
console.log(pkg.picture);
  return (
    <Box
      bg={cardBg}
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="sm"
      mx={4}
      mb={4}
      cursor="pointer"
      onClick={onClick}
    >
      {/* Package image */}
      <Box position="relative">
        <Image
          src={"/"+pkg.picture["pic1"] || "/package.jpg"}
          alt="package"
          w="100%"
          h="180px"
          objectFit="cover"
        />
        <Badge
          position="absolute"
          top={3}
          right={3}
          bg={colors.bg}
          color={colors.color}
          borderRadius="full"
          px={3}
          py={1}
          fontSize="xs"
          fontWeight="bold"
          textTransform="capitalize"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <Box w="6px" h="6px" borderRadius="full" bg={colors.color} display="inline-block" mr={1} />
          {pkg.status}
        </Badge>
      </Box>

      {/* Package details */}
      <Box p={4}>
        <Flex justify="space-between" align="center" mb={3}>
          <Text fontSize="2xl" fontWeight="bold" color="blue.500">
            ₦{Number(pkg.price).toLocaleString()}
          </Text>
          <ChevronRightIcon color="gray.400" boxSize={5} />
        </Flex>

        <Flex align="flex-start" gap={2} mb={2}>
          <Text fontSize="lg">📍</Text>
          <Text fontSize="sm" color="gray.700">
            <Text as="span" fontWeight="semibold">From: </Text>
            {pkg.pickup}
          </Text>
        </Flex>

        <Flex align="flex-start" gap={2} mb={2}>
          <Text fontSize="lg">📌</Text>
          <Text fontSize="sm" color="gray.700">
            <Text as="span" fontWeight="semibold">To: </Text>
            {pkg.delivery}
          </Text>
        </Flex>

        <Flex align="center" gap={2}>
          <Text fontSize="lg">🎒</Text>
          <Text fontSize="sm" color="gray.700">{pkg.weight} kg</Text>
        </Flex>
        <Flex align="center" gap={2}>
          <Text fontSize="lg">📝</Text>
          <Text fontSize="sm" color="gray.700">{pkg.description}</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default PackageCard;
