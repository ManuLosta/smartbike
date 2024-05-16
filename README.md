# Smartbike - Proyecto de Internet de las Cosas (IOT)

## Información del proyecto
- **Título del proyecto**: Smartbike
- **Grupo**: Manuel Lostaló, Martín Barreiro y Liz Lubelzyck

## Introducción
Este proyecto consiste en la implementación de un sistema de monitoreo GPS utilizando un dispositivo ESP32 equipado con un sensor GPS. Los datos de ubicación obtenidos por el sensor se publican en un broker MQTT y son procesados por un servidor Node.js para su almacenamiento en una base de datos MongoDB. La interfaz de usuario permite visualizar y analizar los datos recopilados en tiempo real. La finalidad del dispositivo es ser utilizado en el contexto del ciclismo para trackear los entrenamientos.

## Objetivos del proyecto
Los objetivos de este proyecto son:
1. Implementar un proyecto utilizando ESP32 para la operación y transmisión de datos. Para lograr esto utilizaremos un ESP32 junto un módulo de GPS, específicamente el Neo 6m.
2. Configurar un broker MQTT en una instancia de AWS para la gestión de datos y comunicación entre el ESP32, el servidor NodeJS y la aplicación móvil.
3. Establecer una base de datos MongoDB para el almacenamiento y análisis de las sesiones de entrenamiento.
4. Desarrollar una interfáz de usuario (UI) móvil para visualizar y analizar los datos recompilados.

## Avances realizados
### 1. Configuración del Broker MQTT en AWS
- Se ha instalado y configurado un broker MQTT en una instancia de AWS.
- Definimos los topics en donde los distintos nodos del proyecto van a publicar y subscribirse.
- Se tuvo que configurar un grupo de seguridad para permitir la entrada y salida de datos desde el puerto de MQTT.
- Una dificultad que tuvimos en esta etapa fue con relación a la dirección IP de la instancia de AWS. Al cambiar en cada reinicio debíamos compilar y volver a subir el código del ESP32. Para solucionar este problema, le asignamos una IP fija (Elastic IP).
- **Fecha prevista de terminación**: Terminado

### 2. Implementación del Dispositivo ESP32 y el módulo de GPS
- 
