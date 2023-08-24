import { useDispatch } from "react-redux";
import { resetMessage } from "../slices/photoSlice";
 function ResetComponentMessage() {
	const dispatch = useDispatch();
	setTimeout(() => {
		dispatch(resetMessage());
	}, 2000);
}
export default ResetComponentMessage