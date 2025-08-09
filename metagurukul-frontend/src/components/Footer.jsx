import React from "react";
import '../styles/components/footer.css'
import { FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h3>MetaGurukul</h3>
                    <p>Your gateway to digital learning.<br/> Access high-quality audio and video<br/> content for books and educational materials.</p>
                </div>
                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/courses">Courses</a></li>
                        <li><a href="/webinars">Webinars</a></li>
                        <li><a href="/membership">Membership</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <p>Email: themetagurukul@gmail.com</p>
                    <p>Phone: +91 xxx-xxx-xxxx</p>
                    <p>Address: Mihan, Nagpur, Maharasthra</p>
                </div>
                <div className="footer-section follow">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                    </div>
                </div>
                <div className="footer-bottom">
                    &copy; {new Date().getFullYear()} MetaGurukul. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;