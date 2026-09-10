import React,{useEffect,useState} from 'react';
import './opening.css';
export default function Opening({onComplete}){
 const [visible,setVisible]=useState(false);
 useEffect(()=>{
  if((new URLSearchParams(location.search).has('product')||new URLSearchParams(location.search).has('q'))||matchMedia('(prefers-reduced-motion: reduce)').matches){onComplete(true);return}
  setVisible(true);const finish=()=>{setVisible(false);onComplete(true)};
  const timer=setTimeout(finish,2400);const key=e=>{if(e.key==='Escape'||e.key==='Tab')finish()};window.addEventListener('keydown',key);
  return()=>{clearTimeout(timer);window.removeEventListener('keydown',key)};
 },[onComplete]);
 if(!visible)return null;
 return <div className="brand-opening"><div className="opening-curtain curtain-left" aria-hidden="true"/><div className="opening-curtain curtain-right" aria-hidden="true"/><div className="opening-mark" aria-hidden="true"><img src={`${import.meta.env.BASE_URL}images/nidhi-logo-original.png`} width="206" height="65" alt=""/><span>THE ART OF EVERYDAY CARE</span></div><button onClick={()=>{setVisible(false);onComplete(true)}}>Skip intro</button></div>
}
