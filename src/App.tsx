import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { CoursePage } from './pages/CoursePage/CoursePage';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/course" element={<CoursePage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    );
}
