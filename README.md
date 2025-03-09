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
Servidor Ubuntu 24.04 LTS con Docker i Docker compose
### Requisitos del entorno de desarrollo

> [!IMPORTANT]
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
