import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from '../src/pages/NotFound/NotFound.jsx'; // Ajustez le chemin si nécessaire
import { MemoryRouter, Route, Routes } from 'react-router-dom';

test('renders 404 message and checks the background color', () => {
    render(
        <MemoryRouter initialEntries={['/not-found']}>
            <Routes>
                <Route path="/not-found" element={<NotFound />} />
            </Routes>
        </MemoryRouter>
    );

    // Vérifiez que le message "404" est affiché
    const messageElement = screen.getByText(/404/i);
    expect(messageElement).toBeInTheDocument();

    // Vérifiez que le message "Page non trouvée" est affiché
    const subMessageElement = screen.getByText(/Page non trouvée/i);
    expect(subMessageElement).toBeInTheDocument();

    // Vérifiez que le background color du body est #FFEDC5
    expect(document.body.style.backgroundColor).toBe('rgb(255, 237, 197)');
});

// test('clicking on the back button goes back in history', () => {
//     const initialEntries = ['/initial-route'];
//     render(
//         <MemoryRouter initialEntries={initialEntries}>
//             <Routes>
//                 <Route path="/initial-route" element={<div>Initial Route</div>} />
//                 <Route path="/not-found" element={<NotFound />} />
//             </Routes>
//         </MemoryRouter>
//     );

//     // Simulez un clic sur le bouton "Retour"
//     const backButton = screen.getByText(/Retour/i);
//     fireEvent.click(backButton);

//     // Vérifiez que l'historique a reculé
//     expect(screen.getByText(/Initial Route/i)).toBeInTheDocument();
// });
