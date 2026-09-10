import React,{useEffect,useState} from 'react';
import './opening.css';
export default function Opening(){
 const [visible,setVisible]=useState(false);
 useEffect(()=>{if(location.hash||location.search||matchMedia('(prefers-reduced-motion: reduce)').matches)return;try{if(sessionStorage.getItem('nidhi-opening'))return;sessionStorage.setItem('nidhi-opening','1')}catch{}setVisible(true);const stop=()=>setVisible(false);const timer=setTimeout(stop,2100);const key=e=>{if(e.key==='Escape'||e.key==='Tab')stop()};window.addEventListener('keydown',key);return()=>{clearTimeout(timer);window.removeEventListener('keydown',key)}},[]);
 if(!visible)return null;
 return <div className="brand-opening" onAnimationEnd={e=>{if(e.animationName==='opening-away')setVisible(false)}}><div className="opening-ripple" aria-hidden="true"/><div className="opening-mark" aria-hidden="true"><img src={`${import.meta.env.BASE_URL}images/nidhi-logo-original.png`} width="206" height="65" alt=""/><span>THE ART OF EVERYDAY CARE</span></div><button onClick={()=>setVisible(false)}>Skip intro</button></div>
}
