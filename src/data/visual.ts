// Seção "Fora do código": antes e depois do color grading.
//
// Para adicionar um par:
// 1. Coloque as duas imagens em src/assets/visual/ (mesmo enquadramento e tamanho).
//    Se mandar para o Claude, ele converte para .webp e otimiza.
// 2. Importe as duas aqui em cima.
// 3. Acrescente um item em `comparisons`. Com mais de um, aparecem as miniaturas.

import gradingAntes from '../assets/visual/grading-antes.webp'
import gradingDepois from '../assets/visual/grading-depois.webp'
import encostaAntes from '../assets/visual/encosta-antes.webp'
import encostaDepois from '../assets/visual/encosta-depois.webp'
import praiaAntes from '../assets/visual/praia-antes.webp'
import praiaDepois from '../assets/visual/praia-depois.webp'

export interface Comparison {
  id: string
  /** Descrição da foto para leitor de tela. */
  alt: string
  caption: string
  before: string
  after: string
}

export const visual = {
  // REVISAR
  intro:
    'Fora do código, trabalho com fotografia, vídeo e color grading de vídeos.',

  // TODO: link do seu Instagram ou portfólio de fotos. Vazio, o link não aparece.
  instagram: '',

  comparisons: [
    {
      id: 'por-do-sol',
      // REVISAR: descrição e legenda
      alt: 'Pôr do sol sobre um vale com casas e montanhas ao fundo',
      caption: 'Pôr do sol',
      before: gradingAntes,
      after: gradingDepois,
    },
    {
      id: 'encosta',
      // REVISAR: descrição e legenda
      alt: 'Encosta de morro gramada com pinheiros espalhados, contra um céu cinza',
      caption: 'Encosta',
      before: encostaAntes,
      after: encostaDepois,
    },
    {
      id: 'praia',
      // REVISAR: descrição e legenda
      alt: 'Silhueta de uma pessoa chutando a água do mar no fim de tarde, com uma ilha ao fundo',
      caption: 'Praia',
      before: praiaAntes,
      after: praiaDepois,
    },
  ] as Comparison[],
}
