
import { SimpleGrid, Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";

const StatCard = ({ icon, label, value, iconBg, iconColor }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  return (
    <Box bg={cardBg} borderRadius="2xl" p={5} boxShadow="sm">
      <Flex
        w="48px" h="48px"
        borderRadius="xl"
        bg={iconBg}
        align="center"
        justify="center"
        fontSize="22px"
        mb={4}
      >
        <span style={{ color: iconColor }}>{icon}</span>
      </Flex>
      <Text fontSize="3xl" fontWeight="bold" mb={1}>{value}</Text>
      <Text color="gray.500" fontSize="sm">{label}</Text>
    </Box>
  );
};

const StatsGrid = ({ stats }) => {
  return (
    <SimpleGrid columns={2} spacing={3} px={4} py={4}>
      <StatCard
        icon="📦"
        label="Total Orders"
        value={stats.total}
        iconBg="blue.50"
        iconColor="#3b82f6"
      />
      <StatCard
        icon="🕐"
        label="Pending"
        value={stats.pending}
        iconBg="orange.50"
        iconColor="#f97316"
      />
      <StatCard
        icon="🚚"
        label="In Transit"
        value={stats.inTransit}
        iconBg="purple.50"
        iconColor="#8b5cf6"
      />
      <StatCard
        icon="✅"
        label="Delivered"
        value={stats.delivered}
        iconBg="green.50"
        iconColor="#22c55e"
      />
    </SimpleGrid>
  );
};

export default StatsGrid;
