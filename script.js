window.addEventListener('DOMContentLoaded', ()=>{

    // Tabs
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

    // Timer
    const timeEnd = '2023-12-31';
    function getTime(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date);
        const days = Math.floor(t / (1000 * 60 * 60  *24));
        const hours = Math.floor(t / (1000 * 60 * 60) % 24);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    function setClock(selector, endtime){
        const timer = document.querySelector(selector);
        const days = document.querySelector('#days');
        const hours = document.querySelector('#hours');
        const minutes = document.querySelector('#minutes');
        const seconds = document.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();
        function updateClock(){
            const t = getTime(endtime);
            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;
            if(t.total<=0){
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', timeEnd);

    // Modal Window
    const modal = document.querySelector('.modal');
    const openModal = document.querySelectorAll('[data-modal]');
    const closeModal = document.querySelector('[data-close]');

    openModal.forEach(btn => {
        btn.addEventListener('click', ()=>{
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
        });
    });

    function hideModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    closeModal.addEventListener('click', hideModal);

    modal.addEventListener('click', (e)=>{
            if(e.target === modal){
                hideModal();
            }
    });
    
    document.addEventListener('keydown', (e)=>{
        if(e.code === 'Escape'){
            hideModal();
        }
    });

    // closeModal.addEventListener('click', ()=>{
    //     modal.classList.add('hide');
    //     modal.classList.remove('show');
    //     document.body.style.overflow = '';
    // });

    // modal.addEventListener('click', (e)=>{
    //     if(e.target === modal){
    //         modal.classList.add('hide');
    //         modal.classList.remove('show');
    //         document.body.style.overflow = '';
    //     }
    // });

    // document.addEventListener('keydown', (e)=>{
    //     if(e.code === 'Escape'){
    //         modal.classList.add('hide');
    //         modal.classList.remove('show');
    //         document.body.style.overflow = '';
    //     }
    // });

    // Slider
    const slides = document.querySelectorAll('.offer__slide');
    const prev = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    const total = document.querySelector('#total');
    const current = document.querySelector('#current');

    let slideIndex = 1;

    showSlide(slideIndex);
    if(slides.length < 10){
        total.textContent = `0${slides.length}`;
    }else{
        total.textContent = slides.length;
    }
    function showSlide(n){
        if(n > slides.length){
            slideIndex = 1;
        }
        if(n < 1){
            slideIndex = slides.length;
        }
        slides.forEach(item => {
            item.classList.add('offer__slide_hidden');
            item.classList.remove('offer__slide_active');
        });
        slideActive();
        function slideActive(){
            slides[slideIndex - 1].classList.remove('offer__slide_hidden');
            slides[slideIndex - 1].classList.add('offer__slide_active');
        }
        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        }else{
            current.textContent = slideIndex;
        }
    }
    function plusSlides(n){
        showSlide(slideIndex += n);
    }

    prev.addEventListener('click', ()=>{
        plusSlides(-1);
    });
    next.addEventListener('click', ()=>{
        plusSlides(1);
    });
});