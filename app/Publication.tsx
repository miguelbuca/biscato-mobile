import { View } from "react-native";
import React from "react";
import { usePublicationController } from "./controller/Publication";
import { Formik } from "formik";
import { WorkValidationSchema } from "@/src/validations";
import { Accordion, Button, Input, Select } from "@/src/components";

import PencilSvg from "@/src/assets/svg/form/pencil.svg";
import CostPorHourSvg from "@/src/assets/svg/form/coins.svg";
import ClockSvg from "@/src/assets/svg/form/clock.svg";
import UserClockSvg from "@/src/assets/svg/form/user-clock.svg";
import SkillSvg from "@/src/assets/svg/form/skill.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import normalize from "@/src/helper/normalize";

export default function Publication() {
  const { skillTypes, selectedTime, navigate } = usePublicationController();
  return (
    <KeyboardAwareScrollView className="flex-1 flex flex-col gap-3 bg-[#f5f5f5] dark:bg-black pt-28">
      <View className="mb-52">
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
          onSubmit={(work) => {
            navigate("Location", {
              work,
            });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              <Accordion
                title="Dados"
                isOpen={true}
                style={{
                  marginBottom: normalize(15),
                }}
              >
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
                  onValueChange={(value) => {
                    if (!value) return;
                    const fn = handleChange("skillTypeId");
                    try {
                      fn(value?.toString());
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  itemKey={1}
                  errorMessage={errors.skillTypeId}
                  leftElement={
                    <SkillSvg width={15} height={15} fill={"#aeaeae"} />
                  }
                  items={skillTypes.value.map((item) => {
                    return {
                      label: item.name || "",
                      value: item.id || 0,
                    };
                  })}
                />
                <Input
                  placeholder="Valor por hora"
                  errorMessage={errors.costPerHour}
                  currencyProps={{
                    value: parseFloat(values?.costPerHour || "0"),
                    onBlur: handleBlur("costPerHour"),
                    onChangeValue: (value) => {
                      if (!value) return;
                      const fn = handleChange("costPerHour");
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
                    <CostPorHourSvg width={15} height={15} fill={"#aeaeae"} />
                  }
                />
                <Select
                  placeholder="Duração"
                  value={values.time}
                  onValueChange={(value) => {
                    if (!value) return;
                    const fn = handleChange("time");
                    try {
                      fn(value?.toString());
                    } catch (error) {
                      console.log(error);
                    }
                  }}
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
              </Accordion>

              <Accordion
                style={{
                  marginBottom: normalize(15),
                }}
                title="Descrição"
              >
                <Input
                  placeholder="Escrever..."
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={`${values?.description || ""}`}
                  multiline
                  className="min-h-[200px] py-2"
                />
              </Accordion>
              <Accordion title="Termos e condições">
                <Input
                  placeholder="Escrever..."
                  onChangeText={handleChange("term")}
                  onBlur={handleBlur("term")}
                  value={`${values?.term || ""}`}
                  multiline
                  className="min-h-[200px] py-4"
                />
              </Accordion>

              <SafeAreaView className="px-4">
                <Button
                  className="mb-5"
                  onPress={() => handleSubmit()}
                  title="Próximo"
                />
              </SafeAreaView>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
}
