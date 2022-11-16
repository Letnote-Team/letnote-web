import { AxiosResponse } from "axios";
import { ShowFn } from "../contexts/ToastContext";
import { api } from "../services/api";

const handleRepsonse = (show: typeof ShowFn, res: AxiosResponse | undefined) => {
  const isError =
    res?.status.toString().startsWith("4") ||
    res?.status.toString().startsWith("5");

  show({
    title: isError ? "Erro!" : "Sucesso",
    desc: res?.data.message,
    type: isError ? "error" : "success",
  });
};

export const toastInterceptor = (show: typeof ShowFn) => {
  // api.interceptors.response.clear();

  // api.interceptors.response.use((response) => {
  //   console.log("oi?");
  //   handleRepsonse(show, response);

  //   return response;
  // }, (error) => {
  //   console.log("oi?");
  //   handleRepsonse(show, error.response);

  //   return Promise.reject(error);
  // });

};