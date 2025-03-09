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

> [!IMPORTANT]
> ### Requisitos del entorno de desarrollo
> - Servidor Linux 24.04 LTS [Enlace de descarga](https://ubuntu.com/download/server/thank-you?version=24.04.2&architecture=amd64&lts=true).
> - (Recomendado) Tener instalado open_ssh. Se puede instalar durante la istalacion del servidor local.
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
>   </details>
>
> - Instalar Composer **Importante para el BackEnd**