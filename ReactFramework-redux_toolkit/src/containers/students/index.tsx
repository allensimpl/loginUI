import React from "react";
import { useEffect, useState } from "react";
import "./styles.css";
import { deleteStudent, getStudents } from "../../services/user/user.service";
import { useAppDispatch, useAppSelector } from "../../modal/hooks";
import { APIStatus } from "../../constants";
import { clearDeleted } from "../../services/user/user.slice";
import { useNavigate } from "react-router-dom";
import { Locations } from "../../constants/locations";
import Modall from "../../components/modal";
import { Modal } from "antd";

export const Students: React.FunctionComponent = () => {
	console.log("Hello Tested!");
	// const { contents, isLoading } = useAppSelector((state) => state.student);
	const students = useAppSelector((state) => state.student);
	const studentsDispatch = useAppDispatch();
	const navigate = useNavigate();
	const [toDeleteVal, setToDeleteVal] = useState<number | undefined>();

	useEffect(() => {
		studentsDispatch(getStudents());
	}, []);

	useEffect(() => {
		if (students.deleteSucess === APIStatus.FULFILLED) {
			studentsDispatch(getStudents());
			studentsDispatch(clearDeleted());
		}
	}, [students.deleteSucess]);

	const deleteStudentClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
		e.stopPropagation();
		studentsDispatch(deleteStudent(id));
	};

	const navigateToProfile = (id: number) => {
		if (id) {
			navigate(Locations.STUDENT_PROFILE + `/${id}`, { replace: true });
		}
	};

	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = (event: React.MouseEvent<HTMLElement>, id: number) => {
		event.stopPropagation();
		console.log("The one that is being deleted now is id: ", id);
		setToDeleteVal(id);
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const deleteIt = (id: number | undefined) => {
		console.log("deleting id: ", id);
		studentsDispatch(deleteStudent(id));
		setIsModalOpen(false);
	};
	return (
		<div className="student-container">
			<Modal
				title="Basic Modal"
				open={isModalOpen}
				onOk={() => handleOk()}
				// onCancel={handleCancel}
				onCancel={() => deleteIt(toDeleteVal)}
				cancelText="Delete"
			>
				<p>Delete it</p>
			</Modal>

			{students.contents.map((student) => {
				return (
					<>
						<div onClick={() => navigateToProfile(student.id)} className="student-card" key={student.id}>
							<h3>{student.name}</h3>
							<h3>{student.age}</h3>
							<h3>{student.id}</h3>
							<button
								className="button-2"
								// onClick={(e) => deleteStudentClick(e, student.id)}
								onClick={(event) => showModal(event, student.id)}
							>
								DELETE
							</button>
						</div>
					</>
				);
			})}
		</div>
	);
};
