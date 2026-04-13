"use client";

import {
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  useBreakpointValue,
  useDisclosure,
  
} from "@chakra-ui/react";
import {useAtom} from "jotai";
import{pickupDataAtom,deliveryDataAtom,pickupAddressAtom,deliveryAddressAtom} from "@/utils/jotai";
import {useEffect} from "react";


export default function MyPopover({type}){
  // Responsive modal size
  const modalSize = useBreakpointValue({
    base: "xs", // mobile
    md: "md",   // tablets & above
  });
const { isOpen, onOpen, onClose } = useDisclosure();
const[pickupData,setPickupData] = useAtom(pickupDataAtom);
const[deliveryData,setDeliveryData] = useAtom(deliveryDataAtom);
 const[pickupAddress,setIsPickupAddress] = useAtom(pickupAddressAtom);
  const[deliveryAddress,setIsDeliveryAddress] = useAtom(deliveryAddressAtom);

  const chooseAddress = (item) => {
    
    const address = item.properties.formatted;
    
    type ==="pickup" ? setIsPickupAddress(address) : setIsDeliveryAddress(address);   
  
  }
  const handleClose = () => {
    // Clear data AND close modal
    if (type === "pickup") {
  setPickupData([]);
  //setIsPickup("");
} else {
  setDeliveryData([]);
  //setIsDelivery("");
}

    onClose();
  };

  useEffect(()=>{
onOpen();
  },[]);
  return (
    <Center>
      <Modal onClose={()=>handleClose()} isOpen={isOpen} size={modalSize}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Results</ModalHeader>
          <ModalCloseButton onClick={()=>handleClose()}  />

     <ModalBody>
  {type === "pickup" ? (
    pickupData?.length > 0 ? (
      pickupData.map((item) => ( // Use pickupData, not data
        <Box
          key={item.properties.place_id}
          my={2}
          p={3}
          borderWidth="1px"
          borderRadius="md"
          _hover={{ bg: "gray.300" }}
          cursor="pointer"
          onClick={() => { handleClose(); chooseAddress(item); }}
        >
          <Text fontWeight={500}>{item.properties.address_line1}</Text>
          <Text fontSize="sm" color="gray.500">{item.properties.formatted}</Text>
        </Box>
      ))
    ) : (
      <Text color="gray.400">No results</Text>
    )
  ) : (
    deliveryData?.length > 0 ? (
      deliveryData.map((item) => ( // Use deliveryData, not data
        <Box
          key={item.properties.place_id}
          my={2}
          p={3}
          borderWidth="1px"
          borderRadius="md"
          _hover={{ bg: "gray.300" }}
          cursor="pointer"
          onClick={() => { handleClose(); chooseAddress(item); }}
        >
          <Text fontWeight={500}>{item.properties.address_line1}</Text>
          <Text fontSize="sm" color="gray.500">{item.properties.formatted}</Text>
        </Box>
      ))
    ) : (
      <Text color="gray.400">No results</Text>
    )
  )}
</ModalBody>

        </ModalContent>
      </Modal>
    </Center>
  );
}
