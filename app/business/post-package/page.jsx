"use client";

import { useRef, useState,useEffect, } from "react";
import {useDebounce} from "use-debounce";
import {
  Box, Button, FormControl, FormLabel, Input, InputGroup,
  InputLeftElement, Select, Textarea, VStack, useToast, HStack,
  Text, Icon, Image, Center, Flex, Badge,useColorMode,Spinner,InputRightElement,
  
} from "@chakra-ui/react";
import { FiMapPin, FiDollarSign, FiUploadCloud, FiX } from "react-icons/fi";
import { LuWeight } from "react-icons/lu";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {useAtom} from "jotai";
import {userDataAtom} from "@/utils/jotai";
import {useRouter} from "next/navigation";
import api from "@/utils/axios";
import MyPopover from "@/components/MyPopover";






export default function PostPackage
  () {
  const [pickupLoading,setPickupLoading] = useState(false);
  const [deliveryLoading,setDeliveryLoading] = useState(false);
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const{colorMode,toggleColorMode} = useColorMode();
 const[user,setUser] = useAtom(userDataAtom); 
 const[deliveryData,setDeliveryData] = useState(null);
  const[pickupData,setPickupData] = useState(null);
  const[deliveryAddress,setDeliveryAddress] = useState("");
  const[pickupAddress,setPickupAddress] = useState("");
  const [debouncedDeliveryAddress] = useDebounce(deliveryAddress, 1800); // 1.8s delay
  const [debouncedPickupAddress] = useDebounce(pickupAddress, 15800); // 1.8s delay

    const router = useRouter();
   const toast = useToast();
    
  const handleFile = (e) => {
    
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

const fetchUserData = async () => {
    
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      router.push("/login");
      return;
    }
    try {
      
      const res = await api.post("/user/getUserData", { jwt: jwt });
      const response = res.data;
      if (response.status === "success") {
        setUser(response.data);
      }else{
router.push("/login");
      }

    }catch(error){
    console.log(error.data);

    }

}//fetchdata

const searchAddress = async (address,type) => {
const locationToken = process.env.NEXT_PUBLIC_LOCATIONIQ_TOKEN; 
const url = "https://api.geoapify.com/v1/geocode/autocomplete?text="+address+"&filter=countrycode:ng&apiKey="+locationToken;
   const res = await api.get(url);

    if(res){
      
const response = res.data;
    
type === "delivery" ? setDeliveryData(response.features) : setPickupData(response.features);
    setDeliveryLoading(false);
    setPickupLoading(false);
    } else{

toast({
  title:"Error",
  description:"Search failed",
  status:"error",
  position:"top"
    

});
    }

  }//search


  useEffect(() => {
    if (debouncedPickupAddress) {
      setPickupLoading(true);
      searchAddress(debouncedPickupAddress, "pickup");
      setPickupAddress(pickupData.properties.formatted);
    } else {
      //setPickupData([]);
      setPickupLoading(false);
      
    }
  }, [debouncedPickupAddress]);

  useEffect(() => {
    if (debouncedDeliveryAddress) {
      setDeliveryLoading(true);
      searchAddress(debouncedDeliveryAddress, "delivery");
      setDeliveryAddress(deliveryData.properties.formatted);
    } else {
     // setDeliveryData([]);
      setDeliveryLoading(false);
    }
  }, [debouncedDeliveryAddress]);

    
    useEffect(()=>{
fetchUserData();
  },[]); 

  if(!user){

    return(<></>);
  }

  return (
    <>
       <Navbar />
      
    <Box minH="100vh" bg={colorMode==="light" && "gray.50"}>
 
      {/* Hero Header */}
      <Box
        bgGradient="linear(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
        px={5} pt={10} pb={16}
      >
        <Box maxW="520px" mx="auto">
          <Badge
            bg="whiteAlpha.200" color="blue.200"
            fontSize="xs" letterSpacing="widest"
            textTransform="uppercase" px={3} py={1} rounded="full" mb={3}
          >
            New Delivery
          </Badge>
          <Text
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="900"
            color="white"
            lineHeight="1.1"
            letterSpacing="-1px"
          >
            Post a Package
          </Text>
          <Text color="blue.200" mt={2} fontSize="sm" fontWeight="400">
            Fill in the details below. Your order would be reviewed by the admin before being posted to riders
          </Text>
        </Box>
      </Box>

      {/* Card pulls up over header */}
      <Box maxW="520px" mx="auto" px={4} mt="-40px" pb={10}>
        <Box
          bg={colorMode=="light" && "white"}
          rounded="2xl"
          shadow="xl"
          p={6}
          borderTop="4px solid"
          borderColor="blue.500"
        >
          <VStack spacing={6} align="stretch">

            {/* Package Photo */}
            <FormControl isRequired>
              <FormLabel fontWeight="700" fontSize="sm" color={colorMode=="light" ? "gray.600" : "white"} mb={2}>
                Package Photo
              </FormLabel>
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                hidden
                onChange={handleFile}
                multiple
              />
              {preview ? (
                <Box position="relative" rounded="xl" overflow="hidden" h="180px">
                  <Image src={preview} w="full" h="full" objectFit="cover" />
                  <Button
                    position="absolute" top={2} right={2}
                    size="xs" colorScheme="red" rounded="full"
                    onClick={() => setPreview(null)}
                    leftIcon={<FiX />}
                  >
                    Remove
                  </Button>
                </Box>
              ) : (
                <Center
                  onClick={() => fileRef.current.click()}
                  cursor="pointer"
                  border="2px dashed"
                  borderColor="blue.200"
                  bg="blue.50"
                  rounded="xl"
                  py={10}
                  flexDirection="column"
                  gap={2}
                  _hover={{ borderColor: "blue.400", bg: "blue.100" }}
                  transition="all 0.2s"
                >
                  <Icon as={FiUploadCloud} boxSize={8} color="blue.400" />
                  <Text fontWeight="600" color="blue.500" fontSize="sm">
                    Click to upload photo
                  </Text>
                  <Text color="gray.400" fontSize="xs">
                    PNG, JPG, WEBP up to 5MB
                  </Text>
                </Center>
              )}
            </FormControl>

            {/* Divider Line */}
            <Box h="1px" bg="gray.100" />

            {/* Package Weight */}
            <FormControl isRequired>
              <FormLabel fontWeight="700" fontSize="sm" color={colorMode=="light" ? "gray.600" : "white"}>
                Package Weight (Kg)
              </FormLabel>
              <HStack>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={LuWeight} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    type="number" defaultValue="0.0"
                    bg="gray.50" border="1.5px solid" borderColor="gray.200"
                    rounded="xl" _focus={{ borderColor: "blue.400", bg: "white" }}
                  />
                </InputGroup>
                
              </HStack>
            </FormControl>

            {/* Pickup Location */}
            {pickupData?.length > 0 &&  (
          <MyPopover setData={setPickupData} data={pickupData} />
          )}
            <FormControl isRequired>
           
              <FormLabel fontWeight="700" fontSize="sm" color={colorMode=="light" ? "gray.600" : "white"}>
                Pickup Location
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiMapPin} color="green.400" />
                </InputLeftElement>
                <Input
                value={pickupAddress}
                  onChange={(e)=>{setPickupAddress(e.target.value); setPickupLoading(true) }}
                  placeholder="e.g. 12 Broad Street, Lagos Island"
                  bg="gray.50" border="1.5px solid" borderColor="gray.200"
                  rounded="xl" _focus={{ borderColor: "blue.400", bg: "white" }}
                  _placeholder={{ color: "gray.400", fontSize: "sm" }}
                />
                {pickupLoading && (<InputRightElement>
                <Spinner color="blue.600" />
                </InputRightElement>)}
              </InputGroup>
            </FormControl>

            {/* Delivery Location */}
                {deliveryData?.length > 0 && (
          <MyPopover setData={setDeliveryData} data={deliveryData} />
          )}
            <FormControl isRequired>
              <FormLabel fontWeight="700" fontSize="sm" color={colorMode=="light" ? "gray.600" : "white"}>
                Delivery Location
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiMapPin} color="red.400" />
                </InputLeftElement>
                <Input
                  value={deliveryAddress}
                  onChange={(e)=>{setDeliveryAddress(e.target.value); setDeliveryLoading(true)}}
                  placeholder="e.g. 5 Ikeja Avenue, Ikeja"
                  bg="gray.50" border="1.5px solid" borderColor="gray.200"
                  rounded="xl" _focus={{ borderColor: "blue.400", bg: "white" }}
                  _placeholder={{ color: "gray.400", fontSize: "sm" }}
                />
                {deliveryLoading && ( <InputRightElement>
                <Spinner color="blue.600" />
                </InputRightElement>)}
              </InputGroup>
            </FormControl>

            {/* Service Price */}
            <FormControl isRequired>
              <FormLabel fontWeight="700" fontSize="sm" color={colorMode=="light" ? "gray.600" : "white"}>
                Service Price (₦)
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiDollarSign} color="gray.400" />
                </InputLeftElement>
                <Input
                  type="number" placeholder="e.g. 1500"
                  bg="gray.50" border="1.5px solid" borderColor="gray.200"
                  rounded="xl" _focus={{ borderColor: "blue.400", bg: "white" }}
                  _placeholder={{ color: "gray.400", fontSize: "sm" }}
                />
              </InputGroup>
            </FormControl>

            {/* Package Description */}
            <FormControl>
              <FormLabel fontWeight="700" fontSize="sm" color={colorMode=="light" ? "gray.600" : "white"}>
                Package Description
              </FormLabel>
              <Textarea
                placeholder="Describe the contents, fragility, or any special handling notes..."
                bg="gray.50" border="1.5px solid" borderColor="gray.200"
                rounded="xl" rows={4} resize="none"
                _focus={{ borderColor: "blue.400", bg: "white" }}
                _placeholder={{ color: "gray.400", fontSize: "sm" }}
              />
            </FormControl>

            {/* CTA */}
            <Button
              size="lg" rounded="xl" fontWeight="700"
              bgGradient="linear(to-r, blue.500, blue.700)"
              color="white" mt={1}
              _hover={{ bgGradient: "linear(to-r, blue.600, blue.800)", transform: "translateY(-1px)", shadow: "lg" }}
              _active={{ transform: "translateY(0)" }}
              transition="all 0.2s"
            >
              Proceed
            </Button>

          </VStack>
        </Box>
      </Box>
      
    </Box>
      <Footer />
    </>
  );
}
