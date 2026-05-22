import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './context/LanguageContext';
import './styles.css';

export const projects = [
  {
    id: 1,
    title: "Otimização de Redes de Climatização em Larga Escala via Aprendizado por Reforço",
    titleEn: "Large-Scale HVAC Network Optimization via Reinforcement Learning",
    description: "Pesquisa aplicada no controle inteligente de sistemas de HVAC industriais utilizando inteligência artificial para otimização de consumo térmico e elétrico.",
    descriptionEn: "Applied research in intelligent control of industrial HVAC systems using artificial intelligence to optimize thermal and electrical consumption.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    category: "LADES",
    coordenador: "Dr. Roberto Silva Santos",
    coordenadorEn: "Dr. Roberto Silva Santos",
    inicio: "2022",
    termino: "2025",
    status: "Em andamento",
    statusEn: "In progress",
    financiador: "Fundo de Inovação SmartESCO e CNPq",
    financiadorEn: "SmartESCO Innovation Fund and CNPq",
    resumo: "Este projeto propõe o desenvolvimento de controladores inteligentes baseados em Deep Reinforcement Learning (DRL) para gerenciar sistemas de aquecimento, ventilação e ar condicionado (HVAC) em shopping centers e complexos industriais. A solução reduz o consumo elétrico adaptando a operação térmico-dinâmica em tempo real com base no fluxo de ocupação e condições meteorológicas externas.",
    resumoEn: "This project proposes the development of intelligent controllers based on Deep Reinforcement Learning (DRL) to manage heating, ventilation, and air conditioning (HVAC) systems in shopping centers and industrial complexes. The solution reduces electric consumption by adapting thermal-dynamic operation in real-time based on occupancy flow and external meteorological conditions.",
    resultados: "SANTOS, R. S.; OLIVEIRA, M. F. Controle Térmico Preditivo por Aprendizado por Reforço, Simpósio Brasileiro de Automação Inteligente, p. 112-118 (2023).",
    resultadosEn: "SANTOS, R. S.; OLIVEIRA, M. F. Predictive Thermal Control by Reinforcement Learning, Brazilian Symposium on Intelligent Automation, p. 112-118 (2023)."
  },
  {
    id: 2,
    title: "Gêmeos Digitais para Otimização em Tempo Real de Processos de Cogeração Térmica",
    titleEn: "Digital Twins for Real-Time Optimization of Thermal Cogeneration Processes",
    description: "Utilização de redes neurais com informação física (PINNs) para aproximar o comportamento dinâmico de caldeiras e turbinas a vapor de alta eficiência.",
    descriptionEn: "Use of physics-informed neural networks (PINNs) to approximate the dynamic behavior of high-efficiency boilers and steam turbines.",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80",
    category: "LADES",
    coordenador: "Dra. Carolina Mendonça",
    coordenadorEn: "Dr. Carolina Mendonça",
    inicio: "2021",
    termino: "2024",
    status: "Concluído",
    statusEn: "Completed",
    financiador: "Finep / SmartESCO",
    financiadorEn: "Finep / SmartESCO",
    resumo: "Desenvolvimento de uma plataforma de Gêmeos Digitais (Digital Twins) combinando modelos matemáticos clássicos de termodinâmica com redes neurais artificiais para prever o desgaste e otimizar a eficiência de ciclo termodinâmico em usinas de cogeração de biomassa.",
    resumoEn: "Development of a Digital Twins platform combining classical thermodynamic mathematical models with artificial neural networks to predict wear and optimize thermodynamic cycle efficiency in biomass cogeneration plants.",
    resultados: "MENDONÇA, C. et al. Digital Twin of Steam Boiler using Physics-Informed Neural Networks, Energy Systems Journal, vol. 42, p. 204-216 (2024).",
    resultadosEn: "MENDONÇA, C. et al. Digital Twin of Steam Boiler using Physics-Informed Neural Networks, Energy Systems Journal, vol. 42, p. 204-216 (2024)."
  },
  {
    id: 3,
    title: "Controle Preditivo Baseado em Modelo (MPC) para Plantas Distribuídas de Biogás",
    titleEn: "Model Predictive Control (MPC) for Distributed Biogas Plants",
    description: "Modelagem matemática e regulação ótima de biodigestores integrados para estabilizar a injeção de biogás e biometano em mini-redes de cogeração.",
    descriptionEn: "Mathematical modeling and optimal regulation of integrated biodigesters to stabilize biogas and biomethane injection into cogeneration mini-grids.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
    category: "LADES",
    coordenador: "Dr. Arthur Albuquerque",
    coordenadorEn: "Dr. Arthur Albuquerque",
    inicio: "2023",
    termino: "2026",
    status: "Em andamento",
    statusEn: "In progress",
    financiador: "Ministério da Ciência e Inovação",
    financiadorEn: "Ministry of Science and Innovation",
    resumo: "Pesquisa focada em estratégias avançadas de regulação termoquímica para digestores anaeróbicos. O MPC gerencia de maneira proativa o suprimento de substratos orgânicos variados para garantir a pressão e qualidade do biogás sob variações rápidas de demanda elétrica.",
    resumoEn: "Research focused on advanced thermochemical regulation strategies for anaerobic digesters. The MPC proactively manages the supply of varied organic substrates to guarantee biogas pressure and quality under rapid variations in electrical demand.",
    resultados: "ALBUQUERQUE, A. Advanced Predictive Strategies for Distributed Biogas Production, International Conference on Renewable Energy, p. 55-62 (2023).",
    resultadosEn: "ALBUQUERQUE, A. Advanced Predictive Strategies for Distributed Biogas Production, International Conference on Renewable Energy, p. 55-62 (2023)."
  },
  {
    id: 4,
    title: "Simulação Multiescala de Geração Fotovoltaica Bifacial integrada a Parques Eólicos Offshore",
    titleEn: "Multiscale Simulation of Bifacial Photovoltaic Generation integrated with Offshore Wind Parks",
    description: "Análise avançada do potencial energético de sistemas híbridos renováveis offshore, quantificando ganhos de reflexão da água do mar em células bifaciais.",
    descriptionEn: "Advanced analysis of the energy potential of hybrid offshore renewable systems, quantifying reflection gains of seawater in bifacial cells.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    category: "LAMCE",
    coordenador: "Prof. Henrique Viana",
    coordenadorEn: "Prof. Henrique Viana",
    inicio: "2022",
    termino: "2025",
    status: "Em andamento",
    statusEn: "In progress",
    financiador: "Parceria Estratégica Energias Limpas",
    financiadorEn: "Clean Energy Strategic Partnership",
    resumo: "Modelagem tridimensional microclimática e hidrodinâmica para avaliar a durabilidade e o rendimento térmico-elétrico de painéis fotovoltaicos bifaciais instalados entre as fundações de turbinas eólicas em alto mar, aproveitando a albedo marinha.",
    resumoEn: "Three-dimensional microclimatic and hydrodynamic modeling to evaluate the durability and thermal-electrical yield of bifacial photovoltaic panels installed between the foundations of offshore wind turbines, leveraging marine albedo.",
    resultados: "VIANA, H.; & COSTA, F. Numerical modeling of hybrid offshore wind-solar generation facilities, Journal of Marine Science, p. 450-462 (2024).",
    resultadosEn: "VIANA, H.; & COSTA, F. Numerical modeling of hybrid offshore wind-solar generation facilities, Journal of Marine Science, p. 450-462 (2024)."
  },
  {
    id: 5,
    title: "Monitoramento Preditivo de Subestações de Energia Usando Processamento Digital de Sinais e IA",
    titleEn: "Predictive Monitoring of Power Substations Using Digital Signal Processing and AI",
    description: "Algoritmos inteligentes aplicados na análise espectral de alta frequência para detecção precoce de descargas parciais e arcos em transformadores.",
    descriptionEn: "Intelligent algorithms applied in high-frequency spectral analysis for early detection of partial discharges and arcs in transformers.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    category: "SMT",
    coordenador: "Dr. Eduardo Fagundes",
    coordenadorEn: "Dr. Eduardo Fagundes",
    inicio: "2021",
    termino: "2024",
    status: "Concluído",
    statusEn: "Completed",
    financiador: "CNPq / Concessionárias Brasileiras",
    financiadorEn: "CNPq / Brazilian Utilities",
    resumo: "Implementação de sistemas de monitoramento ativo utilizando sensores acústicos passivos e transdutores piezelétricos instalados no corpo de transformadores de potência de subestações. Técnicas de wavelets e Redes Convolucionais 1D realizam a classificação e diagnóstico automático do tipo de falha isolante.",
    resumoEn: "Implementation of active monitoring systems using passive acoustic sensors and piezoelectric transducers installed on the power transformer body. Wavelet techniques and 1D Convolutional Networks perform automatic classification and diagnosis of insulation faults.",
    resultados: "FAGUNDES, E. Partial discharge classification via continuous wavelet transform and deep learning, IEEE Transactions on Power Delivery, p. 891-898 (2023).",
    resultadosEn: "FAGUNDES, E. Partial discharge classification via continuous wavelet transform and deep learning, IEEE Transactions on Power Delivery, p. 891-898 (2023)."
  },
  {
    id: 6,
    title: "Estimação de Estado em Redes de Distribuição Inteligentes com Sensores de Baixo Custo",
    titleEn: "State Estimation in Smart Distribution Networks with Low-Cost Sensors",
    description: "Modelagem estatística e filtros de Kalman estendidos adaptados para redes elétricas de baixa tensão, superando a escassez de medições em tempo real.",
    descriptionEn: "Statistical modeling and extended Kalman filters adapted for low-voltage power grids, overcoming the shortage of real-time measurements.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    category: "SMT",
    coordenador: "Dra. Letícia Camargo",
    coordenadorEn: "Dr. Letícia Camargo",
    inicio: "2022",
    termino: "2025",
    status: "Em andamento",
    statusEn: "In progress",
    financiador: "Fundo SmartESCO P&D",
    financiadorEn: "SmartESCO R&D Fund",
    resumo: "Estratégia computacional distribuída para estimar em tempo real tensões e correntes nos nós de transformadores de distribuição. O algoritmo integra medições de smart meters domésticos e dados históricos preditivos para identificar desequilíbrios de fases e surtos térmicos.",
    resumoEn: "Distributed computational strategy to estimate voltages and currents in real time at distribution transformer nodes. The algorithm integrates measurements from household smart meters and predictive historical data to identify phase imbalances and thermal surges.",
    resultados: "CAMARGO, L. Low-cost state estimation in active distribution networks, Electric Power Systems Research, p. 301-309 (2023).",
    resultadosEn: "CAMARGO, L. Low-cost state estimation in active distribution networks, Electric Power Systems Research, p. 301-309 (2023)."
  },
  {
    id: 7,
    title: "Compressão Inteligente de Sinais de Telemetria Industrial para Redes IoT Celulares",
    titleEn: "Smart Telemetry Signal Compression for Cellular IoT Networks",
    description: "Desenvolvimento de técnicas de amostragem compressiva baseadas em dicionários redundantes para diminuir o consumo elétrico de transmissores isolados.",
    descriptionEn: "Development of compressive sensing techniques based on redundant dictionaries to decrease the power consumption of isolated transmitters.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    category: "SMT",
    coordenador: "Dr. Murilo Bastos",
    coordenadorEn: "Dr. Murilo Bastos",
    inicio: "2023",
    termino: "2025",
    status: "Em andamento",
    statusEn: "In progress",
    financiador: "FAPERJ / Ministério de Comunicações",
    financiadorEn: "FAPERJ / Ministry of Communications",
    resumo: "Redução do overhead de transmissão de pacotes de dados IoT em ambientes industriais ruidosos. Sensores operam em regime de compressão analógica de hardware, poupando bateria útil dos medidores em até 40% com altíssima taxa de reconstrução na central de controle.",
    resumoEn: "Reduction of transmission overhead of IoT data packets in noisy industrial environments. Sensors operate under analog hardware compression, saving up to 40% of meter battery life with extremely high reconstruction rate at the control center.",
    resultados: "BASTOS, M. Compressive sensing algorithm for smart grid edge telemetry, Journal of Sensor Networks, p. 122-131 (2024).",
    resultadosEn: "BASTOS, M. Compressive sensing algorithm for smart grid edge telemetry, Journal of Sensor Networks, p. 122-131 (2024)."
  },
  {
    id: 8,
    title: "Sistema de Diagnóstico Ultrassônico para Previsão de Falhas em Hidrogeradores",
    titleEn: "Ultrasonic Diagnostic System for Failure Prediction in Hydrogenerators",
    description: "Análise e decodificação acústica multicanal de vibrações de alta frequência nas pás de turbinas Kaplan para detecção precoce de cavitação destrutiva.",
    descriptionEn: "Multichannel acoustic analysis and decoding of high-frequency vibrations in Kaplan turbine blades for early detection of destructive cavitation.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    category: "SMT",
    coordenador: "Dra. Sandra Guimarães",
    coordenadorEn: "Dr. Sandra Guimarães",
    inicio: "2020",
    termino: "2023",
    status: "Concluído",
    statusEn: "Completed",
    financiador: "Petrobras / ANP",
    financiadorEn: "Petrobras / ANP",
    resumo: "Concepção de um analisador inteligente embarcado em processadores DSP dedicado a mapear as assinaturas dinâmicas das oscilações geradas pela formação e colapso de bolhas de vapor na turbina hidráulica, minimizando paradas operacionais não planejadas.",
    resumoEn: "Design of an intelligent analyzer embedded in DSP processors dedicated to mapping the dynamic signatures of oscillations generated by the formation and collapse of steam bubbles in the hydraulic turbine, minimizing unplanned operational stops.",
    resultados: "GUIMARÃES, S. Acoustic cavitation detection in hydraulic turbines using machine learning, Mechanical Systems and Signal Processing, v. 182, p. 109-117 (2023).",
    resultadosEn: "GUIMARÃES, S. Acoustic cavitation detection in hydraulic turbines using machine learning, Mechanical Systems and Signal Processing, v. 182, p. 109-117 (2023)."
  },
  {
    id: 9,
    title: "Robô Autónomo de Inspeção e Varredura Térmica para Subestações Isoladas",
    titleEn: "Autonomous Thermal Scanning and Inspection Robot for Isolated Substations",
    description: "Design mecânico e sistemas de IA de navegação para robô de campo capaz de monitorar pontos quentes em conectores energizados de subestações de transmissão.",
    descriptionEn: "Mechanical design and AI navigation systems for a field robot capable of monitoring hot spots in energized transmission substation connectors.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    category: "LEAD",
    coordenador: "Dr. Ramon Romankevicius Costa",
    coordenadorEn: "Dr. Ramon Romankevicius Costa",
    inicio: "2021",
    termino: "2024",
    status: "Em andamento",
    statusEn: "In progress",
    financiador: "Fundo Especial de Tecnologia e ANP",
    financiadorEn: "Special Fund for Technology and ANP",
    resumo: "Criação de um veículo terrestre autônomo (UGV) blindado contra radiação eletromagnética, equipado com câmeras infravermelhas de calibração radiométrica. O robô navega de forma automatizada por rotas pré-estabelecidas e executa análises térmicas locais em tempo real.",
    resumoEn: "Creation of an autonomous ground vehicle (UGV) shielded against electromagnetic radiation, equipped with infrared cameras for radiometric calibration. The robot navigates automatically along pre-established routes and performs local thermal analysis in real-time.",
    resultados: "COSTA, R. R. Autonomous thermal scanning robot for active substation environments, Robotics and Industrial Automation Systems, v. 8, p. 320-331 (2023).",
    resultadosEn: "COSTA, R. R. Autonomous thermal scanning robot for active substation environments, Robotics and Industrial Automation Systems, v. 8, p. 320-331 (2023)."
  },
  {
    id: 10,
    title: "Visão Computacional no Edge AI para Auditoria e Detecção de Vazamentos Térmicos",
    titleEn: "Computer Vision on Edge AI for Auditing and Thermal Leak Detection",
    description: "Sistemas embarcados em câmeras termográficas inteligentes para identificação em tempo real de fissuras e perda de eficiência térmica em dutos de vapor.",
    descriptionEn: "Embedded systems in smart thermographic cameras for real-time identification of cracks and thermal efficiency loss in steam pipes.",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80",
    category: "LEAD",
    coordenador: "Dr. Marcos Félix",
    coordenadorEn: "Dr. Marcos Félix",
    inicio: "2022",
    termino: "2025",
    status: "Em andamento",
    statusEn: "In progress",
    financiador: "SmartESCO P&D e Finep",
    financiadorEn: "SmartESCO R&D and Finep",
    resumo: "Desenvolvimento de aceleradores de redes convolucionais profundas (YOLOv8 adaptada) para processadores de borda de baixíssimo consumo energético. O dispositivo detecta gradientes anormais de temperatura em superfícies metálicas isoladas termicamente e envia alarmes via rede LoraWAN.",
    resumoEn: "Development of deep convolutional network accelerators (adapted YOLOv8) for low-power edge processors. The device detects abnormal temperature gradients on thermally insulated metal surfaces and sends alarms via LoRA network.",
    resultados: "FÉLIX, M. Embedded thermal computer vision in pipe infrastructure auditing, Energy Efficiency Research Conference, p. 14-22 (2024).",
    resultadosEn: "FÉLIX, M. Embedded thermal computer vision in pipe infrastructure auditing, Energy Efficiency Research Conference, p. 14-22 (2024)."
  },
  {
    id: 11,
    title: "Sistema Robótico Autónomo para Limpeza e Otimização de Parques Solares Fotovoltaicos",
    titleEn: "Autonomous Robotic System for Solar Farm Cleaning and Optimization",
    description: "Veículo rastreador robótico autônomo de limpeza a seco com otimização preditiva baseada no índice de sujidade da superfície dos painéis.",
    descriptionEn: "Dry-cleaning autonomous robotic tracker vehicle with predictive optimization based on solar panel surface soiling index.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    category: "LEAD",
    coordenador: "Dra. Beatriz Santos",
    coordenadorEn: "Dr. Beatriz Santos",
    inicio: "2022",
    termino: "2024",
    status: "Concluído",
    statusEn: "Completed",
    financiador: "Investidores do Setor Fotovoltaico",
    financiadorEn: "Solar Sector Investors",
    resumo: "Protótipo e testes práticos de um robô inteligente leve que corre sobre as fileiras de módulos solares limpando poeira e detritos orgânicos sem utilização de água. O agendamento da limpeza é acionado por sensores inteligentes de irradiância local e cálculo do rendimento energético.",
    resumoEn: "Prototype and practical tests of a lightweight smart robot that runs along solar module rows cleaning dust and organic debris without water. Cleaning scheduling is triggered by local irradiance smart sensors and energy yield calculations.",
    resultados: "SANTOS, B. Soiling loss minimization in solar plants using autonomous dry cleaning bots, Solar Energy Materials & Solar Cells, v. 235, p. 77-88 (2023).",
    resultadosEn: "SANTOS, B. Soiling loss minimization in solar plants using autonomous dry cleaning bots, Solar Energy Materials & Solar Cells, v. 235, p. 77-88 (2023)."
  },
  {
    id: 12,
    title: "Sensores IoT de Ultra-Baixo Consumo com Energy Harvesting para Auditoria Elétrica",
    titleEn: "Ultra-Low Power IoT Sensors with Energy Harvesting for Electrical Auditing",
    description: "Sensores não intrusivos montados diretamente na fiação de motores elétricos que capturam energia dos campos eletromagnéticos dispersos.",
    descriptionEn: "Non-intrusive sensors mounted directly on electric motor wiring that harvest energy from stray electromagnetic fields.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    category: "LEAD",
    coordenador: "Dr. Júlio Cesar Pinto",
    coordenadorEn: "Dr. Júlio Cesar Pinto",
    inicio: "2023",
    termino: "2026",
    status: "Em andamento",
    statusEn: "In progress",
    financiador: "Fundo Verde SmartESCO",
    financiadorEn: "SmartESCO Green Fund",
    resumo: "Projeto focado em capturar energia parasita de motores industriais e painéis de iluminação de modo a alimentar eternamente microcontroladores e chips de transmissão de telemetria sem a necessidade de substituição manual de baterias descartáveis.",
    resumoEn: "Project focused on capturing parasitic energy from industrial motors and lighting panels to perpetually power microcontrollers and telemetry transmission chips, eliminating the need for manual battery replacement.",
    resultados: "PINTO, J. C. Self-powered non-intrusive current monitor using electromagnetic harvesting, IEEE Sensors Journal, p. 410-418 (2024).",
    resultadosEn: "PINTO, J. C. Self-powered non-intrusive current monitor using electromagnetic harvesting, IEEE Sensors Journal, p. 410-418 (2024)."
  },
  {
    id: 13,
    title: "Previsão Climatológica com Alta Resolução Espacial Baseada em Computação de Alto Desempenho",
    titleEn: "Weather Forecasting with High Spatial Resolution Based on High-Performance Computing",
    description: "Algoritmos paralelos e simulação física local para estimativa fina da incidência de ventos e radiação solar na escala de bairros urbanos.",
    descriptionEn: "Parallel algorithms and local physical simulation for fine estimation of wind incidence and solar radiation at the city neighborhood scale.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    category: "NACAD",
    coordenador: "Dra. Regina Célia",
    coordenadorEn: "Dr. Regina Célia",
    inicio: "2021",
    termino: "2024",
    status: "Concluído",
    statusEn: "Completed",
    financiador: "Fundo FAPERJ de Alta Tecnologia",
    financiadorEn: "FAPERJ High Tech Fund",
    resumo: "Uso do supercomputador local para rodar modelos de previsão numérica de tempo WRF em altíssima resolução. O sistema gera matrizes horárias ultra precisas de vento e irradiação solar que subsidiam as previsões de despacho energético das plantas integradas.",
    resumoEn: "Use of the local supercomputer to run WRF numerical weather prediction models in extremely high resolution. The system generates precise hourly wind and solar irradiation matrices that support energy dispatch forecasts for integrated plants.",
    resultados: "CÉLIA, R. Ultra-high resolution local wind forecasting on massive GPU clusters, Supercomputing Applications Conference, p. 55-64 (2023).",
    resultadosEn: "CÉLIA, R. Ultra-high resolution local wind forecasting on massive GPU clusters, Supercomputing Applications Conference, p. 55-64 (2023)."
  },
  {
    id: 14,
    title: "Simulação de Dinâmica de Fluidos Computacional para Otimização de Turbinas Hidráulicas",
    titleEn: "Computational Fluid Dynamics Simulation for Hydraulic Turbine Optimization",
    description: "Modelagem matemática massivamente paralela para minimizar perda de carga e turbulência nas tubulações de captação de Pequenas Centrais Hidrelétricas.",
    descriptionEn: "Massively parallel mathematical modeling to minimize pressure loss and turbulence in Small Hydroelectric Plant intake pipes.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f311?auto=format&fit=crop&w=800&q=80",
    category: "NACAD",
    coordenador: "Dr. Rodrigo Almeida",
    coordenadorEn: "Dr. Rodrigo Almeida",
    inicio: "2022",
    termino: "2025",
    status: "Em andamento",
    statusEn: "In progress",
    financiador: "Consórcio de PCHs da Região Sudeste",
    financiadorEn: "Southeast Region SHP Consortium",
    resumo: "Estudo dinâmico do comportamento de fluidos complexos em canais hidroenergéticos usando volumes finitos distribuídos em aglomerados de servidores de alta capacidade de processamento, mitigando o desgaste abrasivo de rotores hidráulicos.",
    resumoEn: "Dynamic study of complex fluid behavior in hydroenergy channels using finite volumes distributed across high-capacity server clusters, mitigating abrasive wear of hydraulic rotors.",
    resultados: "ALMEIDA, R. Parallel CFD simulations for optimizing head loss in mini hydro systems, Computational Physics Research, p. 110-121 (2024).",
    resultadosEn: "ALMEIDA, R. Parallel CFD simulations for optimizing head loss in mini hydro systems, Computational Physics Research, p. 110-121 (2024)."
  },
  {
    id: 15,
    title: "Modelagem Preditiva Multiescala para Mitigação de Inundações e Gestão de Reservatórios",
    titleEn: "Multiscale Predictive Modeling for Flood Mitigation and Reservoir Management",
    description: "Algoritmos hidráulicos de alto desempenho integrados com modelos de Inteligência Artificial para gestão ótima de efluentes e recursos hídricos.",
    descriptionEn: "High-performance hydraulic algorithms integrated with Artificial Intelligence models for optimal management of effluents and water resources.",
    image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=800&q=80",
    category: "LAMCE",
    coordenador: "Prof. Alberto Nogueira",
    coordenadorEn: "Prof. Alberto Nogueira",
    inicio: "2021",
    termino: "2024",
    status: "Concluído",
    statusEn: "Completed",
    financiador: "Fundo Nacional de Saneamento e Recursos Hídricos",
    financiadorEn: "National Sanitation and Water Resources Fund",
    resumo: "Criação de um núcleo de simulação geofísica acoplado a dados telemétricos de satélite em tempo real, permitindo prever a vazão e escoamento superficial de grandes bacias com antecedência útil para acionamento de comportas inteligentes.",
    resumoEn: "Creation of a geophysical simulation core coupled with real-time satellite telemetry data, allowing forecast of large basin flow and runoff with useful advance warning for smart gate operations.",
    resultados: "NOGUEIRA, A. Real-time satellite-driven hydrological forecasts using massive computing, Earth Sciences & Tech Journal, v. 34, p. 112-123 (2023).",
    resultadosEn: "NOGUEIRA, A. Real-time satellite-driven hydrological forecasts using massive computing, Earth Sciences & Tech Journal, v. 34, p. 112-123 (2023)."
  },
  {
    id: 16,
    title: "Otimização Estocástica Preditiva para Despacho de Baterias em Sistemas Híbridos Industriais",
    titleEn: "Stochastic Predictive Optimization for Battery Dispatch in Industrial Hybrid Systems",
    description: "Desenvolvimento de algoritmos matemáticos paralelos para decisão em tempo real sobre o armazenamento de energia em baterias de lítio.",
    descriptionEn: "Development of parallel mathematical algorithms for real-time decisions on lithium battery energy storage.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    category: "NACAD",
    coordenador: "Dr. Gustavo Nogueira",
    coordenadorEn: "Dr. Gustavo Nogueira",
    inicio: "2023",
    termino: "2026",
    status: "Em andamento",
    statusEn: "In progress",
    financiador: "SmartESCO Tech",
    financiadorEn: "SmartESCO Tech",
    resumo: "Redução do custo tarifário sob o regime de horário de ponta para indústrias manufatureiras. O algoritmo calcula no cluster de alta performance a curva de carregamento e descarga das baterias de modo a suavizar a curva de demanda elétrica contratada.",
    resumoEn: "Reduction of tariff costs under peak hour pricing regimes for manufacturing industries. The algorithm calculates battery charge and discharge curves on the high-performance cluster to smooth the contracted electricity demand curve.",
    resultados: "NOGUEIRA, G. Stochastic optimization of industrial battery storage dispatch under complex tariffs, Energy Economics and Policy, p. 200-211 (2024).",
    resultadosEn: "NOGUEIRA, G. Stochastic optimization of industrial battery storage dispatch under complex tariffs, Energy Economics and Policy, p. 200-211 (2024)."
  },
  {
    id: 17,
    title: "Desenvolvimento de Sistemas Inteligentes de Geração de Energia a partir das Ondas do Mar (Undimotriz)",
    titleEn: "Development of Intelligent Power Generation Systems from Sea Waves (Wave Energy)",
    description: "Projetos de controle digital e regulação ativa de bombas hidráulicas de alta pressão para maximizar o aproveitamento da energia das marés.",
    descriptionEn: "Digital control designs and active regulation of high-pressure hydraulic pumps to maximize tidal energy harvesting.",
    image: "https://images.unsplash.com/photo-1506220926022-cc5c17ab7edd?auto=format&fit=crop&w=800&q=80",
    category: "LAMCE",
    coordenador: "Dra. Patrícia Diniz",
    coordenadorEn: "Dr. Patrícia Diniz",
    inicio: "2022",
    termino: "2025",
    status: "Em andamento",
    statusEn: "In progress",
    financiador: "CNPq / Global Wave Energy",
    financiadorEn: "CNPq / Global Wave Energy",
    resumo: "Modelagem hidrodinâmica e controle linear ótimo de conversores mecânicos de energia undimotriz instalados no litoral brasileiro. A tecnologia converte o balanço das ondas costeiras em eletricidade limpa constante.",
    resumoEn: "Hydrodynamic modeling and optimal linear control of wave energy mechanical converters installed on the Brazilian coast. The technology converts coastal wave sway into constant clean electricity.",
    resultados: "DINIZ, P. Active control of wave energy converters under irregular sea states, Ocean Engineering Reviews, p. 340-349 (2023).",
    resultadosEn: "DINIZ, P. Active control of wave energy converters under irregular sea states, Ocean Engineering Reviews, p. 340-349 (2023)."
  },
  {
    id: 18,
    title: "Modelagem Preditiva de Climatização Passiva e Geotérmica de Baixo Carbono para Prédios Urbanos",
    titleEn: "Predictive Modeling of Low-Carbon Passive and Geothermal Cooling for Urban Buildings",
    description: "Análise térmica tridimensional de troca de calor com solo subterrâneo profunda para reduzir dependência de chillers mecânicos em edifícios.",
    descriptionEn: "Three-dimensional thermal analysis of deep ground heat exchange to reduce reliance on mechanical chillers in buildings.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    category: "LAMCE",
    coordenador: "Dr. André Mello",
    coordenadorEn: "Dr. André Mello",
    inicio: "2020",
    termino: "2023",
    status: "Concluído",
    statusEn: "Completed",
    financiador: "Finep / SmartESCO Green",
    financiadorEn: "Finep / SmartESCO Green",
    resumo: "Planejamento e ensaio de trocadores térmicos enterrados (Ground Source Heat Pumps - GSHP) integrados a estruturas de fundação de novos empreendimentos comerciais urbanos, proporcionando economias anuais de climatização que chegam a 55%.",
    resumoEn: "Planning and testing of Ground Source Heat Pumps (GSHP) integrated into new commercial urban building foundation structures, providing annual cooling energy savings of up to 55%.",
    resultados: "MELLO, A. Geothermal cooling potential in high-density urban spaces, Building and Environment, v. 210, p. 89-98 (2023).",
    resultadosEn: "MELLO, A. Geothermal cooling potential in high-density urban spaces, Building and Environment, v. 210, p. 89-98 (2023)."
  }
];

