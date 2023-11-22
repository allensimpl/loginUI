import { RootReducer } from "../modal/root-reducer";
import studentReducer from "../services/user/user.slice";

export const rootReducer: RootReducer = {
	// user: userReducer,
	student : studentReducer
};
