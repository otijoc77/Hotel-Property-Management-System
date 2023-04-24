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
import Floorplan from "./components/Pages/Floorplan";
import FloorForm from "./components/Forms/FloorForm";
import RoomForm from "./components/Forms/RoomForm";
import { UserList } from "./components/Lists/UserList";
import { HotelList } from "./components/Lists/HotelList";
import { ReservationForm } from "./components/Forms/ReservationForm";

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
        path: '/company/:id/edit',
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
        path: '/hotel-list',
        element: <HotelList />
    },
    {
        path: '/company/:companyId/hotel-register',
        element: <HotelForm />
    },
    {
        path: '/hotel/:id/edit',
        element: <HotelForm />
    },
    {
        path: '/hotel/:id',
        element: <HotelPage />
    },
    {
        path: '/hotel/:hotelId/floorplan',
        element: <Floorplan />
    },
    {
        path: '/hotel/:hotelId/floorplan/:id',
        element: <Floorplan />
    },
    {
        path: '/hotel/:hotelId/floor-register',
        element: <FloorForm />
    },
    {
        path: '/hotel/:hotelId/floor/:floorId',
        element: <RoomForm />
    },
    {
        path: '/location-register',
        element: <LocationForm />
    },
    {
        path: '/users',
        element: <UserList />
    },
    {
        path: '/login',
        element: <LoginForm />
    },
    {
        path: '/register',
        element: <RegisterForm />
    },
    {
        path: '/reservation',
        element: <ReservationForm />
    },
];

export default AppRoutes;
