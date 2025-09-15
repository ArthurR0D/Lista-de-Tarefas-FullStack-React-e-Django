import axios from 'axios';

// Configuração base da API
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// Interceptador para requests
api.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptador para responses
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Serviços da API para tarefas
export const TaskAPI = {
    // Buscar todas as tarefas
    getTasks: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        return api.get(`/tasks/${queryParams ? `?${queryParams}` : ''}`);
    },

    // Buscar tarefa específica
    getTask: (id) => {
        return api.get(`/tasks/${id}/`);
    },

    // Criar uma nova tarefa
    createTask: (taskData) => {
        return api.post('/tasks/', taskData);
    },

    // Atualizar uma tarefa
    updateTask: (id, taskData) => {
        return api.put(`/tasks/${id}/`, taskData);
    },

    // Atualizar parcialmente uma tarefa
    patchTask: (id, taskData) => {
        return api.patch(`/tasks/${id}/`, taskData);
    },

    // Deletar uma tarefa
    deleteTask: (id) => {
        return api.delete(`/tasks/${id}/`);
    },

    // Atualizar apenas o status da tarefa
    updateTaskStatus: (id, status) => {
        return api.patch(`/tasks/${id}/status/`, { status });
    },

    // Buscar estatísticas das tarefas
    getTaskStats: () => {
        return api.get('/tasks/stats/');
    },

    // Atualização em lote do status
    bulkUpdateStatus: (taskIds, status) => {
        return api.post('/tasks/bulk-update/', {
            task_ids: taskIds,
            status: status
        });
    },
};

export default api;