from django.urls import path
from . import views

app_name = 'tasks'

urlpatterns = [
    # CRUD básico das tarefas
    path('', views.TaskListCreateView.as_view(), name='task-list-create'),
    path('<int:pk>/', views.TaskDetailView.as_view(), name='task-detail'),


    # Atualização específica de status
    path('<int:pk>/status/', views.TaskStatusUpdateView.as_view(), name='task-status-update'),


    # Endpoints extras
    path('stats/', views.task_stats, name='task-stats'),
    path('bulk-update/', views.bulk_update_status, name='bulk-updat-status'),
]