// src/AppRoutes.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login.jsx';
import Register from '../pages/Register/Register.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import ProtectedRoute from './ProtectedRoutes.jsx';
import ClothesList from "../pages/Clothes/ClothesList.jsx";
import ClothesDetail from "../pages/Clothes/ClothesDetail.jsx";
import ClothesForm from "../pages/Clothes/ClothesForm.jsx";
import Navbar from "../components/Navbar.jsx";
import BookList from "../pages/Books/BookList.jsx";
import BookForm from "../pages/Books/BookForm.jsx";
import BookDetail from "../pages/Books/BookDetail.jsx";
import ShoesList from "../pages/Shoes/ShoesList.jsx";
import ShoesForm from "../pages/Shoes/ShoesForm.jsx";
import ShoesDetail from "../pages/Shoes/ShoesDetail.jsx";
import ElectronicsList from "../pages/Electronics/ElectronicsList.jsx";
import ElectronicsForm from "../pages/Electronics/ElectronicsForm.jsx";
import ElectronicsDetail from "../pages/Electronics/ElectronicsDetail.jsx";
import UnpaidAndPaidOrders from "../pages/Order/UnpaidAndPaidOrders.jsx";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/clothes"
                    element={
                        <ProtectedRoute>
                            <ClothesList  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/clothes/create"
                    element={
                        <ProtectedRoute>
                            <ClothesForm  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/clothes/edit/:id"
                    element={
                        <ProtectedRoute>
                            <ClothesForm  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/clothes/:id"
                    element={
                        <ProtectedRoute>
                            <ClothesDetail  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/books"
                    element={
                        <ProtectedRoute>
                            <BookList  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/books/create"
                    element={
                        <ProtectedRoute>
                            <BookForm  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/books/edit/:id"
                    element={
                        <ProtectedRoute>
                            <BookForm  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/books/:id"
                    element={
                        <ProtectedRoute>
                            <BookDetail  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/shoes"
                    element={
                        <ProtectedRoute>
                            <ShoesList  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/shoes/create"
                    element={
                        <ProtectedRoute>
                            <ShoesForm  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/shoes/edit/:id"
                    element={
                        <ProtectedRoute>
                            <ShoesForm  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/shoes/:id"
                    element={
                        <ProtectedRoute>
                            <ShoesDetail  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/electronics"
                    element={
                        <ProtectedRoute>
                            <ElectronicsList  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/electronics/create"
                    element={
                        <ProtectedRoute>
                            <ElectronicsForm  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/electronics/edit/:id"
                    element={
                        <ProtectedRoute>
                            <ElectronicsForm  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/electronics/:id"
                    element={
                        <ProtectedRoute>
                            <ElectronicsDetail  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <UnpaidAndPaidOrders  />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
