import { View, Text } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { Avatar, Button, Input, InputDataPicker } from "@/src/components";
import { PersonValidationSchema } from "@/src/validations/schema";
import moment from "moment";

import UserCardSvg from "@/src/assets/svg/user-card.svg";
import BirthdaySvg from "@/src/assets/svg/birthday.svg";
import { usePersonInfoController } from "./controller";

const PersonInfo = () => {
  const { handlerCreatePerson, handlerAvatar } = usePersonInfoController();
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      className="px-4 mb-10"
    >
      <View className="flex justify-center items-center my-10">
        <Avatar
          onUpload={handlerAvatar}
          withUpload
          className="h-[90px] w-[90px] border-[transparent]"
        />
      </View>
      <View className="mt-4 bg-white rounded-lg p-4">
        <Formik
          validationSchema={PersonValidationSchema}
          initialValues={{
            nif: "",
            phoneNumber: "",
            birthday: moment().subtract(18, "years").toDate().toISOString(),
          }}
          onSubmit={handlerCreatePerson}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View className="my-4">
              <Input
                placeholder="Nº BI ou NIF"
                onChangeText={handleChange("nif")}
                onBlur={handleBlur("nif")}
                value={values.nif}
                errorMessage={errors.nif}
                leftElement={
                  <UserCardSvg width={15} height={15} fill={"#aeaeae"} />
                }
              />
              <InputDataPicker
                leftElement={
                  <BirthdaySvg width={15} height={15} fill={"#aeaeae"} />
                }
                onChange={(_, value) => {
                  if (!value) return;
                  const fn = handleChange("birthday");
                  try {
                    fn(value?.toISOString());
                  } catch (error) {
                    console.log(error);
                  }
                }}
                maximumDate={moment().subtract(18, "years").toDate()}
                label="Aniversário"
                value={new Date(values.birthday)}
                errorMessage={errors.birthday as string}
              />
              <Input
                onChange={(value) => {
                  console.log(value);
                }}
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                value={values.phoneNumber}
                errorMessage={errors.phoneNumber}
                isPhone
              />

              <Button
                className="mt-4"
                onPress={handleSubmit as () => void}
                title="Enviar"
              />
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PersonInfo;
