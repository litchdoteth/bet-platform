// components/Footer.tsx
import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <p style={{ margin: 0, color: '#fff' }}>&copy; 2024 | Bet Your Memes</p>
    </footer>
  )
}

const footerStyle: React.CSSProperties = {
  backgroundColor: '#915e27',
  textAlign: 'center',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  borderTop: '1px solid #ddd',
  height: '20px', // Set the desired height here
  boxSizing: 'border-box' // Ensures padding and border are included in the total height
}

export default Footer
