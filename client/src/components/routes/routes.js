import { Auth, MainPage, Registration,  CalculatorPage, StatisticPage } from "../pages/index"
import { CALCULATE_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, STATISTIC_ROUTE, TRAININGS_ROUTE } from "../utils/consts"

export const authRoutes = [
    {
        path: CALCULATE_ROUTE,
        Component: CalculatorPage
    },
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: STATISTIC_ROUTE,
        Component: StatisticPage
    }
]

export const publicPoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    }
]