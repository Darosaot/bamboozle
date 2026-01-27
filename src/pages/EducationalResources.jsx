import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Baby, Heart, Moon, Utensils, Brain, Shield, AlertCircle, BookOpen } from 'lucide-react';

export default function EducationalResources() {
  const [activeCategory, setActiveCategory] = useState('embarazo');

  const categories = [
    { id: 'embarazo', name: 'Embarazo', icon: Heart },
    { id: 'reciennacido', name: 'Recién Nacido', icon: Baby },
    { id: 'sueno', name: 'Sueño', icon: Moon },
    { id: 'alimentacion', name: 'Alimentación', icon: Utensils },
    { id: 'desarrollo', name: 'Desarrollo', icon: Brain },
    { id: 'seguridad', name: 'Seguridad', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-4">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft size={20} />
          Volver al Inicio
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen className="text-purple-600" size={40} />
            <h1 className="text-4xl font-bold text-purple-600 text-center">
              Recursos Educativos
            </h1>
          </div>

          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Guías completas y consejos prácticos para cada etapa del embarazo y la crianza de tu bebé.
            Información basada en evidencia científica y recomendaciones de organizaciones de salud reconocidas.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="text-gray-700 font-semibold mb-2">
                  Aviso Importante
                </p>
                <p className="text-gray-600 text-sm">
                  Esta información es solo para fines educativos. No sustituye el consejo médico profesional.
                  Siempre consulta con tu pediatra o médico para decisiones específicas sobre la salud de tu bebé.
                </p>
              </div>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeCategory === id
                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={20} />
                {name}
              </button>
            ))}
          </div>

          {/* Content Sections */}
          <div className="prose max-w-none">
            {activeCategory === 'embarazo' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-600">Embarazo: Tu Guía Trimestre a Trimestre</h2>

                <section className="bg-pink-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold text-pink-700 mb-3">Primer Trimestre (Semanas 1-12)</h3>
                  <p className="text-gray-700 mb-4">
                    El primer trimestre es crucial para el desarrollo de tu bebé. Durante estas semanas, se forman
                    todos los órganos principales. Es normal experimentar síntomas como náuseas, fatiga y cambios emocionales.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-pink-600 mb-2">Cuidados Esenciales:</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Comienza a tomar ácido fólico (400-800 mcg diarios) si aún no lo haces</li>
                        <li>Programa tu primera visita prenatal entre las semanas 6-8</li>
                        <li>Evita alcohol, tabaco y medicamentos sin aprobación médica</li>
                        <li>Mantén una dieta equilibrada rica en proteínas, hierro y calcio</li>
                        <li>Hidrátate adecuadamente (8-10 vasos de agua al día)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-pink-600 mb-2">Síntomas Comunes:</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Náuseas matutinas (pueden ocurrir en cualquier momento del día)</li>
                        <li>Fatiga extrema</li>
                        <li>Sensibilidad en los senos</li>
                        <li>Micción frecuente</li>
                        <li>Cambios de humor</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold text-purple-700 mb-3">Segundo Trimestre (Semanas 13-26)</h3>
                  <p className="text-gray-700 mb-4">
                    Muchas mujeres consideran este el trimestre más cómodo. Las náuseas generalmente disminuyen,
                    los niveles de energía mejoran y comenzarás a sentir los movimientos de tu bebé.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-purple-600 mb-2">Hitos Importantes:</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Semana 16-20: Ecografía de anatomía para verificar desarrollo del bebé</li>
                        <li>Semana 18-22: Posibilidad de conocer el sexo del bebé</li>
                        <li>Semana 20-24: Comienzo de los movimientos fetales perceptibles ("pataditas")</li>
                        <li>Prueba de glucosa para detectar diabetes gestacional (semana 24-28)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-600 mb-2">Recomendaciones:</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Comienza a investigar clases de preparación para el parto</li>
                        <li>Mantén actividad física moderada (caminar, yoga prenatal)</li>
                        <li>Usa ropa cómoda y sostenes de maternidad</li>
                        <li>Considera cremas para prevenir estrías</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold text-blue-700 mb-3">Tercer Trimestre (Semanas 27-40+)</h3>
                  <p className="text-gray-700 mb-4">
                    La recta final del embarazo. Tu bebé está ganando peso rápidamente y preparándose para nacer.
                    Es normal sentir más incomodidad física a medida que tu cuerpo se prepara para el parto.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Preparativos para el Parto:</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Prepara tu bolso para el hospital (semana 35-36)</li>
                        <li>Instala la silla de auto del bebé y aprende a usarla</li>
                        <li>Finaliza el cuarto del bebé</li>
                        <li>Discute tu plan de parto con tu médico</li>
                        <li>Conoce las señales del trabajo de parto</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Señales de Alerta (contacta a tu médico):</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Sangrado vaginal</li>
                        <li>Pérdida de líquido amniótico</li>
                        <li>Contracciones regulares antes de las 37 semanas</li>
                        <li>Disminución de movimientos fetales</li>
                        <li>Dolor de cabeza severo o cambios en la visión</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeCategory === 'reciennacido' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-600">Cuidado del Recién Nacido</h2>

                <section className="bg-pink-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold text-pink-700 mb-3">Las Primeras 24 Horas</h3>
                  <p className="text-gray-700 mb-4">
                    Las primeras horas después del nacimiento son mágicas pero también pueden ser abrumadoras.
                    Aquí está lo que puedes esperar:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Contacto piel con piel:</strong> Crucial para la regulación térmica, vínculo y inicio de lactancia</li>
                    <li><strong>Test de APGAR:</strong> Se realiza al minuto y a los 5 minutos de vida</li>
                    <li><strong>Primera toma:</strong> Idealmente dentro de la primera hora</li>
                    <li><strong>Vitamina K:</strong> Administrada para prevenir hemorragias</li>
                    <li><strong>Profilaxis ocular:</strong> Gotas para prevenir infecciones oculares</li>
                    <li><strong>Primera orina y deposición:</strong> Deben ocurrir en las primeras 24 horas</li>
                  </ul>
                </section>

                <section className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold text-blue-700 mb-3">Cuidados Básicos Diarios</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">💧 Baño del Bebé</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li><strong>Frecuencia:</strong> 2-3 veces por semana es suficiente; el baño diario puede resecar la piel</li>
                        <li><strong>Temperatura del agua:</strong> 37°C (usa un termómetro de baño)</li>
                        <li><strong>Duración:</strong> 5-10 minutos máximo</li>
                        <li><strong>Hasta que caiga el cordón:</strong> Solo baños de esponja</li>
                        <li><strong>Productos:</strong> Usa jabones suaves específicos para bebés, sin fragancias</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">🩹 Cuidado del Cordón Umbilical</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Mantén el área limpia y seca</li>
                        <li>No es necesario usar alcohol (según nuevas recomendaciones)</li>
                        <li>Dobla el pañal hacia abajo para que no roce el cordón</li>
                        <li>Cae naturalmente entre 7-14 días</li>
                        <li>Contacta al médico si hay enrojecimiento, pus o mal olor</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">🧷 Cambio de Pañales</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li><strong>Frecuencia:</strong> Cada 2-3 horas o después de cada deposición</li>
                        <li><strong>Limpieza:</strong> De adelante hacia atrás (especialmente en niñas)</li>
                        <li><strong>Crema protectora:</strong> Usa en cada cambio para prevenir rozaduras</li>
                        <li><strong>Exposición al aire:</strong> Deja al bebé sin pañal 10-15 minutos al día</li>
                        <li><strong>Recién nacidos:</strong> Usan aproximadamente 8-12 pañales al día</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold text-green-700 mb-3">Señales de un Bebé Saludable</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Pañales mojados:</strong> 6-8 pañales mojados después del día 5</li>
                    <li><strong>Deposiciones:</strong> Varían mucho; pueden ser después de cada toma o cada 7 días (en bebés amamantados)</li>
                    <li><strong>Alimentación:</strong> Come cada 2-3 horas (8-12 veces en 24 horas)</li>
                    <li><strong>Sueño:</strong> Duerme 16-18 horas al día, pero en períodos cortos</li>
                    <li><strong>Aumento de peso:</strong> Recupera el peso del nacimiento en 2 semanas</li>
                  </ul>
                </section>
              </div>
            )}

            {activeCategory === 'sueno' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-600">Guía del Sueño Infantil</h2>

                <section className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold text-indigo-700 mb-3">Sueño Seguro: Reglas de Oro</h3>
                  <p className="text-gray-700 mb-4">
                    Seguir las recomendaciones de sueño seguro reduce significativamente el riesgo del
                    Síndrome de Muerte Súbita del Lactante (SMSL).
                  </p>
                  <div className="bg-white p-4 rounded border-2 border-indigo-300 mb-4">
                    <h4 className="font-semibold text-indigo-600 mb-3">Reglas Fundamentales:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span><strong>Siempre boca arriba:</strong> Para dormir y siestas, hasta el año</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span><strong>Superficie firme:</strong> Colchón firme con sábana ajustada</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span><strong>Cuna vacía:</strong> Sin almohadas, mantas, peluches o protectores</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span><strong>Habitación compartida:</strong> Mismo cuarto (no misma cama) hasta 6-12 meses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span><strong>Temperatura adecuada:</strong> 18-20°C, evitar sobrecalentamiento</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">✗</span>
                        <span><strong>No colecho:</strong> Especialmente si hay consumo de alcohol/drogas o fumadores</span>
                      </li>
                    </ul>
                  </div>
                </section>

                <section className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold text-purple-700 mb-3">Patrones de Sueño por Edad</h3>

                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold text-purple-600 mb-2">0-3 Meses (Recién Nacido)</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li><strong>Total:</strong> 16-18 horas al día</li>
                        <li><strong>Patrón:</strong> Periodos cortos de 2-4 horas</li>
                        <li><strong>Característica:</strong> Sin diferenciación día/noche</li>
                        <li><strong>Consejo:</strong> Alimenta a demanda, expón a luz natural de día</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold text-purple-600 mb-2">4-6 Meses</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li><strong>Total:</strong> 14-16 horas al día</li>
                        <li><strong>Noche:</strong> 10-12 horas (con despertares para comer)</li>
                        <li><strong>Siestas:</strong> 3-4 siestas de 30 minutos a 2 horas</li>
                        <li><strong>Hito:</strong> Algunos bebés duermen 6-8 horas seguidas</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold text-purple-600 mb-2">6-12 Meses</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li><strong>Total:</strong> 12-14 horas al día</li>
                        <li><strong>Noche:</strong> 10-12 horas (muchos duermen toda la noche)</li>
                        <li><strong>Siestas:</strong> 2 siestas de 1-2 horas cada una</li>
                        <li><strong>Nota:</strong> Regresiones del sueño comunes a los 8-10 meses</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold text-purple-600 mb-2">12-24 Meses</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li><strong>Total:</strong> 11-14 horas al día</li>
                        <li><strong>Noche:</strong> 10-12 horas</li>
                        <li><strong>Siestas:</strong> Transición a 1 siesta de 1-3 horas</li>
                        <li><strong>Desafío:</strong> Resistencia a dormir, ansiedad por separación</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold text-blue-700 mb-3">Rutina de Sueño Efectiva</h3>
                  <p className="text-gray-700 mb-4">
                    Una rutina consistente ayuda al bebé a anticipar el sueño y dormir mejor.
                  </p>
                  <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                    <li><strong>Mismo horario:</strong> Comienza la rutina a la misma hora cada noche</li>
                    <li><strong>Baño relajante:</strong> Agua tibia, luz tenue, voz suave</li>
                    <li><strong>Masaje suave:</strong> Con loción o aceite para bebés</li>
                    <li><strong>Pijama cómodo:</strong> Apropiado para la temperatura</li>
                    <li><strong>Alimentación:</strong> Última toma antes de dormir</li>
                    <li><strong>Actividad tranquila:</strong> Cuento, canción de cuna, música suave</li>
                    <li><strong>Ambiente adecuado:</strong> Oscuridad, silencio o ruido blanco</li>
                    <li><strong>Acostarlo despierto:</strong> Para que aprenda a dormirse solo</li>
                  </ol>
                </section>
              </div>
            )}

            {activeCategory === 'alimentacion' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-600">Nutrición Infantil</h2>

                <section className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold text-green-700 mb-3">Lactancia Materna</h3>
                  <p className="text-gray-700 mb-4">
                    La leche materna es el alimento ideal para los bebés. La OMS recomienda lactancia materna
                    exclusiva hasta los 6 meses y complementada hasta los 2 años o más.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Beneficios para el Bebé:</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Nutrición perfectamente equilibrada que se adapta a sus necesidades</li>
                        <li>Protección contra infecciones y enfermedades</li>
                        <li>Reduce el riesgo de alergias, asma y obesidad</li>
                        <li>Favorece el desarrollo cognitivo</li>
                        <li>Fortalece el vínculo madre-bebé</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Posiciones para Amamantar:</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li><strong>Cuna:</strong> Bebé en brazos, cabeza en el pliegue del codo</li>
                        <li><strong>Cuna cruzada:</strong> Sostienes al bebé con el brazo opuesto</li>
                        <li><strong>Balón de fútbol:</strong> Bebé bajo tu brazo, útil post-cesárea</li>
                        <li><strong>Acostada de lado:</strong> Ideal para tomas nocturnas</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded border-2 border-green-300">
                      <h4 className="font-semibold text-green-600 mb-2">Señales de Buen Agarre:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>✓ La boca está muy abierta</li>
                        <li>✓ Los labios están evertidos (hacia afuera)</li>
                        <li>✓ La barbilla toca el pecho</li>
                        <li>✓ Se ve más areola arriba que abajo</li>
                        <li>✓ No hay dolor (después de los primeros días)</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold text-blue-700 mb-3">Alimentación Complementaria (6+ meses)</h3>
                  <p className="text-gray-700 mb-4">
                    A partir de los 6 meses, la leche (materna o de fórmula) sigue siendo el alimento principal,
                    pero se introducen gradualmente otros alimentos.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Señales de Preparación:</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Se sienta con poco o ningún apoyo</li>
                        <li>Tiene buen control de cabeza y cuello</li>
                        <li>Muestra interés por la comida</li>
                        <li>Abre la boca cuando se le acerca comida</li>
                        <li>Ha desaparecido el reflejo de extrusión (empujar con la lengua)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Primeros Alimentos (6-8 meses):</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Cereales fortificados con hierro</li>
                        <li>Purés de verduras (zanahoria, calabaza, batata)</li>
                        <li>Purés de frutas (manzana, pera, plátano)</li>
                        <li>Introducir un alimento nuevo cada 3-5 días</li>
                        <li>Textura: Purés suaves, gradualmente más gruesos</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">8-12 Meses:</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Carnes bien cocidas y trituradas</li>
                        <li>Legumbres cocidas</li>
                        <li>Yogur natural y queso suave</li>
                        <li>Yema de huevo cocida</li>
                        <li>Textura: Alimentos machacados, trocitos blandos</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded border-2 border-red-300">
                      <h4 className="font-semibold text-red-600 mb-2">Alimentos a Evitar (Primer Año):</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>✗ Miel (riesgo de botulismo)</li>
                        <li>✗ Leche de vaca como bebida principal</li>
                        <li>✗ Sal y azúcar añadidos</li>
                        <li>✗ Frutos secos enteros (riesgo de atragantamiento)</li>
                        <li>✗ Alimentos duros y redondos (uvas enteras, salchichas)</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeCategory === 'desarrollo' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-600">Desarrollo Infantil: Hitos por Edad</h2>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <p className="text-gray-700">
                    <strong>Nota:</strong> Cada bebé se desarrolla a su propio ritmo. Estos son promedios;
                    hay mucha variabilidad normal. Consulta al pediatra si tienes preocupaciones.
                  </p>
                </div>

                <section className="space-y-4">
                  {[
                    {
                      edad: '2 Meses',
                      motor: ['Levanta la cabeza 45°', 'Movimientos más suaves', 'Comienza a sostener la cabeza'],
                      cognitivo: ['Sigue objetos con la mirada', 'Reconoce caras familiares', 'Se calma con voz conocida'],
                      social: ['Sonríe socialmente', 'Arrulla y hace sonidos', 'Mira las caras']
                    },
                    {
                      edad: '4 Meses',
                      motor: ['Sostiene la cabeza firmemente', 'Se apoya en antebrazos boca abajo', 'Agarra objetos'],
                      cognitivo: ['Reconoce biberón o pecho', 'Responde a sonidos', 'Se mira las manos'],
                      social: ['Ríe a carcajadas', 'Disfruta jugar', 'Imita expresiones faciales']
                    },
                    {
                      edad: '6 Meses',
                      motor: ['Se sienta con apoyo', 'Se voltea', 'Pasa objetos de mano a mano'],
                      cognitivo: ['Busca objetos que caen', 'Explora con la boca', 'Responde a su nombre'],
                      social: ['Reconoce personas familiares', 'Le gustan los juegos sociales', 'Responde a emociones']
                    },
                    {
                      edad: '9 Meses',
                      motor: ['Se sienta sin apoyo', 'Gatea o se arrastra', 'Se pone de pie agarrado'],
                      cognitivo: ['Busca objetos escondidos', 'Usa pinza (pulgar-índice)', 'Entiende "no"'],
                      social: ['Ansiedad por separación', 'Imita gestos', 'Juega a las escondidas']
                    },
                    {
                      edad: '12 Meses',
                      motor: ['Se pone de pie solo', 'Da primeros pasos o camina', 'Bebe de vaso'],
                      cognitivo: ['Dice "mamá" y "papá"', 'Explora objetos', 'Señala cosas'],
                      social: ['Muestra preferencias', 'Entrega objetos', 'Aplaude']
                    },
                    {
                      edad: '18 Meses',
                      motor: ['Camina bien', 'Sube escaleras con ayuda', 'Come con cuchara'],
                      cognitivo: ['Dice 10-20 palabras', 'Identifica partes del cuerpo', 'Juego simbólico básico'],
                      social: ['Ayuda a vestirse', 'Imita actividades', 'Muestra afecto']
                    },
                    {
                      edad: '24 Meses',
                      motor: ['Corre', 'Patea pelota', 'Sube/baja escaleras'],
                      cognitivo: ['Frases de 2-3 palabras', 'Sigue instrucciones simples', 'Clasifica formas'],
                      social: ['Juego paralelo', 'Copia a adultos', 'Se emociona con otros niños']
                    }
                  ].map((milestone) => (
                    <div key={milestone.edad} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-purple-700 mb-4">{milestone.edad}</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-semibold text-blue-600 mb-2">🤸 Motor</h4>
                          <ul className="space-y-1 text-gray-700 text-sm">
                            {milestone.motor.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-600 mb-2">🧠 Cognitivo</h4>
                          <ul className="space-y-1 text-gray-700 text-sm">
                            {milestone.cognitivo.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-pink-600 mb-2">👥 Social</h4>
                          <ul className="space-y-1 text-gray-700 text-sm">
                            {milestone.social.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            )}

            {activeCategory === 'seguridad' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-600">Seguridad Infantil</h2>

                <section className="bg-red-50 p-6 rounded-lg border-2 border-red-300">
                  <h3 className="text-2xl font-semibold text-red-700 mb-3">Prevención de Accidentes</h3>
                  <p className="text-gray-700 mb-4">
                    Los accidentes son la principal causa de lesiones en niños. La mayoría son prevenibles
                    con medidas de seguridad adecuadas.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold text-red-600 mb-2">🚗 Seguridad en el Auto</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Usa SIEMPRE silla de auto apropiada para la edad y peso</li>
                        <li>Mirando hacia atrás hasta mínimo 2 años (o hasta superar límites)</li>
                        <li>Instala correctamente en asiento trasero</li>
                        <li>Nunca dejes al niño solo en el auto</li>
                        <li>Verifica que el arnés esté ajustado (cabe solo 1 dedo)</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold text-red-600 mb-2">🏠 Seguridad en Casa</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Protectores en enchufes</li>
                        <li>Barreras de seguridad en escaleras</li>
                        <li>Seguros en gabinetes con productos peligrosos</li>
                        <li>Esquineros en muebles con bordes afilados</li>
                        <li>Anclaje de muebles altos a la pared</li>
                        <li>Cordones de cortinas fuera del alcance</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold text-red-600 mb-2">🛁 Seguridad en el Baño</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>NUNCA dejes al bebé solo en la bañera</li>
                        <li>Verifica la temperatura del agua (37°C)</li>
                        <li>Alfombra antideslizante en la bañera</li>
                        <li>Medicamentos y productos bajo llave</li>
                        <li>Tapa del inodoro con seguro</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold text-red-600 mb-2">🔥 Prevención de Quemaduras</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Temperatura del calentador de agua max 50°C</li>
                        <li>Mangos de ollas hacia adentro de la estufa</li>
                        <li>Protectores de estufa</li>
                        <li>Prueba temperatura de alimentos antes de dar</li>
                        <li>No cargues líquidos calientes con el bebé en brazos</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold text-orange-700 mb-3">Prevención de Atragantamiento</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold text-green-600 mb-2">✓ Alimentos Seguros</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Purés y alimentos bien machacados</li>
                        <li>• Trozos blandos del tamaño adecuado</li>
                        <li>• Frutas blandas sin piel</li>
                        <li>• Vegetales bien cocidos</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold text-red-600 mb-2">✗ Alimentos Peligrosos</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Frutos secos enteros</li>
                        <li>• Uvas enteras, tomates cherry</li>
                        <li>• Palomitas de maíz</li>
                        <li>• Caramelos duros</li>
                        <li>• Salchichas sin cortar</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
