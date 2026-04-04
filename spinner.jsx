'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  Spinner, 
  Center, 
  Box, 
  Portal,
  Fade
} from '@chakra-ui/react';

export default function SpinnerEffect() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200); // Small delay for better UX

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <Portal>
      <Fade in={isLoading}>
        <Center
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.4)" // Semi-transparent overlay
          zIndex="9999"
          backdropFilter="blur(2px)" 
        >
          <Box textAlign="center">
            <Spinner
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue"
              size="xl"
              mb={4}
            />
            <Box color="white" fontWeight="medium">
              Loading...
            </Box>
          </Box>
        </Center>
      </Fade>
    </Portal>
  );
}
