# Estudio de Tatuajes Denis

Sitio web profesional para el Estudio de Tatuajes Denis, desarrollado con React, TypeScript y Vite.

## Características

- Diseño moderno y responsivo
- Panel de administración para gestionar la galería
- Autenticación segura
- Categorización de tatuajes (Realismo, Asiático, Color)
- Optimización de imágenes

## Tecnologías

- React + TypeScript
- Vite
- Tailwind CSS
- Firebase (Authentication, Hosting)
- Source Sans 3 y Birthstone (Google Fonts)

## Desarrollo Local

1. Clona el repositorio:
```bash
git clone https://github.com/adonis386/estudiotatuajes.git
cd estudiotatuajes
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` basado en `.env.example` y configura tus variables de Firebase.

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Despliegue

El sitio se despliega automáticamente a Firebase Hosting. Para un despliegue manual:

```bash
npm run build
firebase deploy
```

## Estructura del Proyecto

- `/src/components`: Componentes reutilizables
- `/src/pages`: Páginas principales
- `/src/hooks`: Custom hooks
- `/src/utils`: Utilidades y configuraciones
- `/src/assets`: Imágenes y recursos estáticos
