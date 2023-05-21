import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback } from "react";

import BgSvg from "@/src/assets/svg/bg.svg";
import { Button, Input, OAuthButtons } from "@/src/components";
import { Formik } from "formik";
import { SignUpValidationSchema } from "@/src/validations";
import { Api } from "@/src/api";
import { useNavigation, useRouter } from "expo-router";
import { User } from "@/src/interfaces";

const SignUp = () => {
  const { navigate } = useNavigation();
  const { replace } = useRouter();

  const handler = useCallback((values: User) => {
    try {
      Api.auth.signIn(values).then(({ access_token }) => {
        if (access_token) {
          replace("../root/main");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ScrollView className="relative flex-1 bg-[#f5f5f5] pb-6">
      <View className="absolute min-w-full min-h-full">
        <BgSvg fill={"rgba(0,0,0,0.5))"} />
      </View>
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
          validationSchema={SignUpValidationSchema}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={handler}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View className="m-4 pb-8 border-b border-b-[#eeeeee]">
              <Input
                placeholder="Nome"
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                errorMessage={errors.firstName}
              />
              <Input
                placeholder="Sobrenome"
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                errorMessage={errors.lastName}
              />
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
                title="Criar conta"
              />
              <TouchableOpacity onPress={() => navigate("Sign-in" as never)}>
                <View className="flex flex-row items-center justify-center mt-4">
                  <Text>Já tens uma conta?</Text>
                  <Text className="text-tertiary font-black ml-1">Entrar</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <OAuthButtons />
      </View>
    </ScrollView>
  );
};

export default SignUp;
