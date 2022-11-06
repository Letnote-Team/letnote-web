import axios from "axios";
import { parseCookies } from "nookies";
import { useToast } from "../hooks/useToast";

export const getAPIClient = (ctx?: any) => {
  const { "letnote.user": user } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:8000/api/",
  });

  if (user) {
    api.defaults.headers["Authorization"] = `Bearer ${JSON.parse(user).token}`;
  }

  return api;
};
