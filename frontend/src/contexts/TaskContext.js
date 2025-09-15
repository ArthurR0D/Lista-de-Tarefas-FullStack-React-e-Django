import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { TaskAPI } from '../services/api';
import { toast } from 'react-toastify';

// Estados possíveis
const TaskContext = createContext();

// Action types
const ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_TASKS: 'SET_TASKS',
    ADD_TASK: 'ADD_TASK',
    UPDATE_TASK: 'UPDATE_TASK',
    DELETE_TASK: 'DELETE_TASK',
    SET_FILTER: 'SET_FILTER',
    SET_STATS: 'SET_STATS',
    SET_ERROR: 'SET_ERROR',
};

// Estado inicial
const initialState = {
    tasks: [],
    loading: false,
    error: null,
    filters: {
        status: '',
        priority: '',
        search: ''
    },
    stats: {
        total_tasks: 0,
        status_breakdown: {},
        priority_breakdown: {},
        completion_rate: 0
    },
};

// Reducer
function taskReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        
        case ACTIONS.SET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false,
                error: null
            };

        case ACTIONS.ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            };

        case ACTIONS.UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                )
            };

        case ACTIONS.DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };

        case ACTIONS.SET_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.payload
                }
            };

        case ACTIONS.SET_STATS:
            return {
                ...state,
                stats: action.payload
            };

        case ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        default:
            return state;
    }
}

// Provider Component
export function TaskProvider({ children }) {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    // Carregar tarefas
    const loadTask = async (filters= {}) => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });

        try {
            const response = await TaskAPI.getTasks(filters );
            dispatch({ type: ACTIONS.SET_TASKS, payload: response.data.results || response.data });
        } catch (error) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
            toast.error('Erro ao carregar tarefas');
        }
    };

    // Criar tarefa
    const createTask = async (taskData) => {
        try {
            const response = await TaskAPI.createTask(taskData);
            dispatch({ type: ACTIONS.ADD_TASK, payload: response.data });
            toast.success('Tarefa criada com sucesso!');
            return response.data;
        } catch (error) {
            toast.error('Erro ao criar tarefa');
            throw error;
        }
    };

    // Atualizar tarefa
    const updateTask = async (id, taskData) => {
        try {
            const response = await TaskAPI.updateTask(id, taskData);
            dispatch({ type: ACTIONS.UPDATE_TASK, payload: response.data });
            toast.success('Tarefa atualizada com sucesso!');
            return response.data;
        } catch (error) {
            toast.error('Erro ao atualizar tarefa');
            throw error;
        }
    };

    // Atualizar status da tarefa
    const updateTaskStatus = async (id, status) => {
        try {
            const response = await TaskAPI.updateTaskStatus(id, status);
            dispatch({ type: ACTIONS.UPDATE_TASK, payload: response.data });
            toast.success('Status atualizado!');
            return response.data;
        } catch (error) {
            toast.error('Erro ao atualizar status');
            throw error;
        }
    };

    // Deletar tarefa
    const deleteTask = async (id) => {
        try {
            await TaskAPI.deleteTask(id);
            dispatch({ type: ACTIONS.DELETE_TASK, payload: id });
            toast.success('Tarefa deletada com sucesso');
        } catch (error) {
            toast.error('Erro ao deletar tarefa');
            throw error;
        }
    };

    // Carregar estatísticas
    const loadStats = async () => {
        try {
            const response = await TaskAPI.getTaskStats();
            dispatch({ type: ACTIONS.SET_STATS, payload: response.data });
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
        }
    };

    // Aplicar filtros
    const setFilters = (newFilters) => {
        dispatch({ type: ACTIONS.SET_FILTER, payload: newFilters });
    };

    // Carregar tarefas quando os filtros mudarem
    useEffect(() => {
        const filterParams = Object.entries(state.filters)
        .filter(([key, value]) => value != '')
        .reduce((acc,[key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

        loadTask(filterParams);
    }, [state.filters]);

    // Carregar estatísticas ao montar o componente
    useEffect(() => {
        loadStats();
    }, [state.tasks]);

    const value = {
        // State
        tasks: state.tasks,
        loading: state.loading,
        error: state.error,
        filters: state.filters,
        stats: state.stats,


        // Actions
        loadTask,
        createTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
        setFilters,
        loadStats
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
}

// Hook personalizado
export function useTasks() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks deve ser usado dentro de TaskProvider');
    }
    return context;
}