'use client';



import {
  Box,
  
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import ContactUs from "@/components/ContactUs";
  
export default function App(){

return(
<>
<Navbar />
  <Hero />
  <HowItWorks />
  <Features />
  <Footer />
  <ContactUs />
</>


  );


}
