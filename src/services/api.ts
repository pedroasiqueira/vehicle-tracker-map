import axios from "axios";

const api = axios.create({
  baseURL: "https://develop-back-rota.rota361.com.br/recruitment/",
});

// Adicione seu token diretamente aqui ou dinamicamente (ideal)
api.interceptors.request.use((config) => {
    const token = process.env.REACT_APP_API_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default api;
