import React, { useEffect, useState } from 'react';
import supabase from '../client';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        instagram: '',
        twitter: '',
        youtube: '',
        description: '',
        img: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
                setFormData(data);
            }
        };

        fetchCreator();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data: response, error } = await supabase
            .from('creator')
            .update(formData)
            .eq('id', id);

        if (error) {
            console.error('Error updating data:', error);
            setError(error.message);
        } else {
            console.log('Data updated:', response);
            navigate(`/creator/${id}`);
        }
    };

    const updateData = (e, inputName) => {
        setFormData({
            ...formData,
            [inputName]: e.target.value
        });
    };

    if (error) return <p>Error: {error}</p>;

    return (
        <div className='form-cont'>
            <h2>Update Creator Profile</h2>
            <form className='form' onSubmit={handleSubmit}>
                <div className='couple'>
                    <label>Name</label>
                    <input
                        type='text'
                        value={formData.name}
                        onChange={(e) => updateData(e, 'name')}
                        placeholder='Name'
                        className='input'
                    />
                </div>
                <div className='couple'>
                    <label>Instagram</label>
                    <input
                        type='text'
                        value={formData.instagram}
                        onChange={(e) => updateData(e, 'instagram')}
                        placeholder='Instagram Handle'
                        className='input'
                    />
                </div>               
                <div className='couple'>
                    <label>Twitter</label>
                    <input
                        type='text'
                        value={formData.twitter}
                        onChange={(e) => updateData(e, 'twitter')}
                        placeholder='Twitter Handle'
                        className='input'
                    />
                </div>
                <div className='couple'>
                    <label>Youtube</label>
                    <input
                        type='text'
                        value={formData.youtube}
                        onChange={(e) => updateData(e, 'youtube')}
                        placeholder='YouTube Handle'
                        className='input'
                    />
                </div>
                <div className='couple'>
                    <label>Image</label>
                    <input
                        type='text'
                        value={formData.img}
                        onChange={(e) => updateData(e, 'img')}
                        placeholder='Image Link'
                        className='input'
                    />
                </div>
                <div className='couple'>
                    <label>Description</label>
                    <input
                        type='text'
                        value={formData.description}
                        onChange={(e) => updateData(e, 'description')}
                        placeholder='Description'
                        className='input'
                    />
                </div>
                <button type='submit' className='submit-btn'>Update</button>
            </form>
        </div>
    );
};

export default UpdateForm;
