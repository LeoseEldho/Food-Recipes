import { createContext, useState } from "react";
import type { ReactNode } from "react";
import axios, { type AxiosInstance } from "axios";

type RecipeContextType = {
  login: boolean;
  setlogin: React.Dispatch<React.SetStateAction<boolean>>
  api: AxiosInstance;
  isRegister: String;
  setisRegister: React.Dispatch<React.SetStateAction<string>>;
};
export const RecipeContext = createContext<RecipeContextType | null>(null);

type Props = {
  children: ReactNode;
};

const BackUrl = import.meta.env.VITE_BACKEND_URL;
const api = axios.create({
  baseURL: BackUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const Context = ({ children }: Props) => {
  const [login, setlogin] = useState<boolean>(false);
  const [isRegister, setisRegister] = useState<string>("login");
  return (
    <RecipeContext.Provider
      value={{ login, setlogin, api, isRegister, setisRegister }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default Context;
