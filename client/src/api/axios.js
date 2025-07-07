import axios from "axios";

const instance = axios.create({
  baseURL: "https://moodsync-server.onrender.com",
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.detail === "Token has expired. Please login again."
    ) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("authUser");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


export default instance;
