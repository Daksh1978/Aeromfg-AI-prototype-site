
document.addEventListener('DOMContentLoaded',()=>{
 const shell=document.querySelector('.nav-shell');
 const toggle=document.querySelector('.menu-toggle');
 const drop=document.querySelector('.nav-drop');
 const megaMenu=document.querySelector('.mega-menu');

 if(toggle) toggle.addEventListener('click',()=>{
   const isMobile=shell.classList.toggle('mobile');
   toggle.setAttribute('aria-expanded',String(isMobile));
 });
 if(drop) drop.addEventListener('click',()=>{
   const isOpen=drop.classList.toggle('open');
   drop.setAttribute('aria-expanded',String(isOpen));
 });
 if(megaMenu&&!megaMenu.querySelector('a[href="edge.html"]')){
   megaMenu.insertAdjacentHTML('beforeend','<div class="mega-col"><a class="mega-title" href="edge.html">Edge Platform Integration</a><a href="edge.html#middleware-orchestration">Middleware Orchestration</a><a href="edge.html#cloud-deployment">Cloud Deployment</a><a href="edge.html#server-deployment">Server Deployment</a></div>');
 }
 document.addEventListener('click',event=>{
   if(megaMenu&&drop&&!drop.contains(event.target)&&!megaMenu.contains(event.target)){
     drop.classList.remove('open');
     drop.setAttribute('aria-expanded','false');
   }
 });
 document.querySelectorAll('.mega-menu a').forEach(a=>a.addEventListener('click',()=>{
   shell.classList.remove('mobile');
   if(toggle) toggle.setAttribute('aria-expanded','false');
 }));

 const revealElements=document.querySelectorAll('.reveal');
 if('IntersectionObserver' in window){
   const obs=new IntersectionObserver(es=>es.forEach(e=>{
     if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}
   }),{threshold:.08});
   revealElements.forEach(e=>obs.observe(e));
 }else revealElements.forEach(e=>e.classList.add('visible'));

 const form=document.querySelector('#contactForm');
 if(form) form.addEventListener('submit',e=>{
   e.preventDefault();
   const data=Object.fromEntries(new FormData(form).entries());
   const status=form.querySelector('.form-status');
   if(!data.name.trim()||!data.email.trim()){
     status.textContent='Please provide your name and work email.';
     status.classList.add('error');
     return;
   }
   data.time=new Date().toISOString();
   localStorage.setItem('aeromfg_contact_last',JSON.stringify(data));
   status.classList.remove('error');
   status.textContent='Request captured. Our engineering team can now review your requirements.';
   form.reset();
 });
});
