import axios from "axios";
import { ENTRYPOINT } from "@/utils/config";

// Creating an instance for axios to be used by the token interceptor service
const instance = axios.create({
  baseURL: ENTRYPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;