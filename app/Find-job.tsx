import { View, FlatList, Platform } from "react-native";
import React from "react";
import { FindJobCard } from "@/src/components";
import { SvgXml } from "react-native-svg";
import { useFindJobController } from "./root/controller";
import normalize from "@/src/helper/normalize";

const FindJob = () => {
  const { skilltypes, userSkilltypesIds } = useFindJobController();

  return (
    <View className="flex-1 ">
      <FlatList
        style={{
          flex: 1,
          paddingTop: Platform.OS !== "android" ? normalize(160) : normalize(20),
        }}
        data={skilltypes.value}
        numColumns={2}
        className="p-4"
        renderItem={({ item, index }) => (
          <View
            key={index}
            className="flex w-[50%] items-center justify-center"
          >
            <FindJobCard
              isChecked={userSkilltypesIds.value.includes(item.id)}
              image={
                <SvgXml
                  height={40}
                  width={40}
                  fill={"#2e2e2e"}
                  xml={`${item.svgXml}`}
                />
              }
              name={item?.name}
            />
          </View>
        )}
      />
    </View>
  );
};

export default FindJob;
