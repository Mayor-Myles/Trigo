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
} from "@chakra-ui/react";

export default function MyPopover({ data }) {
  // Responsive modal size
  const modalSize = useBreakpointValue({
    base: "xs", // mobile
    md: "md",   // tablets & above
  });

  return (
    <Center>
      <Modal isOpen={data.length > 0 || false} size={modalSize}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Results</ModalHeader>
          <ModalCloseButton  />

          <ModalBody>
            {data.length > 0 ? (
              data.map((item) => (
                <Box
                  key={item.properties.place_id}
                  my={2}
                  p={3}
                  borderWidth="1px"
                  borderRadius="md"
                  _hover={{ bg: "gray.50" }}
                  cursor="pointer"
                >
                  <Text fontWeight={500}>
                    {item.properties.address_line1}
                  </Text>

                  <Text fontSize="sm" color="gray.500">
                    {item.properties.formatted}
                  </Text>
                </Box>
              ))
            ) : (
              <Text color="gray.400">No results</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  );
}
