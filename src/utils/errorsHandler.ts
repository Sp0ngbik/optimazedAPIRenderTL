import { appActions } from "../redux/reducers/app_reducer"
import { AxiosResponse, isAxiosError } from "axios"
import { Dispatch } from "@reduxjs/toolkit"

export type T_ErrorType = {
  messages: { field: string; message: string }[]
}

export const networkErrorHandler = (dispatch: Dispatch, err: unknown) => {
  let errorMessage: string
  if (isAxiosError<T_ErrorType>(err)) {
    errorMessage = err.response ? err.response.data.messages[0].message : err.message
  } else {
    errorMessage = (err as Error).message
  }
  dispatch(appActions.appSetStatusAC({ status: "failed" }))
  dispatch(appActions.appSetInformMessageAC({ informMessage: errorMessage }))
}

export const localErrorHandler = (dispatch: Dispatch, err: AxiosResponse) => {
  dispatch(appActions.appSetStatusAC({ status: "failed" }))
  dispatch(appActions.appSetInformMessageAC({ informMessage: err.data.messages[0] }))
}
