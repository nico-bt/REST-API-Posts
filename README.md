# REST-API-Posts

Práctica para mantener fresco como crear REST API.  
Modelos: User y Post.  
JWT para auth  
Todos los endpoints /posts requieren el jwt en el request --> Authorization: Bearer \<token\>


## Endpoints:
|Método | Endpoint          | Descripción            | Parámetros de entrada                                                                          | Respuesta  |
|------|--------------------|-------------------------|-------------------------------------------------------------------------------------------------|-------------------------------------------------------------|
|POST| /auth/sign-up | Crea un nuevo usuario   | - email (string, requerido) <br> - password (string, requerido) <br> - name (string, requerido) | - token (string) <br> - email (string) <br> - name (string) |
|POST| /auth/login   | Login usuario existente | - email (string, requerido) <br> - password (string, requerido)                                 | - token (string) <br> - email (string)                      |
|GET| /posts         | Devuelve todos los posts| en url ?page= (opcional, número): <br> Query para paginación<br>Valor predeterminado: 1         | - totalItems (número) <br> - itemsPerPage (número) <br> - posts (array) |
|GET| /posts/:postId | Devuelve post individual |                                                                                                | - Post: objeto JSON  |
|POST| /posts        | Crea nuevo Post | - title (string, requerido) <br> - content (string, requerido)                                          | - Post: objeto JSON  |
|DELETE| /posts/:postId | Elimina Post |                                                                                                         | - "Post DELETED" <br> - deletedPost: objeto JSON |
|PUT| /posts/:postId | Edita Post |    - title (string, requerido)<br> - content (string, requerido)                                             | - Post: objeto JSON   |

