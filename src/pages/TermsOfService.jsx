import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft size={20} />
          Volver al Inicio
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-purple-600 mb-6 text-center">
            Términos de Servicio
          </h1>

          <p className="text-gray-600 mb-4 text-center">
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </p>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">1. Aceptación de los Términos</h2>
              <p className="text-gray-700 mb-4">
                Bienvenido a Bamboozle Baby Deluxe. Al acceder y utilizar este sitio web y aplicación de trivia
                educativa, aceptas cumplir y estar sujeto a los siguientes términos y condiciones de uso.
                Si no estás de acuerdo con alguno de estos términos, no debes usar nuestro servicio.
              </p>
              <p className="text-gray-700">
                Estos Términos de Servicio constituyen un acuerdo legal entre tú y Bamboozle Baby Deluxe.
                Nos reservamos el derecho de modificar estos términos en cualquier momento.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">2. Descripción del Servicio</h2>
              <p className="text-gray-700 mb-4">
                Bamboozle Baby Deluxe es una aplicación educativa de trivia que proporciona:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Juegos de preguntas y respuestas sobre embarazo, bebés y paternidad</li>
                <li>Información educativa sobre cuidado infantil</li>
                <li>Recursos y consejos para padres y futuros padres</li>
                <li>Tabla de clasificación para seguimiento de progreso</li>
                <li>Contenido informativo sobre desarrollo infantil</li>
              </ul>
              <p className="text-gray-700">
                Nuestro servicio está diseñado con fines educativos y de entretenimiento. No sustituye el
                consejo médico profesional.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">3. Uso Aceptable</h2>

              <h3 className="text-xl font-semibold text-purple-500 mb-3">3.1 Puedes:</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Usar la aplicación para aprendizaje personal y entretenimiento</li>
                <li>Compartir tus puntuaciones en redes sociales</li>
                <li>Acceder a recursos educativos proporcionados</li>
                <li>Participar en la tabla de clasificación</li>
              </ul>

              <h3 className="text-xl font-semibold text-purple-500 mb-3">3.2 No puedes:</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Usar el servicio para cualquier propósito ilegal o no autorizado</li>
                <li>Intentar acceder a áreas restringidas o datos protegidos</li>
                <li>Cargar o transmitir virus, malware o código malicioso</li>
                <li>Realizar ingeniería inversa, descompilar o desarmar el software</li>
                <li>Usar bots, scripts o herramientas automatizadas para manipular puntuaciones</li>
                <li>Acosar, abusar o dañar a otros usuarios</li>
                <li>Suplantar la identidad de otra persona o entidad</li>
                <li>Copiar, modificar o distribuir el contenido sin permiso</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">4. Contenido Educativo y Renuncia Médica</h2>
              <p className="text-gray-700 mb-4">
                <strong>IMPORTANTE:</strong> El contenido proporcionado en Bamboozle Baby Deluxe es solo para
                fines educativos e informativos. No debe considerarse como:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Consejo médico, diagnóstico o tratamiento</li>
                <li>Sustituto de la consulta con profesionales de la salud</li>
                <li>Recomendación específica para tu situación particular</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>Siempre debes consultar con tu médico, pediatra u otro profesional de la salud calificado</strong>
                {' '}antes de tomar decisiones sobre el cuidado de tu bebé o tu salud.
              </p>
              <p className="text-gray-700">
                Si tienes o sospechas que tienes un problema de salud, contacta inmediatamente a tu proveedor de
                atención médica. Nunca ignores el consejo médico profesional ni retrases la búsqueda de atención
                médica debido a algo que hayas leído en esta aplicación.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">5. Precisión de la Información</h2>
              <p className="text-gray-700 mb-4">
                Aunque nos esforzamos por proporcionar información precisa y actualizada:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>La información puede contener inexactitudes o errores tipográficos</li>
                <li>El contenido puede volverse desactualizado</li>
                <li>No garantizamos la exactitud, completitud o utilidad de la información</li>
                <li>Las recomendaciones médicas cambian con el tiempo</li>
              </ul>
              <p className="text-gray-700">
                Nos reservamos el derecho de corregir errores o actualizar información en cualquier momento
                sin previo aviso.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">6. Propiedad Intelectual</h2>
              <p className="text-gray-700 mb-4">
                Todo el contenido de Bamboozle Baby Deluxe, incluyendo pero no limitado a:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Texto, preguntas y respuestas</li>
                <li>Gráficos, logos e imágenes</li>
                <li>Diseño y estructura del sitio</li>
                <li>Software y código fuente</li>
                <li>Recursos educativos</li>
              </ul>
              <p className="text-gray-700 mb-4">
                ...están protegidos por derechos de autor y otras leyes de propiedad intelectual. No puedes
                reproducir, distribuir, modificar o crear obras derivadas sin nuestro permiso expreso por escrito.
              </p>
              <p className="text-gray-700">
                El nombre "Bamboozle Baby Deluxe" y todos los logos relacionados son marcas registradas o no registradas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">7. Cuentas de Usuario y Seguridad</h2>
              <p className="text-gray-700 mb-4">
                Al usar nuestra aplicación:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Eres responsable de mantener la seguridad de tus datos locales</li>
                <li>No compartas información personal sensible en nombres de usuario</li>
                <li>Notifícanos inmediatamente sobre cualquier uso no autorizado</li>
                <li>Mantenemos el derecho de eliminar nombres de usuario inapropiados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">8. Publicidad de Terceros</h2>
              <p className="text-gray-700 mb-4">
                Nuestro servicio puede mostrar publicidad de terceros a través de Google AdSense. Al usar
                nuestro servicio:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Aceptas que terceros puedan colocar cookies en tu dispositivo</li>
                <li>Los anunciantes pueden recopilar información sobre tu uso</li>
                <li>No somos responsables del contenido de anuncios de terceros</li>
                <li>Puedes desactivar la publicidad personalizada en la configuración</li>
              </ul>
              <p className="text-gray-700">
                Para más información, consulta nuestra{' '}
                <Link to="/privacidad" className="text-blue-600 hover:underline">
                  Política de Privacidad
                </Link>
                .
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">9. Enlaces a Sitios de Terceros</h2>
              <p className="text-gray-700">
                Nuestro servicio puede contener enlaces a sitios web de terceros. No tenemos control sobre
                el contenido, políticas de privacidad o prácticas de estos sitios. El acceso a sitios de
                terceros es bajo tu propio riesgo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">10. Limitación de Responsabilidad</h2>
              <p className="text-gray-700 mb-4">
                <strong>EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>El servicio se proporciona "TAL CUAL" y "SEGÚN DISPONIBILIDAD"</li>
                <li>No garantizamos que el servicio sea ininterrumpido o libre de errores</li>
                <li>No somos responsables por daños directos, indirectos, incidentales o consecuentes</li>
                <li>No asumimos responsabilidad por decisiones tomadas basadas en nuestro contenido</li>
                <li>No garantizamos resultados específicos del uso de la aplicación</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">11. Indemnización</h2>
              <p className="text-gray-700">
                Aceptas indemnizar y eximir de responsabilidad a Bamboozle Baby Deluxe y sus afiliados de
                cualquier reclamo, daño, pérdida, responsabilidad y gasto (incluyendo honorarios legales)
                que surjan de:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Tu uso o mal uso del servicio</li>
                <li>Tu violación de estos Términos de Servicio</li>
                <li>Tu violación de derechos de terceros</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">12. Terminación</h2>
              <p className="text-gray-700">
                Podemos terminar o suspender tu acceso al servicio inmediatamente, sin previo aviso ni
                responsabilidad, por cualquier motivo, incluyendo:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Violación de estos Términos de Servicio</li>
                <li>Uso fraudulento o abusivo del servicio</li>
                <li>Por solicitud de autoridades legales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">13. Modificaciones del Servicio</h2>
              <p className="text-gray-700">
                Nos reservamos el derecho de:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Modificar o discontinuar el servicio en cualquier momento</li>
                <li>Cambiar las características o funcionalidades</li>
                <li>Actualizar el contenido y preguntas</li>
                <li>Modificar estos términos</li>
              </ul>
              <p className="text-gray-700">
                No somos responsables ante ti ni ante terceros por cualquier modificación, suspensión o
                discontinuación del servicio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">14. Ley Aplicable</h2>
              <p className="text-gray-700">
                Estos Términos de Servicio se regirán e interpretarán de acuerdo con las leyes aplicables,
                sin tener en cuenta sus disposiciones sobre conflictos de leyes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">15. Divisibilidad</h2>
              <p className="text-gray-700">
                Si alguna disposición de estos términos se considera inválida o inaplicable, las demás
                disposiciones continuarán en pleno vigor y efecto.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">16. Acuerdo Completo</h2>
              <p className="text-gray-700">
                Estos Términos de Servicio, junto con nuestra Política de Privacidad, constituyen el acuerdo
                completo entre tú y Bamboozle Baby Deluxe con respecto al uso del servicio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">17. Contacto</h2>
              <p className="text-gray-700 mb-4">
                Si tienes preguntas sobre estos Términos de Servicio, puedes contactarnos a través de:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li className="mb-2"><strong>Aplicación:</strong> Bamboozle Baby Deluxe</li>
                <li className="mb-2"><strong>Sitio web:</strong> {window.location.origin}</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-gray-700 font-semibold">
                  Al utilizar Bamboozle Baby Deluxe, reconoces que has leído, comprendido y aceptado
                  estos Términos de Servicio en su totalidad.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
