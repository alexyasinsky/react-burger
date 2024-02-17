import {Navigate, useLocation} from "react-router-dom";
import {selectIsAuthChecked, selectUser} from "../../services/store/user/reducers";
import {JSX, ReactElement} from "react";
import Loader from "../loader/loader";
import {useAppSelector} from "../../services/store/hooks";

type TProtectedRouteProps = {
    onlyUnAuth?: boolean,
    component: ReactElement
}

type TOnlyUnAuthProps = Omit<TProtectedRouteProps, 'onlyUnAuth'>;

const ProtectedRoute = ({onlyUnAuth = false, component}: TProtectedRouteProps): JSX.Element => {
    // isAuthChecked это флаг, показывающий, что проверка токена произведена.
    // при этом результат этой проверки не имеет значения, важно только,
    // что сам факт проверки имел место.
    const isAuthChecked = useAppSelector(selectIsAuthChecked);
    const user = useAppSelector(selectUser);
    const location = useLocation();

    if (!isAuthChecked) {
        // Запрос еще выполняется
        // Выводим прелоадер в ПР
        return (
           <Loader/>
        );
    }

    if (onlyUnAuth && user) {
        // Пользователь авторизован, но роут предназначен для неавторизованного пользователя.
        // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
        const {from} = location.state || {from: {pathname: "/"}};
        return (<Navigate to={from}/>);
    }

    if (!onlyUnAuth && !user) {
        return (<Navigate to="/login" state={{from: location}}/>);
    }


    // !onlyUnAuth && profile-user Пользователь авторизован и роут для авторизованного пользователя
    return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({component}: TOnlyUnAuthProps) => (
    (<ProtectedRoute onlyUnAuth={true} component={component}/>)
);
