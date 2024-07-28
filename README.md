# CSV-Reader-File

## Introducción

**CSV-Reader-File** es un mini proyecto diseñado para leer archivos CSV y mostrar su contenido en una tabla HTML. Este proyecto permite cargar un archivo CSV desde una interfaz web, visualizar sus datos en una tabla paginada con un límite de 15 registros por página, realizar búsquedas en tiempo real, y ordenar las columnas de manera ascendente y descendente. La estructura del proyecto sigue el patrón de diseño MVC (Model-View-Controller) y está implementado con tecnologías como HTML, CSS, TypeScript, y Node.js. El proyecto utiliza un archivo CSV con un registro de departamentos y municipios de Colombia, el cual se encuentra en la carpeta `/public/data`.

## Estructura del Proyecto

### `/src`
- `/components`
  - `index.ts`: Instancia la clase controladora.
  - `paginationButton.ts`: Contiene la funcionalidad de los botones de paginación.
  - `validateDataset.ts`: Valida que el archivo CSV tenga un límite de 5 columnas.
- `/controllers`
  - `csv.controller.ts`: Clase controladora del CSV, maneja los elementos del HTML y métodos para leer el archivo, crear la tabla, seleccionar orden y manejar la búsqueda.
- `/models`
  - Definición del tipo para manejar la carga de los datos del CSV.

### `/dist`
Contiene los mismos archivos que `/src` pero compilados a JavaScript.

### `/views`
- `index.html`: Contiene el input file para cargar el archivo CSV y muestra la tabla de datos.

### `/public`
- `/data`
  - `Departamentos_y_municipios_de_Colombia.csv`: Archivo CSV usado para el proyecto.

## Características

- **Cargar archivo CSV**: Permite cargar y leer archivos CSV.
- **Mostrar en tabla**: Inserta los datos del CSV en una tabla HTML.
- **Búsqueda y filtro**: Campo de búsqueda para filtrar resultados en tiempo real.
- **Paginación**: Limita a 15 registros por página.
- **Validación del archivo**: Solo admite archivos CSV con un máximo de 5 columnas.
- **Ordenación**: Opciones para ordenar las columnas de forma ascendente y descendente.

## Tecnologías usadas

- HTML
- CSS
- TypeScript
- Node.js
- Git y GitHub

## Configuración

1. Instala TypeScript globalmente:
   ```bash
   npm i -g typescript
   ```

2. Inicializa el proyecto:
   ```bash
   npm init
   ```
3. Compila TypeScript en modo watch:
   ```bash
   npm run build
   ```

## Ejecución y Testeo

1. Ejecuta y prueba el proyecto:
   ```bash
   npm run test
   ```

## Ramificación
- `main`: Base del proyecto.
- `dev`: Desarrollo de características, correcciones y mejoras.
- `feat/x`: Ramas individuales para nuevas funcionalidades, fusionadas con dev.

## Video de Demostración

Consulta este [video de demostración](https://vimeo.com/991282718?share=copy) para ver cómo se utiliza el código y sus funcionalidades en acción.

## Autor

- GitHub: [@ecc97](https://github.com/ecc97)
- Correos electrónicos: [carmonaedwin5@gmail.com](mailto:carmonaedwin5@gmail.com), [carmonaedwin1123@gmail.com](mailto:carmonaedwin1123@gmail.com)
