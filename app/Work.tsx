import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useWorkController } from "./controller/Work";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import BgSvg from "@/src/assets/svg/bg.svg";
import MapPinSvg from "@/src/assets/svg/map-pin.svg";
import VerifiedSvg from "@/src/assets/svg/verified.svg";

import { SvgXml } from "react-native-svg";
import normalize from "@/src/helper/normalize";
import { BlurView } from "expo-blur";
import { format } from "@/src/helper/format";
import { Accordion, Button } from "@/src/components";

const { width, height } = Dimensions.get("screen");

export default function Work() {
  const { params, scrollRef, handlerCreateApplication } = useWorkController();

  return (
    <>
      <StatusBar style="light" />
      <View className={`flex-1`}>
        <KeyboardAwareScrollView
          bounces={false}
          ref={scrollRef}
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
              className="flex flex-row items-center justify-between p-2 px-4"
              intensity={30}
              tint="dark"
            >
              <View>
                <Button
                  style={{
                    backgroundColor: "#fff",
                  }}
                  onPress={() => {
                    scrollRef.current && scrollRef?.current.scrollToEnd(true);
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
          <View className="flex flex-col p-4 my-8">
            <View className="flex flex-row items-center gap-x-3 mb-10">
              <View className="flex-1 flex-col">
                <View className="flex flex-row items-center">
                  <Text className="font-bold text-[12px]">{`${params?.user?.firstName} ${params?.user?.lastName}`}</Text>
                  <View className="flex items-center ml-1 rounded-full">
                    <VerifiedSvg height={20} width={20} />
                  </View>
                </View>
                <View>
                  <Text className="text-xs text-gray-500">Contratante</Text>
                </View>
              </View>
              <View>
                <TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: "rgba(0,0,0,0.06)",
                    }}
                    className="flex flex-row items-center justify-center p-3 rounded-lg"
                  >
                    <View className="mr-1">
                      <MapPinSvg
                        height={12}
                        width={12}
                        fill={params.skillType?.background}
                      />
                    </View>
                    <Text
                      style={{
                        color: params.skillType?.background,
                      }}
                      className="text-xs"
                    >
                      Mostrar endereço
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {params.description && (
              <Accordion
                style={{
                  borderRadius: normalize(8),
                  marginBottom: normalize(15),
                }}
                title="Descrição"
                isOpen
              >
                <Text>{params.description}</Text>
              </Accordion>
            )}
            {params.term && (
              <Accordion
                style={{
                  borderRadius: normalize(8),
                  marginBottom: normalize(15),
                }}
                title="Termos e condições"
              >
                <Text>{params.term}</Text>
              </Accordion>
            )}
            <View className="flex items-center justify- my-4">
              <Text className="text-gray-400">(94) candidaturas</Text>
            </View>
            <View>
              <Button
                style={{
                  backgroundColor: "#fff",
                }}
                onPress={handlerCreateApplication}
              >
                <Text
                  style={{
                    color: params.skillType?.background,
                  }}
                  className="text-black text-base font-medium"
                >
                  Enviar candidatura
                </Text>
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}
