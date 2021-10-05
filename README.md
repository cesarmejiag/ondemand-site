Pago de Películas
==================
## Requerimientos

1. NodeJS - v14.15.0
2. GulpJS - 2.3.0
3. http-server - v13.0.1

## Modo desarrollo
Levanta un servidor local con http-server en la carpeta docs (carpeta pública que se utilizó para hacer pruebas en Github Pages)

```
$ cd docs
$ http-server
```

El proyecto está configurado con un listener de archivos js, css, y html que al detectar un cambio va a generar los archivos minimizados necesarios ejecuta el siguiente comando en el **root del proyecto**.

```
$ gulp watcher
```

## Generar paquete para producción
Antes de generar el paquete para producción recuerda modificar el endpoint a los servicios de producción que se encuentra en el archivo src/js/request.js

```
$ gulp build
```

## Contacto
César Mejía
cesar.mejia@bancoazteca.com