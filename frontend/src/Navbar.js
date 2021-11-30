import React from 'react'
import './Navbar.css'
import { useState } from 'react'

const Navbar = () => {

    const [stripeOneTransform, setStripeOneTransform] = useState()
    const [stripeTwoWidth, setStripeTwoWidth] = useState()
    const [stripeThreeTransform, setStripeThreeTransform] = useState()
    const [hamBurgerMeanu, setHamBurgerMeanu] = useState('none')
    const [animeOfOpenMeanu, setAnimeOfOpenMeanu] = useState('')
    const [animeOfCloseMeanu, setAnimeOfCloseMeanu] = useState('')
    const [meanuOpen, setMeanuOpen] = useState(false)

    function openMeanu() {
        setTimeout(() => {
            setHamBurgerMeanu('flex');
        }, 190);
        setStripeTwoWidth('0px');
        setStripeOneTransform('rotate(45deg) translateY(6px) translateX(7px)');
        setStripeThreeTransform('rotate(135deg) translateY(5px) translateX(-5px)');
        setAnimeOfOpenMeanu('animeOfOpenMeanu');
        setAnimeOfCloseMeanu('')
        setMeanuOpen(true);
    }

    async function closeMeanu() {
        setStripeOneTransform('');
        setStripeTwoWidth('20px');
        setStripeThreeTransform('');
        setAnimeOfOpenMeanu('');
        setAnimeOfCloseMeanu('animeOfCloseMeanu');
        setTimeout(() => {
            setHamBurgerMeanu('none');
        }, 130);
        setMeanuOpen(false)
    }

    return (
        <>
        <nav id="navBar">
            <div className="d-flex justify-content-center align-items-center text-white">
                <div id="brandImage">
                    <img src="/static/blogImage.png" alt="Blog-Logo" />
                </div>
                <h4 id="brandName">React/Django TodoList</h4>
            </div>
            <div>
                <ul id="navBarItems" className="">
                    <li className="pointer" >Todo List</li>
                    <li className="pointer" >Todo List</li>
                    <li className="pointer" >Todo List</li>
                </ul>
                <div onClick={()=>{!meanuOpen?openMeanu():closeMeanu()}} id="hamBurger">
                    <hr id="stripe-1" style={{transform:stripeOneTransform}} className="stripes" />
                    <hr id="stripe-2" style={{width:stripeTwoWidth}} className="stripes" />
                    <hr id="stripe-3" style={{transform:stripeThreeTransform}} className="stripes" />
                </div>
            </div>
        </nav>
        <div>
            <ul id='hamBurgerMeanu' style={{display:hamBurgerMeanu}} className={`${animeOfOpenMeanu} ${animeOfCloseMeanu}`} >
                <li className="pointer mt-3" >Home</li>
                <li className="pointer" >Latest Articles</li>
                <li className="pointer" >Cetagories</li>
            </ul>
        </div>
        </>
    )
}

export default Navbar;
