import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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
            Política de Privacidad
          </h1>

          <p className="text-gray-600 mb-4 text-center">
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </p>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">1. Introducción</h2>
              <p className="text-gray-700 mb-4">
                Bienvenido a Bamboozle Baby Deluxe. En nuestra aplicación educativa de trivia sobre embarazo,
                bebés y paternidad, nos comprometemos a proteger tu privacidad y la de tu familia. Esta política
                de privacidad explica cómo recopilamos, usamos y protegemos tu información personal cuando utilizas
                nuestro sitio web y servicios.
              </p>
              <p className="text-gray-700">
                Al utilizar Bamboozle Baby Deluxe, aceptas las prácticas descritas en esta Política de Privacidad.
                Si no estás de acuerdo con esta política, por favor no uses nuestra aplicación.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">2. Información que Recopilamos</h2>

              <h3 className="text-xl font-semibold text-purple-500 mb-3">2.1 Información que Proporcionas</h3>
              <p className="text-gray-700 mb-4">
                Cuando usas nuestra aplicación, puedes proporcionarnos:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Nombre de jugador (opcional, para la tabla de clasificación)</li>
                <li>Puntuaciones del juego</li>
                <li>Configuraciones de juego (modo, dificultad)</li>
                <li>Estadísticas de progreso</li>
              </ul>

              <h3 className="text-xl font-semibold text-purple-500 mb-3">2.2 Información Recopilada Automáticamente</h3>
              <p className="text-gray-700 mb-4">
                Cuando visitas nuestro sitio, recopilamos automáticamente cierta información, incluyendo:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Dirección IP</li>
                <li>Tipo de navegador y versión</li>
                <li>Sistema operativo</li>
                <li>Páginas visitadas y tiempo de permanencia</li>
                <li>Fecha y hora de acceso</li>
                <li>URL de referencia</li>
              </ul>

              <h3 className="text-xl font-semibold text-purple-500 mb-3">2.3 Cookies y Tecnologías Similares</h3>
              <p className="text-gray-700 mb-4">
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia. Las cookies son pequeños
                archivos de texto almacenados en tu dispositivo que nos ayudan a:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Recordar tus preferencias de juego</li>
                <li>Analizar el uso del sitio</li>
                <li>Mostrar publicidad relevante</li>
                <li>Mejorar la seguridad del sitio</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">3. Google AdSense y Publicidad de Terceros</h2>
              <p className="text-gray-700 mb-4">
                Utilizamos Google AdSense para mostrar anuncios en nuestro sitio. Google AdSense utiliza cookies
                para mostrar anuncios basados en tus visitas previas a nuestro sitio web u otros sitios web en Internet.
              </p>

              <h3 className="text-xl font-semibold text-purple-500 mb-3">3.1 Cómo Funciona Google AdSense</h3>
              <p className="text-gray-700 mb-4">
                Google y sus socios pueden:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Colocar y leer cookies en tu navegador</li>
                <li>Utilizar balizas web para recopilar información</li>
                <li>Usar tu dirección IP para determinar tu ubicación aproximada</li>
                <li>Mostrar anuncios basados en tus intereses</li>
              </ul>

              <h3 className="text-xl font-semibold text-purple-500 mb-3">3.2 Desactivar la Publicidad Personalizada</h3>
              <p className="text-gray-700 mb-4">
                Puedes optar por no recibir publicidad personalizada visitando:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Configuración de anuncios de Google
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Digital Advertising Alliance
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.youronlinechoices.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    European Interactive Digital Advertising Alliance
                  </a>
                </li>
              </ul>

              <p className="text-gray-700 mb-4">
                Para obtener más información sobre cómo Google utiliza los datos cuando usas sitios de nuestros socios,
                visita:{' '}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Cómo utiliza Google los datos cuando usas sitios web o aplicaciones de nuestros socios
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">4. Cómo Utilizamos Tu Información</h2>
              <p className="text-gray-700 mb-4">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Proporcionar y mejorar nuestros servicios</li>
                <li>Mantener la tabla de clasificación y estadísticas</li>
                <li>Personalizar tu experiencia de juego</li>
                <li>Analizar el uso del sitio y tendencias</li>
                <li>Mostrar publicidad relevante</li>
                <li>Detectar y prevenir fraudes y abusos</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">5. Compartir Tu Información</h2>
              <p className="text-gray-700 mb-4">
                No vendemos tu información personal. Podemos compartir tu información con:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Proveedores de servicios:</strong> Google AdSense, servicios de hosting, análisis</li>
                <li><strong>Cumplimiento legal:</strong> Cuando sea requerido por ley o para proteger nuestros derechos</li>
                <li><strong>Transferencias empresariales:</strong> En caso de fusión, adquisición o venta de activos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">6. Seguridad de Datos</h2>
              <p className="text-gray-700 mb-4">
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información
                personal contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método
                de transmisión por Internet o almacenamiento electrónico es 100% seguro.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">7. Privacidad de los Niños</h2>
              <p className="text-gray-700 mb-4">
                Nuestro sitio está dirigido a adultos, padres y futuros padres. No recopilamos intencionalmente
                información personal de niños menores de 13 años. Si descubrimos que hemos recopilado información
                de un niño menor de 13 años, la eliminaremos inmediatamente.
              </p>
              <p className="text-gray-700">
                Si eres padre o tutor y crees que tu hijo nos ha proporcionado información personal, por favor
                contáctanos para que podamos eliminarla.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">8. Tus Derechos</h2>
              <p className="text-gray-700 mb-4">
                Dependiendo de tu ubicación, puedes tener los siguientes derechos:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Acceder a tu información personal</li>
                <li>Rectificar información incorrecta</li>
                <li>Solicitar la eliminación de tu información</li>
                <li>Oponerte al procesamiento de tu información</li>
                <li>Solicitar la portabilidad de datos</li>
                <li>Retirar tu consentimiento</li>
              </ul>
              <p className="text-gray-700">
                Para ejercer estos derechos, puedes eliminar tus datos locales limpiando las cookies de tu navegador.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">9. Retención de Datos</h2>
              <p className="text-gray-700">
                Conservamos tu información personal solo durante el tiempo necesario para cumplir con los propósitos
                descritos en esta política, a menos que la ley requiera o permita un período de retención más largo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">10. Transferencias Internacionales</h2>
              <p className="text-gray-700">
                Tu información puede ser transferida y mantenida en servidores ubicados fuera de tu país de residencia,
                donde las leyes de protección de datos pueden diferir. Al usar nuestro servicio, consientes estas transferencias.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">11. Cambios a esta Política</h2>
              <p className="text-gray-700">
                Podemos actualizar esta Política de Privacidad periódicamente. Te notificaremos sobre cambios
                significativos publicando la nueva política en esta página y actualizando la fecha de "Última actualización".
                Te recomendamos revisar esta política regularmente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">12. Información de Contacto</h2>
              <p className="text-gray-700 mb-4">
                Si tienes preguntas, comentarios o inquietudes sobre esta Política de Privacidad, puedes contactarnos a través de:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li className="mb-2"><strong>Aplicación:</strong> Bamboozle Baby Deluxe</li>
                <li className="mb-2"><strong>Sitio web:</strong> {window.location.origin}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">13. Consentimiento</h2>
              <p className="text-gray-700">
                Al usar Bamboozle Baby Deluxe, aceptas la recopilación y uso de información de acuerdo con esta
                Política de Privacidad. Si no estás de acuerdo con esta política, por favor no uses nuestro servicio.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
