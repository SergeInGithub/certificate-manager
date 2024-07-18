import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { RootLayout } from '../layouts';
import { AddCertificate, ExampleOne, Home, NotFound } from '@pages';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
    >
      <Route
        index
        element={<Home />}
      />
      <Route path="ml">
        <Route
          path="example-one"
          element={<ExampleOne />}
        />
        <Route
          path="add-certificate"
          element={<AddCertificate />}
        />
      </Route>
      <Route
        path="*"
        element={<NotFound />}
      />
    </Route>,
  ),
);
