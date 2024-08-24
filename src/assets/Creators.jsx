import React, { useEffect, useState } from 'react';
import supabase from '../client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPenToSquare} from "@fortawesome/free-regular-svg-icons";
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';



const Creators = () => {
    const [creators, setCreators] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCreators = async () => {
            const { data, error } = await supabase
                .from('creator')
                .select('*');

            if (error) {
                console.error('Error fetching creators:', error);
                setError(error.message);
            } else {
                setCreators(data);
            }
        };

        fetchCreators();
    }, []);

    return (
        <div>
            <h2>Creators</h2>
            {error && <p>Error: {error}</p>}
            <div className='creators'>
                {creators.map((creator) => (
                    <div className='creator' key={creator.id} style={{backgroundImage: `url(${creator.img})`, backgroundSize: 'cover', backgroundPosition:'center'}}>
                        <div className='creator-info'>
                            <div className='top-line'>
                                <h3>{creator.name}</h3>
                            </div>
                            <div className='socials'>
                                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faYoutube} size="1x" />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faTwitter} size="1x" />
                                </a>
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faInstagram} size="1x" />
                                </a>
                                <Link to={`/creator/${creator.id}`}><FontAwesomeIcon size="1x" icon={faCircleInfo} /></Link>

                                <Link to={`/creator/update/${creator.id}`}><FontAwesomeIcon size="1x" icon={faPenToSquare} /></Link>
                            </div>
                        </div>
                        <p className='desc'>{creator.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Creators;