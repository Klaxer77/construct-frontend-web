import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";
import {
  Activation,
  CreateObject,
  Dashboard,
  Journal,
  Login,
  NotFound,
  ObjectPage,
  Objects,
  Policy,
  Profile,
  Progress,
  RemarkPage,
  Settings,
  Support,
  TaskPage,
  Tasks,
  Users,
  Vedomosti,
  ViolationPage,
} from "../pages";

import { Layout } from "./layout";
import { ProtectedRoute } from "./ProtectedRoute";
import { YMaps } from "@pbe/react-yandex-maps";

const queryClient = new QueryClient();

export const LayoutRoute = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <YMaps query={{ apikey: "adae10ae-ccee-4f1b-8715-2162230acac7" }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/support" element={<Support />} />

            <Route element={<ProtectedRoute />}>
              <Route index element={<Navigate to="/dashboard" replace />} />

              <Route element={<LayoutRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/objects" element={<Objects />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/vedomosti" element={<Vedomosti />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />

                <Route path="/objects/:name" element={<ObjectPage />} />
                <Route path="/objects/remark/:name" element={<RemarkPage />} />
                <Route
                  path="/objects/violation/:name"
                  element={<ViolationPage />}
                />
                <Route path="/tasks/:name" element={<TaskPage />} />

                <Route
                  element={<ProtectedRoute roles={["construction_control"]} />}
                >
                  <Route path="/objects/create" element={<CreateObject />} />
                </Route>
                <Route
                  element={
                    <ProtectedRoute
                      roles={["construction_control", "inspection"]}
                    />
                  }
                >
                  <Route
                    path="/objects/activation/:name"
                    element={<Activation />}
                  />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </YMaps>
  </StrictMode>
);
