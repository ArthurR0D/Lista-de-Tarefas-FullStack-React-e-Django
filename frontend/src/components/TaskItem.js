import React, { useState } from "react";
import { useTasks } from "../contexts/TaskContext";
import {
    Card,
    Badge,
    Button,
    Flex,
    Select
} from './styles/StyledComponents';
import {
    FaClock,
    FaCalendarAlt,
    FaCircle,
    FaPlayCircle,
    FaCheckCircle,
    FaEdit,
    FaTrash
} from 'react-icons/fa';

const TaskItem = ({ task, onEdit }) => {
    const { updateTaskStatus, deleteTask } = useTasks();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleStatusChange = async (newStatus) => {
        setIsUpdating(true);
        try {
            await updateTaskStatus(task.id, newStatus);
        } catch (error) {
            console.error('Erro ao atualizar status', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Tem certeza que deseja deletar esta tarefa?')) {
            setIsDeleting(true);
            try {
                await deleteTask(task.id);
            } catch (error) {
                console.error('Erro ao deletar tarefa', error);
                setIsDeleting(false);
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const isOverdue = (dueDate) => {
        if (!dueDate) return false;
        return new Date(dueDate) < new Date() && task.status != 'completed';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <FaCheckCircle color="#10b981" />;
            case 'in_progress':
                return <FaPlayCircle color="#06b6d4" />;
            default:
                return <FaCircle color="#64748b" />;
        }
    };

    const getStatusText = (status) => {
        const statusMap = {
            pending: 'Pendente',
            in_progress: 'Em Progresso',
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
        <Card style={{
            opacity: isDeleting ? 0.5 : 1,
            pointerEvents: isDeleting ? 'none' : 'auto'
        }}>
            <Flex $justify="space-between" $align="flex-start">
                <div style={{ flex: 1 }}>
                    <Flex $align="center" $gap="0.75rem" style={{ marginBottom: '0.75rem' }}>
                        {getStatusIcon(task.status)}
                        <h3 style={{
                            margin: 0,
                            textDecoration: task.status == 'completed' ? 'line-through' : 'none',
                            opacity: task.status == 'completed' ? 0.7 : 1
                        }}>
                            {task.title}
                        </h3>
                        <Badge $variant={task.priority}>
                            {getPriorityText(task.priority)}
                        </Badge>
                        <Badge $variant={task.status}>
                            {getStatusText(task.status)}
                        </Badge>
                    </Flex>

                    {task.description && (
                        <p style={{
                            margin: '0 0 1rem 0',
                            color: '#64748b',
                            opacity: task.status == 'completed' ? 0.7 : 1
                        }}>
                            {task.description}
                        </p>
                    )}

                    <Flex $align="center" $gap="1rem" $wrap>
                        {task.due_date && (
                            <small style={{
                                color: isOverdue(task.due_date) ? '#ef4444' : '#64748b',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}>
                                <FaCalendarAlt />
                                Vence em: {formatDate(task.due_date)}
                                {isOverdue(task.due_date) && (
                                    <Badge $variant="danger" style={{ marginLeft: '0.5rem' }}>
                                        Atrasada
                                    </Badge>
                                )}
                            </small>
                        )}

                        <small style={{
                            color: '#94a3b8',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}>
                            <FaClock />
                            Criada: {formatDate(task.created_at)}
                        </small>

                        {task.completed_at && (
                            <small style={{
                                color: '#10b981',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}>
                                <FaCheckCircle />
                                Concluída: {formatDate(task.completed_at)}
                            </small>
                        )}
                    </Flex>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '200px' }}>
                    <Select
                      value={task.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      disabled={isUpdating}
                      style={{ fontSize: '0.875rem' }}
                    >
                        <option value="pending">Pendente</option>
                        <option value="in_progress">Em Progresso</option>
                        <option value="completed">Concluída</option>
                    </Select>

                    <Flex $gap="0.5rem">
                        <Button
                          $variant="secondary"
                          onClick={onEdit}
                          disabled={isUpdating || isDeleting}
                          style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}
                        >
                            <FaEdit />
                            Editar
                        </Button>

                        <Button
                          $variant="danger"
                          onClick={handleDelete}
                          disabled={isUpdating || isDeleting}
                          style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}
                        >
                            <FaTrash />
                            {isDeleting ? 'Deletando...' : 'Deletar'}
                        </Button>
                    </Flex>
                </div>
            </Flex>

            {isUpdating && (
                <div style={{
                    marginTop: '0.75rem',
                    padding: '0.5rem',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    color: '#64748b',
                    textAlign: 'center'
                }}>
                    Atualizando status...
                </div>
            )}
        </Card>
    );
};

export default TaskItem;