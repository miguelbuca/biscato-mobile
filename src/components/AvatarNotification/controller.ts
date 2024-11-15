import { Api, baseURL } from "@/src/api";
import normalize from "@/src/helper/normalize";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Notification } from "@/src/interfaces";
import { useEffect } from "react";
import { theme } from "@/tailwind.config";

const jobSVG = `<svg width="${normalize(24)}" height="${normalize(
  24
)}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_406_2278)">
<path d="M19 4H17.9C17.6679 2.87141 17.0538 1.85735 16.1613 1.12872C15.2687 0.40009 14.1522 0.00145452 13 0L11 0C9.8478 0.00145452 8.73132 0.40009 7.83875 1.12872C6.94618 1.85735 6.3321 2.87141 6.1 4H5C3.67441 4.00159 2.40356 4.52888 1.46622 5.46622C0.528882 6.40356 0.00158786 7.67441 0 9L0 12H24V9C23.9984 7.67441 23.4711 6.40356 22.5338 5.46622C21.5964 4.52888 20.3256 4.00159 19 4ZM8.184 4C8.39008 3.41709 8.77123 2.91209 9.2753 2.55409C9.77937 2.19608 10.3817 2.00256 11 2H13C13.6183 2.00256 14.2206 2.19608 14.7247 2.55409C15.2288 2.91209 15.6099 3.41709 15.816 4H8.184Z" fill="${
  (theme?.extend?.colors as { tertiary: string }).tertiary
}"/>
<path d="M13 14.9999C13 15.2651 12.8946 15.5194 12.7071 15.707C12.5196 15.8945 12.2652 15.9999 12 15.9999C11.7348 15.9999 11.4804 15.8945 11.2929 15.707C11.1054 15.5194 11 15.2651 11 14.9999V13.9999H0V18.9999C0.00158786 20.3255 0.528882 21.5963 1.46622 22.5336C2.40356 23.471 3.67441 23.9983 5 23.9998H19C20.3256 23.9983 21.5964 23.471 22.5338 22.5336C23.4711 21.5963 23.9984 20.3255 24 18.9999V13.9999H13V14.9999Z" fill="${
  (theme?.extend?.colors as { primary: string }).primary
}"/>
</g>
<defs>
<clipPath id="clip0_406_2278">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
`;

export const AvatarNotificationController = (data: Notification) => {
  const img = useBetterState<string>(jobSVG);
  const isSVG = useBetterState<boolean>(true);
  useEffect(() => {
    switch (data.type) {
      case "SYSTEM":
        img.value = jobSVG;
        isSVG.value = true;
        break;

      default:
        if (data.extra?.userId) {
          Api.user.findUser(data.extra?.userId).then(({ data }) => {
            img.value = `${baseURL}/${data?.Person?.avatar}`;
          });

          isSVG.value = false;
        }

        break;
    }
  }, [data.type, data.extra]);

  return {
    img,
    isSVG,
  };
};
