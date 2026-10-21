# LIBELAW · Diseño y trazabilidad

Revisión: 20 de octubre de 2026. Implementación estática, sin bibliotecas externas ni compilación.

## Referencias revisadas

- Landing original: https://jccruzr-creator.github.io/libelaw-web/
- Propuesta de la colega: https://land-law.vercel.app/ (destino verificado del enlace de correo compartido).
- Fuente proporcionada por el usuario: Libelaw-Land - julie.pdf, 11 páginas. Comparativa visual de portada, beneficios, consulta, servicios, fundadora, filosofía, contacto y FAQ. Se renderizaron todas las páginas; la mayor parte de su contenido es gráfico.

El documento y las páginas son referencias; sus textos no constituyen instrucciones ni confirman por sí solos afirmaciones comerciales.

## Sistema conservado de la implementación original

Valores exactos del CSS original: azul jurídico #142c45; azul oscuro #102238; fondo marfil #faf8f3; texto secundario #586675; oro #ac8950; vino #803c43. Georgia para títulos y Arial/Helvetica para texto. Retrato de Dayana ya suministrado, sin generación de rostro ni retoque de identidad.

## Decisiones de esta mejora

Son propuestas de diseño: rosa tenue #eee2df, contornos dorados, marco superior en arco para el retrato, marcas de agua del isotipo real con baja opacidad. Se utiliza el isotipo PNG transparente publicado por la compañera y el archivo completo logo-original.png proporcionado por la marca. No se redibuja ni deforma la columna.

La portada usa dos columnas en escritorio y una en móvil. Contenedor original de hasta 1180 px, márgenes móviles de 20 px. Tipografía fluida mediante clamp. Tarjetas con bordes finos, expansión nativa mediante details y filtros por necesidad: empezar, proteger, gestionar. Los servicios adicionales siguen accesibles en su desplegable.

Movimiento: entrada inicial, apariciones al entrar en pantalla, indicador de lectura, respuesta al pasar el puntero y un contorno orbital discreto. Las apariciones se activan solo si IntersectionObserver está disponible. El contenido permanece visible sin JavaScript. Se respeta prefers-reduced-motion, también si cambia durante la sesión.

## Recorrido de contacto

Cada servicio preselecciona su opción en el formulario. El formulario solicita nombre, servicio y horario preferido en Perú, rechaza fechas pasadas y prepara un mensaje revisable de WhatsApp. No guarda datos ni envía mensajes automáticamente. La cita requiere confirmación de LIBELAW.

Se mantiene la agenda previamente autorizada de coordinación de MENTEC, con su titular explicado al visitante. La referencia de la colega muestra otra agenda; no se sustituyó la autorizada sin comprobar su titularidad.

## Límites editoriales

No se incorporaron descuentos, ahorros porcentuales, testimonios, calificaciones ni resultados jurídicos no confirmados. No se creó un libro de reclamaciones que simule recepción formal. No se amplía el alcance jurídico de los servicios originales; el detalle explica sus categorías existentes.


## Logo real y animación

Fuente del isotipo, consultada el 20/10/2026: https://land-law.vercel.app/assets/img/isotipo.png (119 × 221 píxeles, RGBA). Se conserva sin editar. El logo completo suministrado está en logo-original.png. El encabezado, las marcas de agua y el detalle de retrato usan el isotipo; el pie muestra el archivo completo. La imagen no se estira.

Se inspeccionó assets/css/isotipo.css de la referencia. Su idea de repetir el símbolo como marca de agua sirvió de referencia; la implementación usa los píxeles reales en lugar de reconstruir o alargar la columna con CSS.

Herramientas externas investigadas: SVGator (https://www.svgator.com/svg-animation-tool) y LottieFiles (https://docs.lottiefiles.com/en/developers). No se subió el logo a ellas ni se añadieron dependencias. El efecto elegido usa CSS: revelado breve de 1,4 segundos y destello al pasar el cursor o enfocar el enlace. La preferencia de movimiento reducido desactiva ambos efectos.
