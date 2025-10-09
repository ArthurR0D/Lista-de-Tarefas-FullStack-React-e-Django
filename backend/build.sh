#!/usr/bin/env bash
set -o errexit

# Instalar dependências do Python
pip install -r requirements.txt

# Coletar arquivos estáticos (CSS, JS, imagens do Admin)
python manage.py collectstatic --no-input

# Aplicar migrações do banco de dados
python manage.py migrate