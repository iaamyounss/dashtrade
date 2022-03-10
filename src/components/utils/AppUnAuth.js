import LoginRegister from 'components/utils/LoginRegister'

const imageUrl = 'images/Crypto-Trading-trading.jpg'

const backgroundStyle = {
  backgroundImage: `url('${imageUrl}')`,
  backgroundSize: 'cover',
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  overflow: 'auto',
}

function UnauthApp() {
  return (
    <div style={backgroundStyle}>
      <LoginRegister open />
    </div>
  )
}

export default UnauthApp
