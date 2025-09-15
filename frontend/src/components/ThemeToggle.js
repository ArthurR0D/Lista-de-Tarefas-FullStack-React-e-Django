import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './styles/StyledComponents';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ style, ...props }) => {
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <Button
            $variant="outline"
            onClick={toggleDarkMode}
            style={{
                ...style,
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                minWidth: '120px',
                ...props.style
            }}
            title={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
            {...props}
        >
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? 'Modo Claro' : 'Modo Escuro'}
        </Button>
    );
};

export default ThemeToggle;