# Proyecto de API REST con Autenticación y Autorización

Este proyecto es una API REST creada con Node.js, Express y MongoDB, utilizando Mongoose para la conexión con la base de datos. La autenticación se maneja mediante JSON Web Tokens (JWT) y se implementa un sistema de roles para la autorización de usuarios.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Modelos](#modelos)
  - [User](#user)
  - [Post](#post)
  - [Comment](#comment)
- [Rutas](#rutas)
  - [Rutas de Usuario](#rutas-de-usuario)
  - [Rutas de Publicaciones](#rutas-de-publicaciones)
  - [Rutas de Comentarios](#rutas-de-comentarios)
- [Autenticación y Autorización](#autenticación-y-autorización)
  - [Middleware isAuth](#middleware-isauth)
  - [Middleware isAdmin](#middleware-isadmin)
- [Uso](#uso)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Instalación

Para utilizar este proyecto, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:
   ```env
   JWT_SECRET=tu_secreto_jwt
   MONGO_URI=tu_conexion_mongodb
   ```
4. Inicia el servidor:
   ```bash
   npm start
   ```
   El servidor estará corriendo en `http://localhost:3000`.

## Configuración

El proyecto utiliza un archivo `.env` para gestionar las variables de entorno. Asegúrate de configurar correctamente las siguientes variables:

- `JWT_SECRET`: La clave secreta utilizada para firmar los tokens JWT.
- `MONGO_URI`: La URI de conexión a tu base de datos MongoDB.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

```bash
.
├── api
│   ├── controllers
│   │   ├── user.controller.js
│   │   ├── post.controller.js
│   │   └── comment.controller.js
│   ├── models
│   │   ├── user.model.js
│   │   ├── post.model.js
│   │   └── comment.model.js
│   └── routes
│       ├── user.routes.js
│       ├── post.routes.js
│       └── comment.routes.js
├── middlewares
│   ├── auth.middleware.js
├── utils
│   ├── db.js
│   └── token.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## Modelos

### User

Este modelo representa a los usuarios de la aplicación.

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  emoji: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true, minlength: 8 },
  email: { type: String, trim: true, required: true, validate: [validator.isEmail, 'Email is not valid'] },
  rol: { type: String, enum: ["admin", "user"], default: "user" }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('users', userSchema);
module.exports = User;
```

### Post

Este modelo representa las publicaciones de los usuarios.

```javascript
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
}, { timestamps: true });

const Post = mongoose.model('posts', postSchema);
module.exports = Post;
```

### Comment

Este modelo representa los comentarios realizados en las publicaciones.

```javascript
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true, trim: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'posts', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
}, { timestamps: true });

const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;
```

## Rutas

### Rutas de Usuario

- `POST /api/user/register`: Registra un nuevo usuario.
- `POST /api/user/login`: Inicia sesión con un usuario registrado.
- `POST /api/user/logout`: Cierra sesión del usuario actual (requiere autenticación).

### Rutas de Publicaciones

- `POST /api/posts`: Crea una nueva publicación (requiere autenticación y ser administrador).
- `GET /api/posts`: Obtiene todas las publicaciones (requiere autenticación).
- `GET /api/posts/:id`: Obtiene una publicación por su ID (requiere autenticación).
- `DELETE /api/posts/:id`: Elimina una publicación por su ID (requiere autenticación y ser administrador).

### Rutas de Comentarios

- `POST /api/comments`: Crea un nuevo comentario en una publicación (requiere autenticación).
- `GET /api/comments`: Obtiene todos los comentarios (requiere autenticación).
- `GET /api/comments/:id`: Obtiene un comentario por su ID (requiere autenticación).
- `DELETE /api/comments/:id`: Elimina un comentario por su ID (requiere autenticación y ser administrador).

## Autenticación y Autorización

### Middleware isAuth

Este middleware verifica si un usuario está autenticado mediante un JWT válido.

```javascript
const isAuth = async (req, res, next) => {
  // Implementación del middleware
};
```

### Middleware isAdmin

Este middleware verifica si el usuario autenticado tiene rol de administrador.

```javascript
const isAdmin = async (req, res, next) => {
  // Implementación del middleware
};
```

## Uso

1. Registra un usuario utilizando la ruta `/api/user/register`.
2. Inicia sesión con la ruta `/api/user/login` para obtener un token JWT.
3. Usa el token JWT para autenticarte en las rutas protegidas (añádelo en el header `Authorization` como `Bearer <token>`).
4. Crea, visualiza y elimina publicaciones y comentarios según los permisos del usuario.

## Contribuir

Si deseas contribuir a este proyecto, por favor, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza los cambios necesarios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Empuja los cambios a la rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.