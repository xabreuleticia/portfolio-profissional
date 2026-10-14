// Personalize este arquivo para adicionar suas fotos e legendas.
// Coloque imagens em public/images/mapa-pessoal/ e use, por exemplo:
// src: "/images/mapa-pessoal/orlando-castelo.jpg"
// Mantenha src: "" até escolher uma fotografia. O espaço reservado continuará visível.
// Edite os textos pt e en para manter a experiência bilíngue.

export const mapaPessoalCapa = {
  src: "",
  alt: { pt: "", en: "" },
  pt: {
    kicker: "CADERNO VISUAL · VIAGENS & MEMÓRIAS",
    titulo: "Um pouco de mundo,",
    destaque: "um pouco de mim.",
    intro: "Lugares que conheci, detalhes que guardei e interesses que também contam a minha história.",
    dica: "Adicione aqui sua foto de capa",
    legenda: "Um arquivo visual de lugares, descobertas e momentos.",
    comecar: "Entrar neste mundo",
  },
  en: {
    kicker: "VISUAL JOURNAL · TRAVEL & MEMORIES",
    titulo: "A little more world,",
    destaque: "a little more me.",
    intro: "Places I have visited, details I kept, and interests that are part of my story, too.",
    dica: "Add your cover photo here",
    legenda: "A visual collection of places, discoveries, and moments.",
    comecar: "Step into this world",
  },
}

function criarFotos(id, nomePt, nomeEn) {
  return [
    {
      id: `${id}-principal`,
      src: "",
      alt: { pt: "", en: "" },
      pt: {
        tipo: "FOTO DE DESTAQUE",
        local: nomePt,
        dica: `Adicione uma foto de destaque de ${nomePt}.`,
        legenda: "Escreva aqui uma legenda curta para esta fotografia.",
      },
      en: {
        tipo: "FEATURED PHOTOGRAPH",
        local: nomeEn,
        dica: `Add a featured photograph of ${nomeEn}.`,
        legenda: "Write a short caption for this photograph.",
      },
    },
    {
      id: `${id}-detalhe`,
      src: "",
      alt: { pt: "", en: "" },
      pt: {
        tipo: "UM DETALHE",
        local: nomePt,
        dica: "Escolha um segundo enquadramento, uma paisagem ou um detalhe do lugar.",
        legenda: "Troque por uma memória ou observação sua.",
      },
      en: {
        tipo: "A DETAIL",
        local: nomeEn,
        dica: "Choose another angle, a landscape, or a detail of the place.",
        legenda: "Replace this with your own memory or observation.",
      },
    },
    {
      id: `${id}-memoria`,
      src: "",
      alt: { pt: "", en: "" },
      pt: {
        tipo: "OUTRO REGISTRO",
        local: nomePt,
        dica: "Reserve este espaço para outra foto que complete a história.",
        legenda: "Adicione uma legenda quando escolher a imagem.",
      },
      en: {
        tipo: "ANOTHER MOMENT",
        local: nomeEn,
        dica: "Save this space for another photo that completes the story.",
        legenda: "Add a caption after choosing the image.",
      },
    },
  ]
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
    complementoPt: "",
    resumoPt: "Outro destino para registrar nesta coleção de viagens.",
    detalhePt: "Espaço para fotografias de ruas, arquitetura e atrações escolhidas por você.",
    regiaoEn: "UNITED STATES",
    nomeEn: "New York",
    complementoEn: "",
    resumoEn: "Another destination in this collection of travels.",
    detalheEn: "A space for photographs of streets, architecture, and attractions you choose.",
  }),
  criarDestino({
    id: "florianopolis",
    regiaoPt: "SANTA CATARINA · BRASIL",
    nomePt: "Florianópolis",
    complementoPt: "",
    resumoPt: "Um espaço para guardar registros de Florianópolis.",
    detalhePt: "Adicione uma paisagem, um ponto visitado ou uma fotografia que represente o destino.",
    regiaoEn: "SANTA CATARINA · BRAZIL",
    nomeEn: "Florianópolis",
    complementoEn: "",
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
    complementoPt: "",
    resumoPt: "Um espaço para reunir fotografias de Curitiba.",
    detalhePt: "Escolha os pontos, a arquitetura ou os detalhes que você quiser recordar.",
    regiaoEn: "PARANÁ · BRAZIL",
    nomeEn: "Curitiba",
    complementoEn: "",
    resumoEn: "A space to collect photographs from Curitiba.",
    detalheEn: "Choose the places, architecture, or details you want to remember.",
  }),
  criarDestino({
    id: "sao-paulo",
    regiaoPt: "SÃO PAULO · BRASIL",
    nomePt: "São Paulo",
    complementoPt: "",
    resumoPt: "Um espaço para reunir fotografias de São Paulo.",
    detalhePt: "Escolha paisagens urbanas, arquitetura ou algum lugar que queira destacar.",
    regiaoEn: "SÃO PAULO · BRAZIL",
    nomeEn: "São Paulo",
    complementoEn: "",
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
    complementoPt: "",
    resumoPt: "Um espaço para registrar imagens de Foz do Iguaçu.",
    detalhePt: "Escolha uma vista ou atração e complete a legenda com suas próprias palavras.",
    regiaoEn: "PARANÁ · BRAZIL",
    nomeEn: "Foz do Iguaçu",
    complementoEn: "",
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
  criarHobby("hobby-01", "Um hobby meu", "One of my hobbies"),
  criarHobby("hobby-02", "Outro interesse", "Another interest"),
  criarHobby("hobby-03", "Mais uma descoberta", "One more discovery"),
]
