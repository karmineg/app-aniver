import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import fechado from './fechado.png'; 
import aberto from './aberto.png';   
import parabensAudio from './parabens_criolo.mp3'; 
import fogo1 from './fogo1.gif'; 
import fogo2 from './fogo2.gif'; 
import gato from './gato.gif'; 
import gato1 from './gato1.gif'; 
import bolo from './bolo.gif';

function App() {
  const [caixaAberta, setCaixaAberta] = useState(false);
  const audioRef = useRef(null); 

  const handleClick = () => {
    setCaixaAberta(true); 
    if (audioRef.current) {
      audioRef.current.play(); 
    }
  };

  useEffect(() => {
    if (caixaAberta) { 
      const moveCats = () => {
        const cats = [gato, gato1];
        const numCats = 5; 
        const container = document.querySelector('.App');

        for (let i = 0; i < numCats; i++) {
          const catDiv = document.createElement('div');
          const randomCat = cats[Math.floor(Math.random() * cats.length)];
          catDiv.className = 'cat';
          catDiv.style.backgroundImage = `url(${randomCat})`;
          catDiv.style.position = 'absolute'; 
          catDiv.style.width = '100px'; 
          catDiv.style.height = '100px'; 
          container.appendChild(catDiv);

          catDiv.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
          catDiv.style.top = `${Math.random() * (window.innerHeight - 100)}px`;

          let dx = Math.random() < 0.5 ? 1 : -1; 
          let dy = Math.random() < 0.5 ? 1 : -1; 

          const move = () => {
            const rect = catDiv.getBoundingClientRect();
            let newLeft = rect.left + dx * 5; 
            let newTop = rect.top + dy * 5; 

            if (newLeft <= 0 || newLeft >= window.innerWidth - 100) {
              dx *= -1; 
              newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - 100)); 
            }
            if (newTop <= 0 || newTop >= window.innerHeight - 100) {
              dy *= -1; 
              newTop = Math.max(0, Math.min(newTop, window.innerHeight - 100)); 
            }

            catDiv.style.left = `${newLeft}px`;
            catDiv.style.top = `${newTop}px`;

            requestAnimationFrame(move);
          };

          move();
        }
      };

      moveCats(); 

      return () => {
        const cats = document.querySelectorAll('.cat');
        cats.forEach(cat => cat.remove());
      };
    }
  }, [caixaAberta]);

  return (
    <div className={`App ${caixaAberta ? 'iluminado' : ''}`}>
      {caixaAberta && (
        <>
          <div className="background" /> 
          <div className="fogos-container">
            <img src={fogo1} alt="Fogos de Artifício" className="fogo fogo1" />
            <img src={fogo2} alt="Fogos de Artifício" className="fogo fogo2" />
          </div>
        </>
      )}
      <div className="present-box" onClick={handleClick}>
        <img
          src={caixaAberta ? aberto : fechado} 
          alt={caixaAberta ? 'Caixa aberta' : 'Caixa fechada'}
          style={{ cursor: 'pointer', width: '200px', height: 'auto' }} 
        />
        {caixaAberta && (
          <div className="message">
            Feliz Aniversário Giovanna!
            <img src={bolo} alt="Bolo" className="bolo" /> 
          </div>
        )}
      </div>

      {caixaAberta && (
        <div className="felicitacao">
          Hoje é um dia especial porque celebramos você, uma pessoa tão querida e adorável! Sua amizade ilumina a vida de todos ao seu redor, e sou muito grata por ter você na minha vida. Que este novo ano traga muita alegria, amor e aventuras incríveis. Você merece tudo de bom que o mundo pode oferecer! 
          Aproveite seu dia ao máximo, rodeada de pessoas que te amam. Que cada momento seja recheado de felicidade e que todos os seus sonhos se tornem realidade.
        </div>
      )}
  
      <audio ref={audioRef} src={parabensAudio} loop />
    </div>
  );
  
}

export default App;
