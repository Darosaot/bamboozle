import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Baby, Heart, Brain, Users, Target, Award, BookOpen } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function About() {
  return (
    <>
      <Helmet>
        <title>Sobre Nosotros | Bamboozle Baby Deluxe</title>
        <meta name="description" content="Conoce Bamboozle Baby Deluxe: juego educativo con +190 preguntas sobre embarazo, bebés y paternidad. Nuestra misión es hacer el aprendizaje divertido y accesible." />
        <link rel="canonical" href="https://bamboozle-baby-deluxe.netlify.app/acerca" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'Sobre Nosotros' }]} />

          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
            aria-label="Volver a la página principal"
          >
            <ArrowLeft size={20} />
            Volver al Inicio
          </Link>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <h1 className="text-4xl font-bold text-purple-600 mb-6 text-center">
              Sobre Bamboozle Baby Deluxe
            </h1>

          <div className="prose max-w-none">
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Baby className="text-pink-500" size={32} />
                <h2 className="text-2xl font-bold text-purple-600 m-0">¿Qué es Bamboozle Baby Deluxe?</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Bamboozle Baby Deluxe es una innovadora aplicación educativa de trivia diseñada específicamente
                para padres, futuros padres y profesionales del cuidado infantil. Combina el entretenimiento
                de un juego de preguntas y respuestas con información valiosa y verificada sobre embarazo,
                cuidado del bebé y desarrollo infantil.
              </p>
              <p className="text-gray-700">
                Nuestra misión es hacer que el aprendizaje sobre la paternidad sea divertido, accesible y
                memorable. A través de más de 200 preguntas cuidadosamente elaboradas, cubrimos todos los
                aspectos esenciales del cuidado infantil, desde los primeros días del embarazo hasta los
                primeros años de vida del niño.
              </p>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-blue-500" size={32} />
                <h2 className="text-2xl font-bold text-purple-600 m-0">Nuestra Misión</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Creemos que la información sobre el cuidado infantil debe ser:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Accesible:</strong> Disponible para todos, sin barreras de entrada</li>
                <li><strong>Divertida:</strong> El aprendizaje debe ser entretenido y motivador</li>
                <li><strong>Precisa:</strong> Basada en evidencia científica y mejores prácticas</li>
                <li><strong>Práctica:</strong> Enfocada en conocimientos que realmente necesitarás</li>
                <li><strong>Memorable:</strong> Presentada de forma que se quede en tu memoria</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="text-purple-500" size={32} />
                <h2 className="text-2xl font-bold text-purple-600 m-0">Enfoque Educativo</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Nuestro contenido está estructurado en tres niveles de dificultad para adaptarse a diferentes
                niveles de conocimiento:
              </p>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                <h3 className="text-lg font-semibold text-green-800 mb-2">😊 Nivel Fácil</h3>
                <p className="text-gray-700 mb-2">
                  Perfecto para futuros padres o quienes están comenzando su viaje de paternidad.
                  Cubre conceptos básicos y fundamentales que todo padre debe saber.
                </p>
                <ul className="list-disc pl-6 text-gray-700 text-sm">
                  <li>Duración del embarazo y etapas básicas</li>
                  <li>Necesidades básicas del recién nacido</li>
                  <li>Hitos de desarrollo temprano</li>
                  <li>Alimentación y sueño básicos</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">😐 Nivel Normal</h3>
                <p className="text-gray-700 mb-2">
                  Para padres con experiencia que buscan profundizar su conocimiento. Incluye términos
                  médicos comunes y conceptos más específicos.
                </p>
                <ul className="list-disc pl-6 text-gray-700 text-sm">
                  <li>Terminología médica del embarazo y parto</li>
                  <li>Métodos de crianza y sus filosofías</li>
                  <li>Desarrollo cognitivo y emocional</li>
                  <li>Nutrición avanzada y destete</li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <h3 className="text-lg font-semibold text-red-800 mb-2">😰 Nivel Difícil</h3>
                <p className="text-gray-700 mb-2">
                  Desafíos para profesionales de la salud, doulas, enfermeras pediátricas o padres
                  muy preparados. Incluye datos médicos específicos y condiciones especiales.
                </p>
                <ul className="list-disc pl-6 text-gray-700 text-sm">
                  <li>Pruebas médicas especializadas</li>
                  <li>Condiciones congénitas y genéticas</li>
                  <li>Datos fisiológicos precisos</li>
                  <li>Protocolos médicos y evaluaciones</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-indigo-500" size={32} />
                <h2 className="text-2xl font-bold text-purple-600 m-0">Áreas de Conocimiento</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Nuestras más de 200 preguntas cubren ampliamente los siguientes temas:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-700 mb-2">🤰 Embarazo y Parto</h3>
                  <ul className="list-disc pl-6 text-gray-700 text-sm">
                    <li>Duración y etapas del embarazo</li>
                    <li>Pruebas prenatales</li>
                    <li>Tipos de parto</li>
                    <li>Puerperio y recuperación</li>
                  </ul>
                </div>

                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-pink-700 mb-2">👶 Recién Nacidos</h3>
                  <ul className="list-disc pl-6 text-gray-700 text-sm">
                    <li>Evaluaciones neonatales (APGAR, Ballard)</li>
                    <li>Reflejos primitivos</li>
                    <li>Características físicas</li>
                    <li>Primeros cuidados</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-700 mb-2">🍼 Alimentación</h3>
                  <ul className="list-disc pl-6 text-gray-700 text-sm">
                    <li>Lactancia materna (exclusiva y mixta)</li>
                    <li>Alimentación con fórmula</li>
                    <li>Introducción de alimentos sólidos</li>
                    <li>Nutrición infantil</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-700 mb-2">😴 Sueño y Rutinas</h3>
                  <ul className="list-disc pl-6 text-gray-700 text-sm">
                    <li>Patrones de sueño por edad</li>
                    <li>Seguridad al dormir</li>
                    <li>Regresiones del sueño</li>
                    <li>Establecimiento de rutinas</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-700 mb-2">🧠 Desarrollo</h3>
                  <ul className="list-disc pl-6 text-gray-700 text-sm">
                    <li>Hitos motores (gateo, caminar)</li>
                    <li>Desarrollo del lenguaje</li>
                    <li>Desarrollo cognitivo</li>
                    <li>Desarrollo social y emocional</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-700 mb-2">🏥 Salud y Seguridad</h3>
                  <ul className="list-disc pl-6 text-gray-700 text-sm">
                    <li>Vacunación</li>
                    <li>Condiciones comunes</li>
                    <li>Señales de alerta</li>
                    <li>Prevención de accidentes</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-orange-500" size={32} />
                <h2 className="text-2xl font-bold text-purple-600 m-0">¿Para Quién Es?</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Bamboozle Baby Deluxe está diseñado para:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Futuros Padres:</strong> Prepárate para la llegada de tu bebé con conocimiento práctico</li>
                <li><strong>Nuevos Padres:</strong> Refuerza lo que estás aprendiendo en tu día a día</li>
                <li><strong>Padres Experimentados:</strong> Actualiza tus conocimientos y desafíate a ti mismo</li>
                <li><strong>Abuelos y Familiares:</strong> Ponte al día con las recomendaciones actuales</li>
                <li><strong>Profesionales de la Salud:</strong> Mantén frescos tus conocimientos de pediatría básica</li>
                <li><strong>Doulas y Educadoras:</strong> Herramienta educativa complementaria</li>
                <li><strong>Estudiantes:</strong> Complemento divertido para estudios de enfermería o medicina</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-yellow-500" size={32} />
                <h2 className="text-2xl font-bold text-purple-600 m-0">Características Principales</h2>
              </div>

              <div className="grid gap-4 mb-4">
                <div className="border-l-4 border-purple-400 pl-4">
                  <h3 className="font-semibold text-purple-700 mb-1">🎮 Dos Modos de Juego</h3>
                  <p className="text-gray-700 text-sm">
                    Juega solo para aprender a tu ritmo, o desafía a tu pareja en el modo 2 jugadores
                    con cartas de sabotaje y eventos sorpresa.
                  </p>
                </div>

                <div className="border-l-4 border-blue-400 pl-4">
                  <h3 className="font-semibold text-blue-700 mb-1">📊 Sistema de Puntuación Inteligente</h3>
                  <p className="text-gray-700 text-sm">
                    Gana puntos por respuestas correctas, bonos por tiempo y multiplicadores por rachas.
                    El sistema premia tanto el conocimiento como la velocidad.
                  </p>
                </div>

                <div className="border-l-4 border-green-400 pl-4">
                  <h3 className="font-semibold text-green-700 mb-1">🎯 Power-ups Estratégicos</h3>
                  <p className="text-gray-700 text-sm">
                    Usa el 50/50 para eliminar opciones incorrectas, congela el tiempo o salta preguntas
                    difíciles. Aprende a gestionar tus recursos.
                  </p>
                </div>

                <div className="border-l-4 border-pink-400 pl-4">
                  <h3 className="font-semibold text-pink-700 mb-1">🎲 Cartas WANGO Sorpresa</h3>
                  <p className="text-gray-700 text-sm">
                    Eventos aleatorios que simulan la impredecibilidad de la vida con un bebé, desde
                    doblar puntos hasta perder vidas por caca explosiva.
                  </p>
                </div>

                <div className="border-l-4 border-red-400 pl-4">
                  <h3 className="font-semibold text-red-700 mb-1">⚔️ Cartas de Sabotaje</h3>
                  <p className="text-gray-700 text-sm">
                    En modo 2 jugadores, usa cartas de sabotaje para robar puntos, intercambiar
                    puntajes o complicarle la vida a tu oponente.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-400 pl-4">
                  <h3 className="font-semibold text-yellow-700 mb-1">🏆 Tabla de Clasificación Global</h3>
                  <p className="text-gray-700 text-sm">
                    Compite con otros padres alrededor del mundo. Filtra por dificultad y modo de
                    juego para comparar tus resultados.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="text-red-500" size={32} />
                <h2 className="text-2xl font-bold text-purple-600 m-0">Filosofía de Diseño</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Bamboozle Baby Deluxe se construyó sobre tres pilares fundamentales:
              </p>

              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg mb-4">
                <h3 className="font-semibold text-purple-700 mb-2">1. Aprendizaje a través del Juego</h3>
                <p className="text-gray-700 text-sm">
                  La gamificación no es solo diversión; es una metodología de aprendizaje comprobada.
                  Al asociar información con emociones positivas (la diversión de jugar), la retención
                  mejora significativamente.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-4">
                <h3 className="font-semibold text-indigo-700 mb-2">2. Información Basada en Evidencia</h3>
                <p className="text-gray-700 text-sm">
                  Cada pregunta está fundamentada en guías médicas reconocidas, investigaciones
                  científicas y recomendaciones actualizadas de organizaciones de salud infantil.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-4">
                <h3 className="font-semibold text-emerald-700 mb-2">3. Inclusión y Diversidad</h3>
                <p className="text-gray-700 text-sm">
                  Reconocemos que hay muchas formas válidas de ser padre. Nuestro contenido respeta
                  diferentes culturas, estructuras familiares y enfoques de crianza.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-blue-700 mb-3">Compromiso con la Calidad</h2>
                <p className="text-gray-700 mb-3">
                  Estamos comprometidos a mantener y mejorar continuamente la calidad de nuestro contenido:
                </p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Actualizaciones regulares basadas en nuevas investigaciones</li>
                  <li>Revisión por profesionales de la salud</li>
                  <li>Incorporación de feedback de nuestra comunidad</li>
                  <li>Expansión constante de la base de preguntas</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-yellow-700 mb-3">Aviso Importante</h2>
                <p className="text-gray-700 mb-3">
                  Aunque nos esforzamos por proporcionar información precisa y actualizada, Bamboozle
                  Baby Deluxe es una herramienta educativa complementaria, no un sustituto del consejo
                  médico profesional.
                </p>
                <p className="text-gray-700 font-semibold">
                  Siempre consulta con tu pediatra, médico u otro profesional de la salud calificado
                  para decisiones específicas sobre la salud de tu bebé.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">Únete a la Comunidad</h2>
              <p className="text-gray-700 mb-4">
                Bamboozle Baby Deluxe es más que un juego; es una comunidad de padres y profesionales
                comprometidos con la excelencia en el cuidado infantil. Al jugar, no solo estás aprendiendo,
                estás contribuyendo a crear una generación de padres más informados y preparados.
              </p>
              <div className="text-center mt-6">
                <Link
                  to="/"
                  className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all"
                >
                  ¡Comienza a Jugar Ahora!
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
