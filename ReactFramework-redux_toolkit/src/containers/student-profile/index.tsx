import React, { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../modal/hooks";
import { getStudent, updateStudent } from "../../services/user/user.service";
import { Locations } from "../../constants/locations";
import { clearUpdateStudents } from "../../services/user/user.slice";

export const StudentProfile = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const studentSelector = useAppSelector((state) => state.student);
	const dispatch = useAppDispatch();
	const [student, setStudent] = useState({
		name: "",
		email: "",
		age: 0,
	});

	useEffect(() => {
		if (id) {
			console.log("dispatching ", id);
			dispatch(getStudent(parseInt(id)));
		}
	}, []);

	useEffect(() => {
		setStudent(studentSelector.student);
	}, [studentSelector.student]);

	useEffect(() => {
		if (studentSelector.updateSuccess === "FULFILLED") {
			dispatch(clearUpdateStudents());
			navigate(Locations.STUDENTS);
		}
		if (studentSelector.updateSuccess === "REJECTED") {
			dispatch(clearUpdateStudents());
		}
	}, [studentSelector.updateSuccess]);

	const changeStudentName = (name: string) => {
		setStudent({
			...student,
			name: name,
		});
	};

	const changeStudentAge = (age: number) => {
		setStudent({
			...student,
			age: age,
		});
		// console.log("consoling student", student);
	};

	const changeStudentEmail = (email: string) => {
		setStudent({
			...student,
			email: email,
		});
		// console.log("consoling student", student);
	};

	const handleUpdate = () => {
		if (id) {
			dispatch(updateStudent({ id, studentData: student }));
		}
	};

	// console.log("param ", id);
	// console.log("selector data: ", studentSelector.student.name);

	return (
		<>
			<div className="student-profile-page">
				<div className="student-profile-container">
					<h3>Name: {student.name}</h3>
					<input type="text" value={student.name} onChange={(event) => changeStudentName(event.target.value)}></input>
					<h3>Age: {student.age}</h3>
					<input
						type="text"
						value={student.age}
						onChange={(event) => changeStudentAge(parseInt(event.target.value))}
					></input>
					<h3>Email: {student.email}</h3>
					<input type="text" value={student.email} onChange={(event) => changeStudentEmail(event.target.value)}></input>
					<div>
						<button className="button-2" onClick={() => handleUpdate()}>
							Update
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
