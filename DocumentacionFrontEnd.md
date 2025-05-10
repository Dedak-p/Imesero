## Constants

<dl>
<dt><a href="#apiClient">apiClient</a> : <code><a href="#external_AxiosInstance">AxiosInstance</a></code></dt>
<dd><p>Cliente Axios utilizado en toda la aplicación.</p>
</dd>
<dt><a href="#AppContext">AppContext</a> : <code><a href="#AppContextType">React.Context.&lt;AppContextType&gt;</a></code></dt>
<dd><p>Contexto global de la aplicación.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#App">App()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Componente raíz de la aplicación que define la navegación.</p>
<p>Encapsula todas las rutas de la SPA usando React Router v6,
mapeando cada path a su componente de página correspondiente.</p>
</dd>
<dt><a href="#Header">Header()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Componente Header de la aplicación.</p>
<p>Muestra controles de navegación, selección de idioma,
iconos de usuario, carrito y seguimiento de pedido,
así como la barra de categorías al navegar por el menú.</p>
</dd>
<dt><a href="#Item">Item(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Componente de tarjeta de producto.</p>
<p>Muestra la imagen, nombre y descripción en el idioma seleccionado,
así como el precio y un botón para añadir el producto al carrito.</p>
</dd>
<dt><a href="#ItemCarrito">ItemCarrito(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Componente de línea de pedido en el carrito.</p>
<p>Muestra la información del producto (imagen, nombre, descripción y precio total según la cantidad),
controles para incrementar o decrementar la cantidad, y gestiona el estado de carga/errores
al obtener los datos desde la API.</p>
</dd>
<dt><a href="#ItemConfirmado">ItemConfirmado(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Componente de línea de producto confirmado en la pantalla de resumen de pedido.</p>
<p>Muestra la imagen, nombre, descripción, cantidad y total de un producto tras confirmar el pedido.</p>
</dd>
<dt><a href="#Item">Item(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Tarjeta de producto para administración, con botón de eliminación.</p>
<p>Muestra la imagen, nombre y descripción en el idioma seleccionado,
el precio y un botón para eliminar el producto.</p>
</dd>
<dt><a href="#ItemModificar">ItemModificar(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Componente tarjeta de producto con opción de navegación a la página de modificación.</p>
<p>Muestra la imagen, nombre, descripción y precio de un producto,
y un botón que redirige a la ruta de edición correspondiente.</p>
</dd>
<dt><a href="#SeccionTitulo">SeccionTitulo(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Componente que renderiza un título de sección con un borde inferior y anclaje.</p>
</dd>
<dt><a href="#useApiCall">useApiCall(endpoint, [method], [body], [dependencies])</a> ⇒ <code><a href="#ApiCallResult">ApiCallResult</a></code></dt>
<dd><p>Hook genérico para realizar llamadas a la API y normalizar la respuesta siempre como un array.</p>
</dd>
<dt><a href="#CarritoPage">CarritoPage()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Página principal del carrito de la mesa.</p>
<p>Muestra los ítems pendientes de pago, subtotal y permite confirmar la comanda.</p>
</dd>
<dt><a href="#CrearCuenta">CrearCuenta()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Componente para crear una cuenta de usuario.</p>
<p>Renderiza un formulario que solicita email y contraseña (con confirmación),
valida los campos, envía la petición de registro a la API,
guarda el token y nombre de usuario en localStorage, actualiza el contexto
y redirige al usuario a la página principal.</p>
</dd>
<dt><a href="#CrearProducto">CrearProducto()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Componente que renderiza un formulario para crear un nuevo producto.
Permite subir una imagen, completar datos multilenguaje y enviar al backend.</p>
</dd>
<dt><a href="#EditarProducto">EditarProducto()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Componente para editar un producto existente.</p>
<p>Obtiene los datos del producto por ID, los carga en un formulario,
permite modificar campos y enviar los cambios con una petición PUT.</p>
</dd>
<dt><a href="#EliminarProductos">EliminarProductos()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Componente de página para eliminar productos.</p>
<p>Obtiene la lista de productos de la API, muestra cada uno con un botón de eliminación,
y actualiza la lista local tras eliminar un producto con éxito.</p>
</dd>
<dt><a href="#Home">Home()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Página de inicio de la aplicación.</p>
<p>Muestra un saludo personalizado, permite cambiar idioma,
listar y seleccionar mesas, y ofrece botones de sesión y administración
según el rol del usuario.</p>
</dd>
<dt><a href="#ItemPage">ItemPage()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Página de detalle de un ítem.</p>
<p>Incluye el encabezado, muestra el componente <code>Item</code> con el ítem seleccionado,
y secciones de descripción e ingredientes con texto estático.</p>
</dd>
<dt><a href="#Login">Login()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Componente de formulario de autenticación de usuario.</p>
<p>Muestra campos de email y contraseña, valida el email con una expresión regular,
envía la petición de login a la API, guarda el token y nombre de usuario en localStorage
y redirige al inicio o muestra mensajes de error.</p>
</dd>
<dt><a href="#MenuPage">MenuPage()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Página de menú que muestra los productos filtrados por categoría.</p>
<ul>
<li>Al montar, registra la mesa activa en el contexto con <code>setMesaId</code>.</li>
<li>Carga todos los productos via <code>useApiCall</code>.</li>
<li>Al añadir un producto, además de hacer la llamada, invoca <code>bumpCart()</code>
para notificar al dropdown del carrito que debe refrescarse.</li>
</ul>
</dd>
<dt><a href="#ModificarProducto">ModificarProducto()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Página para seleccionar y modificar productos existentes.</p>
<p>Carga la lista de productos desde la API, muestra un indicador de carga o error,
y renderiza un componente <code>ItemModificar</code> para cada producto, permitiendo editarlos.
Si no hay productos, ofrece un botón para crear uno nuevo.</p>
</dd>
<dt><a href="#NotFoundPage">NotFoundPage()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Componente de página para rutas no encontradas (404).</p>
<p>Muestra un mensaje indicando que la página solicitada no existe.</p>
</dd>
<dt><a href="#PagarPage">PagarPage()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Página de pago que muestra los ítems confirmados y permite proceder al pago.</p>
<p>Carga desde la API los ítems confirmados de la comanda de la mesa,
agrupa ítems duplicados, calcula el total y envía la actualización de estado
de la comanda al servidor.</p>
</dd>
<dt><a href="#SeguimientoPage">SeguimientoPage()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Componente de página para el seguimiento del pedido.</p>
<p>Muestra los pasos de la comanda y resalta el estado actual,
avanzando automáticamente cada 5 segundos.</p>
</dd>
<dt><a href="#UsuarioPage">UsuarioPage()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Página de perfil de usuario que muestra sus comandas realizadas.</p>
<p>Al montar, carga los datos del usuario autenticado y sus comandas
desde la API usando el token almacenado en localStorage.
Muestra un listado de cada comanda con detalles de mesa, estado, total e ítems.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#CartItem">CartItem</a> : <code>Object</code></dt>
<dd><p>Un ítem dentro de la comanda de la mesa.</p>
</dd>
<dt><a href="#Product">Product</a> : <code>Object</code></dt>
<dd><p>Un producto obtenido desde la API.</p>
</dd>
<dt><a href="#MesaApiResponse">MesaApiResponse</a> : <code>Object</code></dt>
<dd><p>Elemento de respuesta para la API de mesas.</p>
</dd>
<dt><a href="#Category">Category</a> : <code>Object</code></dt>
<dd><p>Representa una categoría de producto.</p>
</dd>
<dt><a href="#CategoriesResponse">CategoriesResponse</a> : <code>Object</code></dt>
<dd><p>Estructura de retorno de useApiCall para categorías.</p>
</dd>
<dt><a href="#Product">Product</a> : <code>Object</code></dt>
<dd><p>Representa un producto en la vista de lista de productos.</p>
</dd>
<dt><a href="#Product">Product</a> : <code>Object</code></dt>
<dd><p>Representa un producto obtenido de la API.</p>
</dd>
<dt><a href="#ItemCarritoProps">ItemCarritoProps</a> : <code>Object</code></dt>
<dd><p>Props del componente ItemCarrito.</p>
</dd>
<dt><a href="#Product">Product</a> : <code>Object</code></dt>
<dd><p>Representa un producto confirmado en el resumen de pedido.</p>
</dd>
<dt><a href="#ItemConfirmadoProps">ItemConfirmadoProps</a> : <code>Object</code></dt>
<dd><p>Props del componente ItemConfirmado.</p>
</dd>
<dt><a href="#Product">Product</a> : <code>Object</code></dt>
<dd><p>Representa un producto genérico.</p>
</dd>
<dt><a href="#ItemProps">ItemProps</a> : <code>Object</code></dt>
<dd><p>Props del componente Item de administración de productos.</p>
</dd>
<dt><a href="#Product">Product</a> : <code>Object</code></dt>
<dd><p>Representa un producto genérico.</p>
</dd>
<dt><a href="#ItemModificarProps">ItemModificarProps</a> : <code>Object</code></dt>
<dd><p>Props del componente ItemModificar.</p>
</dd>
<dt><a href="#SeccionTituloProps">SeccionTituloProps</a> : <code>Object</code></dt>
<dd><p>Props del componente SeccionTitulo.</p>
</dd>
<dt><a href="#AppContextType">AppContextType</a> : <code>Object</code></dt>
<dd><p>Estructura de los valores que provee el contexto de la aplicación.</p>
</dd>
<dt><a href="#ApiCallResult">ApiCallResult</a> : <code>Object</code></dt>
<dd><p>Resultado devuelto por el hook useApiCall.</p>
</dd>
<dt><a href="#ComandaItem">ComandaItem</a> : <code>Object</code></dt>
<dd><p>Estructura de un ítem dentro de la comanda de la mesa.</p>
</dd>
<dt><a href="#MesaComanda">MesaComanda</a> : <code>Object</code></dt>
<dd><p>Estructura de la comanda de la mesa.</p>
</dd>
<dt><a href="#ProductFormData">ProductFormData</a> : <code>Object</code></dt>
<dd><p>Estructura de los datos del formulario de creación de producto.</p>
</dd>
<dt><a href="#NewProductData">NewProductData</a> : <code>Object</code></dt>
<dd><p>Estructura de los datos listos para enviar al backend.</p>
</dd>
<dt><a href="#ProductoData">ProductoData</a> : <code>Object</code></dt>
<dd><p>Representa los datos de un producto recuperado de la API.</p>
</dd>
<dt><a href="#EditFormState">EditFormState</a> : <code>Object</code></dt>
<dd><p>Estado interno del formulario de edición.</p>
</dd>
<dt><a href="#Product">Product</a> : <code>Object</code></dt>
<dd><p>Representa un producto para eliminación.</p>
</dd>
<dt><a href="#Mesa">Mesa</a> : <code>Object</code></dt>
<dd><p>Datos de una mesa obtenidos de la API.</p>
</dd>
<dt><a href="#TextosHome">TextosHome</a> : <code>Object</code></dt>
<dd><p>Textos localizados para distintos elementos de la página de inicio.</p>
</dd>
<dt><a href="#LoginTexts">LoginTexts</a> : <code>Object</code></dt>
<dd><p>Textos localizados para el formulario de login.</p>
</dd>
<dt><a href="#MenuItem">MenuItem</a> : <code>Object</code></dt>
<dd><p>Representa un producto del menú.</p>
</dd>
<dt><a href="#MenuTexts">MenuTexts</a> : <code>Object</code></dt>
<dd><p>Textos localizados para las secciones del menú.</p>
</dd>
<dt><a href="#Product">Product</a> : <code>Object</code></dt>
<dd><p>Representa un producto genérico.</p>
</dd>
<dt><a href="#ProductSummary">ProductSummary</a> : <code>Object</code></dt>
<dd><p>Resumen de un producto para el pago.</p>
</dd>
<dt><a href="#ConfirmedItem">ConfirmedItem</a> : <code>Object</code></dt>
<dd><p>Ítem confirmado de una comanda.</p>
</dd>
<dt><a href="#SeguimientoTranslations">SeguimientoTranslations</a> : <code>Object</code></dt>
<dd><p>Traducciones para los distintos estados del seguimiento.</p>
</dd>
<dt><a href="#Usuario">Usuario</a> : <code>Object</code></dt>
<dd><p>Representa los datos de un usuario autenticado.</p>
</dd>
<dt><a href="#ComandaItem">ComandaItem</a> : <code>Object</code></dt>
<dd><p>Representa un ítem de una comanda de usuario.</p>
</dd>
<dt><a href="#Comanda">Comanda</a> : <code>Object</code></dt>
<dd><p>Representa una comanda realizada por el usuario.</p>
</dd>
</dl>

## External

<dl>
<dt><a href="#external_AxiosInstance">AxiosInstance</a></dt>
<dd><p>Instancia de cliente Axios configurada para comunicarse con la API del backend.</p>
<ul>
<li>Base URL: definida por la variable de entorno <code>VITE_API_URL</code>.</li>
<li>Envía credenciales (cookies) con cada petición.</li>
</ul>
</dd>
</dl>

<a name="apiClient"></a>

## apiClient : [<code>AxiosInstance</code>](#external_AxiosInstance)
Cliente Axios utilizado en toda la aplicación.

**Kind**: global constant  
<a name="AppContext"></a>

## AppContext : [<code>React.Context.&lt;AppContextType&gt;</code>](#AppContextType)
Contexto global de la aplicación.

**Kind**: global constant  
<a name="App"></a>

## App() ⇒ <code>JSX.Element</code>
Componente raíz de la aplicación que define la navegación.Encapsula todas las rutas de la SPA usando React Router v6,mapeando cada path a su componente de página correspondiente.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - El árbol de rutas de la aplicación.  
**Component**:   
<a name="Header"></a>

## Header() ⇒ <code>JSX.Element</code>
Componente Header de la aplicación.Muestra controles de navegación, selección de idioma,iconos de usuario, carrito y seguimiento de pedido,así como la barra de categorías al navegar por el menú.

**Kind**: global function  
**Component**:   
<a name="Header..changeLanguage"></a>

### Header~changeLanguage(ext) ⇒ <code>void</code>
Cambia el idioma de la aplicación.

**Kind**: inner method of [<code>Header</code>](#Header)  

| Param | Type | Description |
| --- | --- | --- |
| ext | <code>&#x27;es&#x27;</code> \| <code>&#x27;ca&#x27;</code> \| <code>&#x27;en&#x27;</code> | Código del idioma ('es' | 'ca' | 'en'). |

<a name="Item"></a>

## Item(props) ⇒ <code>JSX.Element</code>
Componente de tarjeta de producto.Muestra la imagen, nombre y descripción en el idioma seleccionado,así como el precio y un botón para añadir el producto al carrito.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Elemento React que representa la tarjeta del producto.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> |  |
| props.producto | [<code>Product</code>](#Product) | Objeto con los datos del producto. |
| props.onAddToCart | <code>function</code> | Función que se llama al añadir al carrito. |

<a name="ItemCarrito"></a>

## ItemCarrito(props) ⇒ <code>JSX.Element</code>
Componente de línea de pedido en el carrito.Muestra la información del producto (imagen, nombre, descripción y precio total según la cantidad),controles para incrementar o decrementar la cantidad, y gestiona el estado de carga/erroresal obtener los datos desde la API.

**Kind**: global function  
**Component**:   

| Param | Type |
| --- | --- |
| props | [<code>ItemCarritoProps</code>](#ItemCarritoProps) | 

<a name="ItemConfirmado"></a>

## ItemConfirmado(props) ⇒ <code>JSX.Element</code>
Componente de línea de producto confirmado en la pantalla de resumen de pedido.Muestra la imagen, nombre, descripción, cantidad y total de un producto tras confirmar el pedido.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Elemento React que representa el producto confirmado.  
**Component**:   

| Param | Type |
| --- | --- |
| props | [<code>ItemConfirmadoProps</code>](#ItemConfirmadoProps) | 

<a name="Item"></a>

## Item(props) ⇒ <code>JSX.Element</code>
Tarjeta de producto para administración, con botón de eliminación.Muestra la imagen, nombre y descripción en el idioma seleccionado,el precio y un botón para eliminar el producto.

**Kind**: global function  
**Component**:   

| Param | Type |
| --- | --- |
| props | [<code>ItemProps</code>](#ItemProps) | 

<a name="ItemModificar"></a>

## ItemModificar(props) ⇒ <code>JSX.Element</code>
Componente tarjeta de producto con opción de navegación a la página de modificación.Muestra la imagen, nombre, descripción y precio de un producto,y un botón que redirige a la ruta de edición correspondiente.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Elemento React que representa la tarjeta modificable.  
**Component**:   

| Param | Type |
| --- | --- |
| props | [<code>ItemModificarProps</code>](#ItemModificarProps) | 

<a name="ItemModificar..textos"></a>

### ItemModificar~textos : <code>Object</code>
Mapas de texto para el botón según el idioma seleccionado.

**Kind**: inner constant of [<code>ItemModificar</code>](#ItemModificar)  
<a name="SeccionTitulo"></a>

## SeccionTitulo(props) ⇒ <code>JSX.Element</code>
Componente que renderiza un título de sección con un borde inferior y anclaje.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Elemento contenedor con el título estilizado.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | [<code>SeccionTituloProps</code>](#SeccionTituloProps) |  |
| props.titulo | <code>string</code> | Texto que se mostrará en el encabezado. |
| props.slug | <code>string</code> | Valor usado en el atributo `id` para enlace por fragmento. |

<a name="useApiCall"></a>

## useApiCall(endpoint, [method], [body], [dependencies]) ⇒ [<code>ApiCallResult</code>](#ApiCallResult)
Hook genérico para realizar llamadas a la API y normalizar la respuesta siempre como un array.

**Kind**: global function  
**Returns**: [<code>ApiCallResult</code>](#ApiCallResult) - Objeto con propiedades { data, loading, error, refetch }.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| endpoint | <code>string</code> |  | Ruta de la API a la que se hará la solicitud (por ejemplo '/productos'). |
| [method] | <code>&#x27;get&#x27;</code> \| <code>&#x27;post&#x27;</code> \| <code>&#x27;put&#x27;</code> \| <code>&#x27;patch&#x27;</code> \| <code>&#x27;delete&#x27;</code> | <code>&#x27;get&#x27;</code> | Método HTTP a utilizar. |
| [body] | <code>Object</code> \| <code>null</code> | <code></code> | Cuerpo de la solicitud para métodos POST, PUT o PATCH. |
| [dependencies] | <code>Array.&lt;any&gt;</code> | <code>[]</code> | Dependencias que, al cambiar, volverán a disparar la llamada. |

<a name="CarritoPage"></a>

## CarritoPage() ⇒ <code>JSX.Element</code>
Página principal del carrito de la mesa.Muestra los ítems pendientes de pago, subtotal y permite confirmar la comanda.

**Kind**: global function  
**Component**:   

* [CarritoPage()](#CarritoPage) ⇒ <code>JSX.Element</code>
    * [~textos](#CarritoPage..textos) : <code>Object</code>
    * [~mesaData](#CarritoPage..mesaData) : [<code>MesaComanda</code>](#MesaComanda)
    * [~itemList](#CarritoPage..itemList) : [<code>Array.&lt;ComandaItem&gt;</code>](#ComandaItem)
    * [~total](#CarritoPage..total) : <code>number</code>
    * [~updateItem](#CarritoPage..updateItem) ⇒ <code>Promise.&lt;void&gt;</code>
    * [~manejarConfirmacion](#CarritoPage..manejarConfirmacion) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="CarritoPage..textos"></a>

### CarritoPage~textos : <code>Object</code>
Textos localizados para la página de carrito.

**Kind**: inner constant of [<code>CarritoPage</code>](#CarritoPage)  
<a name="CarritoPage..mesaData"></a>

### CarritoPage~mesaData : [<code>MesaComanda</code>](#MesaComanda)
**Kind**: inner constant of [<code>CarritoPage</code>](#CarritoPage)  
<a name="CarritoPage..itemList"></a>

### CarritoPage~itemList : [<code>Array.&lt;ComandaItem&gt;</code>](#ComandaItem)
Filtra y agrupa los ítems no pagados por producto, calculando subtotales.

**Kind**: inner constant of [<code>CarritoPage</code>](#CarritoPage)  
<a name="CarritoPage..total"></a>

### CarritoPage~total : <code>number</code>
Calcula el total sumando todos los subtotales.

**Kind**: inner constant of [<code>CarritoPage</code>](#CarritoPage)  
<a name="CarritoPage..updateItem"></a>

### CarritoPage~updateItem ⇒ <code>Promise.&lt;void&gt;</code>
Realiza una petición para añadir o quitar unidades de un ítem en la comanda.

**Kind**: inner constant of [<code>CarritoPage</code>](#CarritoPage)  

| Param | Type | Description |
| --- | --- | --- |
| productoId | <code>number</code> | ID del producto a actualizar. |
| delta | <code>number</code> | Cambio en la cantidad (+1 o -1). |

<a name="CarritoPage..manejarConfirmacion"></a>

### CarritoPage~manejarConfirmacion ⇒ <code>Promise.&lt;void&gt;</code>
Confirma la comanda marcándola y redirige a la página de pago.

**Kind**: inner constant of [<code>CarritoPage</code>](#CarritoPage)  
<a name="CrearCuenta"></a>

## CrearCuenta() ⇒ <code>JSX.Element</code>
Componente para crear una cuenta de usuario.Renderiza un formulario que solicita email y contraseña (con confirmación),valida los campos, envía la petición de registro a la API,guarda el token y nombre de usuario en localStorage, actualiza el contextoy redirige al usuario a la página principal.

**Kind**: global function  
**Component**:   

* [CrearCuenta()](#CrearCuenta) ⇒ <code>JSX.Element</code>
    * [~emailRegex](#CrearCuenta..emailRegex) : <code>RegExp</code>
    * [~textos](#CrearCuenta..textos) : <code>Object</code>
    * [~handleLogin(e)](#CrearCuenta..handleLogin) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="CrearCuenta..emailRegex"></a>

### CrearCuenta~emailRegex : <code>RegExp</code>
Expresión regular para validar formato de correo electrónico.

**Kind**: inner constant of [<code>CrearCuenta</code>](#CrearCuenta)  
<a name="CrearCuenta..textos"></a>

### CrearCuenta~textos : <code>Object</code>
Textos localizados para etiquetas y botones del formulario.

**Kind**: inner constant of [<code>CrearCuenta</code>](#CrearCuenta)  
<a name="CrearCuenta..handleLogin"></a>

### CrearCuenta~handleLogin(e) ⇒ <code>Promise.&lt;void&gt;</code>
Gestiona el envío del formulario de registro.Valida el email y la coincidencia de contraseñas,realiza la petición POST a `/api/register`, almacena el token y el nombre de usuario,actualiza el contexto global y redirige al inicio.

**Kind**: inner method of [<code>CrearCuenta</code>](#CrearCuenta)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>React.FormEvent.&lt;HTMLFormElement&gt;</code> | Evento de submit del formulario. |

<a name="CrearProducto"></a>

## CrearProducto() ⇒ <code>JSX.Element</code>
Componente que renderiza un formulario para crear un nuevo producto.Permite subir una imagen, completar datos multilenguaje y enviar al backend.

**Kind**: global function  
**Component**:   

* [CrearProducto()](#CrearProducto) ⇒ <code>JSX.Element</code>
    * [~handleChange(e)](#CrearProducto..handleChange)
    * [~handleSubmit(e)](#CrearProducto..handleSubmit) ⇒ <code>Promise.&lt;void&gt;</code>
    * [~subirImagen(imagen)](#CrearProducto..subirImagen) ⇒ <code>Promise.&lt;string&gt;</code>
    * [~crearProducto(data)](#CrearProducto..crearProducto) ⇒ <code>Promise.&lt;void&gt;</code>
    * [~mapearCateg(categoria)](#CrearProducto..mapearCateg) ⇒ <code>number</code> \| <code>null</code>

<a name="CrearProducto..handleChange"></a>

### CrearProducto~handleChange(e)
Actualiza el estado del formulario al cambiar un campo.

**Kind**: inner method of [<code>CrearProducto</code>](#CrearProducto)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Evento de cambio de campo del formulario. |

<a name="CrearProducto..handleSubmit"></a>

### CrearProducto~handleSubmit(e) ⇒ <code>Promise.&lt;void&gt;</code>
Gestiona el envío del formulario:1. Sube la imagen y obtiene su ruta.2. Mapea la categoría a ID.3. Envía el producto completo al backend.4. Limpia el formulario al éxito.

**Kind**: inner method of [<code>CrearProducto</code>](#CrearProducto)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Evento de submit del formulario. |

<a name="CrearProducto..subirImagen"></a>

### CrearProducto~subirImagen(imagen) ⇒ <code>Promise.&lt;string&gt;</code>
Sube un archivo de imagen al servidor y devuelve su ruta pública.

**Kind**: inner method of [<code>CrearProducto</code>](#CrearProducto)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Ruta retornada por el servidor.  
**Throws**:

- <code>Error</code> Si la subida falla.


| Param | Type | Description |
| --- | --- | --- |
| imagen | <code>File</code> | Archivo de imagen a subir. |

<a name="CrearProducto..crearProducto"></a>

### CrearProducto~crearProducto(data) ⇒ <code>Promise.&lt;void&gt;</code>
Envía los datos del producto al backend para su creación.

**Kind**: inner method of [<code>CrearProducto</code>](#CrearProducto)  
**Throws**:

- <code>Error</code> Si la creación falla.


| Param | Type | Description |
| --- | --- | --- |
| data | [<code>NewProductData</code>](#NewProductData) | Datos preparados con ruta de imagen y categoría. |

<a name="CrearProducto..mapearCateg"></a>

### CrearProducto~mapearCateg(categoria) ⇒ <code>number</code> \| <code>null</code>
Mapea el nombre de categoría a su ID numérico en la base de datos.

**Kind**: inner method of [<code>CrearProducto</code>](#CrearProducto)  
**Returns**: <code>number</code> \| <code>null</code> - ID de categoría o null si no existe.  

| Param | Type | Description |
| --- | --- | --- |
| categoria | <code>string</code> | Nombre legible de la categoría. |

<a name="EditarProducto"></a>

## EditarProducto() ⇒ <code>JSX.Element</code>
Componente para editar un producto existente.Obtiene los datos del producto por ID, los carga en un formulario,permite modificar campos y enviar los cambios con una petición PUT.

**Kind**: global function  
**Component**:   

* [EditarProducto()](#EditarProducto) ⇒ <code>JSX.Element</code>
    * [~handleChange(e)](#EditarProducto..handleChange)
    * [~actualizarProducto(id, formState, token)](#EditarProducto..actualizarProducto) ⇒ <code>Promise.&lt;void&gt;</code>
    * [~handleSubmit(e)](#EditarProducto..handleSubmit)

<a name="EditarProducto..handleChange"></a>

### EditarProducto~handleChange(e)
Actualiza el estado del formulario al cambiar un campo.

**Kind**: inner method of [<code>EditarProducto</code>](#EditarProducto)  

| Param | Type |
| --- | --- |
| e | <code>React.ChangeEvent.&lt;(HTMLInputElement\|HTMLSelectElement\|HTMLTextAreaElement)&gt;</code> | 

<a name="EditarProducto..actualizarProducto"></a>

### EditarProducto~actualizarProducto(id, formState, token) ⇒ <code>Promise.&lt;void&gt;</code>
Envía la petición PUT para actualizar el producto en el servidor.

**Kind**: inner method of [<code>EditarProducto</code>](#EditarProducto)  
**Throws**:

- <code>Error</code> Si la petición falla.


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID del producto a actualizar. |
| formState | [<code>EditFormState</code>](#EditFormState) | Datos del formulario. |
| token | <code>string</code> | Token de autenticación JWT. |

<a name="EditarProducto..handleSubmit"></a>

### EditarProducto~handleSubmit(e)
Maneja el envío del formulario de edición.

**Kind**: inner method of [<code>EditarProducto</code>](#EditarProducto)  

| Param | Type |
| --- | --- |
| e | <code>React.FormEvent.&lt;HTMLFormElement&gt;</code> | 

<a name="EliminarProductos"></a>

## EliminarProductos() ⇒ <code>JSX.Element</code>
Componente de página para eliminar productos.Obtiene la lista de productos de la API, muestra cada uno con un botón de eliminación,y actualiza la lista local tras eliminar un producto con éxito.

**Kind**: global function  
**Component**:   
<a name="EliminarProductos..eliminarProducto"></a>

### EliminarProductos~eliminarProducto(producto) ⇒ <code>Promise.&lt;void&gt;</code>
Elimina un producto haciendo DELETE a la API y, si tiene éxito,remueve el producto de la lista local.

**Kind**: inner method of [<code>EliminarProductos</code>](#EliminarProductos)  

| Param | Type | Description |
| --- | --- | --- |
| producto | [<code>Product</code>](#Product) | Producto a eliminar. |

<a name="Home"></a>

## Home() ⇒ <code>JSX.Element</code>
Página de inicio de la aplicación.Muestra un saludo personalizado, permite cambiar idioma,listar y seleccionar mesas, y ofrece botones de sesión y administraciónsegún el rol del usuario.

**Kind**: global function  
**Component**:   

* [Home()](#Home) ⇒ <code>JSX.Element</code>
    * [~textos](#Home..textos) : [<code>TextosHome</code>](#TextosHome)
    * [~handleLogout(e)](#Home..handleLogout) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="Home..textos"></a>

### Home~textos : [<code>TextosHome</code>](#TextosHome)
Textos localizados usados en la página.

**Kind**: inner constant of [<code>Home</code>](#Home)  
<a name="Home..handleLogout"></a>

### Home~handleLogout(e) ⇒ <code>Promise.&lt;void&gt;</code>
Cierra la sesión del usuario, limpia contexto y localStorage, y redirige al inicio.

**Kind**: inner method of [<code>Home</code>](#Home)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>React.MouseEvent.&lt;HTMLButtonElement&gt;</code> | Evento de clic. |

<a name="ItemPage"></a>

## ItemPage() ⇒ <code>JSX.Element</code>
Página de detalle de un ítem.

Incluye el encabezado, muestra el componente `Item` con el ítem seleccionado,
y secciones de descripción e ingredientes con texto estático.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Elemento React que representa la página de detalle de un ítem.  
**Component**:   
<a name="Login"></a>

## Login() ⇒ <code>JSX.Element</code>
Componente de formulario de autenticación de usuario.Muestra campos de email y contraseña, valida el email con una expresión regular,envía la petición de login a la API, guarda el token y nombre de usuario en localStoragey redirige al inicio o muestra mensajes de error.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Elemento React para la página de login.  
**Component**:   

* [Login()](#Login) ⇒ <code>JSX.Element</code>
    * [~emailRegex](#Login..emailRegex) : <code>RegExp</code>
    * [~textos](#Login..textos) : [<code>LoginTexts</code>](#LoginTexts)
    * [~handleLogin(e)](#Login..handleLogin)

<a name="Login..emailRegex"></a>

### Login~emailRegex : <code>RegExp</code>
Expresión regular para validar formato de correo electrónico.

**Kind**: inner constant of [<code>Login</code>](#Login)  
<a name="Login..textos"></a>

### Login~textos : [<code>LoginTexts</code>](#LoginTexts)
Textos localizados para elementos del formulario.

**Kind**: inner constant of [<code>Login</code>](#Login)  
<a name="Login..handleLogin"></a>

### Login~handleLogin(e)
Gestiona el envío del formulario de login.Valida el email, envía la petición POST a `/api/login`,guarda el token y nombre de usuario en localStorage, actualiza el contextoy redirige al inicio. Muestra mensaje de error si falla.

**Kind**: inner method of [<code>Login</code>](#Login)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>React.FormEvent.&lt;HTMLFormElement&gt;</code> | Evento de submit del formulario. |

<a name="MenuPage"></a>

## MenuPage() ⇒ <code>JSX.Element</code>
Página de menú que muestra los productos filtrados por categoría.- Al montar, registra la mesa activa en el contexto con `setMesaId`.- Carga todos los productos via `useApiCall`.- Al añadir un producto, además de hacer la llamada, invoca `bumpCart()`  para notificar al dropdown del carrito que debe refrescarse.

**Kind**: global function  
**Component**:   

* [MenuPage()](#MenuPage) ⇒ <code>JSX.Element</code>
    * [~textos](#MenuPage..textos) : [<code>MenuTexts</code>](#MenuTexts)
    * [~handleAddToCart(producto)](#MenuPage..handleAddToCart) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="MenuPage..textos"></a>

### MenuPage~textos : [<code>MenuTexts</code>](#MenuTexts)
Textos localizados usados en la página de menú.

**Kind**: inner constant of [<code>MenuPage</code>](#MenuPage)  
<a name="MenuPage..handleAddToCart"></a>

### MenuPage~handleAddToCart(producto) ⇒ <code>Promise.&lt;void&gt;</code>
Añade un producto al carrito (comanda).- Determina si el usuario está autenticado por la existencia de `token`.- Elige el endpoint correspondiente.- Tras el POST exitoso, invoca `bumpCart()` para que el dropdown del carrito  sepa que debe volver a cargar sus datos.

**Kind**: inner method of [<code>MenuPage</code>](#MenuPage)  

| Param | Type | Description |
| --- | --- | --- |
| producto | [<code>MenuItem</code>](#MenuItem) | Producto a añadir al carrito. |

<a name="ModificarProducto"></a>

## ModificarProducto() ⇒ <code>JSX.Element</code>
Página para seleccionar y modificar productos existentes.Carga la lista de productos desde la API, muestra un indicador de carga o error,y renderiza un componente `ItemModificar` para cada producto, permitiendo editarlos.Si no hay productos, ofrece un botón para crear uno nuevo.

**Kind**: global function  
**Component**:   
<a name="NotFoundPage"></a>

## NotFoundPage() ⇒ <code>JSX.Element</code>
Componente de página para rutas no encontradas (404).

Muestra un mensaje indicando que la página solicitada no existe.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Elemento React con el mensaje de error 404.  
**Component**:   
<a name="PagarPage"></a>

## PagarPage() ⇒ <code>JSX.Element</code>
Página de pago que muestra los ítems confirmados y permite proceder al pago.Carga desde la API los ítems confirmados de la comanda de la mesa,agrupa ítems duplicados, calcula el total y envía la actualización de estadode la comanda al servidor.

**Kind**: global function  
**Component**:   

* [PagarPage()](#PagarPage) ⇒ <code>JSX.Element</code>
    * [~calcularTotal()](#PagarPage..calcularTotal) ⇒ <code>number</code>
    * [~pagarComanda()](#PagarPage..pagarComanda) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="PagarPage..calcularTotal"></a>

### PagarPage~calcularTotal() ⇒ <code>number</code>
Calcula el total sumando precio × cantidad de cada ítem.

**Kind**: inner method of [<code>PagarPage</code>](#PagarPage)  
<a name="PagarPage..pagarComanda"></a>

### PagarPage~pagarComanda() ⇒ <code>Promise.&lt;void&gt;</code>
Envía la petición PUT para actualizar el estado de la comanda a "pagada".

**Kind**: inner method of [<code>PagarPage</code>](#PagarPage)  
<a name="SeguimientoPage"></a>

## SeguimientoPage() ⇒ <code>JSX.Element</code>
Componente de página para el seguimiento del pedido.Muestra los pasos de la comanda y resalta el estado actual,avanzando automáticamente cada 5 segundos.

**Kind**: global function  
**Component**:   
<a name="SeguimientoPage..translations"></a>

### SeguimientoPage~translations : [<code>SeguimientoTranslations</code>](#SeguimientoTranslations)
Traducciones locales según el idioma seleccionado.

**Kind**: inner constant of [<code>SeguimientoPage</code>](#SeguimientoPage)  
<a name="UsuarioPage"></a>

## UsuarioPage() ⇒ <code>JSX.Element</code>
Página de perfil de usuario que muestra sus comandas realizadas.Al montar, carga los datos del usuario autenticado y sus comandasdesde la API usando el token almacenado en localStorage.Muestra un listado de cada comanda con detalles de mesa, estado, total e ítems.

**Kind**: global function  
**Component**:   
<a name="CartItem"></a>

## CartItem : <code>Object</code>
Un ítem dentro de la comanda de la mesa.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador interno del ítem en la comanda. |
| producto_id | <code>number</code> | ID del producto asociado a este ítem. |
| cantidad | <code>number</code> | Cantidad de unidades pedidas. |
| precio_unitario | <code>string</code> | Precio unitario en formato string. |

<a name="Product"></a>

## Product : <code>Object</code>
Un producto obtenido desde la API.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador único del producto. |
| nombre_es | <code>string</code> | Nombre en español. |
| nombre_ca | <code>string</code> | Nombre en catalán. |
| nombre_en | <code>string</code> | Nombre en inglés. |
| imagen | <code>string</code> | Ruta/URL de la imagen del producto. |

<a name="MesaApiResponse"></a>

## MesaApiResponse : <code>Object</code>
Elemento de respuesta para la API de mesas.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| comanda | <code>Object</code> | Objeto `comanda` que contiene los ítems. |

<a name="Category"></a>

## Category : <code>Object</code>
Representa una categoría de producto.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador único de la categoría. |
| nombre_es | <code>string</code> | Nombre de la categoría. |

<a name="CategoriesResponse"></a>

## CategoriesResponse : <code>Object</code>
Estructura de retorno de useApiCall para categorías.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | [<code>Array.&lt;Category&gt;</code>](#Category) | Array de categorías. |
| loading | <code>boolean</code> | Flag de carga. |
| error | <code>Error</code> | Error ocurrido, o null. |
| refetch | <code>function</code> | Función para recargar manualmente. |

<a name="Product"></a>

## Product : <code>Object</code>
Representa un producto en la vista de lista de productos.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador único del producto. |
| imagen | <code>string</code> | Ruta de la imagen del producto (relativa a /storage). |
| nombre_es | <code>string</code> | Nombre del producto en español. |
| nombre_ca | <code>string</code> | Nombre del producto en catalán. |
| nombre_en | <code>string</code> | Nombre del producto en inglés. |
| descripcion_es | <code>string</code> | Descripción en español. |
| descripcion_ca | <code>string</code> | Descripción en catalán. |
| descripcion_en | <code>string</code> | Descripción en inglés. |
| precio | <code>number</code> | Precio del producto en euros. |

<a name="Product"></a>

## Product : <code>Object</code>
Representa un producto obtenido de la API.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador único del producto. |
| imagen | <code>string</code> | Nombre de archivo de la imagen (almacenada en /storage). |
| nombre_es | <code>string</code> | Nombre en español. |
| nombre_ca | <code>string</code> | Nombre en catalán. |
| nombre_en | <code>string</code> | Nombre en inglés. |
| descripcion_es | <code>string</code> | Descripción en español. |
| descripcion_ca | <code>string</code> | Descripción en catalán. |
| descripcion_en | <code>string</code> | Descripción en inglés. |
| precio | <code>number</code> | Precio unitario en euros. |

<a name="ItemCarritoProps"></a>

## ItemCarritoProps : <code>Object</code>
Props del componente ItemCarrito.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| productoId | <code>number</code> | ID del producto en el carrito. |
| cantidad | <code>number</code> | Cantidad de unidades en el carrito. |
| [estado] | <code>string</code> | Estado actual del pedido (no usado directamente aquí). |
| [pagada] | <code>boolean</code> | Indica si la orden está pagada (no usado directamente aquí). |
| onAdd | <code>function</code> | Callback para aumentar la cantidad de este producto. |
| onRemove | <code>function</code> | Callback para disminuir la cantidad de este producto. |

<a name="Product"></a>

## Product : <code>Object</code>
Representa un producto confirmado en el resumen de pedido.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador único del producto. |
| imagen | <code>string</code> | Ruta de la imagen del producto (almacenada en /storage). |
| nombre_es | <code>string</code> | Nombre en español. |
| nombre_ca | <code>string</code> | Nombre en catalán. |
| nombre_en | <code>string</code> | Nombre en inglés. |
| descripcion_es | <code>string</code> | Descripción en español. |
| descripcion_ca | <code>string</code> | Descripción en catalán. |
| descripcion_en | <code>string</code> | Descripción en inglés. |
| precio | <code>number</code> | Precio unitario en euros. |

<a name="ItemConfirmadoProps"></a>

## ItemConfirmadoProps : <code>Object</code>
Props del componente ItemConfirmado.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| producto | [<code>Product</code>](#Product) | Objeto con los datos del producto confirmado. |
| cantidad | <code>number</code> | Cantidad de unidades confirmadas de este producto. |

<a name="Product"></a>

## Product : <code>Object</code>
Representa un producto genérico.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador único del producto. |
| imagen | <code>string</code> | Nombre de archivo de la imagen (almacenada en /storage). |
| nombre_es | <code>string</code> | Nombre en español. |
| nombre_ca | <code>string</code> | Nombre en catalán. |
| nombre_en | <code>string</code> | Nombre en inglés. |
| descripcion_es | <code>string</code> | Descripción en español. |
| descripcion_ca | <code>string</code> | Descripción en catalán. |
| descripcion_en | <code>string</code> | Descripción en inglés. |
| precio | <code>number</code> | Precio unitario en euros. |

<a name="ItemProps"></a>

## ItemProps : <code>Object</code>
Props del componente Item de administración de productos.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| producto | [<code>Product</code>](#Product) | Objeto con los datos del producto a mostrar. |
| deleteProduct | <code>function</code> | Callback que se invoca al eliminar el producto. |

<a name="Product"></a>

## Product : <code>Object</code>
Representa un producto genérico.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador único del producto. |
| imagen | <code>string</code> | Nombre de archivo de la imagen (almacenada en /storage). |
| nombre_es | <code>string</code> | Nombre en español. |
| nombre_ca | <code>string</code> | Nombre en catalán. |
| nombre_en | <code>string</code> | Nombre en inglés. |
| descripcion_es | <code>string</code> | Descripción en español. |
| descripcion_ca | <code>string</code> | Descripción en catalán. |
| descripcion_en | <code>string</code> | Descripción en inglés. |
| precio | <code>number</code> | Precio unitario en euros. |

<a name="ItemModificarProps"></a>

## ItemModificarProps : <code>Object</code>
Props del componente ItemModificar.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| producto | [<code>Product</code>](#Product) | Objeto con los datos del producto a modificar. |

<a name="SeccionTituloProps"></a>

## SeccionTituloProps : <code>Object</code>
Props del componente SeccionTitulo.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| titulo | <code>string</code> | Texto que se mostrará como título de la sección. |
| slug | <code>string</code> | Identificador (id) para anclaje de la sección. |

<a name="AppContextType"></a>

## AppContextType : <code>Object</code>
Estructura de los valores que provee el contexto de la aplicación.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| token | <code>string</code> \| <code>null</code> | Token de autenticación JWT. |
| setToken | <code>function</code> | Función para actualizar el token. |
| user | <code>Object</code> \| <code>null</code> | Datos del usuario autenticado. |
| setUser | <code>function</code> | Función para actualizar los datos del usuario. |
| mesaId | <code>number</code> \| <code>null</code> | ID de la mesa seleccionada. |
| setMesaId | <code>function</code> | Función para actualizar la mesa. |
| lang | <code>string</code> | Código de idioma activo (por ejemplo, 'es'). |
| setLang | <code>function</code> | Función para cambiar el idioma. |
| statusComand | <code>string</code> \| <code>null</code> | Estado actual del comando. |
| setStatusComand | <code>function</code> | Función para actualizar el estado del comando. |
| cartVersion | <code>number</code> | Versión del carrito, para forzar refresco. |
| bumpCart | <code>function</code> | Incrementa `cartVersion` para refrescar el carrito. |

<a name="ApiCallResult"></a>

## ApiCallResult : <code>Object</code>
Resultado devuelto por el hook useApiCall.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;any&gt;</code> | Array de resultados (normalizado a array). |
| loading | <code>boolean</code> | Indica si la petición está en curso. |
| error | <code>Error</code> \| <code>null</code> | Error ocurrido o null si no hay error. |
| refetch | <code>function</code> | Función para volver a ejecutar la llamada manualmente. |

<a name="ComandaItem"></a>

## ComandaItem : <code>Object</code>
Estructura de un ítem dentro de la comanda de la mesa.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador interno del ítem. |
| producto_id | <code>number</code> | ID del producto asociado. |
| cantidad | <code>number</code> | Cantidad de unidades. |
| precio_unitario | <code>number</code> | Precio unitario del producto. |
| pagada | <code>boolean</code> | Indica si ya está pagado. |
| subtotal | <code>number</code> | Subtotal calculado (cantidad × precio_unitario). |

<a name="MesaComanda"></a>

## MesaComanda : <code>Object</code>
Estructura de la comanda de la mesa.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| mesa | <code>number</code> | Número o ID de la mesa. |
| comanda | <code>Object</code> | Datos de la comanda, con la lista de ítems. |

<a name="ProductFormData"></a>

## ProductFormData : <code>Object</code>
Estructura de los datos del formulario de creación de producto.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| nombre_es | <code>string</code> | Nombre del producto en español. |
| nombre_ca | <code>string</code> | Nombre del producto en catalán. |
| nombre_en | <code>string</code> | Nombre del producto en inglés. |
| descripcion_es | <code>string</code> | Descripción en español. |
| descripcion_ca | <code>string</code> | Descripción en catalán. |
| descripcion_en | <code>string</code> | Descripción en inglés. |
| ingredientes_es | <code>string</code> | Ingredientes en español. |
| ingredientes_ca | <code>string</code> | Ingredientes en catalán. |
| ingredientes_en | <code>string</code> | Ingredientes en inglés. |
| precio | <code>string</code> \| <code>number</code> | Precio del producto en euros. |
| categoria | <code>string</code> | Nombre de la categoría seleccionada. |
| imagen | <code>File</code> \| <code>null</code> | Archivo de imagen seleccionado. |
| recomendada | <code>boolean</code> | Indica si el producto es recomendado. |

<a name="NewProductData"></a>

## NewProductData : <code>Object</code>
Estructura de los datos listos para enviar al backend.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| nombre_es | <code>string</code> |  |
| nombre_ca | <code>string</code> |  |
| nombre_en | <code>string</code> |  |
| descripcion_es | <code>string</code> |  |
| descripcion_ca | <code>string</code> |  |
| descripcion_en | <code>string</code> |  |
| ingredientes_es | <code>string</code> |  |
| ingredientes_ca | <code>string</code> |  |
| ingredientes_en | <code>string</code> |  |
| precio | <code>string</code> \| <code>number</code> |  |
| categoria | <code>string</code> |  |
| recomendada | <code>boolean</code> |  |
| imagen | <code>string</code> | Ruta retornada por el servidor. |
| categoria_id | <code>number</code> \| <code>null</code> | ID numérico de la categoría mapeada. |

<a name="ProductoData"></a>

## ProductoData : <code>Object</code>
Representa los datos de un producto recuperado de la API.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador único del producto. |
| nombre_es | <code>string</code> | Nombre en español. |
| nombre_ca | <code>string</code> | Nombre en catalán. |
| nombre_en | <code>string</code> | Nombre en inglés. |
| descripcion_es | <code>string</code> | Descripción en español. |
| descripcion_ca | <code>string</code> | Descripción en catalán. |
| descripcion_en | <code>string</code> | Descripción en inglés. |
| ingredientes_es | <code>string</code> | Ingredientes en español. |
| ingredientes_ca | <code>string</code> | Ingredientes en catalán. |
| ingredientes_en | <code>string</code> | Ingredientes en inglés. |
| precio | <code>number</code> | Precio unitario en euros. |
| categoria_id | <code>number</code> | ID numérico de la categoría. |
| imagen | <code>string</code> | Nombre o ruta de la imagen. |
| recomendada | <code>boolean</code> | Indica si está marcado como recomendado. |

<a name="EditFormState"></a>

## EditFormState : <code>Object</code>
Estado interno del formulario de edición.

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| nombre_es | <code>string</code> | 
| nombre_ca | <code>string</code> | 
| nombre_en | <code>string</code> | 
| descripcion_es | <code>string</code> | 
| descripcion_ca | <code>string</code> | 
| descripcion_en | <code>string</code> | 
| ingredientes_es | <code>string</code> | 
| ingredientes_ca | <code>string</code> | 
| ingredientes_en | <code>string</code> | 
| precio | <code>string</code> \| <code>number</code> | 
| categoria_id | <code>string</code> \| <code>number</code> | 
| imagen | <code>string</code> | 
| recomendada | <code>boolean</code> | 

<a name="Product"></a>

## Product : <code>Object</code>
Representa un producto para eliminación.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador único del producto. |
| imagen | <code>string</code> | Nombre de archivo de la imagen (ruta en /storage). |
| nombre_es | <code>string</code> | Nombre en español. |
| nombre_ca | <code>string</code> | Nombre en catalán. |
| nombre_en | <code>string</code> | Nombre en inglés. |
| descripcion_es | <code>string</code> | Descripción en español. |
| descripcion_ca | <code>string</code> | Descripción en catalán. |
| descripcion_en | <code>string</code> | Descripción en inglés. |
| precio | <code>number</code> | Precio del producto en euros. |
| recomendada | <code>boolean</code> | Indica si es producto recomendado. |

<a name="Mesa"></a>

## Mesa : <code>Object</code>
Datos de una mesa obtenidos de la API.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador único de la mesa. |
| codigo | <code>string</code> | Código o nombre visible de la mesa. |
| capacidad | <code>number</code> | Número máximo de comensales. |
| ocupada | <code>boolean</code> | Indica si la mesa está ocupada. |

<a name="TextosHome"></a>

## TextosHome : <code>Object</code>
Textos localizados para distintos elementos de la página de inicio.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| bienvenida | <code>Object.&lt;string, function(Object): string&gt;</code> | - Función que recibe el usuario y devuelve el saludo correspondiente. |
| seleccionMesa | <code>Object.&lt;string, string&gt;</code> | - Texto para la sección de selección de mesa. |
| cargandoMesas | <code>Object.&lt;string, string&gt;</code> | - Texto que se muestra mientras cargan las mesas. |
| errorMesas | <code>Object.&lt;string, string&gt;</code> | - Texto que se muestra si hay un error al cargar las mesas. |
| capacidad | <code>Object.&lt;string, string&gt;</code> | - Etiqueta que muestra "Capacidad" en cada idioma. |
| ocupada | <code>Object.&lt;string, string&gt;</code> | - Etiqueta para una mesa ocupada. |
| libre | <code>Object.&lt;string, string&gt;</code> | - Etiqueta para una mesa libre. |
| logout | <code>Object.&lt;string, string&gt;</code> | - Texto del botón de cerrar sesión. |
| login | <code>Object.&lt;string, string&gt;</code> | - Texto del botón de iniciar sesión. |

<a name="LoginTexts"></a>

## LoginTexts : <code>Object</code>
Textos localizados para el formulario de login.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| login | <code>Object.&lt;string, string&gt;</code> | Texto del botón de login y título. |
| email | <code>Object.&lt;string, string&gt;</code> | Etiqueta para el campo de correo. |
| password | <code>Object.&lt;string, string&gt;</code> | Etiqueta para el campo de contraseña. |
| crear | <code>Object.&lt;string, string&gt;</code> | Texto del botón para crear cuenta. |

<a name="MenuItem"></a>

## MenuItem : <code>Object</code>
Representa un producto del menú.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador único del producto. |
| nombre_es | <code>string</code> | Nombre en español. |
| nombre_ca | <code>string</code> | Nombre en catalán. |
| nombre_en | <code>string</code> | Nombre en inglés. |
| descripcion_es | <code>string</code> | Descripción en español. |
| descripcion_ca | <code>string</code> | Descripción en catalán. |
| descripcion_en | <code>string</code> | Descripción en inglés. |
| precio | <code>number</code> | Precio unitario en euros. |
| categoria_id | <code>number</code> | ID de la categoría (1=Primeros, 2=Segundos, 3=Bebidas, 4=Postres). |
| imagen | <code>string</code> | Nombre de archivo de la imagen. |

<a name="MenuTexts"></a>

## MenuTexts : <code>Object</code>
Textos localizados para las secciones del menú.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| recomendacion | <code>Object.&lt;string, string&gt;</code> | Título de recomendación de la casa. |
| primeros | <code>Object.&lt;string, string&gt;</code> | Título de la sección de primeros. |
| segundos | <code>Object.&lt;string, string&gt;</code> | Título de la sección de segundos. |
| postres | <code>Object.&lt;string, string&gt;</code> | Título de la sección de postres. |
| bebidas | <code>Object.&lt;string, string&gt;</code> | Título de la sección de bebidas. |

<a name="Product"></a>

## Product : <code>Object</code>
Representa un producto genérico.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador único del producto. |
| imagen | <code>string</code> | Nombre de archivo de la imagen. |
| nombre_es | <code>string</code> | Nombre en español. |
| nombre_ca | <code>string</code> | Nombre en catalán. |
| nombre_en | <code>string</code> | Nombre en inglés. |
| descripcion_es | <code>string</code> | Descripción en español. |
| descripcion_ca | <code>string</code> | Descripción en catalán. |
| descripcion_en | <code>string</code> | Descripción en inglés. |
| ingredientes_es | <code>string</code> | Ingredientes en español. |
| ingredientes_ca | <code>string</code> | Ingredientes en catalán. |
| ingredientes_en | <code>string</code> | Ingredientes en inglés. |
| precio | <code>number</code> | Precio en euros. |
| categoria_id | <code>number</code> | ID de la categoría. |
| recomendada | <code>boolean</code> | Indica si es recomendada. |

<a name="ProductSummary"></a>

## ProductSummary : <code>Object</code>
Resumen de un producto para el pago.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador único del producto. |
| precio | <code>number</code> | Precio unitario en euros. |
| [precio_unitario] | <code>number</code> | Precio unitario (repetido, opcional). |
| [imagen] | <code>string</code> | Nombre o ruta de la imagen. |
| [nombre_es] | <code>string</code> | Nombre en español. |
| [nombre_ca] | <code>string</code> | Nombre en catalán. |
| [nombre_en] | <code>string</code> | Nombre en inglés. |

<a name="ConfirmedItem"></a>

## ConfirmedItem : <code>Object</code>
Ítem confirmado de una comanda.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador del ítem. |
| producto | [<code>ProductSummary</code>](#ProductSummary) | Datos resumidos del producto. |
| cantidad | <code>number</code> | Cantidad confirmada. |
| estado_item_id | <code>number</code> | Estado interno del ítem (2 = confirmado). |

<a name="SeguimientoTranslations"></a>

## SeguimientoTranslations : <code>Object</code>
Traducciones para los distintos estados del seguimiento.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| titulo | <code>Object.&lt;string, string&gt;</code> | Título de la página. |
| pagado | <code>Object.&lt;string, string&gt;</code> | Texto para estado "Pagado". |
| preparandose | <code>Object.&lt;string, string&gt;</code> | Texto para estado "Preparándose". |
| enCamino | <code>Object.&lt;string, string&gt;</code> | Texto para estado "En camino". |
| servido | <code>Object.&lt;string, string&gt;</code> | Texto para estado "Servido". |

<a name="Usuario"></a>

## Usuario : <code>Object</code>
Representa los datos de un usuario autenticado.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador único del usuario. |
| name | <code>string</code> | Nombre completo del usuario. |
| email | <code>string</code> | Correo electrónico. |

<a name="ComandaItem"></a>

## ComandaItem : <code>Object</code>
Representa un ítem de una comanda de usuario.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador del ítem. |
| cantidad | <code>number</code> | Unidades del producto. |
| producto | <code>Object</code> | Objeto producto asociado. |
| producto.nombre | <code>string</code> | Nombre del producto. |
| precio_unitario | <code>number</code> | Precio unitario en euros. |

<a name="Comanda"></a>

## Comanda : <code>Object</code>
Representa una comanda realizada por el usuario.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Identificador único de la comanda. |
| mesa | <code>Object</code> | Objeto mesa donde se realizó la comanda. |
| mesa.codigo | <code>string</code> | Código o nombre de la mesa. |
| estado_comanda | <code>Object</code> | Estado actual de la comanda. |
| estado_comanda.nombre | <code>string</code> | Nombre del estado (e.g. "pagada", "servida"). |
| total | <code>number</code> | Importe total de la comanda. |
| items | [<code>Array.&lt;ComandaItem&gt;</code>](#ComandaItem) | Lista de ítems pedidos. |

<a name="external_AxiosInstance"></a>

## AxiosInstance
Instancia de cliente Axios configurada para comunicarse con la API del backend.- Base URL: definida por la variable de entorno `VITE_API_URL`.- Envía credenciales (cookies) con cada petición.

**Kind**: global external  
**See**: https://axios-http.com/docs/instance  
