import React, { useEffect, useState } from 'react';
import './SpiralImages.css'; 

const SpiralImages = () => {   /*se definió esta lista ya que las imagenes no tienen todas la misma extension*/
    const images = [
        'src/assets/datys.png',
        'src/assets/desoft.png',
        'src/assets/enzona.jpeg',
        'src/assets/etecsa.jpeg',
        'src/assets/jovenclub.jpeg',
        'src/assets/MES.jpeg',
        'src/assets/mincom.jpeg',
        'src/assets/minjus.png',
        'src/assets/ticket.jpg',
        'src/assets/todus.jpeg',
        'src/assets/transfermovil.jpeg',
        'src/assets/UCI.jpeg',
        'src/assets/xetid.png'
    ];

    const [visibleImages, setVisibleImages] = useState(Array(images.length).fill(false));

    useEffect(() => {
        const showImages = (index) => {
            if (index < visibleImages.length) {
                setVisibleImages((prev) => {
                    const newVisible = [...prev];
                    newVisible[index] = true;
                    return newVisible;
                });
                setTimeout(() => showImages(index + 1), 100); // este 100 es la velocidad con que aparece
            } else {
                // Ocultar imágenes después de mostrarlas
                setTimeout(() => hideImages(0), 100);
            }
        };

        const hideImages = (index) => {
            if (index < visibleImages.length) {
                setVisibleImages((prev) => {
                    const newVisible = [...prev];
                    newVisible[index] = false; // Ocultar la imagen actual
                    return newVisible;
                });
                setTimeout(() => hideImages(index + 1), 100); // Ocultar la siguiente imagen
            } else {
                // Reiniciar el ciclo después de ocultar todas las imágenes
                setTimeout(() => showImages(0), 100); // Reiniciar mostrando desde el primer índice
            }
        };

        showImages(0);
    }, []);

    const calculatePosition = (index) => {
        const angle = (index / images.length) * Math.PI * 3; // 1.5 vueltas
        const radiusStart = 175; // Mitad del diámetro inicial
        const radiusEnd = 30; // Centro
        const radius = radiusStart - ((radiusStart - radiusEnd) / images.length) * index; // Disminuir el radio
        
        // Ajustar la posición para que empiece desde abajo y gire a favor de las manecillas del reloj
        const x = radius * Math.sin(angle); // Cambiar coseno por seno para girar a favor de las manecillas
        const y = radius * Math.cos(angle); // Cambiar coseno por seno para girar a favor de las manecillas

        // Centrar la espiral en el contenedor
        return { transform: `translate(${x + 175}px, ${-y + 175}px)` }; // Ajustar para centrar en el contenedor
    };

    return (
        <div className="spiral-container">
            {visibleImages.map((isVisible, index) => (
                <img
                    key={index}
                    src={images[index]} // Usar la lista de imágenes que definí arriba
                    alt={`Icono ${index + 1}`}
                    className={`spiral-image ${isVisible ? 'fade-in' : 'fade-out'}`}
                    style={calculatePosition(index)}
                />
            ))}
        </div>
    );
};

export default SpiralImages;
