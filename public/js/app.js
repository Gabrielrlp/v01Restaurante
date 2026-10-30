const money = value => {const number=Number(value);return Number.isFinite(number) && number>=0 ? number.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) : 'Preço sob consulta';};
let category = 'Todos'; let drink = 'all';
const search = document.querySelector('#search');
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const cats = document.querySelector('#categories');
categorias.forEach(name => {const button=document.createElement('button');button.textContent=name;button.setAttribute('aria-pressed',name===category);button.addEventListener('click',()=>{category=name;drink='all';render();});cats.append(button);});
function render(){
 [...cats.children].forEach(b=>b.setAttribute('aria-pressed',b.textContent===category));
 document.querySelector('#drink-filters').hidden=category!=='Bebidas';
 document.querySelectorAll('[data-drink]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.drink===drink));
 const query=normalize(search.value.trim());
 const filtered=produtos.filter(p=>(category==='Todos'||(category==='Promoções'?p.anterior:p.categoria===category))&&(category!=='Bebidas'||drink==='all'||p.tipo===drink)&&(!document.querySelector('#vegetarian').checked || p.vegetariano) && normalize(p.nome+' '+p.descricao+' '+p.ingredientes).includes(query));
 document.querySelector('#products').innerHTML=filtered.map(p=>`<button class="product" data-id="${escapeHtml(p.id)}" aria-label="Ver detalhes de ${escapeHtml(p.nome)}"><div class="product-photo"><img src="${productImage(p.foto)}" alt="Foto ilustrativa de ${escapeHtml(p.nome)}" loading="lazy">${p.selo?`<span class="badge">${escapeHtml(p.selo)}</span>`:''}</div><div class="product-copy">${!p.disponivel?'<span class="unavailable">Indisponível hoje</span>':''}${p.vegetariano?'<span class="vegetarian-tag">Vegetariano</span>':''}<span class="product-category">${escapeHtml(p.categoria)}</span><h3>${escapeHtml(p.nome)}</h3><p>${escapeHtml(p.descricao)}</p><span class="portion">${p.variantes?'Tamanhos disponíveis':escapeHtml(p.porcao)}</span><div class="price-line"><span class="price">${p.anterior?`<del class="old-price">${money(p.anterior)}</del>`:''}${p.variantes?`<small>A partir de</small>${money(Math.min(...p.variantes.map(v=>v.preco)))}`:money(p.preco)}</span><span class="card-arrow" aria-hidden="true">↗</span></div></div></button>`).join('');
 document.querySelector('#result-count').textContent=`${filtered.length} ${filtered.length===1?'opção':'opções'}`;
 document.querySelector('#result-title').textContent=query?'Resultados da sua busca':category==='Todos'?'Uma seleção para todos os gostos':category;
 document.querySelector('#empty').hidden=filtered.length>0;
}
search.addEventListener('input',render);
document.querySelectorAll('[data-drink]').forEach(b=>b.addEventListener('click',()=>{drink=b.dataset.drink;render();}));
document.querySelector('#reset').addEventListener('click',()=>{category='Todos';drink='all';search.value='';document.querySelector('#vegetarian').checked=false;render();search.focus();});
const productDialog=document.querySelector('#product-dialog');
let lastFocus;
function openDialog(dialog){lastFocus=document.activeElement;dialog.showModal();document.body.classList.add('modal-open');}
document.querySelector('#products').addEventListener('click',event=>{const card=event.target.closest('[data-id]');if(!card)return;const p=produtos.find(p=>p.id===Number(card.dataset.id));if(!p)return;document.querySelector('#modal-content').innerHTML=`<div class="modal-layout"><img class="modal-photo" src="${productImage(p.foto)}" alt="Foto ilustrativa de ${escapeHtml(p.nome)}"><div class="modal-copy"><span class="eyebrow">${escapeHtml(p.categoria)}</span><h2 id="modal-title">${escapeHtml(p.nome)}</h2><span class="price">${p.anterior?`<del class="old-price">${money(p.anterior)}</del>`:''}${money(p.preco)}</span><p>${escapeHtml(p.descricao)}</p><div class="modal-meta"><span>${escapeHtml(p.porcao)}</span><span>${escapeHtml(p.tempo)}</span></div><h3>O que vai nessa escolha</h3><p>${escapeHtml(p.ingredientes)}</p><p class="allergens">${escapeHtml(p.alergenos)}</p><p class="modal-note">Para pedir, fale com o garçom.<br>Foto ilustrativa · Dados demonstrativos.</p></div></div>`;prepareProduct(p);openDialog(productDialog);productDialog.scrollTop=0;});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))dialog.close();});dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');if(dialog.id==='zoom-dialog'){document.querySelector('#enlarge-photo')?.focus();}else{lastFocus?.focus();}});});
const toggle=document.querySelector('#menu-toggle'),nav=document.querySelector('#navigation');
function closeMenu(){nav.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');}
toggle.addEventListener('click',()=>{const open=nav.hidden;nav.hidden=!open;toggle.setAttribute('aria-expanded',open);toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!toggle.contains(e.target))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!nav.hidden){closeMenu();toggle.focus();}});
document.querySelector('#about').addEventListener('click',()=>{closeMenu();toggle.focus();openDialog(document.querySelector('#about-dialog'));});
document.querySelector('#year').textContent=new Date().getFullYear();
render();