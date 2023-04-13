import { Home } from "./components/Home";
import { CompanyForm } from "./components/Forms/CompanyForm";
import CompanyPage from "./components/Pages/CompanyPage";
import { CompanyList } from "./components/Lists/CompanyList";
import HotelForm from "./components/Forms/HotelForm";
import { RegisterForm } from "./components/Forms/RegisterForm";
import { LoginForm } from "./components/Forms/LoginForm";
import { HomePage } from "./components/Pages/HomePage";
import { LocationForm } from "./components/Forms/LocationForms/LocationForm";
import HotelPage from "./components/Pages/HotelPage";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/home',
        element: <HomePage />
    },
    {
        path: '/company-register',
        element: <CompanyForm />
    },
    {
        path: '/company/:id',
        element: <CompanyPage />
    },
    {
        path: '/company-list',
        element: <CompanyList />
    },
    {
        path: '/company/:companyId/hotel-register',
        element: <HotelForm />
    },
    {
        path: '/hotel/:id',
        element: <HotelPage />
    },
    {
        path: '/location-register',
        element: <LocationForm />
    },
    {
        path: '/login',
        element: <LoginForm />
    },
    {
        path: '/register',
        element: <RegisterForm />
    },
];

export default AppRoutes;
