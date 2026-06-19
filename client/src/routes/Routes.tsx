import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { Loader } from "@mantine/core";

const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const ObjectBoardPage = lazy (() => import("../pages/ObjectBoardPage"));
const ObjectPage = lazy(() => import("../pages/ObjectPage"));
const ObjectMap = lazy(() => import("../pages/ObjectsMap"));



export const router = createBrowserRouter([
    {
        path:'/',
        element: <Navigate to='/category' replace />
    },
    {
        path: '/category',
        element: (
            <Suspense fallback={<Loader />}>
                <CategoryPage />
            </Suspense>
        )
    },
    {
        path: '/objects',
        element: (
            <Suspense fallback={<Loader />}>
                <Navigate to='/category' replace />
            </Suspense>
        )
    },
    {
        path: 'objects/:type',
        element: (
            <Suspense fallback={<Loader />}>
                <ObjectBoardPage/>
            </Suspense>
        ), 
        children: [{
            path: ':id',
            element: (
                <Suspense fallback={<Loader />}>
                    <ObjectPage />
                </Suspense>
        ) 
        }
    ]
    },
    {
        path: 'objects/:type/map',
        element: (
            <Suspense fallback={<Loader />}>
                <ObjectMap />
            </Suspense>
        ),
        children: [{
            path: ':id',
            element: (
                <Suspense fallback={<Loader />}>
                    <ObjectPage />
                </Suspense>
            )
        }]
    }
])