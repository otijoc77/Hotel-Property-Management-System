import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { CompanyForm } from "./components/Forms/CompanyForm";
import { CompanyTable } from "./components/Tables/CompanyTable";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/company-register',
        element: <CompanyForm />
    },
    {
        path: '/company-list',
        element: <CompanyTable />
    },
];

export default AppRoutes;
