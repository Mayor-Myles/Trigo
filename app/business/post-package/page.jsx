"use client";

import { useRef, useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import {
  Box, Button, FormControl, FormLabel, Input, InputGroup,
  InputLeftElement, Textarea, VStack, useToast, HStack,
  Text, Icon, Image, Center, Badge, useColorMode,
  Spinner, InputRightElement
} from "@chakra-ui/react";
import { FiMapPin, FiDollarSign, FiUploadCloud, FiX } from "react-icons/fi";
import { LuWeight } from "react-icons/lu";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAtom } from "jotai";
import {
  pickupDataAtom,
  deliveryDataAtom,
  userDataAtom,
  deliveryAddressAtom,
  pickupAddressAtom
} from "@/utils/jotai";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import MyPopover from "@/components/MyPopover";

export default function PostPackage() {
  const [pickupLoading, setPickupLoading] = useState(false);
  const [deliveryLoading, setDeliveryLoading] = useState(false);

  const [isSelectingPickup, setIsSelectingPickup] = useState(false);
  const [isSelectingDelivery, setIsSelectingDelivery] = useState(false);

  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const { colorMode } = useColorMode();
  const toast = useToast();
  const router = useRouter();

  const [user, setUser] = useAtom(userDataAtom);
  const [deliveryData, setDeliveryData] = useAtom(deliveryDataAtom);
  const [pickupData, setPickupData] = useAtom(pickupDataAtom);
  const [deliveryAddress, setDeliveryAddress] = useAtom(deliveryAddressAtom);
  const [pickupAddress, setPickupAddress] = useAtom(pickupAddressAtom);

  const [debouncedDeliveryAddress] = useDebounce(deliveryAddress, 800);
  const [debouncedPickupAddress] = useDebounce(pickupAddress, 800);

  // ================= FILE =================
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  // ================= USER =================
  const fetchUserData = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return router.push("/login");

    try {
      const res = await api.post("/user/getUserData", { jwt });
      if (res.data.status === "success") {
        setUser(res.data.data);
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================= SEARCH =================
  const searchAddress = async (address, type) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;

      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&filter=countrycode:ng&apiKey=${apiKey}`;

      const res = await api.get(url);
      
      const results = res?.data?.features || [];
if(results.length < 1){
toast({
        title: "Info",
        description: "No address was found.",
        status: "info",
        position: "top"
      });

      }
      if (type === "pickup") {
        setPickupData(results);
        setPickupLoading(false);
      } else {
        setDeliveryData(results);
        setDeliveryLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Search failed",
        status: "error",
        position: "top"
      });
    }
  };

  // ================= EFFECTS =================
  useEffect(() => {
    if (isSelectingPickup) {
      setIsSelectingPickup(false);
      return;
    }

    if (debouncedPickupAddress) {
      setPickupLoading(true);
      searchAddress(debouncedPickupAddress, "pickup");
    } else {
      setPickupData([]);
      setPickupLoading(false);
    }
  }, [debouncedPickupAddress]);

  useEffect(() => {
    if (isSelectingDelivery) {
      setIsSelectingDelivery(false);
      return;
    }

    if (debouncedDeliveryAddress) {
      setDeliveryLoading(true);
      searchAddress(debouncedDeliveryAddress, "delivery");
    } else {
      setDeliveryData([]);
      setDeliveryLoading(false);
    }
  }, [debouncedDeliveryAddress]);

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!user) return null;

  return (
    <>
      <Navbar />

      <Box minH="100vh" bg={colorMode === "light" ? "gray.50" : "black"}>
        {/* HEADER */}
        <Box
          bgGradient="linear(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
          px={5}
          pt={10}
          pb={16}
        >
          <Box maxW="520px" mx="auto">
            <Badge bg="whiteAlpha.200" color="blue.200" px={3} py={1} rounded="full">
              New Delivery
            </Badge>

            <Text fontSize="lg" fontWeight="900" color="white">
              Post a Package
            </Text>
          </Box>
        </Box>

        <Box bg={colorMode==="light" ? "white":"black"} zIndex={9999} maxW="520px" mx="auto" px={4} mt="-40px" pb={10}>
          <Box rounded="2xl" shadow="xl" p={6}>
            <VStack spacing={6} align="stretch">

              {/* IMAGE */}
              <FormControl isRequired>
                <FormLabel>Package Photo</FormLabel>

                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  onChange={handleFile}
                />

                {preview ? (
                  <Box position="relative">
                    <Center>
                    <Image w="250px" h="250px" objectFit="contain"  src={preview} />
                    <Button colorScheme="red" onClick={() => setPreview(null)}>Remove</Button>
                    </Center>
                    </Box>
                ) : (
                  <Center onClick={() => fileRef.current.click()}>
                    <Icon color="dodgerblue" as={FiUploadCloud} />
                    <Text>Upload</Text>
                  </Center>
                )}
              </FormControl>

              {/* WEIGHT */}
              <FormControl isRequired>
                <FormLabel>Weight</FormLabel>
                <Input type="number" placeholder="Package weight"/>
              </FormControl>

              {/* PICKUP */}
              {pickupData.length > 0 && (
                <MyPopover
                  type="pickup"
                  onSelect={(val) => {
                    setIsSelectingPickup(true);
                    setPickupAddress(val);
                    setPickupData([]);
                  }}
                />
              )}

              <InputGroup>
                <InputLeftElement>
                  <Icon color="seagreen" as={FiMapPin} />
                </InputLeftElement>
                <Input
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Pickup address"
                />
                <InputRightElement>
                {pickupLoading && <Spinner color="dodgerblue" />}
              </InputRightElement>
                </InputGroup>

              {/* DELIVERY */}
              {deliveryData.length > 0 && (
                <MyPopover
                  type="delivery"
                  onSelect={(val) => {
                    setIsSelectingDelivery(true);
                    setDeliveryAddress(val);
                    setDeliveryData([]);
                  }}
                />
              )}

              <InputGroup>
                <InputLeftElement>
                  <Icon color="red" as={FiMapPin} />
                </InputLeftElement>
                <Input
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter Delivery address"
                />
                <InputRightElement>
                {deliveryLoading && <Spinner color="dodgerblue" />}
              </InputRightElement>
                </InputGroup>

              {/* PRICE */}
              <FormControl isRequired>
                <FormLabel>Price</FormLabel>
                <Input type="number" />
              </FormControl>

              {/* DESC */}
              <Textarea placeholder="Description" />

              <Button bgGradient="linear(to-r,blue.400,blue.700)" colorScheme="blue">Proceed</Button>

            </VStack>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
