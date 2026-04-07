import { Flex, Button, useColorModeValue } from "@chakra-ui/react";

const TABS = [
  { key: "all",       label: "All" },
  { key: "pending",   label: "Pending" },
  { key: "transit",   label: "In Transit" },
  { key: "delivered", label: "Delivered" },
];

const FilterTabs = ({ active, counts, onChange }) => {
  const inactiveBg  = useColorModeValue("white", "gray.700");

  return (
    <Flex px={4} gap={2} flexWrap="wrap" mb={4}>
      {TABS.map(({ key, label }) => {
        const isActive = active === key;
        const count = key === "all" ? null : counts[key];
        return (
          <Button
            key={key}
            onClick={() => onChange(key)}
            size="sm"
            borderRadius="xl"
            border="1px solid"
            borderColor={isActive ? "blue.500" : "gray.200"}
            bg={isActive ? "blue.500" : inactiveBg}
            color={isActive ? "white" : "gray.600"}
            fontWeight="semibold"
            _hover={{ bg: isActive ? "blue.600" : "gray.100" }}
          >
            {label}
            {count !== null && (
              <Text as="span" ml={1} color={isActive ? "whiteAlpha.800" : "gray.400"} fontWeight="normal">
                ({count})
              </Text>
            )}
          </Button>
        );
      })}
    </Flex>
  );
};

export default FilterTabs;
