import { FaGithub, FaLinkedin } from 'react-icons/fa'
import "./Footer.css"

const Footer = () => {
    return (
        <footer>
            {/* <div className='footerContainer'> */}
            <div className='createdBy'>
                Website Created by Tamara Mousa
            </div>
            <div className='myLinks'>
                <a href="https://github.com/T3Mousa" target='_blank' rel="noopener noreferrer" className='gitHub'>
                    <FaGithub /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/tamara-mousa-4b89a89a/" target='_blank' rel='noopener noreferrer' className='linkedIn'>
                    <FaLinkedin /> LinkedIn
                </a>
            </div>
            {/* </div> */}
        </footer>
    )
}

export default Footer;
