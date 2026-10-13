// Seção "Fora do código": antes e depois do color grading.
//
// Para adicionar um par:
// 1. Coloque as duas imagens em src/assets/visual/ (mesmo enquadramento e tamanho).
//    Se mandar para o Claude, ele converte para .webp e otimiza.
// 2. Importe as duas aqui em cima.
// 3. Acrescente um item em `comparisons`. Com mais de um, aparecem as miniaturas.

import gradingAntes from '../assets/visual/grading-antes.webp'
import gradingDepois from '../assets/visual/grading-depois.webp'

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
  ] as Comparison[],
}
