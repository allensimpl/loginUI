import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ErrorBoundary } from "../plugins/error-boundary";
import { Locations } from "../constants/locations";
import { Students } from "../containers/students";
import { StudentProfile } from "../containers/student-profile";

export const webRouter = createBrowserRouter([
	{
		path: Locations.STUDENTS,
		element: <Students />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: Locations.STUDENT_PROFILE + "/:id",
		element: <StudentProfile />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: "*",
		element: <Navigate to={Locations.BASE} />,
		errorElement: <ErrorBoundary />,
	},
]);
