import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Pressable,
  Dimensions,
} from "react-native";
import React from "react";
import { Input, JobCard, Select } from "@/src/components";

import FilterSvg from "@/src/assets/svg/filter.svg";
import SearchSvg from "@/src/assets/svg/search.svg";
import MegaphoneSvg from "@/src/assets/svg/megaphone.svg";
import { useHomeController } from "./controller";
import { Link } from "expo-router";
import { Modalize } from "react-native-modalize";
import normalize from "@/src/helper/normalize";
import { Formik } from "formik";

const { height } = Dimensions.get("window");

import CostPorHourSvg from "@/src/assets/svg/form/coins.svg";
import ClockSvg from "@/src/assets/svg/form/clock.svg";
import SkillSvg from "@/src/assets/svg/form/skill.svg";

const Home = () => {
  const {
    userSkills,
    works,
    refreshing,
    load,
    filter,
    modalizeRef,
    handlerSkillType,
    skillTypes,
    selectedTime,
    formikRef,
    handlerFilterOptions,
    handlerFilterOptionsReset,
    skillType,
    skillTypeID,
    colorScheme,
  } = useHomeController();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing.value} onRefresh={load} />
      }
      className="flex-1 flex flex-col gap-3 bg-[#fafafa] dark:bg-black pt-28"
    >
      <ScrollView
        className="bg-white dark:bg-[#1a1a1a]"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex flex-row p-4">
          <Pressable
            onPress={() => modalizeRef.current?.open()}
            className="flex items-center justify-center border border-[#e8e8e8] dark:border-[#2a2a2a] rounded-lg p-2"
          >
            <SearchSvg
              height={20}
              fill={colorScheme === "light" ? "rgb(107,114,128)" : "#ccc"}
            />
          </Pressable>
          <Pressable
            className={`flex items-center justify-center ml-2 py-3 px-4 rounded-lg 
            ${
              filter.job?.skillType === ""
                ? "bg-primary"
                : "bg-[#f8f8f8] dark:bg-[#2a2a2a]"
            }
            `}
            onPress={() => handlerSkillType("")}
          >
            <Text
              className={`font-[500] ${
                filter.job?.skillType === "" ? "text-white" : "dark:text-white"
              }`}
            >
              Todos
            </Text>
          </Pressable>
          {userSkills.value.map(({ name, skillType }, index) => (
            <Pressable
              onPress={() => handlerSkillType(skillType?.name || "")}
              className={`flex items-center justify-center mx-2 py-3 px-4 rounded-lg ${
                filter.job?.skillType === skillType?.name
                  ? "bg-primary"
                  : "bg-[#f8f8f8] dark:bg-[#2a2a2a]"
              } `}
              key={index}
            >
              <Text
                className={` font-[500] ${
                  filter.job?.skillType === skillType?.name
                    ? "text-white"
                    : "dark:text-white"
                }`}
              >
                {skillType?.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View className="flex flex-row items-center p-4 bg-white dark:bg-[#1a1a1a]">
        <View className="flex-1">
          <Text className="text-[16px] text-gray-500 dark:text-white">
            Queres um biscateiro?
          </Text>
        </View>
        <View>
          <Link href={"/Publication"}>
            <View className="flex flex-row items-center justify-center rounded-full bg-black  px-5 h-[42px]">
              <View className="mr-3">
                <MegaphoneSvg width={16} fill={"#ffffff"} />
              </View>

              <Text className="font-bold text-xs text-white">Publicar</Text>
            </View>
          </Link>
        </View>
      </View>

      <View className="flex flex-col bg-white dark:bg-[#1a1a1a] p-4 mb-52">
        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-500 ">
            Sugestões de trabalho
          </Text>
        </View>
        <View>
          {works.value.map((item, index, arr) => (
            <JobCard
              key={index}
              data={item}
              isLastChild={index + 1 === arr.length}
            />
          ))}
        </View>
      </View>

      <Modalize
        ref={modalizeRef}
        withReactModal
        //handlePosition="inside"
        modalHeight={normalize(height - 150)}
        modalStyle={{
          backgroundColor: colorScheme === "dark" ? "#111" : "#fff",
        }}
        HeaderComponent={
          <View className="flex flex-row items-center p-4 mt-2 border-b border-b-slate-100 dark:border-b-[#222]">
            <View className="flex flex-1">
              <Text className="font-black text-[16px] dark:text-white">
                Filtrar
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={handlerFilterOptionsReset}>
                <Text className="font-medium text-primary text-[16px]">
                  Reiniciar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        FooterComponent={
          <View className="flex justify-center items-center flex-row p-4 py-6 mb-3">
            <Pressable
              onPress={() => formikRef.current?.handleSubmit?.()}
              className="flex flex-row items-center justify-center rounded-full bg-black  px-5 h-[42px]"
            >
              <View className="mr-3">
                <FilterSvg width={16} fill={"#ffffff"} />
              </View>
              <Text className="font-bold text-xs text-white">
                Filtrar dados
              </Text>
            </Pressable>
          </View>
        }
      >
        <View className="flex flex-col p-4">
          <Formik
            innerRef={formikRef}
            initialValues={{
              minCostPerHour: filter.job?.costPerHour?.min || undefined,
              maxCostPerHour: filter.job?.costPerHour?.max || undefined,
              time: filter.job?.type || "null",
              skillTypeId: skillTypeID.value || "0",
            }}
            onSubmit={handlerFilterOptions}
          >
            {({ handleChange, handleBlur, values, errors }) => (
              <View>
                <View className="my-2">
                  <Text className="font-bold dark:text-white">Habilidades</Text>
                </View>
                <Select
                  placeholder="Habilidade"
                  onValueChange={(value) => {
                    if (!value) return;

                    try {
                      const fn = handleChange("skillTypeId");
                      fn(value?.toString());
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  errorMessage={errors.skillTypeId}
                  leftElement={
                    <SkillSvg width={15} height={15} fill={"#aeaeae"} />
                  }
                  items={(skillTypes.value || []).map((item) => {
                    return {
                      label: item.name || "",
                      value: item.id || 0,
                    };
                  })}
                />

                <View className="my-2">
                  <Text className="font-bold dark:text-white">Duração</Text>
                </View>
                <Select
                  placeholder="Duração"
                  value={values.time as string}
                  onValueChange={handleChange("time")}
                  errorMessage={errors.time}
                  leftElement={
                    <ClockSvg width={15} height={15} fill={"#aeaeae"} />
                  }
                  items={[
                    { label: "Horas", value: "HOUR" },
                    { label: "Dias", value: "DAY" },
                    { label: "Semanas", value: "WEEK" },
                    { label: "Meses", value: "MONTH" },
                    { label: "Anos", value: "YEAR" },
                  ]}
                />
                <View className="flex flex-row gap-3">
                  <View className="flex-1">
                    <View className="my-2">
                      <Text className="font-bold dark:text-white">
                        Valor mínimo
                      </Text>
                    </View>
                    <Input
                      placeholder="Valor por hora"
                      errorMessage={errors.minCostPerHour}
                      currencyProps={{
                        value: parseFloat(
                          values?.minCostPerHour?.toString() || "0"
                        ),
                        onBlur: handleBlur("minCostPerHour"),
                        onChangeValue: (value) => {
                          if (!value) return;
                          const fn = handleChange("minCostPerHour");
                          try {
                            fn(value?.toString());
                          } catch (error) {
                            console.log(error);
                          }
                        },
                        suffix: " Kz",
                        delimiter: ".",
                        separator: ",",
                        precision: 2,
                        minValue: 0,
                      }}
                      leftElement={
                        <CostPorHourSvg
                          width={15}
                          height={15}
                          fill={"#aeaeae"}
                        />
                      }
                    />
                  </View>
                  <View className="flex-1">
                    <View className="my-2">
                      <Text className="font-bold dark:text-white">
                        Valor máximo
                      </Text>
                    </View>
                    <Input
                      placeholder="Valor por hora"
                      errorMessage={errors.maxCostPerHour}
                      currencyProps={{
                        value: parseFloat(
                          values?.maxCostPerHour?.toString() || "0"
                        ),
                        onBlur: handleBlur("maxCostPerHour"),
                        onChangeValue: (value) => {
                          if (!value) return;
                          const fn = handleChange("maxCostPerHour");
                          try {
                            fn(value?.toString());
                          } catch (error) {
                            console.log(error);
                          }
                        },
                        suffix: " Kz",
                        delimiter: ".",
                        separator: ",",
                        precision: 2,
                        minValue: 0,
                      }}
                      leftElement={
                        <CostPorHourSvg
                          width={15}
                          height={15}
                          fill={"#aeaeae"}
                        />
                      }
                    />
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </Modalize>
    </ScrollView>
  );
};
export default Home;
