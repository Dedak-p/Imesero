# Imesero (Fase desenvolupament)

> [!NOTE]
> Esto no es mas que una prueba que si sale bien podremos partir de ella Att @Dedak-p

## Configuración inicial del proyecto

### Configuración
- Frontend -> React 19 [Documentación](https://react.dev/).  
- Backend -> Laravel 12 [Documentación Oficial](https://laravel.com/docs/12.x) o [Documentacion traducida v11](https://documentacionlaravel.com/docs/11.x).  
- DataBase -> PostgreSQL [Pagina oficial](https://www.postgresql.org/docs/current/).  

### Directorios iniciales

  imesero/  
  ├── backend/  
  ├── frontend/  
  ├── docker-compose.yml  
  ├── Dockerfile.backend  
  ├── Dockerfile.frontend  
  └── README.md  

## Entorno de desarrollo
### Configuracion del entorno
Servidor Ubuntu 24.04 LTS con Docker, Docker compose, Composer y Yarn.  
### Requisitos del entorno de desarrollo
- Minimos
  -  vCPUs:	2 vCPUs
  -  RAM:	4 GB
  -  Disco:	30 GB
- Recomendados:
  -  vCPUs:	4 vCPUs o más
  -  RAM:	8-12 GB
  -  Disco:	50 GB o más
 
- Red: Adaptador puente

> [!TIP]
> - Servidor Linux 24.04 LTS [Enlace de descarga](https://ubuntu.com/download/server/thank-you?version=24.04.2&architecture=amd64&lts=true).
> - (Recomendado) Tener instalado en el servidor openSSH. Se puede instalar durante la istalacion del servidor local.
> - Instalar Docker y Docker-Compose [Documentacion](https://docs.docker.com/engine/install/ubuntu/).  
>   <details>
>   <summary>Guia de instalación</summary>
>
>   #### Instalacion de Dependencias y Repositorio oficial de Docker
>   ```
>   sudo apt install ca-certificates curl gnupg -y
>   sudo install -m 0755 -d /etc/apt/keyrings
>   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
>   sudo chmod a+r /etc/apt/keyrings/docker.gpg
>   echo \
>    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
>    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
>    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
>   ```
>   #### Instalacion Docker y Docker-Compose
>   ```
>   sudo apt update
>   sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
>   ```
>   #### (Opcional) Añadir el usuario al grupo Docker para no tener que hacer `sudo` en cada comando `docker`
>   ```
>   sudo usermod -aG docker $USER
>   newgrp docker
>   ```
>   </details>
>
> - Instalar Composer **Importante para el BackEnd**
>   <details>
>   <summary>Guia de instalación</summary>
>
>   #### Instalacion de PHP i sus dependencias
>   ```
>   sudo apt update
>   sudo apt install -y php-cli php-mbstring php-xml php-curl php-zip unzip
>   php -v
>   ```
>   #### Instalacion de Composer
>   ```
>   curl -sS https://getcomposer.org/installer -o composer-setup.php
>   sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
>   composer --version
>   ```
>   </details>
>
> - Instalar Node.js y Yarn **Importante para el FrontEnd**
>   <details>
>   <summary>Guia de instalación</summary>
>
>   #### Instalacion de Node.js
>   ```
>   # Instalar NVM (Node Version Manager)
>   curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
>
>   # Cargar NVM en la sesión actual
>   source ~/.bashrc  # o ~/.zshrc si usas Zsh
>
>   # Instalar la versión recomendada de Node.js
>   nvm install --lts
>   nvm use --lts
>
>   # Verificar instalación
>   node -v
>   ```
>
>   #### Instalacion de Yarn
>   ```
>   # Instalar Yarn globalmente con Corepack
>   corepack enable
>   npm install -g yarn
>
>   # Verificar instalación
>   yarn -v
>   ```
>   </details>

## Iniciar el proyecto:
> [!IMPORTANT]
> Hay archivos que no se copian en el repositorio debido a que son archivos importantes y por buenas practicas se añaden en el .gitignore .  Muchoas de los git ignore son automaticos al desplegar yarn y laravel
### Frontend
Accede a la carpeta forntend y intala las dependencias con yarn:
```
cd frontend/
yarn install
```
### Backend
Duplica el archivo .env.example con el nombre de .env y despues descomenta la configuracion de la base de datos dentro del archivo .env:
```
cp backend/.env.example backend/.env
nano backend/.env
```
.env descomentado :
```
...

DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=imesero
DB_USERNAME=imesero_user
DB_PASSWORD=imeseropass

...
```
Accede a la carpeta forntend y intala las dependencias con yarn:
```
cd backend/
php artisan key:generate
```

## A TENER EN CUENTA!

> [!WARNING]
> Lo que hay hecho es simplemente la creacion de una tabla productos a partir de comandos de laravel con las funciones mas basicas CRUD y este controlador lo sirvo a traves del archivo api.php de la carpeta routes.  
> En React dentro del archivo App.js hay una funcion que llama a esta api a partir de la IP del servidor **Esto se tienen que cambiar en cada instalacion a no ser que encontremos una solucion practica**.
> Es decir ahora sale una llamada a 192.1.168.82:8000 cambialo a la ip de tu servidor.
