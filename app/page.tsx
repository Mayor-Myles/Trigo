'use client';



import {
  Box,
  
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CTA from "@/components/Cta";

  
export default function App(){

return(
<>
<Navbar />
  <Hero />
  <HowItWorks />
  <Features />
  <CTA />
</>


  );


}
