import cvFile from '../assets/Curriculo Julio_Iwata.pdf'

export const EMAIL = 'iwatajulio@gmail.com'
export const LINKEDIN = 'https://www.linkedin.com/in/julioiwata/'
export const GITHUB = 'https://github.com/IwaataNz3'

/** Copia o e-mail. Devolve false se o navegador não deixar (aí quem chamou decide o que fazer). */
export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(EMAIL)
    return true
  } catch {
    return false
  }
}

export function downloadCv() {
  const link = document.createElement('a')
  link.href = cvFile
  link.download = 'Curriculo_Julio_Iwata.pdf'
  link.click()
}
