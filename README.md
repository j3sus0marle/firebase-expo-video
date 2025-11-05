# Sistema de Tutorías Universitarias

Una aplicación web moderna para la **gestión de tutorías académicas** construida con **Expo Router**, **Firebase Authentication** y **React Native Web**.

## 🎓 Características del Sistema

- ✅ **Autenticación institucional** - Login seguro con Google para estudiantes
- ✅ **Solicitud de tutorías** - Los alumnos pueden pedir tutorías a sus tutores
- ✅ **Gestión de registros** - Historial completo de tutorías solicitadas y completadas
- ✅ **Dashboard personalizado** - Información del alumno y estado de tutorías
- ✅ **Sistema de calificaciones** - Evaluación de tutorías completadas
- ✅ **Responsive Design** - Funciona en web, móvil y tablet

## 📱 Páginas Disponibles

### `/` (Dashboard Principal)
- **Pantalla de login**: Autenticación con Google para estudiantes
- **Dashboard del alumno**: 
  - Información personal del estudiante
  - Estadísticas de tutorías (pendientes/completadas)
  - Acciones rápidas (Pedir Tutoría, Ver Registros)
  - Estado de próximas tutorías

### `/pedir-tutoria` (Solicitar Tutoría)
- **Formulario de solicitud**: 
  - Selección de materia (Matemáticas, Física, Química, Programación, Inglés, Estadística)
  - Especificación del tema
  - Descripción detallada del problema
  - Fecha preferida (opcional)
- **Envío automático** al tutor correspondiente

### `/registros` (Historial de Tutorías)
- **Filtros**: Todas, Pendientes, Completadas
- **Estadísticas**: Resumen de tutorías por estado
- **Lista detallada**: 
  - Información completa de cada tutoría
  - Estado (Pendiente/Completada/Cancelada)
  - Sistema de calificación con estrellas
  - Datos del tutor asignado

## 🎨 Paleta de Colores Universitaria

- **Verde institucional**: `#4CAF50` (header, botones principales)
- **Café académico**: `#8D6E63` (estadísticas, elementos secundarios)
- **Verde oscuro**: `#2E4D3A` (títulos y texto principal)
- **Naranja**: `#FF9800` (tutorías pendientes)
- **Rojo**: `#F44336` (tutorías canceladas)

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm start              # Iniciar en modo desarrollo
npm run web           # Iniciar solo web
npm run android       # Iniciar en Android
npm run ios           # Iniciar en iOS

# Construcción
npm run build         # Construir para producción
```

## 📱 Páginas Disponibles

### `/` (Página Principal)
- Pantalla de login con Google Authentication
- Dashboard principal después del login
- Gestión completa del estado de autenticación

### Rutas futuras sugeridas:
- `/auth/login` - Página dedicada de login
- `/dashboard` - Dashboard separado
- `/profile` - Perfil de usuario
- `/settings` - Configuraciones

## 🔧 Configuración

1. **Firebase**: Configurado en `FireBaseConfig.ts`
2. **Google Auth**: Habilitado en Firebase Console
3. **Expo Router**: Configurado para navegación basada en archivos

## 📄 Notas de Desarrollo

- Los componentes están organizados por funcionalidad
- La autenticación maneja tanto login como dashboard en un solo componente
- Diseño responsive que funciona en todas las plataformas
- Estructura preparada para escalar con más páginas y funcionalidades