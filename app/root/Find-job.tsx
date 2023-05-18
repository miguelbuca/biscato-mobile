import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { FindJobCard } from "@/src/components";
import { SvgXml } from "react-native-svg";

const FindJob = () => {
  const setoresTrabalhoInformal = [
    "Vendas ambulantes",
    "Serviços domésticos",
    "Artesanato",
    "Reciclagem e coleta de resíduos",
    "Transporte informal",
    "Serviços de entrega",
    "Serviços de construção",
    "Cuidadores de animais de estimação",
    "Serviços de beleza",
    "Serviços de alimentação",
    "Serviços de costura e ajustes",
    "Serviços de limpeza de veículos",
    "Serviços de jardinagem",
    "Serviços de eletricista e encanador",
    "Serviços de informática",
    "Venda de produtos artesanais",
    "Serviços de tradução e interpretação",
    "Serviços de fotografia",
    "Serviços de treinamento pessoal",
    "Serviços de eventos",
    "Corte de cabelo e barbearia",
    "Serviços de limpeza residencial e comercial",
    "Organização de festas e eventos",
    "Venda de roupas e acessórios usados",
    "Reparos e consertos de eletrodomésticos",
    "Aulas particulares e tutoria",
    "Serviços de paisagismo e jardinagem",
    "Revenda de produtos importados ou de segunda mão",
    "Serviços de marcenaria e carpintaria",
    "Fabricação e venda de produtos alimentícios caseiros",
    "Serviços de pintura residencial",
    "Montagem e reparo de móveis",
    "Serviços de limpeza de escritórios e empresas",
    "Serviços de lavanderia e passadoria",
    "Aluguel de equipamentos e ferramentas",
    "Guias turísticos independentes",
    "Venda de artigos de decoração",
    "Serviços de consultoria em diversas áreas",
    "Produção e venda de produtos agrícolas",
    "Serviços de organização e arrumação de ambientes",
  ];

  return (
    <View className="h-full bg-white">
      <FlatList
        data={setoresTrabalhoInformal}
        numColumns={2}
        className="py-12 px-4"
        renderItem={({ item, index }) => (
          <View
            key={index}
            className="flex w-[50%] items-center justify-center"
          >
            <FindJobCard
              image={
                <SvgXml
                  fill={"#2e2e2e"}
                  xml={`<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_403_3129)">
<path d="M17.9942 2.28613C16.7736 1.19568 15.2788 0.458716 13.6706 0.154564C12.0623 -0.149588 10.4016 -0.00941759 8.86709 0.559992C7.33259 1.1294 5.98241 2.10649 4.96186 3.3861C3.94132 4.66572 3.28904 6.19941 3.07523 7.82213C2.88321 9.24498 3.03679 10.6931 3.52295 12.0441C4.00912 13.395 4.81357 14.6089 5.86823 15.5831C6.52043 16.1551 7.04671 16.8563 7.41372 17.6422C7.78072 18.4282 7.98045 19.2819 8.00023 20.1491V20.3101C8.00129 21.2885 8.3904 22.2264 9.08218 22.9182C9.77396 23.61 10.7119 23.9991 11.6902 24.0001H12.3102C13.2886 23.9991 14.2265 23.61 14.9183 22.9182C15.6101 22.2264 15.9992 21.2885 16.0002 20.3101V19.7611C16.0152 18.9946 16.1956 18.2403 16.529 17.55C16.8625 16.8596 17.3411 16.2494 17.9322 15.7611C18.8908 14.9216 19.6601 13.8879 20.189 12.7286C20.718 11.5693 20.9945 10.3109 21.0004 9.0366C21.0062 7.76235 20.7413 6.5014 20.223 5.33729C19.7048 4.17317 18.9451 3.13247 17.9942 2.28413V2.28613ZM12.3102 22.0001H11.6902C11.2422 21.9996 10.8126 21.8214 10.4958 21.5046C10.179 21.1877 10.0008 20.7582 10.0002 20.3101C10.0002 20.3101 9.99323 20.0501 9.99223 20.0001H14.0002V20.3101C13.9997 20.7582 13.8215 21.1877 13.5047 21.5046C13.1878 21.8214 12.7583 21.9996 12.3102 22.0001ZM16.6102 14.2591C15.4717 15.2467 14.6494 16.5479 14.2462 18.0001H13.0002V10.8161C13.5831 10.61 14.0881 10.2289 14.4461 9.72483C14.8041 9.22076 14.9977 8.61839 15.0002 8.00013C15.0002 7.73492 14.8949 7.48056 14.7073 7.29303C14.5198 7.10549 14.2655 7.00013 14.0002 7.00013C13.735 7.00013 13.4807 7.10549 13.2931 7.29303C13.1056 7.48056 13.0002 7.73492 13.0002 8.00013C13.0002 8.26535 12.8949 8.5197 12.7073 8.70724C12.5198 8.89478 12.2655 9.00013 12.0002 9.00013C11.735 9.00013 11.4807 8.89478 11.2931 8.70724C11.1056 8.5197 11.0002 8.26535 11.0002 8.00013C11.0002 7.73492 10.8949 7.48056 10.7073 7.29303C10.5198 7.10549 10.2655 7.00013 10.0002 7.00013C9.73502 7.00013 9.48066 7.10549 9.29313 7.29303C9.10559 7.48056 9.00023 7.73492 9.00023 8.00013C9.0028 8.61839 9.19632 9.22076 9.55432 9.72483C9.91232 10.2289 10.4173 10.61 11.0002 10.8161V18.0001H9.67823C9.22722 16.5093 8.38135 15.1683 7.23023 14.1191C6.25319 13.2087 5.55696 12.0378 5.2237 10.7446C4.89045 9.45141 4.93408 8.08985 5.34944 6.82063C5.76481 5.5514 6.53457 4.42748 7.5679 3.5815C8.60123 2.73551 9.85499 2.20277 11.1812 2.04613C11.4562 2.01544 11.7326 2.00008 12.0092 2.00013C13.7268 1.99503 15.3849 2.62876 16.6612 3.77813C17.4009 4.43773 17.992 5.24702 18.3952 6.15236C18.7984 7.05769 19.0046 8.0384 19 9.02945C18.9955 10.0205 18.7803 10.9993 18.3689 11.9009C17.9574 12.8025 17.3589 13.6063 16.6132 14.2591H16.6102Z" />
</g>
<defs>
<clipPath id="clip0_403_3129">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
`}
                />
              }
              name={item}
            />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="flex flex-col min-h-[150px]">
            <View className="flex items-center justify-center p-4 my-8 ">
              <Text className="text-center text-2xl max-w-[300px]">
                Que tipo de{" "}
                <Text className="text-primary font-bold">Trabalho</Text> você
                está <Text className="font-bold">procurando?</Text>
              </Text>
            </View>
            <View className="mb-8">
              <TextInput
                placeholder="Escreva o nome..."
                placeholderTextColor={`#cccccc`}
                className="border border-[#cccccc] rounded-full py-4 px-8 bg-[#fcfcfc]"
              />
            </View>
          </View>
        )}
        ListFooterComponent={() => <View className="h-[200px]" />}
      />
      <View className="absolute self-center mb-8 bottom-0 flex items-center justify-center p-4">
        <TouchableOpacity>
          <View className="flex items-center justify-center rounded-full bg-black py-4 px-8 h-[55px]">
            <Text className="font-bold text-white">Encontrar trabalhos</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FindJob;
