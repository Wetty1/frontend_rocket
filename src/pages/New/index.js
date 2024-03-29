import React, { useState, useMemo } from 'react'
import api from '../../services/api'

import camera from '../../assets/camera.svg'
import './styles.css'

export default function New({ history }) {
    const [company, setCompany] = useState('')
    const [techs, setTechs] = useState('')
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState('')

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail])

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user')

        data.append('company', company)
        data.append('techs', techs)
        data.append('price', price)
        data.append('thumbnail', thumbnail)

        await api.post('/spots', data, {
            headers: { user_id }
        })

        history.push('/dashboard')
    }
    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})`}}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select img" />
            </label>

            <label htmlFor="">EMPRESA *</label>
            <input
                id="company"
                placeholdeer="Sua empresa incrível"
                value={company}
                onChange={event => setCompany(event.target.value)} 
            />

            <label htmlFor="">TECNOLOGIAS * <span>(separado por vírgula)</span></label>
            <input
                id="techs"
                placeholdeer="quais technologias usam?"
                value={techs}
                onChange={event => setTechs(event.target.value)} 
            />

            <label htmlFor="">VALOR DA DIÁRIA *<span>(em branco para GRATUITO)</span></label>
            <input
                id="price"
                placeholdeer="valor cobrado por dia?"
                value={price}
                onChange={event => setPrice(event.target.value)} 
            />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}