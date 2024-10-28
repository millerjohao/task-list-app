
# To-Do-App

Aplicativo demo, prueba de desarrollo


## Authors

- [@millerjohao](https://github.com/millerjohao)


## Environment Variables

Para el caso Android es necesario tener Java instalado, Android Studio con su respectivo SDK, para el caso especifico de querer hacer el build de la aplicación, es importante descargar en el SDK Manager/ SDK tools, la versión 34.0.0, actualmente se encuentra oculta dentro del listado habilitar los "show package details" para poder descargar la versión 34.0.0.


`ANDROID_HOME`: C:\Users\USER\AppData\Local\Android\Sdk

`ANDROID_SDK_ROOT`: C:\Users\USER\AppData\Local\Android\Sdk

`GRADLE_HOME`: C:\Users\USER\gradle-8.10.2

`PATH`: Se debe agregar a la variable C:\Users\USER\AppData\Local\Android\Sdk\platform-tools, C:\Users\USER\AppData\Local\Android\Sdk\tools, C:\Users\USER\gradle-8.10.2\bin

## Deployment

Para desplegar este proyecto en local previamente tener instalado:

**Recuerda ejecutar como administrador para las instalaciones globales "-g"**

    1. Tener Npm instalado: https://nodejs.org/en/download/prebuilt-installer
    2. Tener Angular CLI instalado: npm install -g @angular/cli
    3. Tener Cordova instalado: npm install -g cordova

Ubicarse en la carpeta del proyecto y ejecutar:
```bash
  npm install --force
  ionic serve
```






## Build

Para generar el build de la aplicación, se debe generar las plataformas:
```bash
ionic cordova platform add android
ionic cordova platform add ios
```

**Previo a generar el build de la aplicación, sin importar la plataforma**

Instalar
```bash
npm install @ionic/cordova-builders --save-dev
```

Posterior a ello realizar el build:

**Android**
```bash
ionic cordova prepare android
ionic cordova build android
```
**iOS**
**Instalaciones previas a generar el IPA**
```bash
npm install -g ios-sim
```
```bash
sudo npm install -g ios-deploy --unsafe-perm=true
```
```bash
ionic cordova prepare ios
ionic cordova build ios
```

**En algunos casos puede que al hacer build en iOS, se requiera la instalación de cocoapods:**
```bash
sudo gem install cocoapods
```



## Release

Para generar los entregables, realizar la ejecución de estos comandos

**Android**
```bash
ionic cordova build android --release
```

**iOS**
```bash
ionic cordova build ios
open platforms/ios/*.xcworkspace
```

