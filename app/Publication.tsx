import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { usePublicationController } from "./controller/Publication";
import { Formik } from "formik";
import { WorkValidationSchema } from "@/src/validations";
import { Button, Input, Select } from "@/src/components";

import PencilSvg from "@/src/assets/svg/form/pencil.svg";
import CostPorHourSvg from "@/src/assets/svg/form/coins.svg";
import ClockSvg from "@/src/assets/svg/form/clock.svg";
import SkillSvg from "@/src/assets/svg/form/skill.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Publication() {
  const { skillTypes, handlerCreateWork } = usePublicationController();
  return (
    <KeyboardAwareScrollView className="flex-1 flex px-2 flex-col gap-3 pt-5 bg-[#fafafa]">
      <View>
        <Formik
          validationSchema={WorkValidationSchema}
          initialValues={{
            costPerHour: undefined,
            description: undefined,
            term: undefined,
            time: undefined,
            totalTime: undefined,
            address: undefined,
            skillTypeId: undefined,
          }}
          onSubmit={(values) => console.log({ values })}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              <View className="flex flex-col bg-white mt-2 p-4 mb-8">
                {/*<Text className="text-base font-semibold text-gray-500 mb-5">
                Dados
              </Text>*/}
                <Input
                  placeholder="Título, nome..."
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={`${values?.description || ""}`}
                  errorMessage={errors.description}
                  leftElement={
                    <PencilSvg width={15} height={15} fill={"#aeaeae"} />
                  }
                />
                <Select
                  placeholder="Habilidade"
                  value={values.skillTypeId}
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
                  data={[
                    { value: "Hora", id: "HOUR" },
                    { value: "Dia", id: "DAY" },
                    { value: "Semana", id: "WEEK" },
                    { value: "Mês", id: "MONTH" },
                    { value: "Ano", id: "YEAR" },
                  ]}
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
