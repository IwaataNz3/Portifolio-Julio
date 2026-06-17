import './BadgeCard.css'
import fotoJulio from '../assets/foto-julio.png'
import cvFile from '../assets/Curriculo Julio_Iwata.pdf'

function BadgeCard() {
  return (
    <div className="badge-card">
      <div className="badge-clip"></div>
      <div className="badge-photo">
        <img src={fotoJulio} alt="Júlio Iwata" />
        <div className="badge-hologram"></div>
      </div>
      <div className="badge-info">
        <div className="badge-name">JÚLIO IWATA</div>
        <div className="badge-role">FRONTEND DEV</div>
        
        <div className="badge-footer">
          <div className="badge-barcode"></div>
          <a href={cvFile} download="Curriculo_Julio_Iwata.pdf" className="badge-download" style={{ textDecoration: 'none' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6}}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            CV
          </a>
        </div>
      </div>
    </div>
  )
}

export default BadgeCard
