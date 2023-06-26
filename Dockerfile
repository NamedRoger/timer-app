# Imagen base de Docker para Windows
FROM mcr.microsoft.com/windows/nanoserver:1809

# Copiar la carpeta de la aplicación en el contenedor
COPY . /app

# Establecer el directorio de trabajo en la carpeta de la aplicación
WORKDIR /app

# Instalar Chocolatey (administrador de paquetes para Windows)
RUN powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))"

# Instalar las dependencias necesarias para construir la aplicación
RUN choco install -y nodejs-lts git

# Instalar las dependencias de Node.js
RUN npm install

# Compilar la aplicación para Windows
# RUN npm run make -- -w
RUN npm run make -- -w

# Indicar el archivo ejecutable generado de la aplicación
ENTRYPOINT ["cmd", "/app/out/make/squirrel.windows/x64/Timer/TimerApp.exe"]
