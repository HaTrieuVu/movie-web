import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './style.scss';

import useFetch from '../../../hooks/useFetch';

import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
    const { url } = useSelector((state) => state.home);

    const [background, setBackground] = useState('');
    const [query, setQuery] = useState('');

    const navigate = useNavigate();

    const { data, loading } = useFetch('/movie/upcoming');

    useEffect(() => {
        const bg = url?.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data]);

    const searchQueryHandler = (e) => {
        if (e.key == 'Enter' && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity_player"></div>

            <ContentWrapper>
                <div className="wrapper">
                    <div className="heroBannerContent">
                        <span className="title">Welcome.</span>
                        <span className="subTitle">
                            Millions of movies, TV shows and people to discover. Explore now
                        </span>
                        <div className="searchInput">
                            <input
                                type="text"
                                onKeyUp={(e) => searchQueryHandler(e)}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for a movie or TV show..."
                            />
                            <button>Search</button>
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