const categories = ["Todos", "LADES", "LAMCE", "SMT", "LEAD", "NACAD"];

const Projetos = () => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProjects = activeCategory === "Todos" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = document.querySelectorAll('.animate-slide');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [activeCategory]);

  return (
    <div className="projetos-page">
      <section className="hero">
        <div className="container animate-slide">
          <h1>{t('proj_hero_title')}</h1>
          <p>{t('proj_hero_desc')}</p>
        </div>
      </section>

      <section className="section container">
        {/* Category Filters */}
        <div className="portfolio-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "Todos" ? (language === "PT" ? "Todos" : "All") : cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid animate-slide">
          {filteredProjects.map((project) => {
            const projectTitle = language === 'PT' ? project.title : project.titleEn;
            const projectDesc = language === 'PT' ? project.description : project.descriptionEn;
            return (
              <div key={project.id} className="portfolio-box-col">
                <Link to={`/projetos/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <article className="portfolio-box-item">
                    <div className="portfolio-box-thumbnail">
                      <img 
                        loading="lazy" 
                        src={project.image} 
                        alt={projectTitle}
                        className="portfolio-box-img"
                      />
                      <div className="portfolio-box-category">{project.category}</div>
                    </div>
                    <div className="portfolio-box-content">
                      <h3 className="portfolio-box-title">{projectTitle}</h3>
                      <p className="portfolio-box-desc">{projectDesc}</p>
                      <span className="portfolio-box-link">{t('proj_btn_details')} &rarr;</span>
                    </div>
                  </article>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section container cta-section-dark" style={{marginBottom: '20px'}}>
        <div className="cta-content">
          <h2>{t('proj_cta_title')}</h2>
          <p>{t('proj_cta_desc')}</p>
          <Link to="/contato" className="btn btn-primary">{t('proj_cta_btn')}</Link>
        </div>
      </section>
    </div>
  );
};

export default Projetos;
