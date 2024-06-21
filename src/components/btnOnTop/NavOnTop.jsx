import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

import './style.scss';

export const NavOnTop = () => {
    const [showNav, setShowNav] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleNav = () => {
        if (lastScrollY > window.screen.availHeight) {
            setShowNav(true);
        } else {
            setShowNav(false);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleNav);
        return () => {
            window.removeEventListener('scroll', handleNav);
        };
    }, [lastScrollY]);

    const handleClickNav = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={`nav-wrap ${showNav ? 'navHide' : ''}`} title="Go to top">
            <button className="btn-nav">
                <FaArrowUp onClick={() => handleClickNav()} />
            </button>
        </div>
    );
};
