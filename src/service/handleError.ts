import { AxiosError } from 'axios'
import AxRequestError, { ErrorResponse } from './error'

export function handelError(error: AxiosError | AxRequestError): AxRequestError {
	const err = error instanceof AxRequestError ? error : new AxRequestError(error.response?.status || 1, error.message, error, error.response?.data as ErrorResponse)
	return err
}
