// Personalize este arquivo para adicionar suas fotos e legendas.
// Coloque imagens em public/images/mapa-pessoal/ e use, por exemplo:
// src: "/images/mapa-pessoal/orlando-castelo.jpg"
// Mantenha src: "" até escolher uma fotografia. O espaço reservado continuará visível.
// Edite os textos pt e en para manter a experiência bilíngue.

export const mapaPessoalCapa = {
  // Troque por uma foto horizontal/landscape para ser a capa do álbum.
  src: "",
  alt: { pt: "Capa do álbum de recordações", en: "Memory album cover" },
  pt: {
    titulo: "Memórias",
    destaque: "para guardar",
    comecar: "Abrir álbum",
  },
  en: {
    titulo: "Memories",
    destaque: "to keep",
    comecar: "Open album",
  },
}

// Para personalizar cada Polaroid, altere `src`, `pt.local`, `pt.data`,
// `en.local` e `en.data`. Imagens devem ficar em public/images/mapa-pessoal/.
function criarFotos(id, nomePt, nomeEn) {
  // Seis espaços iniciais por destino; acrescente/remova objetos conforme seu álbum.
  // O componente cria automaticamente novas páginas para coleções maiores.
  return Array.from({ length: 6 }, (_, index) => ({
    id: `${id}-foto-${index + 1}`,
    src: "",
    alt: { pt: "", en: "" },
    pt: { local: nomePt, data: "" },
    en: { local: nomeEn, data: "" },
  }))
}

function criarDestino({
  id,
  regiaoPt,
  nomePt,
  complementoPt = "",
  resumoPt,
  detalhePt,
  regiaoEn,
  nomeEn,
  complementoEn = "",
  resumoEn,
  detalheEn,
}) {
  return {
    id,
    pt: {
      regiao: regiaoPt,
      nome: nomePt,
      complemento: complementoPt,
      resumo: resumoPt,
      detalhe: detalhePt,
    },
    en: {
      regiao: regiaoEn,
      nome: nomeEn,
      complemento: complementoEn,
      resumo: resumoEn,
      detalhe: detalheEn,
    },
    fotos: criarFotos(id, `${nomePt} ${complementoPt}`.trim(), `${nomeEn} ${complementoEn}`.trim()),
  }
}

