import { create } from "zustand";
import http from "../../api/interseptor";
import { Auth_request } from "@/interfaces/auth";

const AuthStore = create <Auth_request> ((set) => ({
    Login: async (data) => {
        try{
            const response = await http.post("/auth/sign-in", data);
            return response
        }catch(err){
            console.log(err);
        }
    },
    Register: async (data) => {
        try{
            const response = await http.post("/auth/user/sign-up", data);
            return response
        }catch(err){
            console.log(err);
        }
    },
    GetUser: async ({id}) => {
        try{
            const response = await http.get(`/admin/${id}`);
            return response
        }catch(err){
            console.log(err);
        }
    }
}));




export default AuthStore;