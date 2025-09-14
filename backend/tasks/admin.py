from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'priority', 'due_date', 'created_at']
    list_filter = ['status', 'priority', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['status', 'priority']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']

    fieldsets = (
        ('Informações Básicas', {
            'fields': ('title', 'description')
        }),
        ('Status e Prioridade', {
            'fields': ('status', 'priority')
        }),
        ('Datas', {
            'fields': ('due_date', 'completed_at'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ['completed_at']
# Register your models here.
