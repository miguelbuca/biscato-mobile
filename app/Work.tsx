import { View, Text, Dimensions } from "react-native";
import React from "react";
import { useWorkController } from "./controller/Work";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import BgSvg from "@/src/assets/svg/bg.svg";
import { SvgXml } from "react-native-svg";
import normalize from "@/src/helper/normalize";
import { BlurView } from "expo-blur";
import { format } from "@/src/helper/format";
import { Button } from "@/src/components";

const { width, height } = Dimensions.get("screen");

export default function Work() {
  const { params } = useWorkController();
  return (
    <>
      <StatusBar style="light" />
      <View className={`flex-1`}>
        <KeyboardAwareScrollView
          bounces={false}
          className="flex-1 flexflex-col"
        >
          <View
            style={{
              backgroundColor: params.skillType?.background,
              minHeight: normalize(320),
            }}
            className="relative overflow-hidden flex flex-col justify-end"
          >
            <View className="flex-1 flex items-center justify-center">
              <View className="absolute top-[-80] w-full h-full">
                <BgSvg
                  width={width}
                  height={height}
                  fill={"rgba(255,255,255,0.5)"}
                />
              </View>
              <View
                style={{
                  width: normalize(90),
                  height: normalize(90),
                }}
                className="w-[100px] h-[100px] bg-white rounded-full items-center justify-center"
              >
                <SvgXml
                  xml={params.skillType?.svgXml || ""}
                  width={normalize(50)}
                  height={normalize(50)}
                  fill={params.skillType?.background}
                />
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: "rgba(255,255,255,0.3)",
                  }}
                  className="px-4 py-2 my-4 rounded-full"
                >
                  <Text
                    style={{
                      fontSize: normalize(18),
                    }}
                    className="text-white font-semibold"
                  >
                    {params.title}
                  </Text>
                </View>
              </View>
            </View>
            <BlurView
              className="flex flex-row items-center justify-between p-2"
              intensity={30}
              tint="dark"
            >
              <View>
                <Button
                  style={{
                    backgroundColor: "#fff",
                  }}
                >
                  <Text
                    style={{
                      color: params.skillType?.background,
                    }}
                    className="text-black text-base font-medium"
                  >
                    Candidatar-se
                  </Text>
                </Button>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: normalize(22),
                  }}
                  className="text-white font-semibold"
                >
                  {format().amount(params.costPerHour || 0)}
                </Text>
                <Text
                  style={{
                    fontSize: normalize(8),
                  }}
                  className="text-white uppercase font-semibold"
                >
                  Valor Por Hora
                </Text>
              </View>
            </BlurView>
          </View>
          <View>
            <Text>test</Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}
