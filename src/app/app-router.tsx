import { Info } from '@/enteties'
import { ClientRoutes, Modal } from '@/shared'
import { lazy } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

const MainPageLazy = lazy(() => import('@/pages/main/ui/main'))

export const AppRouter = () => {
    const location = useLocation()
    const state = location.state
    const navigate = useNavigate()

    return (
        <>
            <Routes location={state?.card || location}>
                <Route
                    path={ClientRoutes.MAIN_PATH}
                    element={<MainPageLazy />}
                />
            </Routes>
            {state?.card && (
                <Routes>
                    <Route
                        path={`${ClientRoutes.CARD_INFO_PATH}:id`}
                        element={
                            <Modal close={() => navigate(-1)}>
                                <Info />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    )
}
