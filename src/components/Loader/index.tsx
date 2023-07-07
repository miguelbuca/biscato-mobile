import { View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { LoaderSelectors } from "@/src/reduxStore/slices/loader";

import { SkypeIndicator } from "react-native-indicators";

import { theme } from "@/tailwind.config";

const Loader = () => {
  const { state } = useSelector(LoaderSelectors);

  return state ? (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.2)",
      }}
      className="absolute top-0 left-0 h-full w-full items-center justify-center"
    >
      <SkypeIndicator
        color={(theme?.extend?.colors as { primary: string })?.primary}
      />
    </View>
  ) : null;
};

export default Loader;
