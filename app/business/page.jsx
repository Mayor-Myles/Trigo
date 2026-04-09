
"use client";

import { useEffect, useState } from "react";
import { Box, Spinner, Flex, useColorModeValue, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import FilterTabs from "@/components/dashboard/FilterTabs";
import PackageCard from "@/components/dashboard/PackageCard";
import EmptyState from "@/components/dashboard/EmptyState";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {useAtom} from "jotai";
import {userDataAtom} from "@/utils/jotai";

const Dashboard = () => {
  const [user, setUser]       = useAtom(userDataAtom);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
const[isRefreshed,setIsRefreshed] = useState(false);
 const[allPackages,setAllPackages] = useState([]);
  const bg = useColorModeValue("gray.50", "gray.900");
  const toast = useToast();
  const router = useRouter();

  const fetchUserData = async () => {
    
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      router.push("/login");
      return;
    }
    try {
      setIsRefreshed(true);
      const res = await api.post("/user/getUserData", { jwt: jwt });
      const response = res.data;
      if (response.status === "success") {
        setUser(response.data);
        setPackages(response.data.packages || []);
        setAllPackages(response.data.packages);
        localStorage.setItem("token",response.data.token);
        
       toast({
          title: "Welcome",
         // description: "Please log in again.",
          status: "info",
          position: "bottom",
          duration: 3000,
        });
      } else {
        toast({
          title: "Session expired",
          description: "Please log in again.",
          status: "warning",
          position: "top",
          duration: 3000,
        });
        router.push("/login");
      }
    } catch {
      toast({
        title: "Error",
        description: "Could not load dashboard.",
        status: "error",
        position: "top",
        duration: 3000,
      });
    } finally {
      setLoading(false);
      setIsRefreshed(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Counts per status
  const counts = {
    all: packages.length,
    pending:   packages.filter((p) => p.status?.toLowerCase() === "pending").length,
    transit:   packages.filter((p) => p.status?.toLowerCase() === "transit").length,
    delivered: packages.filter((p) => p.status?.toLowerCase() === "delivered").length,
  };

  
  const stats = {
    total:     packages.length,
    pending:   counts.pending,
    inTransit: counts.transit,
    delivered: counts.delivered,
  };
const filter = () => {



}
  
  if (!user?.fullname) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg={bg}>
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  return (
<>
    <Navbar />
    <Box bg={bg} minH="100vh" pb={10}>
      <DashboardHeader
        name={user?.fullname?.split(" ")[0]?.toUpperCase() || "USER"}
        onRefresh={fetchUserData}
        isRefreshed={isRefreshed}
        onPostPackage={() => router.push("/business/post-package")}
      />

          <StatsGrid stats={stats} />
      
      <FilterTabs allPackages={allPackages} packages={packages} setPackages={setPackages}
        counts={counts}
      />
    
      {counts.all === 0 ? (
        <EmptyState onPostPackage={() => router.push("/post-package")} />
      ) : (
        packages.map((pkg) => (
          <PackageCard
            key={pkg.pid}
            pkg={pkg}
            onClick={() => router.push(`/package/${pkg.pid}`)}
          />
        ))
      )}
      
    </Box>
  <Footer />
</>
  );
};

export default Dashboard;
