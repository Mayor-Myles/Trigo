import { Flex, Button, useColorModeValue,Text } from "@chakra-ui/react";
import {useState} from "react";

const tabs = [
  { key: "all",       label: "All" },
  { key: "pending",   label: "Pending" },
  { key: "transit",   label: "In Transit" },
  { key: "delivered", label: "Delivered" },
];

const FilterTabs = ({ counts,packages,setPackages }) => {
  const inactiveBg  = useColorModeValue("white", "gray.700");
const[active,setActive] = useState("all");
const filter = (key) => {
     const filtered = packages.filter((item)=> item.status === key);
        setPackages(filtered);
        }
  
  return (
    <Flex px={4} gap={2} flexWrap="wrap" mb={4}>
      {tabs.map(({ key, label }) => {
        //const isActive = active === key;
       // const count = key === "all" ? null : counts[key];
        
      
      return (
          <Button
            key={key}
            onClick={() =>{ setActive(key); filter(key);}
            size="sm"
            borderRadius="xl"
            border="1px solid"
            borderColor={active==key ? "blue.500" : "gray.200"}
            bg={active==key ? "blue.500" : inactiveBg}
            color={active==key ? "white" : "gray.600"}
            fontWeight="semibold"
            _hover={{ bg: active===key ? "blue.600" : "gray.100" }}
          >
            {label}
            {counts !== null && (
              <Text as="span" ml={1} color={active ? "whiteAlpha.800" : "gray.400"} fontWeight="normal">
                ({counts[key]})
              </Text>
            )}
          </Button>
        );
      })}
    </Flex>
  );
};

export default FilterTabs;
