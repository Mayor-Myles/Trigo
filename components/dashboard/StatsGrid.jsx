
import { SimpleGrid, Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import { GoPackage,GoClock, } from "react-icons/go";
import { CiDeliveryTruck } from "react-icons/ci";
import { SiTicktick } from "react-icons/si";

const StatCard = ({ icon, label, value, iconBg, iconColor }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  return (
    <Box bg={cardBg} borderRadius="2xl" p={4} boxShadow="md">
      <Flex
        w="30px" h="30px"
        borderRadius="xl"
        bg={iconBg}
        align="center"
        justify="center"
        fontSize="15px"
        mb={4}
      >
        <span style={{ color: iconColor }}>{icon}</span>
      </Flex>
      <Text align="center" fontSize="2xl" fontWeight="bold" mb={1}>{value}</Text>
      <Text align="center" color="gray.500" fontSize="sm">{label}</Text>
    </Box>
  );
};

const StatsGrid = ({ stats }) => {
  return (
    <SimpleGrid columns={2} spacing={3} px={4} py={4}>
      <StatCard
        icon={<GoPackage/>}
        label="Total Orders"
        value={stats.total}
        iconBg="blue.50"
        iconColor="#3b82f6"
      />
      <StatCard
        icon={<GoClock/>}
        label="Pending"
        value={stats.pending}
        iconBg="orange.50"
        iconColor="#f97316"
      />
      <StatCard
        icon={<CiDeliveryTruck/>}
        label="In Transit"
        value={stats.inTransit}
        iconBg="purple.50"
        iconColor="#8b5cf6"
      />
      <StatCard
        icon={<SiTicktick/>}
        label="Delivered"
        value={stats.delivered}
        iconBg="green.50"
        iconColor="#22c55e"
      />
    </SimpleGrid>
  );
};

export default StatsGrid;
