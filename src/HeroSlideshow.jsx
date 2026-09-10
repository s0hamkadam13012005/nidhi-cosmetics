import React,{useEffect,useState} from 'react';
import {ArrowUpRight} from '@phosphor-icons/react';
import WaterMotion from './WaterMotion';
import './slideshow.css';
const slides=[
 {key:'fuji',label:'Fuji Green Tea',eyebrow:'EYLIN BOTANICAL BODY CARE',title:['MAKE A SPLASH.','FEEL THE FRESH.'],text:'Botanical bath and body essentials. Beautifully made for your skin, your senses, and your everyday.',image:'eylin-water-splash',alt:'EYLIN botanical shower gel surrounded by a water splash on sunlit wet stone',collection:'EYLIN Fuji Green Tea'},
 {key:'spa',label:'Spa Jasmin',eyebrow:'EYLIN SPA COLLECTION',title:['YOUR EVERYDAY.','A LITTLE SOFTER.'],text:'Discover Absolute Jasmin shampoo, shower gel, body milk and soap. A complete ritual of care.',image:'eylin-9',alt:'EYLIN Spa Absolute Jasmin shower gel, shampoo, body milk and soap',collection:'EYLIN Spa Absolute Jasmin'},
 {key:'rose',label:'Bulgarian Rose',eyebrow:'EYLIN BULGARIAN ROSE',title:['A ROSIER','DAILY RITUAL.'],text:'A coordinated collection of rose-inspired bath and body essentials, beautifully presented for your guests.',image:'catalogue/p146',alt:'EYLIN Bulgarian Rose guest amenity collection with green-capped bottles and boxed soaps',collection:'EYLIN Bulgarian Rose'},
 {key:'oud',label:'Oud',eyebrow:'EYLIN OUD COLLECTION',title:['A DISTINCTIVE','WELCOME.'],text:'Explore the Oud collection. Coordinated soaps and body essentials for considered guest experiences.',image:'catalogue/p507',alt:'EYLIN Oud guest amenity collection with shampoo, body lotion and soap',collection:'EYLIN Oud'}
];
export default function HeroSlideshow({ready,onExplore}){
 const [active,setActive]=useState(0),[manual,setManual]=useState(false),[reduced,setReduced]=useState(false),[pageVisible,setPageVisible]=useState(true);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(mq.matches);const visibility=()=>setPageVisible(!document.hidden);update();visibility();mq.addEventListener('change',update);document.addEventListener('visibilitychange',visibility);return()=>{mq.removeEventListener('change',update);document.removeEventListener('visibilitychange',visibility)}},[]);
 const playing=ready&&!manual&&!reduced&&pageVisible;
 useEffect(()=>{if(!playing)return;const timer=setInterval(()=>setActive(n=>(n+1)%slides.length),6500);return()=>clearInterval(timer)},[playing]);
 const choose=i=>{setManual(true);setActive(i)};
 return <section className={`product-slideshow ${ready?'is-ready':''} ${playing?'is-playing':''}`} aria-label="Featured product collections" aria-roledescription="carousel" onFocusCapture={()=>setManual(true)}>
 <div className="slideshow-stage" aria-live={playing?'off':'polite'}>{slides.map((s,i)=><article key={s.key} className={`campaign-slide slide-${s.key} ${active===i?'is-active':''}`} aria-roledescription="slide" aria-label={`${i+1} of ${slides.length}: ${s.label}`} aria-hidden={active!==i} inert={active!==i}>
 <div className={`campaign-visual ${i===0?'splash-campaign':''}`}><img src={`${import.meta.env.BASE_URL}images/${s.image}.webp`} srcSet={`${import.meta.env.BASE_URL}images/${s.image}-480.webp 480w, ${import.meta.env.BASE_URL}images/${s.image}-800.webp 800w, ${import.meta.env.BASE_URL}images/${s.image}.webp 1600w`} sizes={i===0?"100vw":"(max-width:767px) 100vw, 60vw"} alt={s.alt} fetchPriority={i===0?'high':'low'} decoding="async"/>{i===0&&active===0&&ready&&<WaterMotion/>}</div>
 <div className="campaign-copy"><p className="campaign-eyebrow">{s.eyebrow}</p>{i===0?<h1>{s.title[0]}<br/>{s.title[1]}</h1>:<h2>{s.title[0]}<br/>{s.title[1]}</h2>}<p className="campaign-description">{s.text}</p><a className="button primary" href="#collection" onClick={()=>onExplore(s.collection)}>Explore the collection <ArrowUpRight size={18}/></a></div>
 </article>)}</div>
 <div className="slideshow-navigation" role="group" aria-label="Choose a product slide; selecting one stops automatic rotation">{slides.map((s,i)=><button key={s.key} aria-label={`Show ${s.label} and stop automatic rotation`} aria-current={active===i?'true':undefined} title={`View ${s.label}; stop automatic rotation`} onClick={()=>choose(i)}><span className="slide-track"><span key={`${active}-${i}`} className="slide-progress"/></span><span className="slide-label">{s.label}</span></button>)}</div>
 </section>
}
