import { Cliente } from "@/types/Cliente.d";
import axios,{AxiosPromise} from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:8080"
})

export const fetchAll = ():AxiosPromise<Cliente[]> => {
    return axiosInstance.get(`api/Clientes`)
} 

export const save = (data: Cliente):AxiosPromise<Cliente> =>
    data?.id ?
    axiosInstance.put(`api/Cliente/${data.id}`,data) :
    axiosInstance.post(`api/Cliente`,data);

export const remove = (data: Cliente):AxiosPromise =>
    axiosInstance.delete(`api/Cliente/${data.id}`);
