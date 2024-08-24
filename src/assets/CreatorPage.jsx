import React, { useEffect, useState } from 'react';
import supabase from '../client';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';


const CreatorPage = () => {
    const navigate=useNavigate()
    const { id } = useParams(); // Get the ID from the URL
    const [creator, setCreator] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
                .from('creator')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching creator:', error);
                setError(error.message);
            } else {
                setCreator(data);
            }
        };

        fetchCreator();
    }, [id]);

    const deleteCreator = async () => {
        if (window.confirm("Are you sure you want to delete this creator?")) {
            const { error } = await supabase
                .from('creator')
                .delete()
                .eq('id', id);
    
            if (error) {
                console.error('Error deleting creator:', error);
                setError(error.message);
            } else {
                console.log('Creator deleted successfully');
                navigate('/creators');
            }
        }
    };

    if (error) return <p>Error: {error}</p>;
    if (!creator) return <p>Loading...</p>;

    return (
        <div className='creator-page'>
            <h1 className='creator-name'>{creator.name}</h1>
            <div className='creator-cont'>
            <div className='creator-info creator-data'>
                <p>{creator.description}</p>
                <div className='socials'>
                    {creator.youtube && (
                        <a href={creator.youtube} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faYoutube} size="2x" />
                        </a>
                    )}
                    {creator.twitter && (
                        <a href={creator.twitter} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} size="2x" />
                        </a>
                    )}
                    {creator.instagram && (
                        <a href={creator.instagram} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                    )}
                </div>
        </div>
            <div
                className='creator-banner'
                style={{
                    backgroundImage: `url(${creator.img || 'default-image.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>
            </div>
            <div className='edit-delete'>
                <Link to={`/creator/update/${creator.id}`}><div className='edit'>Edit</div></Link>
                <div className='delete' onClick={deleteCreator}>Delete</div>
            </div>
        </div>
    );
};

export default CreatorPage;