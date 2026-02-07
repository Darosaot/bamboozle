import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Sobre el Juego',
      questions: [
        {
          q: '¿Qué es Bamboozle Baby Deluxe?',
          a: 'Bamboozle Baby Deluxe es una aplicación educativa de trivia diseñada para padres, futuros padres y profesionales del cuidado infantil. Combina entretenimiento con aprendizaje sobre embarazo, cuidado del bebé y desarrollo infantil a través de más de 200 preguntas en tres niveles de dificultad.'
        },
        {
          q: '¿Es gratis jugar?',
          a: 'Sí, Bamboozle Baby Deluxe es completamente gratuito. Mostramos publicidad no intrusiva de Google AdSense para mantener el servicio disponible sin costo para todos.'
        },
        {
          q: '¿Necesito crear una cuenta?',
          a: 'No, no necesitas crear una cuenta para jugar. Tu progreso y puntuaciones se guardan automáticamente en la tabla de clasificación al finalizar cada partida.'
        }
      ]
    },
    {
      category: 'Modos de Juego',
      questions: [
        {
          q: '¿Cuál es la diferencia entre Modo Solo y Modo 2 Jugadores?',
          a: 'En Modo Solo juegas contra ti mismo, perfecto para aprender a tu ritmo. El Modo 2 Jugadores es competitivo: tú contra otra persona con turnos alternados, cartas de sabotaje exclusivas y elementos estratégicos adicionales.'
        },
        {
          q: '¿Qué son las Cartas WANGO?',
          a: 'Las Cartas WANGO son eventos aleatorios que ocurren durante el juego, simulando la impredecibilidad de la vida con un bebé. Pueden duplicar tus puntos, quitarte vidas, o causar otros efectos sorpresa. Aparecen tanto en modo solo como en 2 jugadores.'
        },
        {
          q: '¿Qué son las Cartas de Sabotaje?',
          a: 'Las Cartas de Sabotaje son exclusivas del modo 2 jugadores. Te permiten atacar estratégicamente a tu oponente: robar puntos, intercambiar puntajes, reducir su tiempo o colocar una "bomba" que elimina su próxima respuesta. Añaden una capa de estrategia al juego.'
        },
        {
          q: '¿Cómo funcionan los power-ups?',
          a: 'Cada jugador comienza con 3 power-ups: 50/50 (elimina 2 respuestas incorrectas), Time Freeze (congela el tiempo 10 segundos) y Skip (salta la pregunta sin penalización). Úsalos estratégicamente; no se recargan durante la partida.'
        }
      ]
    },
    {
      category: 'Niveles de Dificultad',
      questions: [
        {
          q: '¿Qué diferencia hay entre los niveles de dificultad?',
          a: 'Fácil: 30 segundos por pregunta, 8 rondas, 5 vidas. Perfecto para principiantes. Normal: 20 segundos, 10 rondas, 3 vidas. Conceptos intermedios. Difícil: 15 segundos, 12 rondas, 2 vidas. Datos médicos avanzados. Las preguntas también son más complejas en cada nivel.'
        },
        {
          q: '¿Puedo cambiar la dificultad durante el juego?',
          a: 'No, la dificultad se elige al inicio y no puede cambiarse durante la partida. Esto mantiene la equidad en la tabla de clasificación.'
        },
        {
          q: '¿Qué nivel debería elegir?',
          a: 'Si eres futuro padre o nuevo en el tema: Fácil. Si tienes experiencia o conocimientos básicos: Normal. Si eres profesional de la salud o padre muy preparado: Difícil. ¡Siempre puedes probar diferentes niveles!'
        }
      ]
    },
    {
      category: 'Puntuación y Ranking',
      questions: [
        {
          q: '¿Cómo se calculan los puntos?',
          a: 'Puntos base de la pregunta (100-350 según dificultad) + bono de tiempo (tiempo restante × 5) + bono de racha (racha actual × 50). Por ejemplo: pregunta de 200 pts + 15 segundos restantes (75 pts) + racha de 3 (150 pts) = 425 puntos totales.'
        },
        {
          q: '¿Qué es una racha?',
          a: 'Una racha es el número de respuestas correctas consecutivas. Cada respuesta correcta suma a tu racha, multiplicando tus puntos. Una respuesta incorrecta rompe la racha y la reinicia a 0.'
        },
        {
          q: '¿Cómo funciona la tabla de clasificación?',
          a: 'Tu puntuación final se guarda automáticamente en la tabla de clasificación global. Puedes filtrar por dificultad y modo de juego para ver cómo te comparas. Se muestran los top 50 jugadores de cada categoría.'
        },
        {
          q: '¿Mi nombre aparecerá públicamente?',
          a: 'Sí, el nombre que ingreses será visible en la tabla de clasificación. Usa un apodo si prefieres mantener tu privacidad.'
        }
      ]
    },
    {
      category: 'Contenido Educativo',
      questions: [
        {
          q: '¿Cuántas preguntas hay en total?',
          a: 'Actualmente tenemos más de 190 preguntas únicas en tres niveles de dificultad, cubriendo temas desde embarazo hasta desarrollo infantil de 2 años. Agregamos nuevas preguntas regularmente.'
        },
        {
          q: '¿De dónde proviene la información?',
          a: 'Todas nuestras preguntas están basadas en guías médicas reconocidas, investigaciones científicas y recomendaciones actualizadas de organizaciones de salud infantil. Sin embargo, esta aplicación es educativa y no sustituye el consejo médico profesional.'
        },
        {
          q: '¿Qué temas cubre el juego?',
          a: 'Cubrimos: Embarazo y parto, cuidados del recién nacido, lactancia y alimentación, sueño infantil, desarrollo motor y cognitivo, salud y vacunación, conceptos pediátricos, condiciones médicas comunes, y seguridad infantil.'
        },
        {
          q: '¿Puedo usar esto como estudio para exámenes médicos?',
          a: 'Si bien nuestro contenido es preciso, está diseñado como herramienta educativa complementaria, no como recurso de estudio médico principal. Puede ser útil para refrescar conocimientos básicos de pediatría.'
        }
      ]
    },
    {
      category: 'Problemas Técnicos',
      questions: [
        {
          q: '¿En qué dispositivos puedo jugar?',
          a: 'Bamboozle Baby Deluxe funciona en cualquier dispositivo con navegador web moderno: computadoras, tablets y smartphones. La interfaz se adapta automáticamente al tamaño de tu pantalla.'
        },
        {
          q: '¿Necesito conexión a Internet?',
          a: 'Sí, necesitas conexión a Internet para jugar, ya que la tabla de clasificación y algunas funcionalidades requieren comunicación con nuestros servidores.'
        },
        {
          q: 'El temporizador se siente muy rápido, ¿puedo pausar?',
          a: 'Actualmente no hay opción de pausa durante una partida para mantener la equidad en las puntuaciones. Usa el power-up Time Freeze si necesitas más tiempo para pensar. Considera empezar con el nivel Fácil que da 30 segundos por pregunta.'
        },
        {
          q: 'Mi puntuación no se guardó, ¿por qué?',
          a: 'Asegúrate de tener conexión a Internet estable al finalizar el juego. Las puntuaciones se guardan automáticamente al llegar a la pantalla de resultados. Si el problema persiste, intenta limpiar la caché de tu navegador.'
        }
      ]
    },
    {
      category: 'Privacidad y Seguridad',
      questions: [
        {
          q: '¿Qué información recopilan sobre mí?',
          a: 'Solo recopilamos el nombre de jugador que ingreses (opcional), tus puntuaciones, y datos analíticos básicos como tu navegador y país (vía Google AdSense). No recopilamos información personal identificable. Consulta nuestra Política de Privacidad para más detalles.'
        },
        {
          q: '¿Es seguro para que lo usen los niños?',
          a: 'La aplicación está diseñada para adultos (padres y profesionales), pero es segura para todas las edades. No contiene contenido inapropiado. Sin embargo, algunos anuncios de Google pueden no ser adecuados para niños pequeños. La supervisión parental es recomendada.'
        },
        {
          q: '¿Puedo desactivar los anuncios?',
          a: 'Los anuncios nos permiten ofrecer el juego gratuitamente. Puedes configurar tus preferencias de publicidad personalizada en tu cuenta de Google. Los anuncios son breves y no intrusivos.'
        },
        {
          q: '¿Qué son las cookies y cómo las usan?',
          a: 'Usamos cookies para recordar tus preferencias de juego y para que Google AdSense muestre anuncios relevantes. Puedes desactivar las cookies en tu navegador, pero esto puede afectar la funcionalidad del sitio.'
        }
      ]
    },
    {
      category: 'Consejos y Estrategias',
      questions: [
        {
          q: '¿Cuándo debería usar el 50/50?',
          a: 'Usa el 50/50 cuando estés entre dos respuestas y no estés seguro. Es especialmente útil en preguntas difíciles o cuando el tiempo se acaba. Recuerda que solo tienes uno por partida.'
        },
        {
          q: '¿Cuál es la mejor estrategia para conseguir puntuaciones altas?',
          a: 'Construye rachas respondiendo correctamente de manera consistente (cada racha añade 50 puntos). Responde rápido para maximizar el bono de tiempo. Guarda los power-ups para preguntas difíciles. En modo 2 jugadores, usa las cartas de sabotaje estratégicamente, no impulsivamente.'
        },
        {
          q: '¿Vale la pena saltarse una pregunta?',
          a: 'Saltarse una pregunta con el power-up Skip evita perder una vida, pero tampoco ganas puntos ni incrementas tu racha. Es mejor usarlo cuando estás completamente perdido en una pregunta difícil para preservar tus vidas.'
        },
        {
          q: '¿Cómo puedo mejorar mi conocimiento?',
          a: 'Juega regularmente para reforzar conceptos. Revisa nuestra sección de Recursos Educativos después de cada partida. Cuando falles una pregunta, investiga el tema para aprenderlo. Prueba diferentes niveles de dificultad para expandir tu conocimiento.'
        }
      ]
    },
    {
      category: 'Comunidad y Feedback',
      questions: [
        {
          q: '¿Puedo sugerir nuevas preguntas?',
          a: 'Actualmente no tenemos un sistema formal de envío de preguntas, pero apreciamos tu interés. Estamos trabajando en una forma de que la comunidad contribuya contenido en el futuro.'
        },
        {
          q: 'Encontré un error en una pregunta, ¿cómo lo reporto?',
          a: 'Si encuentras información incorrecta o desactualizada, toma nota de la pregunta específica. Aunque no tenemos un sistema de reporte directo aún, revisamos nuestro contenido regularmente y actualizamos basándonos en nuevas investigaciones.'
        },
        {
          q: '¿Habrá más modos de juego en el futuro?',
          a: 'Estamos constantemente mejorando la aplicación. Estamos considerando modo torneo, desafíos diarios, y modo estudio. Mantente atento a las actualizaciones.'
        },
        {
          q: '¿Puedo compartir mis puntuaciones en redes sociales?',
          a: 'Actualmente no hay función directa de compartir en redes sociales, pero puedes tomar una captura de pantalla de tus resultados y compartirla. Estamos considerando agregar esta función.'
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-4">
      <Helmet>
        <title>Preguntas Frecuentes - Bamboozle Baby Deluxe | Juego Educativo para Padres</title>
        <meta name="description" content="Preguntas frecuentes sobre Bamboozle Baby Deluxe: modos de juego, puntuación, niveles de dificultad, power-ups y más. Todo lo que necesitas saber para jugar." />
        <meta property="og:title" content="FAQ - Bamboozle Baby Deluxe" />
        <meta property="og:description" content="Preguntas frecuentes sobre el juego educativo de trivia para padres. Modos de juego, puntuación, dificultad y más." />
        <link rel="canonical" href="https://babybamboozle.netlify.app/preguntas-frecuentes" />
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft size={20} />
          Volver al Inicio
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <HelpCircle className="text-purple-600" size={40} />
            <h1 className="text-4xl font-bold text-purple-600 text-center">
              Preguntas Frecuentes
            </h1>
          </div>

          <p className="text-center text-gray-600 mb-8">
            ¿Tienes dudas? Aquí encontrarás respuestas a las preguntas más comunes sobre Bamboozle Baby Deluxe.
          </p>

          <div className="space-y-6">
            {faqs.map((category, catIndex) => (
              <div key={catIndex} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-purple-700 mb-4">{category.category}</h2>
                <div className="space-y-3">
                  {category.questions.map((faq, qIndex) => {
                    const key = `${catIndex}-${qIndex}`;
                    const isOpen = openIndex === key;

                    return (
                      <div key={qIndex} className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <button
                          onClick={() => toggleQuestion(catIndex, qIndex)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-800 pr-4">{faq.q}</span>
                          {isOpen ? (
                            <ChevronUp className="flex-shrink-0 text-purple-600" size={24} />
                          ) : (
                            <ChevronDown className="flex-shrink-0 text-purple-600" size={24} />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4 text-gray-700">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">¿No encontraste lo que buscabas?</h3>
            <p className="text-gray-700">
              Si tu pregunta no está aquí, explora nuestras otras secciones:
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/ayuda" className="text-blue-600 hover:underline font-medium">
                Cómo Jugar →
              </Link>
              <Link to="/acerca" className="text-blue-600 hover:underline font-medium">
                Sobre Nosotros →
              </Link>
              <Link to="/recursos" className="text-blue-600 hover:underline font-medium">
                Recursos Educativos →
              </Link>
            </div>
          </div>

          {/* Google AdSense Banner */}
          <div className="mt-8">
            <AdBanner slot="auto" format="auto" responsive={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
