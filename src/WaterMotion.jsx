import React,{useEffect,useRef} from 'react';

// Refract only the photographed water surface; the product itself stays intact.
export default function WaterMotion(){
 const ref=useRef(null);
 useEffect(()=>{
  const canvas=ref.current,host=canvas.parentElement,img=host.querySelector('img');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches)return;
  const ctx=canvas.getContext('2d'),source=document.createElement('canvas'),paint=source.getContext('2d');
  if(!ctx||!paint)return;
  let width=0,height=0,frame=0,start=0,until=0,last=0,ready=false,disposed=false;
  let waves=[];
  function resize(){
   if(!img.naturalWidth)return;
   const box=host.getBoundingClientRect();if(!box.width||!box.height)return;
   const ratio=Math.min(1.5,devicePixelRatio||1,1400/box.width);
   width=Math.round(box.width*ratio);height=Math.round(box.height*ratio);
   canvas.width=source.width=width;canvas.height=source.height=height;
   const scale=Math.max(width/img.naturalWidth,height/img.naturalHeight);
   const [px,py]=getComputedStyle(img).objectPosition.split(' ').map(v=>parseFloat(v)/100);
   paint.drawImage(img,(width-img.naturalWidth*scale)*(Number.isFinite(px)?px:.5),(height-img.naturalHeight*scale)*(Number.isFinite(py)?py:.5),img.naturalWidth*scale,img.naturalHeight*scale);
   ready=true;
  }
  function draw(now){
   frame=0;if(disposed||!ready)return;ctx.clearRect(0,0,width,height);
   if(now>until||reduced.matches)return;
   const elapsed=(now-start)/1000;
   const envelope=Math.min(1,(now-start)/450)*Math.min(1,(until-now)/700);
   const top=Math.floor(height*.79);
   for(let y=top;y<height;y+=2){
    const depth=(y-top)/(height-top);
    const swell=(Math.sin(depth*29-elapsed*4.3)*7+Math.sin(depth*63+elapsed*2.5)*3)*depth*envelope;
    ctx.drawImage(source,0,y,width,Math.min(2,height-y),swell,y,width,Math.min(2,height-y));
   }
   waves=waves.filter(w=>now-w.time<1900);
   for(const w of waves){if(now<w.time)continue;const age=(now-w.time)/1900;const radius=(.035+age*.33)*width;
    ctx.beginPath();ctx.ellipse(w.x*width,w.y*height,radius,radius*.12,0,0,Math.PI*2);
    ctx.strokeStyle=`rgba(255,255,240,${Math.sin(age*Math.PI)*.4*envelope})`;ctx.lineWidth=1.2;ctx.stroke();
   }
   frame=requestAnimationFrame(draw);
  }
  function launch(x=.67,y=.91,duration=4600){
   if(!ready||reduced.matches||disposed)return;const now=performance.now();
   if(now-last<250)return;last=now;start=now;until=now+duration;
   waves.push({x,y,time:now},{x,y,time:now+250});
   if(!frame)frame=requestAnimationFrame(draw);
  }
  function load(){if(disposed)return;resize();launch()}
  function interact(e){const r=host.getBoundingClientRect();const y=(e.clientY-r.top)/r.height;if(y>.79)launch((e.clientX-r.left)/r.width,Math.min(.97,y),1800)}
  function stop(){cancelAnimationFrame(frame);frame=0;ctx.clearRect(0,0,width,height)}
  const observer=new ResizeObserver(resize);observer.observe(host);
  img.addEventListener('load',load);host.addEventListener('pointermove',interact,{passive:true});host.addEventListener('pointerdown',interact,{passive:true});
  reduced.addEventListener('change',stop);
  if(img.complete)load();
  return()=>{disposed=true;stop();observer.disconnect();img.removeEventListener('load',load);host.removeEventListener('pointermove',interact);host.removeEventListener('pointerdown',interact);reduced.removeEventListener('change',stop)};
 },[]);
 return <canvas ref={ref} className="water-reflection" aria-hidden="true"/>;
}
