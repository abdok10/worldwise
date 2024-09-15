import { BrowserRouter, Navigate ,Routes ,Route } from "react-router-dom";

import { Product, Homepage, Pricing, PageNotFound, AppLayout, Login } from "./pages"
import {CityList, CountryList, City, Form} from "./components"

import { CitiesProvider } from "./contexts/CitiesProvider";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";

export default function App() {
  return (
    <AuthProvider>

      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage />} /> 
            <Route path='product' element={<Product />} />
            <Route path='pricing' element={<Pricing />} />
            <Route path='login' element={<Login />} />
            <Route path='app' element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
            }>
              <Route index element={<Navigate to='cities' />} />
              <Route path='cities' element={<CityList/>} />
              <Route path="cities/:id" element={<City/>} />
              <Route path='countries' element={<CountryList/>} />
              <Route path='form' element={<Form />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter> 
      </CitiesProvider>

    </AuthProvider>
  )
}