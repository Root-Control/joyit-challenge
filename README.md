
# Nombre del Proyecto NestJS con WebSockets

Este proyecto es una aplicación de chat construida con NestJS/Fastify/Redis. Permite hacer exchanges, está limitada por algunas monedas como USD, CAD, GBP, COP, ARS, todas estas monedas pueden interactuar con todas las monedas existentes y viceversa, monedas inexistentes en la lista no pueden comunicarse con otras inexistentes, pero éstas si pueden, ejm: USD_PEN, PEN_USD, CAD_PEN, PEN_CAD, GBP_USD, USD_GBP, etc.

## Comenzando

Para comenzar a utilizar este proyecto, sigue los pasos a continuación para configurar el entorno en tu máquina local.

### Prerrequisitos

Necesitarás Docker instalado en tu sistema para ejecutar este proyecto. 

### Instalación con Docker

Para iniciar el proyecto, solo necesitas ejecutar el siguiente comando:

```bash
docker compose up -d
```

Las variables de entorno se copiarán automáticamente de `.env.docker` a `.env` en el contenedor de Docker.

## Uso

Una vez que el proyecto esté en ejecución, puedes probar las apis, empezando por la generadora de token, ya que los otros endpoints están protegidos por JWT:

- `[GET] http://localhost:3000/api/get-token` => `[GET] http://18.220.251.169:3000/api/get-token`
- `[POST] http://localhost:3000/api/exchanges` => `[POST] http://18.220.251.169:3000/api/exchanges`
- `[POST] http://localhost:3000/api/exchanges/update-exchange-rate` => `[POST] http://18.220.251.169//api/exchanges/update-exchange-rate`

# Documentación de Api
- `[Browser] http://localhost:3000/api` => `[Browser] http://18.220.251.169:3000/api`

- La documentación muestran los DTOs, y respuestas de DTO
### Ejecución de Pruebas

- **WebSocket Configuration**: Puedes encontrar la configuración completa del WebSocket en `src/events/events.gateway.ts`, donde cada parte del código está explicada detalladamente.

- **Message Service**: El servicio que ejecuta el emisor para crear mensajes se encuentra en `modules/messages`.

- **Listado de Mensajes**: Todos los mensajes se listan en `http://localhost:3000/api/messages`.

- **Persistencia de Mensajes en HTML**: Los mensajes existentes se están bindeando en los archivos HTML para su persistencia.

### Notas Adicionales

- El código cumple con los requisitos especificados, aunque no se hace un uso extenso de OOP, CQRS, observables u otros conceptos avanzados debido a la naturaleza y alcance del proyecto.


## Contacto

Email - [l2oot.control@gmail.com](mailto:l2oot.control@gmail.com)

Link del proyecto: [https://github.com/Root-Control](https://github.com/Root-Control)
