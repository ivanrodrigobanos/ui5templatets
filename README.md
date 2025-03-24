# Introducción

Template en Typescript para aplicaciones free style.

La arquitectura se basa en estados basado en este blog:

https://community.sap.com/t5/technology-blogs-by-members/my-first-experience-with-typescript-in-ui5-classes-and-state-model-manager/ba-p/13518761

# Carpetas

## coreConstants

Carpeta que contiene la obtención de constantes provenientesd del abap.

En el archivo _generalConstants.ts_ se ponen las constantes que se quieren recuperar de abap.

## constants

Ficheros con las constantes de la aplicación

## service

Carpeta donde están los servicios que se llaman a sistemas SAP y no-SAP.

Fichero de ejemplo: _accumAmountsService.ts_

En un fichero de servicios puede contener _n_ llamadas distintas.

## model

Carpeta, que UI5 ya crea por defecto, tenemos los modelos de datos. Es decir, donde el state guarda los datos provenientes de servicios o de cualquier otro sitio. Y será desde este modelo donde se "pinten" los datos en las vistas.

Ejemmplo de modelo _accumAmountsModel.ts_

Es recomendable tener un fichero de modelo por datos a guardar. Ejemplo, si tenemos dos servicios que recuperan datos de cabecera y posición. Tendremos un modelo para cabecera y otro para posición.

## state

Es el que orquesta la comunicación entre vista, modelo y servicio. Un state esta asociado a un servicio, pero puede tener _n_ modelos asociados.

Ejemplo de fichero _accumAmountState.ts_. En el state los datos se guardar en la variable _data_, en la clase superior. Esta variable se le pasa un tipo de datos que puede contener varios datos.
A mi me gusta tener un contenedor de datos, en el fichero se llama _AccumAmountData_ y ponerlo los datos que quiero guardar. En el _AccumAmountData_ puede contener campos que apuntan a un modelo de datos, como en el ejemplo, o tipos de datos simples.

Esta variable _data_ siempre se tiene que inicializar en el constructor para luego poderse usar en cualquier sitio.

El state se instancia en el fichero _Component.ts_.

### Como usar los datos del state en una vista

En las vistas para pintar los datos del state se pone siempre este path:

_items="{path:'messageState>/messages/messages'}"_

- _messageState>/_ es la clase del state.
- _messages_ es el nombre del campo del contenedor de datos
- _messages_ es el nombre de la variable en el modelo de datos

En el state tendríamos este _data_:

```
    this.data = {
      messages: new MessageModel(),
      showMessage: false,
      highestSeverityType: ButtonType.Neutral,
      highestSeverityNumber: 0,
      highestSeverityIcon: "",
    };
```

Si en el _data_ no tendríamos un modelo sino variables normales, como en el ejemplo anterior, el path sería así:

```
<Button id="xxxxxxxx"
icon="{path:'messageState>/highestSeverityIcon'}"
text="{path:'messageState>/highestSeverityNumber'}"
type="{path:'messageState>/highestSeverityType'}"
visible="{path:'messageState>/showMessage'}"
press="onShowMessageApp" />
```

## controller

En los controladores de las vistas se cambia para que hereden de la clase _BaseController_

## utils

Utilidades de todo tipo.
