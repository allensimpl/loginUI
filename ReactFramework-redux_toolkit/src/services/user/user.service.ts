import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Config } from "../../config";
import { axiosConfig } from "../../utils/util.fns";

type studentsData = {
	id: number,
    name: string,
    age: number,
    email: string
}


type UserDetails = {
	email: string;
	password: string;
	rememberMe: boolean;
};

type ForgotPassword = {
	email: string;
};

type ResetPassword = {
	token: string;
	password: string;
};

export const login = createAsyncThunk("user/login", async (user: UserDetails) => {
	const response = await axios.post(Config.apiUrl + "/signin", user);
	return response.data;
});

export const getCurrentUSerDetails = createAsyncThunk("user/details", async () => {
	const response = await axios.get(Config.apiSecureUrl + "/user/me", axiosConfig());
	return response.data;
});

export const forgotPassword = createAsyncThunk("user/forgotPassword", async (forgotPassword: ForgotPassword) => {
	const response = await axios.post(Config.apiUrl + "/forgotPassword", forgotPassword);
	return response.data;
});

export const verifyToken = createAsyncThunk("user/verifyFpToken", async (token: string) => {
	const response = await axios.post(Config.apiUrl + "/verifyFpToken/" + token);
	return response.data;
});

export const resetPassword = createAsyncThunk("user/resetPassword", async (resetPassword: ResetPassword) => {
	const response = await axios.post( Config.apiUrl + "/resetPassword", resetPassword );
	return response.data;
});

export const getStudents = createAsyncThunk("students/", async () => {
	const response = await axios.get( Config.apiUrl + "/students?pageNo=1&pageSize=100" );
	const allStudents = await response.data;
	return allStudents;
});

export const getStudent = createAsyncThunk("student/", async (id:number) => {
	console.log("id clicked @ ",id);
	const response = await axios.get( Config.apiUrl + `/students/${id}` );
	console.log("awaited single response: ",await response.data);
	return response.data;
});

export const deleteStudent = createAsyncThunk("student", async(id: number|undefined) => {
	const response = await axios.delete(Config.apiUrl + `/students/${id}` );
	console.log("response ", response);
});

export const updateStudent = createAsyncThunk("updateStudent/", async ({ id, studentData }: { id: any; studentData: any }) => {
	const response = await axios.put(Config.apiUrl + `/students/${id}`, studentData);
	return response.data;
});

export const login = createAsyncThunk("login",ascync()=>{
	
})