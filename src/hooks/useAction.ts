import { useDispatch } from "react-redux"
import ActionCreator from '../store/action-creators/index'
import { bindActionCreators } from "redux"

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(ActionCreator, dispatch)
}