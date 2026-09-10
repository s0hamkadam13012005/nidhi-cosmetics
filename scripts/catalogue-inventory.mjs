import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
const root='source-assets/full-catalogue/website folder';
await fs.mkdir('output/catalogue-sheets',{recursive:true});
const entries=[];
async function walk(dir){for(const f of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,f.name);if(f.isDirectory())await walk(p);else entries.push({path:p,folder:path.relative(root,dir).replaceAll('\\','/'),name:f.name});}}
await walk(root);
const groups={};let id=0;
for(const e of entries){e.id=++id;e.hash=crypto.createHash('sha256').update(await fs.readFile(e.path)).digest('hex');(groups[e.folder]??=[]).push(e);}
for(const [folder,items] of Object.entries(groups)){
 const seen=new Set();const unique=items.filter(e=>{if(seen.has(e.hash))return false;seen.add(e.hash);return true});
 for(let start=0;start<unique.length;start+=36){const batch=unique.slice(start,start+36);const layers=[];for(let i=0;i<batch.length;i++){const e=batch[i];const thumb=await sharp(e.path).rotate().resize(180,160,{fit:'contain',background:'#fff'}).png().toBuffer();layers.push({input:thumb,left:(i%6)*190,top:Math.floor(i/6)*190});layers.push({input:Buffer.from(`<svg width="180" height="28"><rect width="180" height="28" fill="white"/><text x="8" y="20" font-size="17">${e.id}</text></svg>`),left:(i%6)*190,top:Math.floor(i/6)*190+160});}await sharp({create:{width:1140,height:Math.ceil(batch.length/6)*190,channels:3,background:'#ddd'}}).composite(layers).png().toFile(`output/catalogue-sheets/${folder.replaceAll('/','--')}-${start}.png`);}
 console.log(folder,items.length,'photos',unique.length,'unique');
}
await fs.writeFile('output/catalogue-inventory.json',JSON.stringify(entries,null,2));
