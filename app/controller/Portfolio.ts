import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { PortfolioItem, User } from "@/src/interfaces";
import { AuthSelectors } from "@/src/reduxStore/slices/auth";
import { useSearchParams } from "expo-router";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

export const usePortfolioController = () => {
  const { userId } = useSearchParams<{ userId: string }>();
  const logged: User = useSelector(AuthSelectors).user;
  const user = useBetterState<User | undefined>(undefined);
  const isMyPortfolio = useBetterState<boolean>(false);
  const data = useBetterState<PortfolioItem[]>([
    {
      id: 1,
      image:
        "https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg",
      description: "Pioneer LHS Chaise Lounger in Grey Colour",
    },
    {
      id: 2,
      image:
        "https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red",
      description: "Precedant Furniture",
    },
    {
      id: 3,
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg",
      description: "Leverette Upholstered Platform Bed",
    },
    {
      id: 4,
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*",
      description: "Briget Accent Table",
    },
    {
      id: 5,
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*",
      description: "Rivet Emerly Media Console",
    },
    {
      id: 6,
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*",
      description: "Drew Barrymore Flower Home Accent Chair",
    },
    {
      id: 7,
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/goodee-ecobirdy-charlie-chairs-1594834221.jpg?crop=1xw:1xh;center,top&resize=768:*",
      description: "Ecobirdy Charlie Chair",
    },
  ]);

  const loadUserInfo = useCallback(async () => {
    if (!userId) return;
    const { data } = await Api.user.findUser(userId);
    user.value = data;
    isMyPortfolio.value = data.id === logged.id;
  }, [userId]);

  useEffect(() => {
    try {
      loadUserInfo();
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const getWorkCardStyles = (i: number) =>{
    return {
      paddingLeft: i % 2 === 0 ? 0 : 0,
      marginRight: i % 2 === 0 ? 0 : 12,
      marginBottom: i + 1 === data.value.length ? 48 : 0,
    };
  }
  
  return {
    data,
    logged,
    isMyPortfolio,
    user,
    getWorkCardStyles,
  };
};
