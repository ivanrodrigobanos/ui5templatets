# Libreria

Para la subida de excel se usa la libreria _sheetjs_: https://docs.sheetjs.com/docs/

Dentro de la esta página: https://docs.sheetjs.com/docs/getting-started/installation/standalone se ha descargado el fichero que esta en el CDN
y se ha renombrado a _xlsx.js_ y luego se ha el fichero de tipos que en la pagina web sale como _index.d.ts_ que se ha renombrado a _xlsx.d.ts_

El fichero de tipo es necesario si el proyecto se hace en typescript.

# Incluir script en el proyecto

El fichero _xlsx.js_ que esta en esta misma carpeta hay que añadir en dos sitios para que UI5 lo procese.

Primero para el entorno local hay que localizar el archivo _flpSandbox.html_ y dentro de la etiqueta <head> añadir lo siguiente:

```code
<!-- use version 0.20.3 -->
<script type="text/javascript" src="../excel/xlsx.js"></script>
```

Y hay que hacer lo mismo para el fichero _index.html_

# Incluir libreria en el manifest

Cuando se publica como BSP la app arranca a través del component.js y no a través del index.html. Por ello, hay que añadir en el fichero _manifest.json_ hay que localizar el nodo siguiente:

```code
"resources": {
      "css": [
        {
          "uri": "css/style.css"
        }
      ],
```

Y añadir lo siguiente:

```code
"js": [
        {
          "uri": "excel/xlsx.js"
        }
      ]
```

Quedando todo de la siguiente manera:

```code
"resources": {
      "css": [
        {
          "uri": "css/style.css"
        }
      ],
      "js": [
        {
          "uri": "excel/xlsx.js"
        }
      ]
    },
```

# Ajustar el fichero de tipo

El fichero tal como lo indican en el proyecto no termina de ir bien en UI5, o yo no he sabido hacerlo funcionar.
Por ello

```code
declare global {
  interface Window {
    XLSX: {
      utils: XLSX$Utils;
      read(data: any, opts?: ParsingOptions): WorkBook;
    };
  }
}
```

Esto hace que en el proyecto a través de la interface window (que es interna del navegador) se pueda llamar a los tipo de la libreria que pongamos dentro del nodo _XLSX_.

Los tipos y funciones están todas en el archivo y se pueden reaprovechar, como el nodo _utils_, o se puede copiar como el _read_ que aparece como función en el archivo.
