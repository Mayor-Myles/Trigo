import {
  Box, Flex, Heading, Text, Button, useColorModeValue,
} from "@chakra-ui/react";
import { RepeatIcon, AddIcon } from "@chakra-ui/icons";
import {useState} from "react";
import {useRouter} from "next/navigation";

const DashboardHeader = ({ name, isRefreshed, onRefresh, onPostPackage }) => {
  const bg = useColorModeValue("white", "gray.800");
  const[loading,setLoading] = useState(false);
  const router = useRouter();
  const logout = () => {
     setLoading(true);
     
  localStorage.removeItem("jwt");

     setTimeout(()=>{
       setLoading(false);
    router.push("/login");},1200);
     
   }
  
  return (
    <Box bg={bg} px={3} pt={6} pb={4}>
      <Heading size="sm" mb={1}>
        Good day, <Text as="span" color="blue.500" fontFamiliy="'Georgia', serif">{name}</Text> 👋
      </Heading>
      <Text color="gray.500" mb={5}>
        Manage your delivery orders
      </Text>
      <Flex gap={3}>
        <Button
          isLoading={isRefreshed}
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
           <Button
             isLoading={loading}
             flex={1}
          colorScheme="red"
          variant="outline"
          borderRadius="xl"
          mb={3}
          onClick={logout}
        >
          Log Out
        </Button>

      </Flex>
    </Box>
  );
};

export default DashboardHeader;
