
import { typeValueAction } from 'root/utils'
/*
 * App actions
 */
export const APP_LOADING = 'APP_LOADING'
export const appLoading = typeValueAction(APP_LOADING)

export const APP_LOADING_STARTED = 'APP_LOADING_STARTED'
export const appLoadingStarted = typeValueAction(APP_LOADING_STARTED)

export const APP_LOADING_FAILED = 'APP_LOADING_FAILED'
export const appLoadingFailed = typeValueAction(APP_LOADING_FAILED)

export const APP_LOADING_SUCCEED = 'APP_LOADING_SUCCEED'
export const appLoadingSucceed = typeValueAction(APP_LOADING_SUCCEED)
/*
 * Calendar actions
 */
export const SET_INITIAL_DATE = 'SET_INITIAL_DATE'
export const setInitialDate = typeValueAction(SET_INITIAL_DATE)

export const UPDATE_SELECTED_DATE = 'UPDATE_SELECTED_DATE'
export const updateSelectedDate = typeValueAction(UPDATE_SELECTED_DATE)

export const SET_SELECTED_DATE = 'SET_SELECTED_DATE'
export const setSelectedDate = typeValueAction(SET_SELECTED_DATE)

export const INCREMENT_SELECTED_DATE_BY_MONTH = 'INCREMENT_SELECTED_DATE_BY_MONTH'
export const incrementSelectedDateByMonth = typeValueAction(INCREMENT_SELECTED_DATE_BY_MONTH)

export const DECREMENT_SELECTED_DATE_BY_MONTH = 'DECREMENT_SELECTED_DATE_BY_MONTH'
export const decrementSelectedDateByMonth = typeValueAction(DECREMENT_SELECTED_DATE_BY_MONTH)
