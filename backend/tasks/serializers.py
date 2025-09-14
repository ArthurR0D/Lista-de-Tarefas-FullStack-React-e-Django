from rest_framework import serializers
from .models import Task
from django.utils import timezone

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'description',
            'priority',
            'status',
            'due_date',
            'created_at',
            'updated_at',
            'completed_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'completed_at']
    
    def validate_title(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError(
                "O título deve ter pelo menos 3 caracteres."
            )
        return value.strip()

    def validate_due_date(self, value):
        if value and value < timezone.now():
            raise serializers.ValidationError(
                "A data de vencimento não pode ser no passado."
            )
        return value

class TaskCreateSerializer(TaskSerializer):
    """Serializer específico para criação de tarefas"""
    pass

class TaskUpdateSerializer(TaskSerializer):
    """Serializer específico para atualização de tarefas"""
    title = serializers.CharField(required=False)

class TaskStatusUpdateSerializer(serializers.ModelSerializer):
    """Serializer para atualizar apenas o status da tarefa"""
    class Meta:
        model = Task
        fields = ['status']
        
    def validate_status(self, value):
        valid_statuses = ['pending', 'in_progress', 'completed']
        if value not in valid_statuses:
            raise serializers.ValidationError(
                f"Status deve ser um dos seguintes: {', '.join(valid_statuses)}"
            )
        return value