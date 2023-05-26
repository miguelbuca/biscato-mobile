import { View, Text, ScrollView } from "react-native";
import React from "react";
import { usePublicationController } from "./controller/Publication";
import { Formik } from "formik";
import { WorkValidationSchema } from "@/src/validations";

export default function Publication() {
  const { handlerCreateWork } = usePublicationController();
  return (
    <ScrollView className="flex-1 flex flex-col gap-3 pt-5 bg-[#fafafa]">
      <View className="flex flex-col bg-white mt-2 p-4 mb-8">
        <Formik
          validationSchema={WorkValidationSchema}
          initialValues={{
            costPerHour: 1,
            description: "",
            term: "",
            time: "DAY",
            totalTime: 1,
            address: {
              name: "",
              description: "",
              lat: 0,
              lng: 0,
            },
          }}
          onSubmit={handlerCreateWork}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View className="mb-5">
              <Text className="text-base font-semibold text-gray-500">
                Sugestões de trabalho
              </Text>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
