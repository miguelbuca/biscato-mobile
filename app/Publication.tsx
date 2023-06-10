import { View, Text } from "react-native";
import React from "react";
import { usePublicationController } from "./controller/Publication";
import { Formik } from "formik";
import { WorkValidationSchema } from "@/src/validations";
import { Button, Input, Select } from "@/src/components";

import PencilSvg from "@/src/assets/svg/form/pencil.svg";
import CostPorHourSvg from "@/src/assets/svg/form/coins.svg";
import ClockSvg from "@/src/assets/svg/form/clock.svg";
import UserClockSvg from "@/src/assets/svg/form/user-clock.svg";
import SkillSvg from "@/src/assets/svg/form/skill.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Publication() {
  const { skillTypes, selectedTime, handlerCreateWork } =
    usePublicationController();
  return (
    <KeyboardAwareScrollView className="flex-1 flex px-2 flex-col gap-3 pt-5 bg-[#fafafa]">
      <View>
        <Formik
          validationSchema={WorkValidationSchema}
          initialValues={{
            title: undefined,
            costPerHour: undefined,
            description: undefined,
            term: undefined,
            time: "HOUR",
            totalTime: undefined,
            address: undefined,
            skillTypeId: undefined,
          }}
          onSubmit={handlerCreateWork}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              <View className="flex flex-col bg-white mt-2 p-4 mb-8">
                <Text className="text-base font-semibold text-gray-500 mb-5">
                  Dados
                </Text>
                <Input
                  placeholder="Título, nome..."
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={`${values?.title || ""}`}
                  errorMessage={errors.title}
                  leftElement={
                    <PencilSvg width={15} height={15} fill={"#aeaeae"} />
                  }
                />
                <Select
                  placeholder="Habilidade"
                  value={values.skillTypeId?.toString()}
                  onChange={(value) => {
                    const tm = handleChange("skillTypeId");

                    try {
                      tm(`${value["id"]}`);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  fields={["id", "name"]}
                  onBlur={handleBlur("skillTypeId")}
                  errorMessage={errors.skillTypeId}
                  leftElement={
                    <SkillSvg width={15} height={15} fill={"#aeaeae"} />
                  }
                  data={skillTypes.value}
                />
                <Input
                  placeholder="Valor por hora"
                  onChangeText={handleChange("costPerHour")}
                  onBlur={handleBlur("costPerHour")}
                  value={`${values?.costPerHour || ""}`}
                  keyboardType="numeric"
                  errorMessage={errors.costPerHour}
                  leftElement={
                    <CostPorHourSvg width={15} height={15} fill={"#aeaeae"} />
                  }
                />
                <Select
                  placeholder="Duração"
                  keyAsNumber={false}
                  value={values.time}
                  onChange={(value) => {
                    const tm = handleChange("time");
                    tm(value["id"]);
                  }}
                  onBlur={handleBlur("time")}
                  errorMessage={errors.time}
                  leftElement={
                    <ClockSvg width={15} height={15} fill={"#aeaeae"} />
                  }
                  getSelectedLabel={(title) => (selectedTime.value = title)}
                  data={[
                    { value: "Horas", id: "HOUR" },
                    { value: "Dias", id: "DAY" },
                    { value: "Semanas", id: "WEEK" },
                    { value: "Meses", id: "MONTH" },
                    { value: "Anos", id: "YEAR" },
                  ]}
                />
                <Input
                  placeholder={`Total de ${selectedTime.value}`}
                  onChangeText={handleChange("totalTime")}
                  onBlur={handleBlur("totalTime")}
                  value={`${values?.totalTime || ""}`}
                  keyboardType="numeric"
                  errorMessage={errors.totalTime}
                  leftElement={
                    <UserClockSvg width={15} height={15} fill={"#aeaeae"} />
                  }
                />
              </View>
              <View className="flex flex-col bg-white p-4">
                <Text className="text-base font-semibold text-gray-500 mb-5">
                  Descrição
                </Text>
                <Input
                  placeholder="Escrever..."
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={`${values?.description || ""}`}
                  multiline
                  className="min-h-[200px] py-4"
                />
              </View>
              <View className="flex flex-col bg-white p-4">
                <Text className="text-base font-semibold text-gray-500 mb-5">
                  Termos e condições
                </Text>
                <Input
                  placeholder="Escrever..."
                  onChangeText={handleChange("term")}
                  onBlur={handleBlur("term")}
                  value={`${values?.term || ""}`}
                  multiline
                  className="min-h-[200px] py-4"
                />
              </View>

              <SafeAreaView className="px-4">
                <Button
                  className="mb-5"
                  onPress={() => handleSubmit()}
                  title="Finalizar"
                />
              </SafeAreaView>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
}
