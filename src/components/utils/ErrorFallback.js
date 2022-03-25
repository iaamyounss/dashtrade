import NavBar from '../Header/Header'
import 'Routes/Style.css'

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <NavBar />
      <div
        role='alert'
        style={{
          height: '100%',
          textAlign: 'center',
          margin: '100px 300px',
          color: '#fff',
        }}
      >
        <h1 style={{ fontSize: '2.5em' }}>Vous cherchez votre chemin?</h1>
        <pre style={{ color: 'red', fontSize: '1em' }}>
          Erreur : {error.message}
        </pre>

        <div className='banner__buttons'>
          <button
            className='banner__button banner__buttonplay'
            onClick={resetErrorBoundary}
          >
            Accueil
          </button>
        </div>
      </div>
    </>
  )
}

export default ErrorFallback
