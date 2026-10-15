export const mapaPessoalCapa = {
  // Troque por uma foto horizontal/landscape para ser a capa do álbum.
  src: "/images/mapa-pessoal/foto-capa.jpeg",
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

const imagensAlbum = import.meta.glob(
  "../assets/mapa-pessoal/**/*.{jpg,jpeg,png,webp,avif}",
  {
    eager: true,
    import: "default",
  },
)

function criarFotos(id, nomePt, nomeEn) {
  const imagensDoDestino = Object.entries(imagensAlbum)
    .filter(([caminho]) => {
      const partes = caminho.split("/")
      return partes[partes.length - 2] === id
    })
    .sort(([a], [b]) =>
      a.localeCompare(b, "pt-BR", { numeric: true }),
    )

  return imagensDoDestino.map(([caminho, src]) => {
    const partes = caminho.split("/")
    const arquivo = partes[partes.length - 1]

    const legenda = legendasFotos[`${id}/${arquivo}`] || {}

    const localPt = legenda.pt?.local || nomePt
    const localEn = legenda.en?.local || nomeEn

    return {
      id: `${id}-${arquivo}`,
      src,
      alt: legenda.alt || {
        pt: `Fotografia de ${localPt}`,
        en: `Photo of ${localEn}`,
      },
      pt: {
        local: localPt,
        data: legenda.pt?.data || "",
      },
      en: {
        local: localEn,
        data: legenda.en?.data || "",
      },
    }
  })
}

const legendasFotos = {
  "balneario/beto-carreiro.jpeg": {
    alt: {
      pt: "Parque Beto Carrero World",
      en: "Beto Carrero World",
    },
    pt: {
      local: "Beto Carrero World",
      data: "2022",
    },
    en: {
      local: "Beto Carrero World",
      data: "2022",
    },
  },

  "balneario/praia1.jpeg": {
    alt: {
      pt: "praia em Balneário Camboriú",
      en: "Beach photographed during the trip",
    },
    pt: {
      local: "Praia em Balneário Camboriú",
      data: "2022",
    },
    en: {
      local: "Beach in Balneário Camboriú",
      data: "2022",
    },
  },
  "balneario/praia2.jpeg": {
    alt: {
      pt: "praia em Balneário Camboriú",
      en: "Beach photographed during the trip",
    },
    pt: {
      local: "Praia em Balneário Camboriú",
      data: "2022",
    },
    en: {
      local: "Beach in Balneário Camboriú",
      data: "2022",
    },
  },
  "balneario/praia3.jpeg": {
    alt: {
      pt: "praia em Balneário Camboriú",
      en: "Beach photographed during the trip",
    },
    pt: {
      local: "Praia em Balneário Camboriú",
      data: "2022",
    },
    en: {
      local: "Beach in Balneário Camboriú",
      data: "2022",
    },
  },
  "balneario/praia4.jpeg": {
    alt: {
      pt: "praia em Balneário Camboriú",
      en: "Beach photographed during the trip",
    },
    pt: {
      local: "Praia em Balneário Camboriú",
      data: "2022",
    },
    en: {
      local: "Beach in Balneário Camboriú",
      data: "2022",
    },
  },
  "balneario/praia5.jpeg": {
    alt: {
      pt: "praia em Balneário Camboriú",
      en: "Beach photographed during the trip",
    },
    pt: {
      local: "Praia em Balneário Camboriú",
      data: "2022",
    },
    en: {
      local: "Beach in Balneário Camboriú",
      data: "2022",
    },
  },

  "belo-horizonte/belo-horizonte.jpeg": {
    alt: {
      pt: "Belo Horizonte ",
      en: "Belo Horizonte",
    },
    pt: {
      local: "Belo Horizonte",
      data: "2026",
    },
    en: {
      local: "Belo Horizonte",
      data: "2026",
    },
  },
  "belo-horizonte/guanabara.jpeg": {
    alt: {
      pt: "Parque Guanabara em Belo Horizonte",
      en: "Guanabara Park in Belo Horizonte",
    },
    pt: {
      local: "Parque Guanabara em Belo Horizonte",
      data: "2025",
    },
    en: {
      local: "Guanabara Park in Belo Horizonte",
      data: "2025",
    },
  },
  "belo-horizonte/inhotim.jpeg": {
    alt: {
      pt: "Museu Inhotim em Brumadinho",
      en: "Inhotim Museum in Brumadinho",
    },
    pt: {
      local: "Museu Inhotim em Brumadinho",
      data: "2024",
    },
    en: {
      local: "Inhotim Museum in Brumadinho",
      data: "2024",
    },
  },
  "belo-horizonte/mirante-mangabeiras.jpeg": {
    alt: {
      pt: "Mirante das Mangabeiras em Belo Horizonte",
      en: "Mangabeiras Viewpoint in Belo Horizonte",
    },
    pt: {
      local: "Mirante das Mangabeiras em Belo Horizonte",
      data: "2025",
    },
    en: {
      local: "Mangabeiras Viewpoint in Belo Horizonte",
      data: "2025",
    },
  },
  "belo-horizonte/pampulha.jpeg": {
    alt: {
      pt: "Pampulha em Belo Horizonte",
      en: "Pampulha in Belo Horizonte",
    },
    pt: {
      local: "Pampulha em Belo Horizonte",
      data: "2025",
    },
    en: {
      local: "Pampulha in Belo Horizonte",
      data: "2025",
    },
  },
  "belo-horizonte/parque-municipal.jpeg": {
    alt: {
      pt: "Parque Municipal em Belo Horizonte",
      en: "Municipal Park in Belo Horizonte",
    },
    pt: {
      local: "Parque Municipal emBelo Horizonte",
      data: "2025",
    },
    en: {
      local: "Municipal Park in Belo Horizonte",
      data: "2025",
    },
  },
  "curitiba/jardimbotanico.jpeg": {
    alt: {
      pt: "Jardim Botânico em Curitiba",
      en: "Botanical Garden in Curitiba",
    },
    pt: {
      local: "Jardim Botânico em Curitiba",
      data: "2026",
    },
    en: {
      local: "Botanical Garden in Curitiba",
      data: "2026",
    },
  },
  "curitiba/morretes.jpeg": {
    alt: {
      pt: "Morretes",
      en: "Morretes",
    },
    pt: {
      local: "Morretes",
      data: "2026",
    },
    en: {
      local: "Morretes",
      data: "2026",
    },
  },
  "curitiba/museu-olho.jpeg": {
    alt: {
      pt: "Museu do Olho em Curitiba",
      en: "Eye Museum in Curitiba",
    },
    pt: {
      local: "Museu do Olho em Curitiba",
      data: "2026",
    },
    en: {
      local: "Eye Museum in Curitiba",
      data: "2026",
    },
  },
  "curitiba/opera-arame.jpeg": {
    alt: {
      pt: "Ópera de Arame em Curitiba",
      en: "Wire Opera House in Curitiba",
    },
    pt: {
      local: "Ópera de Arame em Curitiba",
      data: "2026",
    },
    en: {
      local: "Wire Opera House in Curitiba",
      data: "2026",
    },
  },
  "curitiba/parque.jpeg": {
    alt: {
      pt: "Parque Barigui em Curitiba",
      en: "Park Barigui in Curitiba",
    },
    pt: {
      local: "Parque Barigui em Curitiba",
      data: "2026",
    },
    en: {
      local: "Park Barigui in Curitiba",
      data: "2026",
    },
  },
  "curitiba/parquetangua.jpeg": {
    alt: {
      pt: "Parque Tanguá em Curitiba",
      en: "Tanguá Park in Curitiba",
    },
    pt: {
      local: "Parque Tanguá em Curitiba",
      data: "2026",
    },
    en: {
      local: "Tanguá Park in Curitiba",
      data: "2026",
    },
  },
  "espirito-santo/guarapari.jpeg": {
    alt: {
      pt: "Praia em Guarapari",
      en: "Beach in Guarapari",
    },
    pt: {
      local: "Praia em Guarapari",
      data: "2026",
    },
    en: {
      local: "Beach in Guarapari",
      data: "2026",
    },
  },
  "espirito-santo/itaoca.jpeg": {
    alt: {
      pt: "Praia de Itaoca",
      en: "Beach in Itaoca",
    },
    pt: {
      local: "Praia de Itaoca",
      data: "2026",
    },
    en: {
      local: "Beach in Itaoca",
      data: "2026",
    },
  },
  "espirito-santo/praia.jpeg": {
    alt: {
      pt: "Praia no Espírito Santo",
      en: "Beach in Espírito Santo",
    },
    pt: {
      local: "Praia no Espírito Santo",
      data: "2026",
    },
    en: {
      local: "Beach in Espírito Santo",
      data: "2026",
    },
  },
  "espirito-santo/praia1.jpeg": {
    alt: {
      pt: "Praia no Espírito Santo",
      en: "Beach in Espírito Santo",
    },
    pt: {
      local: "Praia no Espírito Santo",
      data: "2026",
    },
    en: {
      local: "Beach in Espírito Santo",
      data: "2026",
    },
  },
  "espirito-santo/praia2.jpeg": {
    alt: {
      pt: "Praia no Espírito Santo",
      en: "Beach in Espírito Santo",
    },
    pt: {
      local: "Praia no Espírito Santo",
      data: "2026",
    },
    en: {
      local: "Beach in Espírito Santo",
      data: "2026",
    },
  },
  "espirito-santo/praia4.jpeg": {
    alt: {
      pt: "Praia no Espírito Santo",
      en: "Beach in Espírito Santo",
    },
    pt: {
      local: "Praia no Espírito Santo",
      data: "2026",
    },
    en: {
      local: "Beach in Espírito Santo",
      data: "2026",
    },
  },
  "espirito-santo/praia3.jpeg": {
    alt: {
      pt: "Ano novo na praia no Espírito Santo",
      en: "New Year at the beach in Espírito Santo",
    },
    pt: {
      local: "Ano novo na praia no Espírito Santo",
      data: "2026",
    },
    en: {
      local: "New Year at the beach in Espírito Santo",
      data: "2026",
    },
  },
  "foz-do-iguacu/cataratas1.jpeg": {
    alt: {
      pt: "Cataratas do Iguaçu",
      en: "Iguazu Falls",
    },
    pt: {
      local: "Cataratas do Iguaçu",
      data: "2018",
    },
    en: {
      local: "Iguazu Falls",
      data: "2018",
    },
  },
  "foz-do-iguacu/cataratas2.jpeg": {
    alt: {
      pt: "Cataratas do Iguaçu",
      en: "Iguazu Falls",
    },
    pt: {
      local: "Cataratas do Iguaçu",
      data: "2018",
    },
    en: {
      local: "Iguazu Falls",
      data: "2018",
    },
  },
  "foz-do-iguacu/cataratas3.jpeg": {
    alt: {
      pt: "Cataratas do Iguaçu",
      en: "Iguazu Falls",
    },
    pt: {
      local: "Cataratas do Iguaçu",
      data: "2018",
    },
    en: {
      local: "Iguazu Falls",
      data: "2018",
    },
  },
  "foz-do-iguacu/cataratas4.jpeg": {
    alt: {
      pt: "Cataratas do Iguaçu",
      en: "Iguazu Falls",
    },
    pt: {
      local: "Cataratas do Iguaçu",
      data: "2018",
    },
    en: {
      local: "Iguazu Falls",
      data: "2018",
    },
  },
  "foz-do-iguacu/usina.jpeg": {
    alt: {
      pt: "Usina de Itaipu em Foz do Iguaçu",
      en: "Itaipu Dam in Foz do Iguaçu",
    },
    pt: {
      local: "Usina de Itaipu em Foz do Iguaçu",
      data: "2018",
    },
    en: {
      local: "Itaipu Dam in Foz do Iguaçu",
      data: "2018",
    },
  },
  "hobby/cozinhar.jpeg": {
    alt: {
      pt: "Cozinhando",
      en: "Cooking",
    },
    pt: {
      local: "Cozinhando",
      data: "2026",
    },
    en: {
      local: "Cooking",
      data: "2026",
    },
  },
  "hobby/cozinhar2.jpeg": {
    alt: {
      pt: "Cozinhando",
      en: "Cooking",
    },
    pt: {
      local: "Cozinhando",
      data: "2026",
    },
    en: {
      local: "Cooking",
      data: "2026",
    },
  },
  "hobby/danca.jpeg": {
    alt: {
      pt: "Dança",
      en: "Dancing",
    },
    pt: {
      local: "Dança",
      data: "2024",
    },
    en: {
      local: "Dancing",
      data: "2024",
    },
  },
  "hobby/louvor.jpeg": {
    alt: {
      pt: "Louvor",
      en: "Worship",
    },
    pt: {
      local: "Louvor",
      data: "2025",
    },
    en: {
      local: "Worship",
      data: "2025",
    },
  },
  "hobby/musica.jpeg": {
    alt: {
      pt: "Música",
      en: "Music",
    },
    pt: {
      local: "Música",
      data: "2026",
    },
    en: {
      local: "Music",
      data: "2026",
    },
  },
  "hobby/volei.jpeg": {
    alt: {
      pt: "Vôlei",
      en: "Volleyball",
    },
    pt: {
      local: "Vôlei",
      data: "2026",
    },
    en: {
      local: "Volleyball",
      data: "2026",
    },
  },
  "nova-york/central-park.jpeg": {
    alt: {
      pt: "Parque Central",
      en: "Central Park",
    },
    pt: {
      local: "Central Park em Nova Iorque",
      data: "2024",
    },
    en: {
      local: "Central Park in New York",
      data: "2024",
    },
  },
  "nova-york/igreja.jpeg": {
    alt: {
      pt: "Igreja de Nova Iorque",
      en: "Church of New York",
    },
    pt: {
      local: "catedral de São Patrício em Nova Iorque",
      data: "2024",
    },
    en: {
      local: "St. Patrick's Cathedral in New York",
      data: "2024",
    },
  },
  "nova-york/nova-iorque.jpeg": {
    alt: {
      pt: "Nova Iorque",
      en: "New York",
    },
    pt: {
      local: "Nova Iorque",
      data: "2024",
    },
    en: {
      local: "New York",
      data: "2024",
    },
  },
  "nova-york/nova-iorque2.jpeg": {
    alt: {
      pt: "Nova Iorque",
      en: "New York",
    },
    pt: {
      local: "Nova Iorque",
      data: "2024",
    },
    en: {
      local: "New York",
      data: "2024",
    },
  },
  "nova-york/nova-iorque3.jpeg": {
    alt: {
      pt: "Nova Iorque",
      en: "New York",
    },
    pt: {
      local: "Nova Iorque",
      data: "2024",
    },
    en: {
      local: "New York",
      data: "2024",
    },
  },
  "nova-york/nova-iorque4.jpeg": {
    alt: {
      pt: "Nova Iorque",
      en: "New York",
    },
    pt: {
      local: "Nova Iorque",
      data: "2024",
    },
    en: {
      local: "New York",
      data: "2024",
    },
  },
  "orlando/animal-kingdom.jpeg": {
    alt: {
      pt: "Animal Kingdom",
      en: "Animal Kingdom",
    },
    pt: {
      local: "Animal Kingdom em Orlando",
      data: "2024",
    },
    en: {
      local: "Animal Kingdom in Orlando",
      data: "2024",
    },
  },
  "orlando/epcot.jpeg": {
    alt: {
      pt: "Epcot",
      en: "Epcot",
    },
    pt: {
      local: "Epcot em Orlando",
      data: "2024",
    },
    en: {
      local: "Epcot in Orlando",
      data: "2024",
    },
  },
  "orlando/hollywood-studios.jpeg": {
    alt: {
      pt: "Hollywood Studios",
      en: "Hollywood Studios",
    },
    pt: {
      local: "Hollywood Studios em Orlando",
      data: "2024",
    },
    en: {
      local: "Hollywood Studios in Orlando",
      data: "2024",
    },
  },
  "orlando/magic-kingdom.jpeg": {
    alt: {
      pt: "Magic Kingdom",
      en: "Magic Kingdom",
    },
    pt: {
      local: "Magic Kingdom em Orlando",
      data: "2024",
    },
    en: {
      local: "Magic Kingdom in Orlando",
      data: "2024",
    },
  },
  "orlando/seaworld.jpeg": {
    alt: {
      pt: "Seaworld",
      en: "Seaworld",
    },
    pt: {
      local: "Seaworld em Orlando",
      data: "2024",
    },
    en: {
      local: "Seaworld in Orlando",
      data: "2024",
    },
  },
  "orlando/universal.jpeg": {
    alt: {
      pt: "Universal Studios",
      en: "Universal Studios",
    },
    pt: {
      local: "Universal Studios em Orlando",
      data: "2024",
    },
    en: {
      local: "Universal Studios in Orlando",
      data: "2024",
    },
  },
  "ouro-preto/mina.jpeg": {
    alt: {
      pt: "Mina em Ouro Preto",
      en: "Mine in Ouro Preto",
    },
    pt: {
      local: "Mina em Ouro Preto",
      data: "2025",
    },
    en: {
      local: "Mine in Ouro Preto",
      data: "2025",
    },
  },
  "ouro-preto/ouropreto.jpeg": {
    alt: {
      pt: "Ouro Preto",
      en: "Ouro Preto",
    },
    pt: {
      local: "Ouro Preto",
      data: "2025",
    },
    en: {
      local: "Ouro Preto",
      data: "2025",
    },
  },
  "ouro-preto/ouropreto1.jpeg": {
    alt: {
      pt: "Ouro Preto",
      en: "Ouro Preto",
    },
    pt: {
      local: "Ouro Preto",
      data: "2025",
    },
    en: {
      local: "Ouro Preto",
      data: "2025",
    },
  },
  "ouro-preto/ouropreto2.jpeg": {
    alt: {
      pt: "Ouro Preto",
      en: "Ouro Preto",
    },
    pt: {
      local: "Ouro Preto",
      data: "2025",
    },
    en: {
      local: "Ouro Preto",
      data: "2025",
    },
  },
  "ouro-preto/ouropreto3.jpeg": {
    alt: {
      pt: "Ouro Preto",
      en: "Ouro Preto",
    },
    pt: {
      local: "Ouro Preto",
      data: "2025",
    },
    en: {
      local: "Ouro Preto",
      data: "2025",
    },
  },
  "ouro-preto/ouropreto4.jpeg": {
    alt: {
      pt: "Ouro Preto",
      en: "Ouro Preto",
    },
    pt: {
      local: "Ouro Preto",
      data: "2025",
    },
    en: {
      local: "Ouro Preto",
      data: "2025",
    },
  },
  "rio-de-janeiro/arraial-do-cabo.jpeg": {
    alt: {
      pt: "Arraial do Cabo",
      en: "Arraial do Cabo ",
    },
    pt: {
      local: "Arraial do Cabo",
      data: "2025",
    },
    en: {
      local: "Arraial do Cabo",
      data: "2025",
    },
  },
  "rio-de-janeiro/cabo-frio.jpeg": {
    alt: {
      pt: "Cabo Frio",
      en: "Cabo Frio ",
    },
    pt: {
      local: "Cabo Frio",
      data: "2025",
    },
    en: {
      local: "Cabo Frio",
      data: "2025",
    },
  },
  "rio-de-janeiro/copacabana.jpeg": {
    alt: {
      pt: "Copacabana",
      en: "Copacabana",
    },
    pt: {
      local: "Copacabana",
      data: "2022",
    },
    en: {
      local: "Copacabana",
      data: "2022",
    },
  },
  "rio-de-janeiro/rio-de-janeiro.jpeg": {
    alt: {
      pt: "Rio de Janeiro",
      en: "Rio de Janeiro",
    },
    pt: {
      local: "Rio de Janeiro",
      data: "2022",
    },
    en: {
      local: "Rio de Janeiro",
      data: "2022",
    },
  },
  "rio-de-janeiro/rio-de-janeiro2.jpeg": {
    alt: {
      pt: "Rio de Janeiro",
      en: "Rio de Janeiro",
    },
    pt: {
      local: "Rio de Janeiro",
      data: "2022",
    },
    en: {
      local: "Rio de Janeiro",
      data: "2022",
    },
  },
  "sao-paulo/ibirapuera.jpeg": {
    alt: {
      pt: "Parque Ibirapuera",
      en: "Ibirapuera",
    },
    pt: {
      local: "Parque Ibirapuera",
      data: "2026",
    },
    en: {
      local: "Ibirapuera",
      data: "2026",
    },
  },
  "sao-paulo/masp.jpeg": {
    alt: {
      pt: "Museu de Arte de São Paulo",
      en: "São Paulo Museum of Art",
    },
    pt: {
      local: "Museu de Arte de São Paulo",
      data: "2026",
    },
    en: {
      local: "São Paulo Museum of Art",
      data: "2026",
    },
  },
  "sao-paulo/museu-do-ipiranga.jpeg": {
    alt: {
      pt: "Museu do Ipiranga",
      en: "Ipiranga Museum",
    },
    pt: {
      local: "Museu do Ipiranga",
      data: "2026",
    },
    en: {
      local: "Ipiranga Museum",
      data: "2026",
    },
  },
  "sao-paulo/museu-do-ipiranga2.jpeg": {
    alt: {
      pt: "Museu do Ipiranga",
      en: "Ipiranga Museum",
    },
    pt: {
      local: "Museu do Ipiranga",
      data: "2026",
    },
    en: {
      local: "Ipiranga Museum",
      data: "2026",
    },
  },
  "sao-paulo/museu-do-ipiranga.jpeg3": {
    alt: {
      pt: "Museu do Ipiranga",
      en: "Ipiranga Museum",
    },
    pt: {
      local: "Museu do Ipiranga",
      data: "2026",
    },
    en: {
      local: "Ipiranga Museum",
      data: "2026",
    },
  },
  "sao-paulo/museu-zoologia.jpeg": {
    alt: {
      pt: "Museu de Zoologia da USP",
      en: "Zoology Museum",
    },
    pt: {
      local: "Museu de Zoologia da USP",
      data: "2026",
    },
    en: {
      local: "Zoology Museum",
      data: "2026",
    },
  },
};

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
    id: "balneario",
    regiaoPt: "SANTA CATARINA · BRASIL",
    nomePt: "Florianópolis & Balneário Camboriú",
    complementoPt: "litoral catarinense",
    resumoPt: "Um espaço para guardar registros de Florianópolis e Balneário Camboriú.",
    detalhePt: "Adicione uma paisagem, um ponto visitado ou uma fotografia que represente o destino.",
    regiaoEn: "SANTA CATARINA · BRAZIL",
    nomeEn: "Florianópolis & Balneário Camboriú",
    complementoEn: "Santa Catarina coast",
    resumoEn: "A space to keep photographs from Florianópolis and Balneário Camboriú.",
    detalheEn: "Add a landscape, a place you visited, or a photograph that represents the destination.",
  }),
  criarDestino({
    id: "belo-horizonte",
  regiaoPt: "MINAS GERAIS · BRASIL",
    nomePt: "Belo Horizonte",
    complementoPt: "a cidade",
    resumoPt: "Um espaço para reunir fotografias de Belo Horizonte.",
    detalhePt: "Escolha os pontos, a arquitetura ou os detalhes que você quiser recordar.",
    regiaoEn: "MINAS GERAIS · BRAZIL",
    nomeEn: "Belo Horizonte",
    complementoEn: "the city",
    resumoEn: "A space to collect photographs from Belo Horizonte.",
    detalheEn: "Choose the places, architecture, or details you want to remember.",
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
    id: "espirito-santo",
    regiaoPt: "ESPIRITO SANTO · BRASIL",
    nomePt: "Itaoca & guarapari",
    complementoPt: "um registro da cidade",
    resumoPt: "Um espaço para reunir fotografias de Itaoca & Guarapari.",
    detalhePt: "Escolha os pontos, a arquitetura ou os detalhes que você quiser recordar.",
    regiaoEn: "ESPIRITO SANTO · BRAZIL",
    nomeEn: "Itaoca & Guarapari",
    complementoEn: "a city journal",
    resumoEn: "A space to collect photographs from Itaoca & Guarapari.",
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
    id: "rio-de-janeiro",
    regiaoPt: "RIO DE JANEIRO · BRASIL",
    nomePt: "Arraial do Cabo, Cabo Frio & Rio de Janeiro",
    complementoPt: "",
    resumoPt: "Um trecho do mapa para reunir fotografias do litoral fluminense.",
    detalhePt: "Paisagens, praias ou outros registros escolhidos por você podem ocupar este espaço.",
    regiaoEn: "RIO DE JANEIRO · BRAZIL",
    nomeEn: "Arraial do Cabo, Cabo Frio & Rio de Janeiro",
    complementoEn: "",
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
  criarDestino({
    id: "ouro-preto",
    regiaoPt: "MINAS GERAIS · BRASIL",
    nomePt: "Ouro Preto",
    complementoPt: "um registro da cidade",
    resumoPt: "Um espaço para reunir fotografias de Ouro Preto.",
    detalhePt: "Escolha os pontos, a arquitetura ou os detalhes que você quiser recordar.",
    regiaoEn: "MINAS GERAIS · BRAZIL",
    nomeEn: "Ouro Preto",
    complementoEn: "a city journal",
    resumoEn: "A space to collect photographs from Ouro Preto.",
    detalheEn: "Choose the places, architecture, or details you want to remember.",
  }),
]

function criarHobby(id, nomePt, nomeEn) {
  return {
    id:"hobby",
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

export const mapaPessoalHobbies = [
  criarHobby(
    "hobby",
  ),
]
