import { View, Text } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { Avatar, Button, Input } from '@/src/components';

const index = () => {
  return (
    <KeyboardAwareScrollView className="px-4 mb-10">
      <View className="flex justify-center items-center my-10">
        <Avatar withUpload className='h-[90px] w-[90px] border-[transparent]' />
      </View>
      <View className="mt-4 bg-white rounded-lg p-4">
        <Formik
          //validationSchema={SignInValidationSchema}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            console.log({ values });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View className="my-4">
              <Input
                placeholder="(+244) 000 000 000"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="phone-pad"
                errorMessage={errors.email}
              />
              <Input
                placeholder="(+244) 000 000 000"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="phone-pad"
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
                title="Enviar"
              />
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default index