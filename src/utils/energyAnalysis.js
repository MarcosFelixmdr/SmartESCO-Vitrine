/**
 * Módulo de Análise de Consumo de Energia - SmartESCO
 * Funções utilitárias para processar dados de UCs de baixa tensão.
 */

/**
 * Calcula métricas estatísticas básicas de um array de consumo.
 * @param {number[]} data - Array de valores de consumo (kWh)
 * @returns {{ media: number, maximo: number, minimo: number, desvioPadrao: number, total: number }}
 */
export function calculateMetrics(data) {
  if (!data || data.length === 0) {
    return { media: 0, maximo: 0, minimo: 0, desvioPadrao: 0, total: 0 };
  }

  const total = data.reduce((sum, v) => sum + v, 0);
  const media = total / data.length;
  const maximo = Math.max(...data);
  const minimo = Math.min(...data);

  const variance = data.reduce((sum, v) => sum + Math.pow(v - media, 2), 0) / data.length;
  const desvioPadrao = Math.sqrt(variance);

  return {
    media: Math.round(media * 100) / 100,
    maximo: Math.round(maximo * 100) / 100,
    minimo: Math.round(minimo * 100) / 100,
    desvioPadrao: Math.round(desvioPadrao * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

/**
 * Detecta picos de consumo usando Z-Score (outliers acima de 1.5 desvios padrão).
 * @param {Array<{label: string, consumo: number}>} data - Dados rotulados
 * @param {number} threshold - Limite de Z-Score (default 1.5)
 * @returns {Array<{label: string, consumo: number, zScore: number}>}
 */
export function detectPeaks(data, threshold = 1.5) {
  const values = data.map((d) => d.consumo);
  const { media, desvioPadrao } = calculateMetrics(values);

  if (desvioPadrao === 0) return [];

  return data
    .map((d) => ({
      ...d,
      zScore: Math.round(((d.consumo - media) / desvioPadrao) * 100) / 100,
    }))
    .filter((d) => d.zScore > threshold);
}

/**
 * Classifica o perfil de consumo da UC.
 * - Estável: CV < 15%
 * - Sazonal: CV entre 15% e 35%
 * - Irregular: CV > 35%
 * @param {number[]} data - Array de valores de consumo (kWh)
 * @param {string} lang - Idioma ativo ('PT' ou 'EN')
 * @returns {{ perfil: string, cv: number, descricao: string }}
 */
export function classifyProfile(data, lang = 'PT') {
  const { media, desvioPadrao } = calculateMetrics(data);

  if (media === 0) {
    return {
      perfil: lang === 'PT' ? 'Sem dados' : 'No data',
      cv: 0,
      descricao: lang === 'PT' ? 'Dados insuficientes para análise.' : 'Insufficient data for analysis.'
    };
  }

  const cv = (desvioPadrao / media) * 100; // Coeficiente de Variação (%)

  if (cv < 15) {
    return {
      perfil: lang === 'PT' ? 'Estável' : 'Stable',
      cv: Math.round(cv * 100) / 100,
      descricao: lang === 'PT'
        ? 'O consumo desta UC é bastante estável ao longo do período analisado, com poucas variações significativas. Isso indica um padrão previsível, ideal para planejamento de eficiência energética.'
        : 'The consumption of this CU is quite stable over the analyzed period, with few significant variations. This indicates a predictable pattern, ideal for energy efficiency planning.',
    };
  } else if (cv < 35) {
    return {
      perfil: lang === 'PT' ? 'Sazonal' : 'Seasonal',
      cv: Math.round(cv * 100) / 100,
      descricao: lang === 'PT'
        ? 'O consumo apresenta variações sazonais moderadas, possivelmente ligadas a mudanças climáticas ou ciclos operacionais. Recomenda-se análise para identificar padrões de sazonalidade.'
        : 'The consumption presents moderate seasonal variations, possibly linked to climate changes or operational cycles. Analysis is recommended to identify seasonal patterns.',
    };
  } else {
    return {
      perfil: lang === 'PT' ? 'Irregular' : 'Irregular',
      cv: Math.round(cv * 100) / 100,
      descricao: lang === 'PT'
        ? 'O consumo desta UC é altamente irregular, com grandes flutuações entre períodos. Isso pode indicar equipamentos com uso intermitente ou problemas na rede elétrica.'
        : 'The consumption of this CU is highly irregular, with large fluctuations between periods. This may indicate intermittent equipment use or issues in the electrical grid.',
    };
  }
}

/**
 * Calcula o custo estimado sob diferentes regimes tarifários.
 * @param {Array<{label: string, consumo: number, isWeekend: boolean, hour?: number}>} data - Dados horários
 * @param {string} lang - Idioma ativo ('PT' ou 'EN')
 * @returns {{ convencional: number, branca: number, economia: number, melhor: string }}
 */
export function simulateTariffCosts(data, lang = 'PT') {
  // Tarifas médias estimadas (R$/kWh)
  const TARIFA_CONVENCIONAL = 0.72;
  const TARIFA_BRANCA_PONTA = 1.35;
  const TARIFA_BRANCA_INTERMEDIARIA = 0.90;
  const TARIFA_BRANCA_FORA_PONTA = 0.55;

  let totalConvencional = 0;
  let totalBranca = 0;

  data.forEach((entry) => {
    totalConvencional += entry.consumo * TARIFA_CONVENCIONAL;

    // Na Tarifa Branca, fds e feriados são sempre Fora de Ponta
    if (entry.isWeekend) {
      totalBranca += entry.consumo * TARIFA_BRANCA_FORA_PONTA;
    } else {
      const hour = entry.hour || 0;
      if (hour >= 18 && hour < 21) {
        totalBranca += entry.consumo * TARIFA_BRANCA_PONTA;
      } else if (hour === 17 || hour === 21) {
        totalBranca += entry.consumo * TARIFA_BRANCA_INTERMEDIARIA;
      } else {
        totalBranca += entry.consumo * TARIFA_BRANCA_FORA_PONTA;
      }
    }
  });

  const economia = totalConvencional - totalBranca;
  
  return {
    convencional: Math.round(totalConvencional * 100) / 100,
    branca: Math.round(totalBranca * 100) / 100,
    economia: Math.round(economia * 100) / 100,
    melhor: economia > 0
      ? (lang === 'PT' ? 'Tarifa Branca' : 'White Tariff')
      : (lang === 'PT' ? 'Tarifa Convencional' : 'Conventional Tariff'),
    percentualEconomia: Math.round((economia / totalConvencional) * 10000) / 100
  };
}

/**
 * Calcula indicadores de eficiência.
 * @param {number[]} values - Array de consumo
 * @returns {{ fatorCarga: number, consumoMedio: number }}
 */
export function calculateEfficiencyIndicators(values) {
  const { media, maximo } = calculateMetrics(values);
  const fatorCarga = maximo > 0 ? (media / maximo) : 0;

  return {
    fatorCarga: Math.round(fatorCarga * 100) / 100,
    consumoMedio: media
  };
}

/**
 * Gera dados simulados de repartição por carga.
 * @param {number} consumoTotal - Consumo total da UC no período
 * @param {string} lang - Idioma ativo ('PT' ou 'EN')
 * @returns {Array<{name: string, value: number, color: string}>}
 */
export function generateLoadData(consumoTotal, lang = 'PT') {
  const loads = [
    { 
      name: lang === 'PT' ? 'Processos Industriais' : 'Industrial Processes', 
      ratio: 0.45, 
      color: '#2563eb' 
    },
    { 
      name: lang === 'PT' ? 'Ar Condicionado' : 'Air Conditioning', 
      ratio: 0.25, 
      color: '#3b82f6' 
    },
    { 
      name: lang === 'PT' ? 'Iluminação' : 'Lighting', 
      ratio: 0.15, 
      color: '#60a5fa' 
    },
    { 
      name: lang === 'PT' ? 'TI / Servidores' : 'IT / Servers', 
      ratio: 0.10, 
      color: '#93c5fd' 
    },
    { 
      name: lang === 'PT' ? 'Outras Cargas' : 'Other Loads', 
      ratio: 0.05, 
      color: '#bfdbfe' 
    },
  ];

  return loads.map(load => ({
    name: load.name,
    value: Math.round(consumoTotal * load.ratio * 100) / 100,
    color: load.color
  })).sort((a, b) => b.value - a.value);
}

/**
 * Gera dados simulados horários para um período de 24 horas.
 */
export function generateHourlyMockData() {
  const data = [];
  const baseConsumo = 15;

  for (let hour = 0; hour < 24; hour++) {
    // Simula curva de carga típica (menor de madrugada, picos de dia/tarde)
    let multiplier = 0.5;
    if (hour >= 8 && hour < 18) multiplier = 1.2 + Math.random() * 0.5;
    if (hour >= 18 && hour < 22) multiplier = 1.5 + Math.random() * 0.8;
    if (hour >= 22 || hour < 8) multiplier = 0.4 + Math.random() * 0.2;

    data.push({
      label: `${hour}h`,
      hour,
      consumo: Math.round(baseConsumo * multiplier * 100) / 100,
      isWeekend: false
    });
  }
  return data;
}

/**
 * Gera previsão de médio prazo (4 semanas) baseada na média móvel e tendência.
 * @param {Array<{label: string, consumo: number}>} history - Histórico mensal
 * @param {number} weeks - Semanas para prever
 * @returns {Array<{label: string, consumo: number, isForecast: boolean}>}
 */
export function generateForecast(history, weeks = 4) {
  const lastConsumos = history.slice(-4).map(h => h.consumo);
  const media = lastConsumos.reduce((a, b) => a + b, 0) / lastConsumos.length;
  
  // Calcula tendência simplificada (crescimento/queda)
  const tendencia = (lastConsumos[lastConsumos.length - 1] - lastConsumos[0]) / lastConsumos.length;
  
  const forecast = [];
  
  for (let i = 1; i <= weeks; i++) {
    // Adiciona ruído aleatório e componente de tendência
    const noise = (Math.random() - 0.5) * (media * 0.1);
    const predicted = media + (tendencia * i) + noise;
    
    forecast.push({
      label: `Prev. S${i}`,
      consumo: Math.round(predicted * 100) / 100,
      isForecast: true
    });
  }
  
  return forecast;
}

/**
 * Simula dados climáticos e correlação com o consumo.
 * @param {Array<{label: string, consumo: number}>} data - Dados de consumo
 * @returns {Array<{label: string, consumo: number, temp: number, umidade: number}>}
 */
export function generateClimateData(data) {
  return data.map(d => {
    // Simula correlação (Temperatura sobe -> Consumo sobe)
    // Base de 22°C + proporção do consumo
    const baseTemp = 20;
    const tempImpact = (d.consumo / 500) * 15; // Se consome 500kWh, adiciona 15 graus
    const noise = (Math.random() - 0.5) * 4;
    
    return {
      ...d,
      temp: Math.round((baseTemp + tempImpact + noise) * 10) / 10,
      umidade: Math.round((60 + (Math.random() - 0.5) * 30) * 10) / 10
    };
  });
}

/**
 * Calcula correlação de Pearson simples entre duas séries.
 */
export function calculateCorrelation(seriesA, seriesB) {
  if (seriesA.length !== seriesB.length) return 0;
  const n = seriesA.length;
  
  const meanA = seriesA.reduce((a, b) => a + b, 0) / n;
  const meanB = seriesB.reduce((a, b) => a + b, 0) / n;
  
  let num = 0;
  let denA = 0;
  let denB = 0;
  
  for (let i = 0; i < n; i++) {
    const diffA = seriesA[i] - meanA;
    const diffB = seriesB[i] - meanB;
    num += (diffA * diffB);
    denA += (diffA * diffA);
    denB += (diffB * diffB);
  }
  
  if (denA === 0 || denB === 0) return 0;
  return Math.round((num / (Math.sqrt(denA) * Math.sqrt(denB))) * 100) / 100;
}

/**
 * Gera dados simulados (Mock) para 12 meses de uma UC de baixa tensão.
 */
export function generateMockData(ucId = 'UC-001', tipo = 'sazonal') {
  const meses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
  ];

  const baseConsumo = 350;
  // Simula impacto de feriados em meses específicos (ex: Abr, Dez)
  const feriados = { 'Abr': 0.85, 'Dez': 0.70 };

  const perfis = {
    estavel: () => baseConsumo + (Math.random() - 0.5) * 30,
    sazonal: (mesIndex) => {
      const mesName = meses[mesIndex];
      const sazonal = [1.25, 1.20, 1.15, 1.0, 0.85, 0.75, 0.70, 0.75, 0.85, 1.0, 1.10, 1.20];
      let val = baseConsumo * sazonal[mesIndex] + (Math.random() - 0.5) * 40;
      
      // Aplica redução por feriados
      if (feriados[mesName]) val *= feriados[mesName];
      return val;
    },
    irregular: () => baseConsumo + (Math.random() - 0.5) * 250,
  };

  const gerador = perfis[tipo] || perfis.sazonal;

  const dados = meses.map((label, index) => ({
    label,
    consumo: Math.round(gerador(index) * 100) / 100,
    hasHoliday: !!feriados[label]
  }));

  return { ucId, dados };
}

/**
 * Gera alertas sistêmicos combinando diversos indicadores.
 * @returns {Array<{id: string, level: string, title: string, message: string, suggestion: string}>}
 */
export function generateAlerts({ metrics, efficiency, peaks, forecastData }, lang = 'PT') {
  const alerts = [];

  if (efficiency.fatorCarga < 0.5 && efficiency.fatorCarga > 0) {
    alerts.push({
      id: 'alert-fc',
      level: 'critical',
      title: lang === 'PT' ? 'Fator de Carga Crítico' : 'Critical Load Factor',
      message: lang === 'PT'
        ? `Fator de carga de ${efficiency.fatorCarga} indica forte ociosidade da rede ou picos excessivos.`
        : `Load factor of ${efficiency.fatorCarga} indicates strong network idleness or excessive peaks.`,
      suggestion: lang === 'PT'
        ? 'Remaneje o acionamento de máquinas pesadas (ex: fornos, compressores) para horários distantes do pico de demanda.'
        : 'Reschedule the activation of heavy machinery (e.g. ovens, compressors) to times away from peak demand.'
    });
  }

  if (peaks.length >= 3) {
    alerts.push({
      id: 'alert-peaks',
      level: 'warning',
      title: lang === 'PT' ? 'Consumo Volátil' : 'Volatile Consumption',
      message: lang === 'PT'
        ? `Foram detectados ${peaks.length} picos anormais que distorcem sua média.`
        : `${peaks.length} abnormal peaks that distort your average were detected.`,
      suggestion: lang === 'PT'
        ? 'Investigue se equipamentos foram deixados ligados nos finais de semana ou fora de turno.'
        : 'Investigate if equipment was left running on weekends or outside normal shifts.'
    });
  }

  const hasPeakRisk = forecastData.some(d => d.consumo > metrics.maximo * 0.95);
  if (hasPeakRisk) {
    alerts.push({
      id: 'alert-forecast',
      level: 'warning',
      title: lang === 'PT' ? 'Risco de Novo Pico Previsto' : 'Predicted New Peak Risk',
      message: lang === 'PT'
        ? 'O modelo de IA prevê um consumo próximo ao seu histórico máximo nas próximas semanas.'
        : 'The AI model predicts consumption close to your historic maximum in the coming weeks.',
      suggestion: lang === 'PT'
        ? 'Redobre o monitoramento preventivo de equipamentos de alta potência.'
        : 'Redouble preventive monitoring of high-power equipment.'
    });
  }

  return alerts;
}

/**
 * Gera insights acionáveis de inteligência de negócios.
 */
export function generateInsights({ tariffCosts, loadData, profile }, lang = 'PT') {
  const insights = [];

  if (tariffCosts.economia > 0) {
    insights.push({
      id: 'in-tariff',
      title: lang === 'PT' ? 'Oportunidade Tarifária' : 'Tariff Opportunity',
      message: lang === 'PT'
        ? `Mudar para Tarifa Branca pode gerar até R$ ${tariffCosts.economia} de economia diária (${tariffCosts.percentualEconomia}% a menos).`
        : `Switching to the White Tariff can generate up to R$ ${tariffCosts.economia} in daily savings (${tariffCosts.percentualEconomia}% less).`,
      action: lang === 'PT' ? 'Simular Migração' : 'Simulate Migration'
    });
  }

  if (loadData && loadData.length > 0) {
    const topLoad = loadData[0];
    const topLoadPercent = Math.round((topLoad.value / loadData.reduce((a, b) => a + b.value, 0)) * 100);
    if (topLoadPercent > 35) {
      insights.push({
        id: 'in-load',
        title: lang === 'PT' ? 'Carga Concentrada' : 'Concentrated Load',
        message: lang === 'PT'
          ? `Com ${topLoadPercent}% do consumo, "${topLoad.name}" é seu maior ofensor. Focar esforços de eficiência aqui terá impacto massivo.`
          : `With ${topLoadPercent}% of consumption, "${topLoad.name}" is your biggest driver. Focusing efficiency efforts here will have massive impact.`,
        action: lang === 'PT' ? 'Ver Detalhes do Circuito' : 'View Circuit Details'
      });
    }
  }

  const stableWord = lang === 'PT' ? 'Estável' : 'Stable';
  if (profile.perfil === stableWord) {
    insights.push({
      id: 'in-solar',
      title: lang === 'PT' ? 'Perfil Ideal para Energia Solar' : 'Ideal Profile for Solar Energy',
      message: lang === 'PT'
        ? 'Sua estabilidade de consumo reduz drasticamente erros de dimensionamento em projetos fotovoltaicos, garantindo ROI.'
        : 'Your consumption stability drastically reduces sizing errors in photovoltaic projects, ensuring ROI.',
      action: lang === 'PT' ? 'Calcular Orçamento Solar' : 'Calculate Solar Budget'
    });
  }

  if (insights.length === 0) {
    insights.push({
      id: 'in-ok',
      title: lang === 'PT' ? 'Operação Otimizada' : 'Optimized Operation',
      message: lang === 'PT'
        ? 'Não identificamos ineficiências graves. Mantenha os equipamentos com manutenção em dia.'
        : 'We did not identify severe inefficiencies. Keep equipment maintenance up to date.',
      action: lang === 'PT' ? 'Ver Relatório Completo' : 'View Full Report'
    });
  }

  return insights;
}
