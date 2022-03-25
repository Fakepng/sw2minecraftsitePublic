import React from 'react'
import './Gallery.css'
import GalleryList from './../../config/gallery'

const Gallery = () => {
    const galleryList = GalleryList.map(gallery => {
        return (
            <img className="gallery" src={gallery.img} alt={gallery.name} key={gallery.id} />
        )
    })

    return (
        <>
            <div className="gallery-grid">
                {galleryList}
            </div>
        </>
    )
}

export default Gallery