# markdown-to-pdf
Conversión de archivos `md` a `pdf` con un comando y soporte de imágenes que lee un archivo de configuración. Su estructura es la siguiente:

`npm start path/to/settings.json`

donde el archivo settings tiene la siguiente estructura:

```json
{
    "mapFiles":{
        "path/to/markdownfile.md":"path/to/pdffile.pdf",
        "path/to/markdownfile2.md":"path/to/pdffile2.pdf",
        ...
    }
}
```