
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

const Dashboard = () => {
  const [user, setUser]       = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

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
      const res = await api.post("/user/getUserData", { token: jwt });
      if (res.data.status === "success") {
        setUser(res.data.user);
        setPackages(res.data.packages || []);
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
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Counts per status
  const counts = {
    pending:   packages.filter((p) => p.status?.toLowerCase() === "pending").length,
    transit:   packages.filter((p) => p.status?.toLowerCase() === "transit").length,
    delivered: packages.filter((p) => p.status?.toLowerCase() === "delivered").length,
  };

  // Filtered list
  const filtered = packages.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "transit") return p.status?.toLowerCase() === "transit";
    return p.status?.toLowerCase() === activeTab;
  });

  const stats = {
    total:     packages.length,
    pending:   counts.pending,
    inTransit: counts.transit,
    delivered: counts.delivered,
  };

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg={bg}>
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  return (
    <Box bg={bg} minH="100vh" pb={10}>
      <DashboardHeader
        name={user?.fullname?.split(" ")[0]?.toUpperCase() || "USER"}
        onRefresh={fetchUserData}
        onPostPackage={() => router.push("/dashboard/post-package")}
      />

      <StatsGrid stats={stats} />

      <FilterTabs
        active={activeTab}
        counts={counts}
        onChange={setActiveTab}
      />

      {filtered.length === 0 ? (
        <EmptyState onPostPackage={() => router.push("/dashboard/post-package")} />
      ) : (
        filtered.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            onClick={() => router.push(`/dashboard/package/${pkg.id}`)}
          />
        ))
      )}
    </Box>
  );
};

export default Dashboard;
