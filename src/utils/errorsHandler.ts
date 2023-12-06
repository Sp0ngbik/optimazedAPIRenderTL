import {AppDispatch} from "../redux/store";
import {appSetInformMessageAC, appSetStatusAC} from "../redux/reducers/app_reducer";
import {AxiosResponse, isAxiosError} from "axios";
import {Dispatch} from "@reduxjs/toolkit";

export type T_ErrorType = {
    messages: { field: string, message: string }[]
}


export const networkErrorHandler = (dispatch: Dispatch, err: unknown) => {
    console.log(err)
    let errorMessage: string;
    if (isAxiosError<T_ErrorType>(err)) {
        errorMessage = err.response ? err.response.data.messages[0].message : err.message
    } else {
        errorMessage = (err as Error).message
    }
    dispatch(appSetStatusAC({status:'failed'}))
    dispatch(appSetInformMessageAC({informMessage:errorMessage}))

}

export const localErrorHandler = (dispatch: Dispatch, err: AxiosResponse) => {
    dispatch(appSetStatusAC({status:'failed'}))
    dispatch(appSetInformMessageAC(err.data.messages[0]))
}