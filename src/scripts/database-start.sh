#!/bin/bash
set -e

# Define las variables
USER="postgres"
DB="ms_users"

# Crea la base de datos utilizando el comando createdb
echo "Creando la base de datos $DB..."
createdb -U $USER $DB

# Verifica que la base de datos se haya creado correctamente
echo "Listando las bases de datos existentes:"
psql -U $USER -l