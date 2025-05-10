#! /bin/bash

git add .

# Solicita a mensagem principal do commit
read -p "Digite a mensagem principal do commit: " message_main

# Solicita a mensagem adicional do commit
read -p "Digite a mensagem adicional do commit: " message_extra

# Adiciona a data e hora automaticamente
timestamp=$(date +%Y-%m-%d--%H:%M:%S)

# Faz o commit com ambas as mensagens
git commit -am "$message_main" -m "$message_extra /$timestamp"

# Faz o push para o repositório
git push

