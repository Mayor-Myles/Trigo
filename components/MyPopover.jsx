export default function MyPopover({ type, onSelect }) {
  const modalSize = useBreakpointValue({ base: "xs", md: "md" });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [pickupData, setPickupData] = useAtom(pickupDataAtom);
  const [deliveryData, setDeliveryData] = useAtom(deliveryDataAtom);
  const [, setPickupAddress] = useAtom(pickupAddressAtom);
  const [, setDeliveryAddress] = useAtom(deliveryAddressAtom);

  const chooseAddress = (item) => {
    const address = item.properties.formatted;

    if (type === "pickup") {
      setPickupAddress(address);
      setPickupData([]);
    } else {
      setDeliveryAddress(address);
      setDeliveryData([]);
    }

    onSelect && onSelect(address);
    handleClose();
  };

  const handleClose = () => {
    if (type === "pickup") {
      setPickupData([]);
    } else {
      setDeliveryData([]);
    }
    onClose();
  };

  useEffect(() => {
    if (type === "pickup" && pickupData.length > 0) onOpen();
    if (type === "delivery" && deliveryData.length > 0) onOpen();
  }, [pickupData, deliveryData]);

  const data = type === "pickup" ? pickupData : deliveryData;

  return (
    <Center>
      <Modal onClose={handleClose} isOpen={isOpen} size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Results</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {data?.length > 0 ? (
              data.map((item) => (
                <Box
                  key={item.properties.place_id}
                  my={2}
                  p={3}
                  borderWidth="1px"
                  borderRadius="md"
                  _hover={{ bg: "gray.200" }}
                  cursor="pointer"
                  onClick={() => chooseAddress(item)}
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
