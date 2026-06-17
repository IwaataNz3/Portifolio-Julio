import './DownloadSection.css'
import BadgeCard from '../components/BadgeCard'

function DownloadSection() {
  const year = new Date().getFullYear()

  return (
    <section className="download-section">
      <div className="download-section__bg-text" aria-hidden="true">
        Júlio Iwata
      </div>
      
      <div className="download-section__center">
        <BadgeCard />
      </div>

      <footer className="download-section__footer">
        <div className="footer-links">
          <span>© {year} Júlio Iwata. Todos os direitos reservados.</span>
        </div>
      </footer>
    </section>
  )
}

export default DownloadSection
