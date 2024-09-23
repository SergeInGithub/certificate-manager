import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { RootLayout } from '../layouts';
import {
  AddCertificate,
  EditCertificate,
  ExampleOne,
  Home,
  NotFound,
} from '@pages';

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
        <Route
          path="edit-certificate/:id"
          element={<EditCertificate />}
        />
      </Route>
      <Route
        path="*"
        element={<NotFound />}
      />
    </Route>,
  ),
);
