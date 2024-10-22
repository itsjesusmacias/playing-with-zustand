# Stopwatcher - Take Exam

Este proyecto implementa un sistema de temporizador para una página donde los usuarios pueden realizar un test con un temporizador que pueden pausar y reanudar. Se ha utilizado Zustand para gestionar el estado del temporizador.

## Instalación

Para ejecutar este proyecto, asegúrate de tener las siguientes versiones instaladas:

- **Node.js**: v20.x.x
- **npm**: v9.x.x
- **pnpm**: v8.x.x

Sigue los siguientes pasos:

1. Clona el repositorio:
   ```bash
   git clone git@github.com:itsjesusmacias/playing-with-zustand.git
   ```
2. Instala las dependencias usando pnpm:
   ```bash
   pnpm install
   ```
3. Ejecuta la aplicación en modo desarrollo:
   ```bash
   pnpm run dev
   ```

## Descripción

El temporizador comienza en un valor inicial y permite a los usuarios pausar el tiempo y continuar desde donde lo dejaron. Esta solución utiliza una **store** global gestionada con Zustand para garantizar que el estado del temporizador sea consistente en toda la aplicación, incluso si se realizan acciones como pausas o reanudaciones.

## Motivación

Decidí utilizar una store con Zustand para gestionar el temporizador en lugar de alternativas como el uso directo de `setInterval` por varias razones:

1. **Consistencia en el estado**: Zustand nos permite centralizar y controlar el estado del temporizador de forma eficiente sin afectar otros componentes.
2. **Manejo de pausas**: Utilizando una store, se almacenan datos como la hora de inicio y el tiempo transcurrido al pausar. Esto evita desajustes en el temporizador, especialmente en situaciones donde el hilo principal de JavaScript se bloquea.
3. **Menor mutación global**: Evitar un `setInterval` que constantemente actualice el estado global. En su lugar, el componente solo lee del store cada cierto intervalo, lo que hace el código más limpio y reduce la carga.
4. **Desempeño**: Al manejar los tiempos de pausa y reanudación usando registros de tiempo en lugar de incrementar un contador, evitamos desfases si el hilo de JavaScript se bloquea temporalmente.

## Detalles técnicos

### Store del Temporizador con Zustand

La [**store** del temporizador](./src/provider/take-exam/take-exam-slices.ts) maneja cuatro acciones principales:

- **startTimer**: Inicia el temporizador.
- **pauseTimer**: Pausa el temporizador y almacena el tiempo transcurrido.
- **resetTimer**: Restablece el temporizador a su valor inicial.
- **elapsedTimeOnPause**: Almacena el tiempo que ha pasado mientras el temporizador estaba pausado, para continuar desde el punto correcto al reanudar.

### Hook useStopwatch

El componente utiliza un hook personalizado llamado [useStopwatch](./src/hooks/use-stopwatch/use-stopwatch.ts) que interactúa con la store para mostrar el tiempo transcurrido correctamente. El hook usa un useEffect con un intervalo que actualiza el estado cada cierto tiempo solo si el temporizador está en ejecución.

Esta aproximación evita los problemas que surgen si el hilo de JavaScript se bloquea, ya que el temporizador siempre utiliza las marcas de tiempo para calcular el tiempo transcurrido en lugar de depender de un intervalo continuo.
