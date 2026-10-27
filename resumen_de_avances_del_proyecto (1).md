# TaskFlow IA - Resumen del Proyecto y Avances de QA Automation

## 🎯 Objetivo del Proyecto

Construir una plataforma full-stack de gestión de tareas integrada con capacidades de Inteligencia Artificial (LLM), utilizando Node.js, Express y TypeScript. El enfoque principal del proyecto es demostrar prácticas avanzadas de **QA Automation** (pruebas de API, seguridad para LLMs y pruebas de carga).

## 🏗️ Arquitectura y Stack Tecnológico

* **Entorno de Ejecución:** Node.js (v26.1.0)

* **Lenguaje:** TypeScript

* **Servidor HTTP:** Express.js

* **Ejecutor de Scripts:** `tsx` (en sustitución de `ts-node` para garantizar compatibilidad con Node v26)

* **Framework de Testing:** Playwright (`@playwright/test`)

* **Próximas Integraciones:** GraphQL y Locust (Python) para performance testing.

## 🚀 Logros y Hitos Completados

### 1. Configuración del Servidor y API REST (`src/server.ts`)

* Configuración del entorno de desarrollo mediante Express y TypeScript.

* Implementación del endpoint `POST /tasks` que simula la clasificación automática de tareas mediadas por un modelo de lenguaje (LLM).

* Verificación exitosa del estado del servidor en `http://127.0.0.1:3000`.

### 2. Capa de Seguridad contra Prompt Injection

* Implementación de filtros de seguridad en el backend para interceptar instrucciones maliciosas en las descripciones de las tareas (e.g., `"IGNORA LAS INSTRUCCIONES ANTERIORES"`).

* Asignación automática de la categoría `Security / Prompt Injection Detected` cuando se detecta un intento de manipulación del LLM.

### 3. Automatización de Pruebas con Playwright

* Configuración del cliente de solicitudes API (`apiContext` / `request`) para validar respuestas HTTP.

* Superación de bloqueos e incompatibilidades del CLI en Node v26 mediante la creación de un script de pruebas directo e independiente (`run-tests.ts`), ejecutado a través de `tsx`.

## 🧪 Pruebas Diseñadas y Validadas (`run-tests.ts`)

| \# | Tipo de Prueba | Descripción | Resultado | 
| ----- | ----- | ----- | ----- | 
| **1** | **Integración / QA** | Envío de una tarea común ("Bug crítico en login"). Se valida respuesta HTTP 201 y categorización de IA. | **PASÓ** ✅ | 
| **2** | **Seguridad / LLM** | Inyección de prompt malicioso en el cuerpo de la tarea. Se valida que la barrera de seguridad responda 201 y clasifique el evento como `Security / Prompt Injection Detected`. | **PASÓ** ✅ | 

## 📊 Estado Actual

El sistema backend está completamente operativo y las validaciones automatizadas de API y seguridad de IA han sido ejecutadas exitosamente con resultados en verde.