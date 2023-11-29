import { createSlice } from "@reduxjs/toolkit";
import { APIStatus } from "../../constants";
import {deleteStudent, getStudents, getStudent, updateStudent } from "./user.service";


type studentsData = {
	id: number,
    name: string,
    age: number,
    email: string
}


export type StudentsReducer = {
	contents: studentsData[],
	student : studentsData,
	isLoading: APIStatus.FULFILLED|APIStatus.REJECTED|null,
	updateSuccess: APIStatus.FULFILLED|APIStatus.REJECTED|null,
	deleteSucess: APIStatus.FULFILLED|APIStatus.REJECTED|null,
	error: null,
}

const initialState: StudentsReducer = {
	contents:[],
	student: {} as studentsData,
	isLoading: null,
	updateSuccess:null,
	deleteSucess: null,
	error:null
};

const studentsSlice = createSlice({
	name: "students",
	initialState,
	reducers: {
		clearStudents(state) {
			state.isLoading = null;
		},
		clearDeleted(state) {
			console.log("DELETED HAS BEEN CLICKED");
			state.deleteSucess = null;
		},
		clearUpdateStudents(state){
			state.updateSuccess = null;
		}
	},
	extraReducers(builder) {
		builder.addCase(getStudents.fulfilled, (state, action) => {
			state.isLoading = APIStatus.FULFILLED;
			state.contents = action.payload;
		});
		builder.addCase(getStudents.rejected, (state, action) => {
			state.isLoading = APIStatus.REJECTED;
		});
		builder.addCase(deleteStudent.fulfilled, (state) => {
			state.deleteSucess = APIStatus.FULFILLED;
		});
		builder.addCase(getStudent.fulfilled, (state,action) => {
			state.student = action.payload;
		});
		builder.addCase(updateStudent.fulfilled,(state)=>{
			state.updateSuccess = APIStatus.FULFILLED;
		});
		builder.addCase(updateStudent.rejected,(state)=>{
			state.updateSuccess = APIStatus.REJECTED;
		});
	}
});

export const {
	clearStudents,
	clearDeleted,
	clearUpdateStudents
} = studentsSlice.actions;
export default studentsSlice.reducer;