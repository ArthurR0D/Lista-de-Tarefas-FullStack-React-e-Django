import React, { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import TaskItem from './TaskItem';
import TaskFilters from './TaskFilters';
import {
    Card,
    Title,
    Spinner,
    Flex,
    Button,
    Badge
} from './styles/StyledComponents';
import { FaList, FaFilter } from 'react-icons/fa';

const TaskList = ({ onEditTask }) => {
    const { tasks, loading, error, filters } = useTasks();
    const [showFilters, setShowFilters] = useState(false);

    if (loading && tasks.length == 0) {
        return (
            <Card>
                <Spinner />
                <p style={{ textAlign: 'center' }}>Carregando tarefas...</p>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <p style={{ color: 'red', textAlign: 'center' }}>
                    Erro ao carregar tarefas: {error}
                </p>
            </Card>
        );
    }

    const hasActiveFilters = Object.values(filters).some(value => value != '');
    
    const getStatusText = (status) => {
        const statusMap = {
            pending: 'Pendente',
            in_progress: 'Em progresso',
            completed: 'Concluída'
        };
        return statusMap[status] || status;
    };

    const getPriorityText = (priority) => {
        const priorityMap = {
            low: 'Baixa',
            medium: 'Média',
            high: 'Alta'
        };
        return priorityMap[priority] || priority;
    };

    return (
        <div>
            <Card>
                <Flex $justify="space-between" $align="center">
                    <Title>
                        <FaList /> Minhas tarefas
                        {tasks.length > 0 && (
                            <Badge $variant="primary" style={{ marginLeft: '0.5rem' }}>
                                {tasks.length}
                            </Badge>
                        )}
                    </Title>

                    <Button
                      $variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                        <FaFilter />
                        Filtros
                        {hasActiveFilters && (
                            <Badge $variant="primary" style={{ marginLeft: '0.5rem' }}>
                                Ativo
                            </Badge>
                        )}
                    </Button>
                </Flex>

                {showFilters && <TaskFilters />}

                {hasActiveFilters && (
                    <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                        <small style={{ color: '#64748b' }}>
                            Filtros ativos:
                            {filters.status && (
                                <Badge $variant="secondary" style={{ margin: '0 0.25rem' }}>
                                    Status: {getStatusText(filters.status)}
                                </Badge>
                            )}

                            {filters.priority && (
                                <Badge $variant="warning" style={{ margin: '0 0.25rem' }}>
                                    Prioridade: {getPriorityText(filters.priority)}
                                </Badge>
                            )}
                            {filters.search && (
                                <Badge $variant="primary" style={{ margin: '0 0.25rem' }}>
                                    Busca: {filters.search}
                                </Badge>
                            )}
                        </small>
                    </div>
                )}
            </Card>

            {tasks.length == 0 ? (
                <Card>
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <FaList size={48} color="#e2e8f0" style={{ marginBottom: '1rem' }}/>
                        <h3 style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                            {hasActiveFilters ? 'Nenhuma tarefa encontrada' : 'Nenhuma tarefa ainda'}
                        </h3>
                        <p style={{ color: '#94a3b8' }}>
                            {hasActiveFilters
                              ? 'Tente ajustar os filtros para encontrar suas tarefas.'
                              : 'Comece criando sua primeira tarefa usando o formulário acima.'
                            }
                        </p>
                    </div>
                </Card>
            ) : (
                <div>
                    {tasks.map(task => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onEdit={() => onEditTask(task)}
                        />
                    ))}

                    {loading && (
                        <Card>
                            <Spinner />
                            <p style={{ textAlign: 'center' }}>Atualizando...</p>
                        </Card>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskList;