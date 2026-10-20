import infinityHub from '../assets/images/infinityhub.png'
import desligaAi from '../assets/images/desligaai.png'
import bigBang from '../assets/images/bigbang.mp4'

// Ordem provisória: reorganize esta lista do mais antigo ao mais recente
// quando as datas forem confirmadas. As chaves de texto apontam para data/translations.js.
// Descrições e tecnologias conferidas nos repositórios indicados em cada item.
export const projetos = [
  {
    id: 'infinity-hub',
    nome: 'Infinity HUB',
    descricao: 'infinityDescription',
    tecnologias: ['HTML', 'CSS', 'JavaScript', 'JSON Server'],
    repositorio: 'https://github.com/Evycostzocn/InfinityHUB',
    imagem: infinityHub,
    alt: 'infinityAlt',
  },
  {
    id: 'desligaai',
    nome: 'DesligaAi',
    descricao: 'desligaDescription',
    tecnologias: ['HTML', 'CSS', 'JavaScript'],
    repositorio: 'https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-2-ti1-2401100-desligaai',
    imagem: desligaAi,
    alt: 'desligaAlt',
  },
  {
    id: 'big-bang',
    nome: 'Big Bang',
    descricao: 'bigbangDescription',
    tecnologias: ['Python', 'Pygame', 'Pytest'],
    repositorio: 'https://github.com/defreitassl/Trabalho_Pygame',
    video: bigBang,
  },
]

// Troque este ID para selecionar outro projeto do catálogo.
export const projetoDestaqueId = 'infinity-hub'
