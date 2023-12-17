import { View, Text, FlatList, Pressable, SafeAreaView } from "react-native";
import React from "react";
import { useAccountController } from "./controller/Account";
import { Link } from "expo-router";
import { Avatar, Button, Input, InputDataPicker } from "@/src/components";
import { baseURL } from "@/src/api";
import { Modalize } from "react-native-modalize";
import normalize from "@/src/helper/normalize";
import BirthdaySvg from "@/src/assets/svg/birthday.svg";
import moment from "moment";

const Account = () => {
  const {
    person,
    items,
    user,
    selectedPersonIndex,
    modalizeRef,
    handlerSelectInput,
    selectedInput,
    colorScheme,
    handlerEditInput,
    editInput,
    handlerSaveInputChange,
  } = useAccountController();

  return (
    <>
      <FlatList
        data={items}
        className="flex-1 dark:bg-black pt-28"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            <View className="my-4 flex flex-col">
              <View className="items-center justify-center">
                <Avatar
                  withUpload
                  letters={`${user?.firstName?.[0] && user?.firstName?.[0]} ${
                    user?.lastName?.[0] && user?.lastName?.[0]
                  }`}
                  image={`${baseURL}/${user.persons?.[selectedPersonIndex]?.avatar}`}
                  className="h-[90px] w-[90px] border-[transparent]"
                />
              </View>
              <View className="flex-row my-4 items-center justify-center">
                <Link
                  selectionColor={"transparent"}
                  href={"/Portfolio?personId="+person?.id}
                >
                  <Text className="font-semibold dark:text-white">
                    Portfólio
                  </Text>
                </Link>
              </View>
            </View>
          );
        }}
        renderItem={({ item, index }) =>
          item.type !== "none" ? (
            <Pressable
              onPress={() => handlerSelectInput(item)}
              className={`flex flex-row bg-white gap-x-2 dark:bg-[#222] p-4 py-5 border-b border-[#f8f8f8] dark:border-b-[#222] ${
                index === items.length - 1 ? "border-b" : "dark:border-b-[#111]"
              } ${index === items.length - 1 ? "mb-40" : ""}`}
            >
              <View className="flex flex-1">
                <Text className="dark:text-white font-bold">{item.label}</Text>
              </View>
              <View
                className={`flex flex-1 ${
                  item.disabled
                    ? "bg-black/5 dark:bg-white/5 p-1.5 rounded-md"
                    : ""
                }`}
              >
                <Text
                  style={{
                    overflow: "hidden",
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="dark:text-white opacity-70"
                >
                  {item.value}
                </Text>
              </View>
            </Pressable>
          ) : (
            <View key={index} className="p-4 pb-4">
              <Text className="text-black/50 dark:text-white/50 text-lg">
                {item.label}
              </Text>
            </View>
          )
        }
      />
      <Modalize
        ref={modalizeRef}
        withReactModal
        adjustToContentHeight
        HeaderComponent={
          <View className="px-4">
            <View className="py-4 border-b border-b-slate-100">
              <Text className="font-bold text-base">
                {selectedInput.value.label}
              </Text>
            </View>
          </View>
        }
        modalStyle={{
          backgroundColor: colorScheme === "dark" ? "#111" : "#fff",
        }}
        FooterComponent={
          <SafeAreaView>
            <View className="p-4">
              <Button title="Salvar" onPress={handlerSaveInputChange} />
            </View>
          </SafeAreaView>
        }
      >
        <View className="p-4">
          {(selectedInput.value.inputType === "text" ||
            !selectedInput.value.inputType) && (
            <Input
              value={editInput.value}
              defaultValue={selectedInput.value.value}
              placeholder={selectedInput.value.label}
              onChangeText={handlerEditInput}
            />
          )}
          {selectedInput.value.inputType === "phone" && (
            <Input
              value={editInput.value}
              defaultValue={selectedInput.value.value}
              placeholder={selectedInput.value.label}
              onChangeText={handlerEditInput}
              isPhone
            />
          )}
          {selectedInput.value.inputType === "textarea" && (
            <Input
              value={editInput.value}
              defaultValue={selectedInput.value.value}
              placeholder={selectedInput.value.label}
              multiline
              onChangeText={handlerEditInput}
              style={{
                height: normalize(100),
              }}
            />
          )}
          {selectedInput.value.inputType === "date" && (
            <InputDataPicker
              leftElement={
                <BirthdaySvg width={15} height={15} fill={"#aeaeae"} />
              }
              value={
                selectedInput.value.value
                  ? new Date(editInput.value) ||
                    new Date(selectedInput.value.value)
                  : new Date()
              }
              onChange={(date) => {
                handlerEditInput(new Date(date).toISOString());
              }}
              isDarkModeEnabled={colorScheme === "dark"}
              maximumDate={moment().subtract(18, "years").toDate()}
              label={selectedInput.value.value}
            />
          )}
        </View>
      </Modalize>
    </>
  );
};
export default Account;
