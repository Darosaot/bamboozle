import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gamepad2, Users, Trophy, Zap, AlertTriangle, Timer, Heart, Target } from 'lucide-react';

export default function HowToPlay() {
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
          <div className="flex items-center justify-center gap-3 mb-6">
            <Gamepad2 className="text-purple-600" size={40} />
            <h1 className="text-4xl font-bold text-purple-600 text-center">
              Cómo Jugar
            </h1>
          </div>

          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Aprende todo sobre los modos de juego, sistema de puntuación, power-ups y estrategias
            para dominar Bamboozle Baby Deluxe.
          </p>

          <div className="prose max-w-none space-y-8">
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <Target size={28} />
                Objetivo del Juego
              </h2>
              <p className="text-gray-700 mb-4">
                El objetivo de Bamboozle Baby Deluxe es <strong>acumular la mayor puntuación posible</strong> respondiendo
                correctamente preguntas sobre embarazo, bebés y paternidad. Cada respuesta correcta suma puntos,
                construye tu racha y te acerca a la cima de la tabla de clasificación.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-gray-700">
                  🎯 <strong>Modo Solo:</strong> Supera tus propios récords y aprende a tu ritmo<br />
                  🎯 <strong>Modo 2 Jugadores:</strong> Derrota a tu oponente con conocimiento y estrategia
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                <Users size={28} />
                Modos de Juego
              </h2>

              <div className="space-y-4">
                <div className="bg-white p-5 rounded-lg border-l-4 border-purple-400">
                  <h3 className="text-xl font-semibold text-purple-600 mb-3">🎮 Modo Solo</h3>
                  <p className="text-gray-700 mb-3">
                    Juega individualmente y pon a prueba tus conocimientos. Perfecto para aprender y practicar.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Ritmo personal, sin presión de oponentes</li>
                    <li>Cartas WANGO aleatorias para variedad</li>
                    <li>Tabla de clasificación separada para cada dificultad</li>
                    <li>Ideal para estudiar y memorizar conceptos</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border-l-4 border-pink-400">
                  <h3 className="text-xl font-semibold text-pink-600 mb-3">👥 Modo 2 Jugadores</h3>
                  <p className="text-gray-700 mb-3">
                    Compite cara a cara con tu pareja, amigo o familiar. Turnos alternados con elementos estratégicos.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Turnos alternados entre Jugador 1 y Jugador 2</li>
                    <li>Cartas WANGO que afectan a ambos jugadores</li>
                    <li>Cartas de Sabotaje exclusivas para atacar al oponente</li>
                    <li>Gana quien tenga más puntos al final (o el último en pie)</li>
                    <li>Estadísticas individuales: rondas ganadas, mejor racha</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                <AlertTriangle size={28} />
                Niveles de Dificultad
              </h2>

              <div className="grid gap-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-green-400">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">😊</span>
                    <h3 className="text-lg font-semibold text-green-600">Nivel Fácil</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-2 text-sm text-gray-700">
                    <div><strong>⏱️ Tiempo:</strong> 30 segundos</div>
                    <div><strong>🎯 Rondas:</strong> 8 preguntas</div>
                    <div><strong>❤️ Vidas:</strong> 5 vidas</div>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">
                    Preguntas básicas sobre conceptos fundamentales. Ideal para futuros padres y principiantes.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-400">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">😐</span>
                    <h3 className="text-lg font-semibold text-yellow-600">Nivel Normal</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-2 text-sm text-gray-700">
                    <div><strong>⏱️ Tiempo:</strong> 20 segundos</div>
                    <div><strong>🎯 Rondas:</strong> 10 preguntas</div>
                    <div><strong>❤️ Vidas:</strong> 3 vidas</div>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">
                    Terminología médica y conceptos intermedios. Para padres con algo de experiencia.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-red-400">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">😰</span>
                    <h3 className="text-lg font-semibold text-red-600">Nivel Difícil</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-2 text-sm text-gray-700">
                    <div><strong>⏱️ Tiempo:</strong> 15 segundos</div>
                    <div><strong>🎯 Rondas:</strong> 12 preguntas</div>
                    <div><strong>❤️ Vidas:</strong> 2 vidas</div>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">
                    Datos médicos avanzados y condiciones específicas. Para profesionales y padres expertos.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                <Trophy size={28} />
                Sistema de Puntuación
              </h2>

              <div className="bg-white p-5 rounded-lg mb-4">
                <h3 className="font-semibold text-orange-600 mb-3">Cálculo de Puntos por Respuesta:</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <strong>Puntos Base:</strong>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        <li>Fácil: 100-150 puntos</li>
                        <li>Normal: 150-200 puntos</li>
                        <li>Difícil: 200-350 puntos</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <strong>Bono de Tiempo:</strong>
                      <p className="text-sm mt-1">
                        Tiempo restante × 5 puntos<br />
                        <em className="text-gray-500">Ejemplo: 12 segundos restantes = 60 puntos extra</em>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <strong>Bono de Racha:</strong>
                      <p className="text-sm mt-1">
                        Racha actual × 50 puntos<br />
                        <em className="text-gray-500">Ejemplo: Racha de 5 = 250 puntos extra</em>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="font-semibold text-blue-800 mb-2">Ejemplo de Puntuación Total:</p>
                  <p className="text-sm text-gray-700">
                    Pregunta Difícil (250 pts) + 8 seg restantes (40 pts) + Racha de 3 (150 pts) = <strong>440 puntos</strong>
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-orange-600 mb-2">⚠️ Penalizaciones:</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                  <li><strong>Respuesta Incorrecta:</strong> Pierdes 1 vida y tu racha se reinicia a 0</li>
                  <li><strong>Tiempo Agotado:</strong> Igual que respuesta incorrecta</li>
                  <li><strong>Sin Vidas:</strong> Fin del juego (en 2 jugadores, el oponente puede continuar)</li>
                </ul>
              </div>
            </section>

            <section className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
                <Zap size={28} />
                Power-Ups y Ayudas
              </h2>

              <p className="text-gray-700 mb-4">
                Cada jugador comienza con <strong>3 power-ups únicos</strong>. Úsalos sabiamente; no se recargan durante la partida.
              </p>

              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">🎯</span>
                    <div>
                      <h3 className="font-semibold text-blue-600 text-lg">50/50</h3>
                      <p className="text-gray-700 text-sm">
                        <strong>Efecto:</strong> Elimina 2 respuestas incorrectas, dejando solo 2 opciones.<br />
                        <strong>Cuándo usar:</strong> Cuando estés dudando entre varias opciones o en preguntas muy difíciles.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-purple-400">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">⏸️</span>
                    <div>
                      <h3 className="font-semibold text-purple-600 text-lg">Time Freeze</h3>
                      <p className="text-gray-700 text-sm">
                        <strong>Efecto:</strong> Congela el temporizador por 10 segundos adicionales.<br />
                        <strong>Cuándo usar:</strong> Cuando necesites más tiempo para pensar o estés leyendo una pregunta compleja.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-400">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">⏭️</span>
                    <div>
                      <h3 className="font-semibold text-green-600 text-lg">Skip</h3>
                      <p className="text-gray-700 text-sm">
                        <strong>Efecto:</strong> Salta la pregunta actual sin perder vidas ni romper tu racha.<br />
                        <strong>Cuándo usar:</strong> Cuando no tienes idea de la respuesta y quieres preservar tus vidas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-pink-700 mb-4">🎲 Cartas WANGO</h2>

              <p className="text-gray-700 mb-4">
                Las Cartas WANGO son <strong>eventos aleatorios</strong> que simulan la impredecibilidad de la paternidad.
                Pueden aparecer en cualquier momento durante el juego, añadiendo emoción y variedad.
              </p>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded text-sm">
                  <div className="font-semibold text-green-600 mb-1">✅ Positivas:</div>
                  <ul className="list-disc pl-5 text-gray-700 space-y-0.5">
                    <li>Duplicar puntos de la pregunta</li>
                    <li>Ganar vidas extra</li>
                    <li>Multiplicador de racha</li>
                    <li>Tiempo extra</li>
                  </ul>
                </div>

                <div className="bg-white p-3 rounded text-sm">
                  <div className="font-semibold text-red-600 mb-1">❌ Negativas:</div>
                  <ul className="list-disc pl-5 text-gray-700 space-y-0.5">
                    <li>Reducir puntos a la mitad</li>
                    <li>Perder una vida</li>
                    <li>Reiniciar racha</li>
                    <li>Tiempo reducido</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-red-700 mb-4">⚔️ Cartas de Sabotaje (Solo Modo 2 Jugadores)</h2>

              <p className="text-gray-700 mb-4">
                Las Cartas de Sabotaje te permiten <strong>atacar estratégicamente a tu oponente</strong>.
                Cada jugador recibe cartas aleatorias durante el juego.
              </p>

              <div className="space-y-2">
                {[
                  {
                    icon: '💰',
                    name: 'Robo de Puntos',
                    desc: 'Roba el 25% de los puntos del oponente y añádelos a tu puntaje'
                  },
                  {
                    icon: '🔄',
                    name: 'Intercambio de Puntajes',
                    desc: 'Intercambia tu puntaje total con el de tu oponente (útil si vas perdiendo)'
                  },
                  {
                    icon: '⏱️',
                    name: 'Reducción de Tiempo',
                    desc: 'Reduce el tiempo disponible del oponente en su próxima pregunta a 5 segundos'
                  },
                  {
                    icon: '💣',
                    name: 'Bomba',
                    desc: 'La próxima pregunta del oponente será automáticamente incorrecta'
                  }
                ].map((card, i) => (
                  <div key={i} className="bg-white p-3 rounded-lg flex items-start gap-3">
                    <span className="text-2xl">{card.icon}</span>
                    <div>
                      <strong className="text-red-600">{card.name}:</strong>
                      <span className="text-gray-700 text-sm ml-2">{card.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-teal-700 mb-4">💡 Consejos y Estrategias</h2>

              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-teal-600 mb-2">Para Principiantes:</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                    <li>Comienza con nivel Fácil para familiarizarte con el formato</li>
                    <li>No te apresures; la precisión es más importante que la velocidad al principio</li>
                    <li>Usa el 50/50 sin dudar en preguntas difíciles</li>
                    <li>Revisa las preguntas que falles para aprender de tus errores</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-teal-600 mb-2">Para Jugadores Avanzados:</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                    <li>Construye rachas largas para maximizar el multiplicador de puntos</li>
                    <li>Responde rápido pero con precisión para ganar bonos de tiempo</li>
                    <li>Guarda los power-ups para momentos críticos</li>
                    <li>En modo 2 jugadores, usa sabotajes cuando el oponente tenga racha alta</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-teal-600 mb-2">Para Modo 2 Jugadores:</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                    <li>El momento de usar sabotajes es crucial; no los desperdicies temprano</li>
                    <li>Presta atención al puntaje y vidas de tu oponente</li>
                    <li>Si vas ganando, juega defensivo; si vas perdiendo, arriesga más</li>
                    <li>El sabotaje de Intercambio es mejor cuando tienes menos puntos</li>
                  </ul>
                </div>
              </div>
            </section>

            <div className="text-center mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
              <h2 className="text-2xl font-bold text-purple-700 mb-3">¿Listo para Jugar?</h2>
              <p className="text-gray-700 mb-4">
                Ahora que conoces las reglas, ¡es hora de poner en práctica tu conocimiento!
              </p>
              <Link
                to="/"
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all"
              >
                ¡Comenzar a Jugar!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
