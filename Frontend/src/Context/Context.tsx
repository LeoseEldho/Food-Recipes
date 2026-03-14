import { createContext, useState } from "react";
import type { ReactNode } from "react";
import axios, { type AxiosInstance } from "axios";


type RecipeContextType = {
  value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    BackUrl: string;
    api:AxiosInstance
};
export const RecipeContext = createContext<RecipeContextType | null>(null);

type Props = {
  children: ReactNode;
};

const BackUrl= import.meta.env.VITE_BACKEND_URL;
const api=axios.create({
    baseURL: BackUrl,
      headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

const Context = ({ children }: Props) => {
  const [value, setValue] = useState<string>("hai");

  return (
    <RecipeContext.Provider value={{ value, setValue ,BackUrl,api}}>
      {children}
    </RecipeContext.Provider>
  );
};

export default Context;
