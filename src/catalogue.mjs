export const normalizeSearch=value=>String(value).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
export function matchesSearch(product,query){const haystack=normalizeSearch([product.name,product.line,product.category,product.collection,product.detail].join(' '));return normalizeSearch(query).split(' ').every(word=>haystack.includes(word));}
export function filterProducts(products,{category='All products',collection='All collections',query='',sort='featured'}={}){
 const result=products.filter(p=>(category==='All products'||p.category===category)&&(collection==='All collections'||p.collection===collection)&&matchesSearch(p,query));
 if(sort==='az')result.sort((a,b)=>a.name.localeCompare(b.name));
 if(sort==='za')result.sort((a,b)=>b.name.localeCompare(a.name));
 return result;
}
