import React from 'react'
import './Footer.css'
function Footer() {
    return (
        <>
            <div id="footer" className="textAlignment">
                <div className="footerContainer-1">
                    <h2 className="textCenter">React/Django TodoList</h2>
                    <div className="textCenter "><a >Home</a> / <a >Latest Articles</a> / <a >Contact Us</a></div>
                    <div><a >Privicy Policy</a> / <a>About Us</a> / <a >User Feedback</a></div>
                </div>
                <div className="footerContainer-2">All right reserved by Intrest Blog &copy; Copyrigh | 2021</div>
            </div>
        </>
    )
}

export default Footer
