from django.db.models import Q
from rest_framework import generics, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Task
from .serializers import (
    TaskSerializer,
    TaskCreateSerializer,
    TaskUpdateSerializer,
    TaskStatusUpdateSerializer
)

class TaskListCreateView(generics.ListCreateAPIView):
    """
    View para listar todas as tarefas e criar uma nova tarefa
    GET: Lista todas as tarefas com filtros opcionais
    POST: Cria uma nova tarefa
    """
    queryset = Task.objects.all()
    permission_classes = [AllowAny]  # Para desenvolvimento
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'priority']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'due_date', 'priority']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TaskCreateSerializer
        return TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.all()

        # Filtro por status
        status_param = self.request.query_params.get('status')
        if status_param:
            queryset = queryset.filter(status=status_param)

        # Filtro por prioridade
        priority_param = self.request.query_params.get('priority')
        if priority_param:
            queryset = queryset.filter(priority=priority_param)

        # Busca por texto
        search_param = self.request.query_params.get('search')
        if search_param:
            queryset = queryset.filter(
                Q(title__icontains=search_param) |
                Q(description__icontains=search_param)
            )
        return queryset
    
    def create(self, request, *args, **kwargs):
        """Override para melhor tratamento de erros na criação"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            task = serializer.save()
            return Response(
                TaskSerializer(task).data, 
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors, 
            status=status.HTTP_400_BAD_REQUEST
        )


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    View para operações em uma tarefa específica
    GET: Retorna os detalhes da tarefa
    PUT/PATCH: Atualiza a tarefa
    DELETE: Deleta a tarefa
    """
    queryset = Task.objects.all()
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return TaskUpdateSerializer
        return TaskSerializer


class TaskStatusUpdateView(generics.UpdateAPIView):
    """
    View específica para atualizar apenas o status da tarefa
    PATCH: Atualiza apenas o status
    """
    queryset = Task.objects.all()
    serializer_class = TaskStatusUpdateSerializer
    permission_classes = [AllowAny]

    def patch(self, request, *args, **kwargs):
        task = self.get_object()
        serializer = self.get_serializer(task, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            # Retorna a tarefa completa após a atualização
            full_serializer = TaskSerializer(task)
            return Response(full_serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def task_stats(request):
    """
    Endpoint para estatísticas das tarefas
    """
    try:
        total_tasks = Task.objects.count()
        pending_tasks = Task.objects.filter(status='pending').count()
        in_progress_tasks = Task.objects.filter(status='in_progress').count()
        completed_tasks = Task.objects.filter(status='completed').count()

        high_priority_tasks = Task.objects.filter(priority='high').count()
        medium_priority_tasks = Task.objects.filter(priority='medium').count()
        low_priority_tasks = Task.objects.filter(priority='low').count()

        stats = {
            'total_tasks': total_tasks,
            'status_breakdown': {
                'pending': pending_tasks,
                'in_progress': in_progress_tasks,
                'completed': completed_tasks
            },
            'priority_breakdown': {
                'high': high_priority_tasks,
                'medium': medium_priority_tasks,
                'low': low_priority_tasks,
            },
            'completion_rate': round((completed_tasks / total_tasks * 100), 2) if total_tasks > 0 else 0
        }

        return Response(stats, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': f'Erro ao calcular estatísticas: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([AllowAny])
def bulk_update_status(request):
    """
    Endpoint para atualizar o status de múltiplas tarefas
    """
    task_ids = request.data.get('task_ids', [])
    new_status = request.data.get('status')

    if not task_ids or not new_status:
        return Response(
            {'error': 'task_ids e status são obrigatórios'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if new_status not in ['pending', 'in_progress', 'completed']:
        return Response(
            {'error': 'Status inválido. Deve ser: pending, in_progress ou completed'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        updated_tasks = Task.objects.filter(id__in=task_ids)
        update_count = updated_tasks.update(status=new_status)

        return Response({
            'message': f'{update_count} tarefas atualizadas com sucesso',
            'updated_count': update_count,
            'requested_count': len(task_ids)
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': f'Erro ao atualizar tarefas: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )