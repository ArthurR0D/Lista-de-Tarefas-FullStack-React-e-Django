from django.db import models
from django.utils import timezone

class Task(models.Model):

    objects = models.Manager()


    PRIORITY_CHOICES = [
        ('low', 'Baixa'),
        ('medium', 'Média'),
        ('high', 'Alta'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pendente'),
        ('in_progress', 'Em Progresso'),
        ('completed', 'Concluída'),
    ]

    title = models.CharField(max_length=200, verbose_name='Título')
    description = models.TextField(blank=True, verbose_name='Descrição')
    priority = models.CharField(
        max_length=10,
        choices=PRIORITY_CHOICES,
        default='medium',
        verbose_name='Prioridade'
    )

    status = models.CharField(
        max_length=15,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='Status'
    )

    due_date = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Data de Vencimento'
    )

    created_at = models.DateTimeField(
        default=timezone.now,
        verbose_name='Criado em'
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Atualizado em'
    )

    completed_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Concluído em'
    )

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Tarefa'
        verbose_name_plural = 'Tarefas'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.status == 'completed' and not self.completed_at:
            self.completed_at = timezone.now()
        elif self.status != 'completed':
            self.completed_at = None
        super().save(*args, **kwargs)
