// Seção "Fora do código" (audiovisual).
//
// Para adicionar uma imagem:
// 1. Coloque o arquivo em src/assets/visual/ (de preferência .webp, até uns 250KB).
// 2. Importe aqui em cima, ex.: import clipe1 from '../assets/visual/clipe-1.webp'
// 3. Use no `src` do item e escreva um `alt` descrevendo a imagem.
// Item sem `src` aparece como espaço reservado. O primeiro item é o grande.

import gradingAntes from '../assets/visual/grading-antes.webp'
import gradingDepois from '../assets/visual/grading-depois.webp'

export interface VisualItem {
  id: string
  src?: string
  /** Antes e depois do color grading: vira o slider de comparação. */
  compare?: { before: string; after: string }
  alt: string
  caption: string
}

export const visual = {
  // REVISAR
  intro:
    'Fora do código, trabalho com fotografia, vídeo e color grading de vídeos.',

  // TODO: link do seu Instagram ou reel. Vazio, o link não aparece.
  instagram: '',

  // TODO: trocar os espaços reservados pelas suas imagens
  items: [
    {
      id: 'grading-por-do-sol',
      // REVISAR: descrição da imagem
      alt: 'Pôr do sol sobre um vale com casas e montanhas ao fundo',
      caption: 'Color grading · arraste para comparar',
      compare: { before: gradingAntes, after: gradingDepois },
    },
    { id: 'visual-2', alt: '', caption: 'Vídeo' },
    { id: 'visual-3', alt: '', caption: 'Fotografia' },
    { id: 'visual-4', alt: '', caption: 'Fotografia' },
    { id: 'visual-5', alt: '', caption: 'Vídeo' },
  ] as VisualItem[],
}
