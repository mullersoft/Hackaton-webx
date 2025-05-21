import React from 'react'
import {Link} from 'react-router-dom'


const Navbar = () => {
  return (
    
           <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand" href="index.html">
                        <i className="bi-back"></i>
                        <span>Topic</span>
                    </Link>

                    <div className="d-lg-none ms-auto me-4">
                        <Link href="#top" className="navbar-icon bi-person smoothscroll"></Link>
                    </div>
    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-lg-5 me-lg-auto">
                            <li className="nav-item">
                                <Link className="nav-link click-scroll" href="#section_1">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link click-scroll" href="#section_2">Browse Topics</Link>
                            </li>
    
                            <li className="nav-item">
                                <Link className="nav-link click-scroll" href="#section_3">How it works</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link click-scroll" href="#section_4">FAQs</Link>
                            </li>
    
                            <li className="nav-item">
                                <Link className="nav-link click-scroll" href="#section_5">Contact</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" id="navbarLightDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Pages</Link>

                                <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink">
                                    <li><Link className="dropdown-item" href="topics-listing.html">Topics Listing</Link></li>

                                    <li><Link className="dropdown-item" href="contact.html">Contact Form</Link></li>
                                </ul>
                            </li>
                        </ul>

                        <div className="d-none d-lg-block">
                            <Link href="#top" className="navbar-icon bi-person smoothscroll"></Link>
                        </div>
                    </div>
                </div>
            </nav>
    
  )
}

export default Navbar