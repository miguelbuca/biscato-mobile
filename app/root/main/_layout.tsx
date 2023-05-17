import { theme } from "@/tailwind.config";
import React from "react";
import { Tabs } from "expo-router";

import HomeSvg from "@/src/assets/svg/home.svg";
import MapPinSvg from "@/src/assets/svg/map-pin.svg";
import JobSvg from "@/src/assets/svg/job.svg";
import UserSvg from "@/src/assets/svg/user.svg";

const Layout = () => {
  const SUB_VALUE = 5;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#cccccc",
        tabBarLabelStyle: {
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <HomeSvg height={size - SUB_VALUE} fill={color} />
          ),
        }}
        name="Home"
      />
      <Tabs.Screen
        options={{
          title: "Nearby",
          tabBarIcon: ({ color, size }) => (
            <MapPinSvg height={size - SUB_VALUE} fill={color} />
          ),
        }}
        name="Nearby"
      />

      <Tabs.Screen
        options={{
          title: "Applied",
          tabBarIcon: ({ color, size }) => (
            <JobSvg height={size - SUB_VALUE} fill={color} />
          ),
        }}
        name="Applied"
      />
      <Tabs.Screen
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <UserSvg height={size - SUB_VALUE} fill={color} />
          ),
        }}
        name="Account"
      />
    </Tabs>
  );
};

export default Layout;
