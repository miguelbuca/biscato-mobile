import { User } from "@/src/interfaces";

export const UserFunction = (user: User) => {
  const create = async () => {
    console.log("api", user);
  };
  const update = async () => {};
  return {
    create,
    update,
  };
};
