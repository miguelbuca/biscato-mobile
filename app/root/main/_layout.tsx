import { theme } from "@/tailwind.config";
import React from "react";
import { Tabs } from "expo-router";

import AntDesign from "react-native-vector-icons/AntDesign";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#cccccc",
        tabBarLabelStyle: {
          fontWeight: "800",
        },
      }}
    >
      <Tabs.Screen
        options={{
          title: "Home",
          tabBarIcon: (props) => <AntDesign name={`home`} {...props} />,
        }}
        name="Home"
      />
      <Tabs.Screen
        options={{
          title: "Nearby",
          /*tabBarIcon: (props) => <AntDesign name={`pin-map`} {...props} />,*/
        }}
        name="Nearby"
      />

      <Tabs.Screen
        options={{
          title: "Applied",
        }}
        name="Applied"
      />
      <Tabs.Screen
        options={{
          title: "Account",
          tabBarIcon: (props) => <AntDesign name={`user`} {...props} />,
        }}
        name="Account"
      />
    </Tabs>
  );
};

export default Layout;