// Os textos são intencionalmente genéricos onde ainda não foram escolhidas memórias.
export const mapaPessoalDestinos = [
  criarDestino({
    id: "orlando",
    regiaoPt: "FLÓRIDA · ESTADOS UNIDOS",
    nomePt: "Orlando",
    complementoPt: "& Disney",
    resumoPt: "Parte da viagem de comemoração dos meus 15 anos.",
    detalhePt: "Um espaço para reunir atrações, cenários e detalhes que você escolher recordar.",
    regiaoEn: "FLORIDA · UNITED STATES",
    nomeEn: "Orlando",
    complementoEn: "& Disney",
    resumoEn: "Part of the trip to celebrate my 15th birthday.",
    detalheEn: "A space for attractions, scenery, and details you choose to remember.",
  }),
  criarDestino({
    id: "nova-york",
    regiaoPt: "ESTADOS UNIDOS",
    nomePt: "Nova York",
    complementoPt: "em foco",
    resumoPt: "Outro destino para registrar nesta coleção de viagens.",
    detalhePt: "Espaço para fotografias de ruas, arquitetura e atrações escolhidas por você.",
    regiaoEn: "UNITED STATES",
    nomeEn: "New York",
    complementoEn: "in focus",
    resumoEn: "Another destination in this collection of travels.",
    detalheEn: "A space for photographs of streets, architecture, and attractions you choose.",
  }),
  criarDestino({
    id: "florianopolis",
    regiaoPt: "SANTA CATARINA · BRASIL",
    nomePt: "Florianópolis",
    complementoPt: "litoral catarinense",
    resumoPt: "Um espaço para guardar registros de Florianópolis.",
    detalhePt: "Adicione uma paisagem, um ponto visitado ou uma fotografia que represente o destino.",
    regiaoEn: "SANTA CATARINA · BRAZIL",
    nomeEn: "Florianópolis",
    complementoEn: "Santa Catarina coast",
    resumoEn: "A space to keep photographs from Florianópolis.",
    detalheEn: "Add a landscape, a place you visited, or a photograph that represents the destination.",
  }),
  criarDestino({
    id: "balneario-beto-carrero",
    regiaoPt: "SANTA CATARINA · BRASIL",
    nomePt: "Balneário Camboriú",
    complementoPt: "& Beto Carrero",
    resumoPt: "Dois destinos para reunir registros de uma viagem pelo litoral catarinense.",
    detalhePt: "Use as imagens para destacar os lugares e atrações que quiser recordar.",
    regiaoEn: "SANTA CATARINA · BRAZIL",
    nomeEn: "Balneário Camboriú",
    complementoEn: "& Beto Carrero",
    resumoEn: "Two destinations to bring together photographs from Santa Catarina.",
    detalheEn: "Use the images to highlight places and attractions you want to remember.",
  }),
  criarDestino({
    id: "curitiba",
    regiaoPt: "PARANÁ · BRASIL",
    nomePt: "Curitiba",
    complementoPt: "um registro da cidade",
    resumoPt: "Um espaço para reunir fotografias de Curitiba.",
    detalhePt: "Escolha os pontos, a arquitetura ou os detalhes que você quiser recordar.",
    regiaoEn: "PARANÁ · BRAZIL",
    nomeEn: "Curitiba",
    complementoEn: "a city journal",
    resumoEn: "A space to collect photographs from Curitiba.",
    detalheEn: "Choose the places, architecture, or details you want to remember.",
  }),
  criarDestino({
    id: "sao-paulo",
    regiaoPt: "SÃO PAULO · BRASIL",
    nomePt: "São Paulo",
    complementoPt: "entre ruas e descobertas",
    resumoPt: "Um espaço para reunir fotografias de São Paulo.",
    detalhePt: "Escolha paisagens urbanas, arquitetura ou algum lugar que queira destacar.",
    regiaoEn: "SÃO PAULO · BRAZIL",
    nomeEn: "São Paulo",
    complementoEn: "streets and discoveries",
    resumoEn: "A space to collect photographs from São Paulo.",
    detalheEn: "Choose city views, architecture, or a place you want to highlight.",
  }),
  criarDestino({
    id: "arraial-cabo-frio",
    regiaoPt: "RIO DE JANEIRO · BRASIL",
    nomePt: "Arraial do Cabo",
    complementoPt: "& Cabo Frio",
    resumoPt: "Um trecho do mapa para reunir fotografias do litoral fluminense.",
    detalhePt: "Paisagens, praias ou outros registros escolhidos por você podem ocupar este espaço.",
    regiaoEn: "RIO DE JANEIRO · BRAZIL",
    nomeEn: "Arraial do Cabo",
    complementoEn: "& Cabo Frio",
    resumoEn: "A space for photographs from the coast of Rio de Janeiro state.",
    detalheEn: "Landscapes, beaches, or other photographs you choose can go here.",
  }),
  criarDestino({
    id: "foz-do-iguacu",
    regiaoPt: "PARANÁ · BRASIL",
    nomePt: "Foz do Iguaçu",
    complementoPt: "paisagens em destaque",
    resumoPt: "Um espaço para registrar imagens de Foz do Iguaçu.",
    detalhePt: "Escolha uma vista ou atração e complete a legenda com suas próprias palavras.",
    regiaoEn: "PARANÁ · BRAZIL",
    nomeEn: "Foz do Iguaçu",
    complementoEn: "landscapes in focus",
    resumoEn: "A space to keep photographs from Foz do Iguaçu.",
    detalheEn: "Choose a view or attraction and complete the caption in your own words.",
  }),
]

function criarHobby(id, nomePt, nomeEn) {
  return {
    id,
    pt: {
      nome: nomePt,
      descricao: "Substitua este texto por algo que você gosta de fazer ou explorar.",
      tipo: "HOBBIES & INTERESSES",
    },
    en: {
      nome: nomeEn,
      descricao: "Replace this text with something you enjoy doing or exploring.",
      tipo: "HOBBIES & INTERESTS",
    },
    fotos: criarFotos(id, nomePt, nomeEn),
  }
}

// Espaços neutros: escolha seus hobbies e renomeie-os quando quiser.
export const mapaPessoalHobbies = [
  criarHobby("hobby-01", "Meu hobby", "My hobby"),
  criarHobby("hobby-02", "Outro hobby", "Another hobby"),
  criarHobby("hobby-03", "Outro interesse", "Another interest"),
]
