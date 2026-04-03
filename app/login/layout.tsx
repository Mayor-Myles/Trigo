
"use client";

import { ChakraProvider } from '@chakra-ui/react';
import Spinner from "@/spinner";
import {Suspense} from "react";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

      <body>
        
        <ChakraProvider>
<Suspense fallback={null}>
          <Spinner />

          {children}
</Suspense>
        </ChakraProvider>
          
      </body>
    </html>
  );
}
