import { AnyAction, Reducer } from "@reduxjs/toolkit";
import  {StudentsReducer}  from "../services/user/user.slice";

export type RootReducer = {
	student: Reducer<StudentsReducer, AnyAction>;
};
