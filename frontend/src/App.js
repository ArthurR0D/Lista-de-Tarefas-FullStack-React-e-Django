import React, { useState } from "react";
import { TaskProvider } from "./contexts/TaskContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskStats from "./components/TaskStats";
import ThemeToggle from './components/ThemeToggle';
import {
  Container,
  Header,
  HeaderContent,
  Logo,
  Button,
  Flex,
  StyledComponentsThemeProvider,
  lightTheme,
  darkTheme
} from './components/styles/StyledComponents';
import { ToastContainer } from "react-toastify";
import { FaTasks, FaPlus, FaChartBar } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';

function AppContent() {
  const [editingTask, setEditingTask] = useState(null);
  const [showStats, setShowStats] = useState(true);
  const { darkMode } = useTheme();

  const handleEditTask = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewTask = () => {
    setEditingTask(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StyledComponentsThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div className="App">
        <Header>
          <HeaderContent>
            <Logo>
              <FaTasks /> Lista de Tarefas
            </Logo>
            <Flex $gap="1rem">
              <ThemeToggle />
              <Button
                $variant="outline"
                onClick={() => setShowStats(!showStats)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }}
              >
                <FaChartBar />
                {showStats ? 'Ocultar Estatísticas' : 'Mostrar Estatísticas'}
              </Button>
              <Button
                $variant="secondary"
                onClick={handleNewTask}
                style={{ background: 'rgba(255, 255, 255, 0.9)', color: '#4f46e5' }}
              >
                <FaPlus />
                Nova Tarefa
              </Button>
            </Flex>
          </HeaderContent>
        </Header>

        <Container>
          <main style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            {/* Estatísticas */}
            {showStats && <TaskStats />}

            {/* Formulário de Tarefa*/}
            <TaskForm
              editingTask={editingTask}
              onCancel={handleCancelEdit}
            />

            {/* Lista de Tarefas*/}
            <TaskList onEditTask={handleEditTask} />
          </main>

          {/* Footer */}
          <footer style={{
            textAlign: 'center',
            padding: '2rem 0',
            borderTop: `1px solid ${darkMode ? darkTheme.colors.border : lightTheme.colors.border}`,
            color: darkMode ? darkTheme.colors.textSecondary : lightTheme.colors.textSecondary
          }}>
            <p>
              Lista de Tarefas FullStack - Django + React + PostgreSQL
            </p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Desenvolvido para gerenciar suas tarefas de forma eficiente
            </p>
          </footer>
        </Container>

        {/* Notificações Toast*/}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? 'dark' : 'light'}
        />
      </div>
    </StyledComponentsThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;