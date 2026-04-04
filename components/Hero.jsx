
// components/Hero.jsx
import { Box, Heading, Text, Button, Stack, Icon,useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import { GoPackage } from "react-icons/go";
import { CiDeliveryTruck } from "react-icons/ci";
import {useState} from "react";


const Hero = () => {

  const {colorMode,toggleColorMode} = useColorMode();

  const [loading,setLoading1] = useState(false);
  const [loading2,setLoading2] = useState(false);
  const setters = [setLoading1,setLoading2];

const load = (type) => {

const setLoading = setters[type];

  setLoading(true);
  
  setTimeout(()=>{setLoading(false)},500);

}
  
  return (
    <Box textAlign="center" py={10} px={6} bg={colorMode=="light" && "gray.50"}>
      <Heading size="2xl" mb={4}>
        Fast & Reliable Tricycle Deliveries
      </Heading>

      <Text fontSize="lg" color="gray.600" maxW="600px" mx="auto">
        Trigo connects business owners with nearby tricycle riders for quick
        and affordable package delivery.
      </Text>

      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify="center"
        mt={6}
      >
        <Button onClick={()=>load(0)} leftIcon={<GoPackage size ="25px" />} as={Link} href="/login?role=business" colorScheme="blue" size="lg">
           Send a Package
        </Button>
        
        <Button onClick={()=>load(1)} leftIcon={<CiDeliveryTruck size ="25px" />} href="/login?role=rider" as={Link} color="white" bg="#36454F" variant="solid" size="lg"
           Become a Rider
        </Button>
      </Stack>
    </Box>
  );
};

export default Hero;
