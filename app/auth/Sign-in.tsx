import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";

import BgSvg from "@/src/assets/svg/bg.svg";
import { Button, Input, OAuthButtons } from "@/src/components";
import { Formik } from "formik";
import { SignInValidationSchema } from "@/src/validations";
import { useSignInController } from "./controller";

const { height } = Dimensions.get("window");

const SignIn = () => {
  const { handler, navigate } = useSignInController();

  return (
    <>
      <View className="absolute min-w-full min-h-full bg-[#f5f5f5]">
        <BgSvg fill={"rgba(0,0,0,0.5))"} />
      </View>
      <ScrollView className="relative flex-1  pb-6">
        <View
          className="rounded-lg"
          style={{
            backgroundColor: "#ffffff",
            width: "90%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
            marginTop: 150,
            alignSelf: "center",
          }}
        >
          <Formik
            validationSchema={SignInValidationSchema}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handler}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View className="m-4 pb-8 border-b border-b-[#eeeeee]">
                <Input
                  placeholder="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                  errorMessage={errors.email}
                />
                <Input
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                  errorMessage={errors.password}
                />

                <Button
                  className="mt-4"
                  onPress={() => handleSubmit()}
                  title="Entrar"
                />
                <TouchableOpacity onPress={() => navigate("Sign-up" as never)}>
                  <View className="flex flex-row items-center justify-center mt-4">
                    <Text>Não tenho uma conta!</Text>
                    <Text className="text-tertiary font-black ml-1">
                      Criar agora
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <OAuthButtons />
        </View>
      </ScrollView>
    </>
  );
};

export default SignIn;
