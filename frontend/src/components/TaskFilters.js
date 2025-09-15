import React from "react";
import { useTasks } from "../contexts/TaskContext";
import {
    FormGroup,
    Label,
    Input,
    Select,
    Button,
    Flex,
    Form
} from './styles/StyledComponents';
import { FaSearch, FaEraser } from "react-icons/fa";

const TaskFilters = () => {
    const { filters, setFilters } = useTasks();

    const handleFilterChange = (filterType, value) => {
        setFilters({
            [filterType]: value
        });
    };

    const clearFilters = () => {
        setFilters({
            status: '',
            priority: '',
            search: ''
        });
    };

    const hasActiveFilters = Object.values(filters).some(value => value != '');

    return (
        <div style={{
            marginTop: '1.5rem',
            padding: '1.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
        }}>
            <Flex $gap="1rem" $wrap $align="flex-end">
                <FormGroup style={{ flex: 1, minWidth: '200px', marginBottom: 0 }}>
                    <Label htmlFor="search">
                        <FaSearch /> Buscar
                    </Label>
                    <Input
                      type="text"
                      id="search"
                      placeholder="Buscar por título ou descrição..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                    />
                </FormGroup>

                <FormGroup style={{ flex: 1, minWidth: '150px', marginBottom: 0 }}>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      id="status"
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                        <option value="">Todos os status</option>
                        <option value="pending">Pendente</option>
                        <option value="in_progress">Em Progresso</option>
                        <option value="completed">Concluída</option>
                    </Select>
                </FormGroup>

                <FormGroup style={{ flex: 1, minWidth: '150px', marginBottom: 0 }}>
                    <Label htmlFor="priority">Prioridade</Label>
                    <Select
                      id="priority"
                      value={filters.priority}
                      onChange={(e) => handleFilterChange('priority', e.target.value)}
                    >
                        <option value="">Todas as prioridades</option>
                        <option value="low">Baixa</option>
                        <option value="medium">Média</option>
                        <option value="high">Alta</option>
                    </Select>
                </FormGroup>

                <FormGroup style={{ marginBottom: 0 }}>
                    <Button
                      $variant="outline"
                      onClick={clearFilters}
                      disabled={!hasActiveFilters}
                      style={{ padding: '0.75rem' }}
                    >
                        <FaEraser />
                        Limpar
                    </Button>
                </FormGroup>
            </Flex>

            {hasActiveFilters && (
                <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
                    <strong>Dica:</strong> Use os filtros para encontrar rapidamente suas tarefas.
                    A busca funciona no título e descrição das tarefas.
                </div>
            )}
        </div>
    );
};

export default TaskFilters;