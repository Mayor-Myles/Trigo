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
import{pickupDataAtom,deliveryDataAtom,isPickupAtom,isDeliveryAtom} from "@/utils/jotai";



export default function MyPopover({type}){
  // Responsive modal size
  const modalSize = useBreakpointValue({
    base: "xs", // mobile
    md: "md",   // tablets & above
  });
const { isOpen, onOpen, onClose } = useDisclosure()
const[pickupData,setPickupData] = useAtom(pickupDataAtom);
  const[deliveryData,setDeliveryData] = useAtom(deliveryDataAtom);
 const[isPickup,setIsPickup] = useAtom(isPickupAtom);
  const[isDelivery,setIsDelivery] = useAtom(isDeliveryAtom);

  const chooseAddress = (item) => {
    type ==="pickup" ? setIsPickup(item.properties.formatted) : setIsDelivery(item.properties.formatted);   
  }

  return (
    <Center>
      <Modal isOpen={pickupData?.length > 0} size={modalSize}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Results</ModalHeader>
          <ModalCloseButton onClick={()=>onClose()}  />

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
          onClick={() => { chooseAddress(item); onClose(); }}
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
          onClick={() => { chooseAddress(item); onClose(); }}
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
