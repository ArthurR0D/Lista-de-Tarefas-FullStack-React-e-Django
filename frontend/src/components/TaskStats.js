import React from "react";
import { useTasks } from "../contexts/TaskContext";
import {
    StatsContainer,
    StatCard,
    StatNumber,
    StatLabel,
    Title,
} from './styles/StyledComponents';
import {
    FaTasks,
    FaClock,
    FaPlayCircle,
    FaCheckCircle,
    FaExclamationTriangle,
    FaArrowUp,
    FaArrowDown
} from 'react-icons/fa';


const TaskStats = () => {
    const { stats } = useTasks();

    const statsData = [
        {
            label: 'Total de Tarefas',
            value: stats.total_tasks,
            icon: <FaTasks />,
            color: '#4f46e5'
        },
        {
            label: 'Pendentes',
            value: stats.status_breakdown?.pending || 0,
            icon: <FaClock />,
            color: '#64748b'
        },
        {
            label: 'Em Progresso',
            value: stats.status_breakdown?.in_progress || 0,
            icon: <FaPlayCircle />,
            color: '#06b6d4'
        },
        {
            label: 'Concluídas',
            value: stats.status_breakdown?.completed || 0,
            icon: <FaCheckCircle />,
            color: '#10b981'
        },
        {
            label: 'Alta Prioridade',
            value: stats.priority_breakdown?.high || 0,
            icon: <FaArrowUp />,
            color: '#ef4444'
        },
        {
            label: 'Baixa Prioridade',
            value: stats.priority_breakdown?.low || 0,
            icon: <FaArrowDown />,
            color: '#10b981'
        }
    ];

    return (
        <div style={{ marginBottom: '2rem' }}>
            <Title>Estatísticas</Title>

            <StatsContainer>
                {statsData.map((stat, index) =>(
                    <StatCard key={index}>
                        <div style={{
                            fontSize: '1.5rem',
                            color: stat.color,
                            marginBottom: '0.5rem'
                        }}>
                            {stat.icon}
                        </div>
                        <StatNumber style={{ color: stat.color }}>
                            {stat.value}
                        </StatNumber>
                        <StatLabel>{stat.label}</StatLabel>
                    </StatCard>
                ))}
            </StatsContainer>

            {stats.total_tasks > 0 && (
                <StatCard style={{ textAlign: 'center' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem'
                    }}>
                        <FaCheckCircle color="#10b981" />
                        <StatLabel>Taxa de Conclusão</StatLabel>
                    </div>

                    <StatNumber style={{
                        color: stats.completion_rate >= 70 ? '#10b981' :
                               stats.completion_rate >= 40 ? '#f59e0b' : '#ef4444'
                    }}>
                        {stats.completion_rate}%
                    </StatNumber>

                    <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#e2e8f0',
                        borderRadius: '4px',
                        marginTop: '0.75rem',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${stats.completion_rate}%`,
                            height: '100%',
                            backgroundColor: stats.completion_rate >= 70 ? '#10b981' :
                                             stats.completion_rate >= 40 ? '#f59e0b' : '#ef4444',
                            transition: 'width 0,5s ease'
                        }} />
                    </div>

                    <StatLabel style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
                        {stats.completion_rate >= 80 ? 'Excelente progresso!' :
                         stats.completion_rate >= 60 ? 'Bom trabalho!' :
                         stats.completion_rate >= 40 ? 'Você consegue melhorar!' :
                         'Vamos lá!'}
                    </StatLabel>
                </StatCard>
            )}

            {stats.total_tasks == 0 && (
                <StatCard style={{ textAlign: 'center', padding: '2rem'}}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                    <StatLabel>
                        Nenhuma tarefa ainda. Comece criando sua primeira tarefa!
                    </StatLabel>
                </StatCard>
            )}
        </div>
    );
};

export default TaskStats;