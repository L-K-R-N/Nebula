import { filterActionTypes } from "store/reducers/FilterReducer"

export const filterActionCreator = (payload: string) => {
    return {type: filterActionTypes.PROJECT_REQUEST, payload: payload}
}