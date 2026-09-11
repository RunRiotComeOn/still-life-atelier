(()=>{
let entered=false;
const menu=$('main-menu'),screen=$('game-screen');
function play(){entered=true;menu.hidden=true;screen.hidden=false;$('menu-play').dataset.i18n='menuResume';$('menu-play').textContent=t('menuResume');$('game-home').focus({preventScroll:true});}
function home(){drag=null;selected=null;render();screen.hidden=true;menu.hidden=false;$('menu-play').focus({preventScroll:true});}
$('menu-play').onclick=play;$('game-home').onclick=home;
document.querySelector('.brand').onclick=e=>{e.preventDefault();home()};
$('menu-settings').onclick=()=>$('settings').showModal();
$('menu-help').onclick=()=>$('help').showModal();
$('menu-chapters').onclick=$('game-chapters').onclick=()=>$('chapter-picker').showModal();
$('picker-close').onclick=()=>$('chapter-picker').close();
$('chapters').addEventListener('click',e=>{if(!e.target.closest('.chapter'))return;$('chapter-picker').close();play()});
$('settings-help').onclick=()=>{$('settings').close();$('help').showModal()};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden&&!document.querySelector('dialog[open]'))return;if(e.key==='Escape'&&!screen.hidden&&!document.querySelector('dialog[open]')){if(e.defaultPrevented)return;$('settings').showModal()}});
})();
