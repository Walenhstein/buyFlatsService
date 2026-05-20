import { createBrowserRouter, Navigate } from "react-router";
import CategoryPage from "../pages/CategoryPage";
import ObjectBoardPage from "../pages/ObjectBoardPage";
import ObjectPage from "../pages/ObgectPage";


export const router = createBrowserRouter([
    {
        path:'/',
        element: <Navigate to='/category' replace />
    },
    {
        path: '/category',
        element: <CategoryPage />
    },
    {
        path: '/objects',
        element: <Navigate to='/category' replace />
    },
    {
        path: 'objects/:type',
        element: <ObjectBoardPage/>, 
        children: [{
            path: ':id',
            element: <ObjectPage /> 
        }]
    }
])