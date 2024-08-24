import React, { useState } from 'react';
import supabase from '../client';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        instagram: '',
        twitter: '',
        youtube: '',
        description: '',
        img: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data: response, error } = await supabase
            .from('creator')
            .insert([formData]);

        if (error) {
            console.error('Error adding data:', error);
        } else {
            console.log('Data inserted:', response);
            navigate('/creators');
        }
    };

    const updateData = (e, inputName) => {
        setFormData({
            ...formData,
            [inputName]: e.target.value
        });
    };

    return (
        <div className='form-cont'>
            <h2>Create a Creator Profile!</h2>
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
                <button type='submit' className='submit-btn'>Submit</button>
            </form>
        </div>
    );
};

export default Form;