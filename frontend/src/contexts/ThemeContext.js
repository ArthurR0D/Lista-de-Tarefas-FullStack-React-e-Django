import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        // Verifica se há preferência salva no localStorage
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme !== null) {
            return JSON.parse(savedTheme);
        }
        
        // Se não há preferência salva, usa a preferência do sistema
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // Salva a preferência no localStorage sempre que mudar
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        
        // Aplica a classe no body para CSS global
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    // Escuta mudanças na preferência do sistema
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = (e) => {
            // Só muda automaticamente se o usuário não definiu uma preferência
            const savedTheme = localStorage.getItem('darkMode');
            if (savedTheme === null) {
                setDarkMode(e.matches);
            }
        };

        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    const value = {
        darkMode,
        toggleDarkMode,
        setDarkMode
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme deve ser usado dentro de ThemeProvider');
    }
    return context;
}