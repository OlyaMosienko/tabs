window.addEventListener('DOMContentLoaded', ()=>{
    const tab = document.querySelectorAll('.tabheader__item');
    const tabcontent = document.querySelectorAll('.tabcontent');
    const tabparent = document.querySelector('.tabheader');

    function tabHidden(){
        tabcontent.forEach(item=>{
            item.style.display = 'none';
        });
        tab.forEach(item=>{
            item.classList.remove('tabheader__item_active');
        });
    }
    function tabActive(i=0){
        tabcontent[i].style.display = 'block';
        tab[i].classList.add('tabheader__item_active');
    }
    tabHidden();
    tabActive();

    tabparent.addEventListener('click', (event)=>{
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
            tab.forEach((item, i)=>{
                if(target == item){
                    tabHidden();
                    tabActive(i);
                }
            });
        }
    });
});