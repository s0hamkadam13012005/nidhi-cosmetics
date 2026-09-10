import fs from 'node:fs/promises';
import sharp from 'sharp';
const inventory=JSON.parse(await fs.readFile('output/catalogue-inventory.json','utf8'));
const byId=new Map(inventory.map(e=>[e.id,e]));
const products=[];
const slug=s=>s.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const categories=['Bath & Body','Hair Care','Soaps','Gift Sets','Handwash','Dry Amenities','Slippers','Dispensers','Cleaning Products','Air Fresheners'];
function add(name,category,collection,ids,detail='',options={}){
 products.push({id:options.id||slug(name),name,line:collection.startsWith('Zivara')?'ZIVARA':collection.startsWith('EYLIN')?'EYLIN':'NIDHI',collection,category,image:`catalogue/p${ids[0]}`,gallery:ids.map(i=>`catalogue/p${i}`),detail:detail||collection,description:options.description||`${name}, part of our ${collection} range. Enquire about available sizes, packaging and order quantities.`,...options,sourcePhotoIds:ids});
}
function kit(collection,ids,options={}){add(`${collection} Guest Amenity Kit`,'Gift Sets',collection,ids,'Coordinated guest amenities',{description:`A coordinated ${collection} guest amenity collection. Explore the individual products in this range and enquire about your preferred kit contents and packaging.`,...options});}
function bath(collection,rows){for(const [type,ids,detail='',options={}] of rows)add(`${collection} ${type}`,/Shampoo|Conditioner|Serum/.test(type)?'Hair Care':type==='Soap'?'Soaps':'Bath & Body',collection,ids,detail||type,options);}
kit('EYLIN Fuji Green Tea',[574,575,570,571,568,569],{id:'botanical-set'});
bath('EYLIN Fuji Green Tea',[
 ['Soap',[567,566,562], 'Fuji green tea & vitamin E',{id:'botanical-soap'}],
 ['Shampoo',[579,575]],['Shower Gel',[580,574]],['Body Milk',[564,563], 'Fuji green tea & vitamin E',{imageNote:'The body milk is shown with other products from the collection.'}]
]);
kit('EYLIN Spa Absolute Jasmin',[547,546,538,551,553,554],{id:'spa-essentials'});
bath('EYLIN Spa Absolute Jasmin',[
 ['Soap',[543,542,557,559], 'Sculpted soap bar',{id:'spa-soap'}],
 ['Shower Gel',[533,549]],['Shampoo',[535,539], 'Absolute Jasmin',{imageNote:'The green shampoo tube is pictured with the other collection products.'}],['Body Milk',[552,549]]
]);
kit('EYLIN Oud',[507,510,521,523,530]);
bath('EYLIN Oud',[['Soap',[499,504,517,524]],['Shower Gel',[513,529]],['Shampoo',[527,519], 'Oud extract',{imageNote:'The orange shampoo is shown alongside shower gel and body lotion.'}],['Body Lotion',[525,527], 'Oud extract',{imageNote:'The white body lotion is shown alongside the other collection products.'}]]);
kit('EYLIN Orange',[484,448,449,487,488]);
bath('EYLIN Orange',[['Soap',[442,443,450]],['Shampoo',[476,458,461]],['Shower Gel',[478,480]],['Body Lotion',[471,473]]]);
kit('EYLIN Aqua',[109,105,118,123,133]);
bath('EYLIN Aqua',[['Soap',[100,96,130]],['Shampoo',[129,124]],['Shower Gel',[84,116], 'Aqua collection',{imageNote:'The blue shower gel is shown with the collection bottles.'}],['Moisturiser',[120,91,112]]]);
kit('EYLIN Bulgarian Rose',[146,139,141,152,160]);
bath('EYLIN Bulgarian Rose',[['Soap',[143,140,155]],['Shampoo',[151]],['Shower Gel',[148,149,150]],['Moisturising Lotion',[147]]]);
kit('EYLIN Almond & Aloe Vera',[190,204,200,221]);
bath('EYLIN Almond & Aloe Vera',[['Soap',[208,185,206]],['Shampoo',[214,197]],['Shower Gel',[176,174,211]],['Body Lotion',[167,173,212]]]);
kit('EYLIN Blue Lotus',[259,245,246,248]);
bath('EYLIN Blue Lotus',[['Soap',[229,231,233]],['Shampoo',[224,239,240]],['Shower Gel',[237,236]],['Body Lotion',[254,253,255]]]);
kit('EYLIN Bukhoor',[261,263,264,268]);
bath('EYLIN Bukhoor',[['Soap',[269,270]],['Shampoo',[262,261], '',{imageNote:'The shampoo is pictured with the coordinated collection.'}],['Shower Gel',[265,261], '',{imageNote:'The shower gel is pictured with the coordinated collection.'}],['Body Lotion',[267,261], '',{imageNote:'The body lotion is pictured with the coordinated collection.'}]]);
kit('EYLIN Green Apple',[287,283,288,315]);
bath('EYLIN Green Apple',[['Soap',[292,291,304]],['Shampoo',[319,311]],['Shower Gel',[320,308]],['Body Lotion',[294,293]]]);
kit('EYLIN Lemongrass',[325,323,326,329]);
bath('EYLIN Lemongrass',[['Soap',[330]],['Shampoo',[325,324], '',{imageNote:'The shampoo is pictured with the coordinated collection.'}],['Shower Gel',[325,327], '',{imageNote:'The amber shower gel is pictured with the coordinated collection.'}],['Body Lotion',[325,328], '',{imageNote:'The white body lotion is pictured with the coordinated collection.'}]]);
kit('EYLIN Moringa',[351,349,352,353]);
bath('EYLIN Moringa',[['Soap',[339,344,347],'12 g'],['Shampoo',[335,338],'Moringa shampoo'],['Shower Gel',[331,332],'15 ml'],['Hair Conditioner',[337,341],'15 ml'],['Moisturising Lotion',[343,342],'15 ml'],['Talcum Powder',[333,334],'15 g']]);
kit('EYLIN Neem & Aloe Vera',[407,354,355,420,427]);
bath('EYLIN Neem & Aloe Vera',[['Soap',[390,394,402]],['Shampoo',[385,386,389]],['Shower Gel',[382,383,384]],['Body Lotion',[378,425,426]]]);
kit('EYLIN Onion & Amla',[436,433,437,438]);
bath('EYLIN Onion & Amla',[['Soap',[440,441]],['Shampoo',[433,437], '',{imageNote:'The shampoo is pictured with shower gel and body lotion.'}],['Shower Gel',[436,437], '',{imageNote:'The shower gel is pictured with shampoo and body lotion.'}],['Body Lotion',[433,436], '',{imageNote:'The body lotion is pictured with shampoo and shower gel.'}]]);
add('EYLIN Moisturising Guest Soap','Soaps','EYLIN Guest Soaps',[27],'10 g, 15 g and 20 g',{variants:['10 g','15 g','20 g']});
for(const fragrance of ['Sandal','Neem & Aloe Vera','Lavender'])add(`EYLIN ${fragrance} Wrapped Soap`,'Soaps','EYLIN Guest Soaps',[28],fragrance,{imageNote:'The photograph shows the three wrapped soap fragrances.'});
add('Zivara Moisturising Guest Soap','Soaps','Zivara Guest Care',[58,59],'8 g');
add('EYLIN Shampoo Sachet','Hair Care','EYLIN Guest Care',[37],'8 ml');
const dry=[
 ['Bottle Tag',[21],'Room Accessories','Bottle neck tag'],['Luggage Tag',[29],'Room Accessories','Guest luggage tag'],['Do Not Disturb & Make Up Room Cards',[26],'Room Accessories','Door-hanging room cards'],
 ['Butter Paper Glass Cover',[25,24],'Room Accessories','Paper glass cover'],['Plastic Glass Cover',[33,34],'Room Accessories','Plastic glass cover'],['Round Coaster',[36,35],'Room Accessories','Round format'],['Square Coaster',[39,40],'Room Accessories','Square format'],['WC Hygiene Band',[41,42],'Room Accessories','Sanitary presentation band'],
 ['Shoe Shine Box',[30,38],'Guest Accessories','Round shoe-shine box'],['Shoe Shiner Strip',[38],'Guest Accessories','Individually packed strip'],
 ['Shaving Kit',[44,43,52],'Guest Accessories','Black presentation box'],['Dental Kit',[47,49,53],'Guest Accessories','Black presentation box'],['Shower Cap',[50,46,51],'Guest Accessories','Black presentation box'],['Guest Comb',[48,45,54],'Guest Accessories','Black presentation box'],['Sewing Kit',[31],'Guest Accessories','Paper pouch',{imageNote:'The sewing kit is shown with other individually packed guest amenities.'}],
 ['Black Box Guest Amenity Set',[55,56,57],'Guest Accessories','Coordinated boxed amenities'],['Brown Chromo Paper Amenity Boxes',[22],'Amenity Packaging','Printed brown boxes'],['Brown Paper Amenity Pouches',[23],'Amenity Packaging','Brown pouch presentation'],['White Paper Amenity Pouches',[31],'Amenity Packaging','White pouch presentation'],['Gold Border Amenity Boxes',[32],'Amenity Packaging','White boxes with gold border']
];
for(const [name,ids,col,detail,opts] of dry)add(name,'Dry Amenities',col,ids,detail,opts);
for(const [name,ids] of [['Jute Guest Slippers',[66,65,67]],['White Closed-Toe Guest Slippers',[69]],['White Open-Toe Guest Slippers',[71,70]],['Black Guest Slippers',[72,73,68]]])add(name,'Slippers','Hotel Slippers',ids,'Hotel guest footwear');
for(const [name,id] of [['Double Bottle Metal Dispenser',17],['Double Bottle Plastic Dispenser',18],['Single Bottle Metal Dispenser',19],['Single Bottle Plastic Dispenser',20]])add(name,'Dispensers','Amenity Dispensers',[id],'Wall-mounted bottle holder');
for(const [name,id] of [['Aqua Blue Premium',60],['Strawberry',61],['Neem & Aloe Vera',62],['Eco',63],['Aloe Vera & Lemongrass',64]])add(`Zivara ${name} Handwash`,'Handwash','Zivara Handwash',[id],'5 L');
for(const [name,ids,detail] of [['Laundry Liquid',[7,14],'5 L'],['Bathroom Cleaner',[8],'Housekeeping range'],['Concentrated Phenyl',[9],'Housekeeping range'],['Dishwash Liquid',[10],'Housekeeping range'],['Floor Cleaner',[11],'Housekeeping range'],['Glass Cleaner',[12],'Housekeeping range'],['Hard Surface Cleaner',[13],'Housekeeping range'],['Toilet Bowl Cleaner',[15],'5 L'],['White Phenyl',[16],'Housekeeping range']])add(`Zivara ${name}`,'Cleaning Products','Zivara Housekeeping',ids,detail);
for(const [name,id] of [['Bulgarian Rose',1],['Evening in Paris',2],['Lavender',3],['Lemongrass',4],['London Dreams',5],['Sandal',6]])add(`Zivara ${name} Air Freshener`,'Air Fresheners','Zivara Air Care',[id],'5 L refill shown with spray bottle');
const selected=[...new Set(products.flatMap(p=>p.sourcePhotoIds))];
await fs.mkdir('public/images/catalogue',{recursive:true});await fs.mkdir('src/data',{recursive:true});
for(const id of selected){const e=byId.get(id);if(!e)throw new Error('Missing photo '+id);for(const width of [480,800,1600])await sharp(e.path).rotate().resize({width}).webp({quality:width===1600?83:79}).toFile(`public/images/catalogue/p${id}${width===1600?'':'-'+width}.webp`);}
await fs.writeFile('src/data/products.json',JSON.stringify(products,null,2));
await fs.writeFile('src/data/categories.json',JSON.stringify(categories,null,2));
const escaped=v=>'"'+String(v??'').replaceAll('"','""')+'"';
await fs.writeFile('docs/product-catalogue.csv',['ID,Name,Category,Collection,Details,Source photos',...products.map(p=>[p.id,p.name,p.category,p.collection,p.detail,p.sourcePhotoIds.map(id=>byId.get(id).path).join(' | ')].map(escaped).join(','))].join('\n'));
await fs.writeFile('output/catalogue-reconciliation.json',JSON.stringify({photos:inventory.length,products:products.length,selectedPhotos:selected.length,collections:[...new Set(products.map(p=>p.collection))],items:inventory.map(e=>({...e,usedBy:products.filter(p=>p.sourcePhotoIds.includes(e.id)).map(p=>p.id),disposition:selected.includes(e.id)?'Selected product or gallery photo':'Alternate composition or duplicate; product represented by selected photographs'})),notes:['Photo 432 labels a bottle hair serum while the other Onion & Amla photographs label that bottle shower gel. Used consistent photos 433/436/437; did not invent a separate serum SKU.','Pack sizes omitted where labels disagree or are not readable.','Product photographs may include coordinated items. Group photos are identified in product details.']},null,2));
console.log(JSON.stringify({products:products.length,selectedPhotos:selected.length,categories:Object.fromEntries(categories.map(c=>[c,products.filter(p=>p.category===c).length]))},null,2));
