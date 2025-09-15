import React, { useState, useEffect } from "react";
import { useTasks } from '../contexts/TaskContext';
import {
    Form,
    FormGroup,
    Label,
    Input,
    TextArea,
    Select,
    Button,
    Flex,
    Title
} from './styles/StyledComponents';
import { FaPlus, FaEdit } from 'react-icons/fa';

const TaskForm = ({ editingTask, onCancel }) => {
    const { createTask, updateTask } = useTasks();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending',
        due_date: ''
    });

    // Preencher formulário quando estiver editando
    useEffect(() => {
        if (editingTask) {
            setFormData({
                title: editingTask.title || '',
                description: editingTask.description || '',
                priority: editingTask.priority || 'medium',
                status: editingTask.status || 'pending',
                due_date: editingTask.due_date ? editingTask.due_date.split('T')[0] : ''
            });
        }
    }, [editingTask]);

     const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
     };

     const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert('O título é obrigatório!');
            return;
        }

        setLoading(true);

        try {
            const taskData = {
                ...formData,
                due_date: formData.due_date || null
            };

            if (editingTask) {
                await updateTask(editingTask.id, taskData);
                onCancel && onCancel();
            } else {
                await createTask(taskData);
                // Limpar formulário após criação
                setFormData({
                    title: '',
                    description: '',
                    priority: 'medium',
                    status: 'pending',
                    due_date: ''
                });
            }
        } catch (erro) {
            console.error('Erro ao salvar tarefa:', erro);
        } finally {
            setLoading(false);
        }
     };

     const handleReset = () => {
        setFormData({
            title: '',
            description: '',
            priority: 'medium',
            status: 'pending',
            due_date: ''
        });
        onCancel && onCancel();
     };

     return (
        <Form onSubmit={handleSubmit}>
            <Title>
                {editingTask ? (
                    <>
                      <FaEdit /> Editar Tarefa
                    </>
                ) : (
                    <>
                      <FaPlus /> Nova Tarefa
                    </>
                )}
            </Title>

            <FormGroup>
                <Label htmlFor="title">Título *</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Digite o título da tarefa..."
                  required
                />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="description">Descrição</Label>
                <TextArea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descreva os detalhes da tarefa..."
                  rows="4"
                />
            </FormGroup>

            <Flex $gap="1rem" $wrap>
                <FormGroup style={{ flex: 1, minWidth: '200px' }}>
                    <Label htmlFor="priority">Prioridade</Label>
                    <Select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                        <option value="low">Baixa</option>
                        <option value="medium">Média</option>
                        <option value="high">Alta</option>
                    </Select>
                </FormGroup>

                <FormGroup style={{ flex: 1, minWidth: '200px' }}>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                        <option value="pending">Pendente</option>
                        <option value="in_progress">Em Progresso</option>
                        <option value="completed">Concluída</option>
                    </Select>
                </FormGroup>

                <FormGroup style={{ flex: 1, minWidth: '200px' }}>
                    <Label htmlFor="due_date">Data de Vencimento</Label>
                    <Input
                      type="date"
                      id="due_date"
                      name="due_date"
                      value={formData.due_date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                    />
                </FormGroup>
            </Flex>

            <Flex $justify="flex-end" $gap="1rem">
                {editingTask && (
                    <Button type="button" onClick={handleReset} disabled={loading}>
                        Cancelar
                    </Button>
                )}
                <Button
                  type="submit"
                  $variant="primary"
                  disabled={loading || !formData.title.trim()}
                >
                    {loading ? 'Salvando...' : editingTask ? 'Atualizar' : 'Criar Tarefa'}
                </Button>
            </Flex>
        </Form>
     );
};

export default TaskForm;