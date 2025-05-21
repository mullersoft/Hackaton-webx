import React from 'react';

const Footer = () => (
    <footer style={{
        background: '#222',
        color: '#fff',
        padding: '1rem 0',
        textAlign: 'center',
        position: 'relative',
        bottom: 0,
        width: '100%'
    }}>
        <div>
            <p>&copy; {new Date().getFullYear()} Hackaton WebX. All rights reserved.</p>
        </div>
    </footer>
);

export default Footer;