import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Form from '../components/Form/Form';
import otter from '../images/otter.svg'

const Home: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="header">
                <h1>Otter</h1>
            </div>
            <div className='content'>
                <img className='content-image' src={otter} alt='otter' />
                <span className='content-title'>The new way to happiness is through Otter!</span>
                <span className='content-subtitle'>Be the first to know when we launch</span>
                <button onClick={() => setOpen(true)}>Request an invite</button>
            </div>
            <Form open={open} setOpen={setOpen} />
            <div className="footer">
                <div className='footer-text'>
                    <span>Made with</span>
                    <FontAwesomeIcon color='#ff69b4' icon={faHeart} />
                    <span>in London</span>
                </div>
                <span>Copywrite 2020 Otter Limited</span>
            </div>
        </>
    )
}

export default Home
