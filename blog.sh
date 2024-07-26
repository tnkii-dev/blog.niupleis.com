#!/bin/bash
#TNKII 22 JUL 2023

echo "Crear publicación. Ingresa el tipo de elemento y el contenido del elemento. (Formato HTML)."

ELEMENT=""
HTML=()

# Escribir post
while [ "$ELEMENT" != "end" ]; do
    echo "Elemento: "
    read ELEMENT
    if [ "$ELEMENT" = "end" ]; then
        break
    fi
    echo "Parámetros: "
    read PARAMS
    echo "Contenido: "
    read TEXT_CONTENT
    HTML+=("<${ELEMENT} ${PARAMS}>${TEXT_CONTENT}</${ELEMENT}>")
done

# Unir el contenido HTML
CONTENT=$(IFS=" "; echo "${HTML[*]}")

# Descripción del post
echo "Resumen:"
read SUMMARY

echo "Título:"
read TITLE

echo "Fecha:"
read DATE

echo "Color:"
read COLOR

echo "Tipo de post (blog, niupleis, waifu, art, youtube, dev, gaming):"
read TYPE

# Actualizar enlace
echo "blog id (formato YYMMDD):"
read ID

JS_FILE="blog.niupleis.com/js/script.js"
sed -i "95a \ \ \ \ \"$ID\"," $JS_FILE

# Crear el archivo JSON
JSON_FILE="blog.niupleis.com/entries/es/${ID}.json"

cat <<EOL > $JSON_FILE
{
    "id" : "$ID",
    "type" : "$TYPE",
    "langs" : "[ESP]",
    "date" : "$DATE",
    "color" : "$COLOR",
    "title" : "$TITLE",
    "summary" : "$SUMMARY",
    "content" : "$CONTENT"
}
EOL

cp JSON_FILE "blog.niupleis.com/entries/en/"
cp JSON_FILE "blog.niupleis.com/entries/kr/"
cp JSON_FILE "blog.niupleis.com/entries/jp/"
