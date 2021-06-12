

function Slider(){
    this.className = [];
    this.currentSlideIndex= 0;
    this.showPrevBtn= null;
    this.showNextBtn= null;
    this.slideBlock= null;
    this.arrSliders = null;
    this.slide= null;
    this.newArrSliders= null;
}
Slider.prototype.start = function(prevBtn,nextBtn,slide){
    let that = this;


    /* find elements in DOM */
    this.showPrevBtn = document.querySelector(prevBtn);
    this.showNextBtn = document.querySelector(nextBtn);
    this.slideBlock = document.querySelector(slide);
    this.arrSliders = Array.prototype.slice.call(document.querySelectorAll(slide));


    /* subscribe to events */
    this.showPrevBtn.addEventListener('click',function(e){
        that.onShowPrevBtnClick(e); 
    });
    this.showNextBtn.addEventListener('click',function(e){
        that.onShowNextBtnClick(e);
       
    });

    /* find all sliders */
    this.newArrSliders = this.arrSliders.map((el, index)=>{
        el.id = index;
        el.style.display = 'none';
        return el;
    });

    this.newArrSliders[this.currentSlideIndex].style.display = 'block';
    this.showPrevBtn.disabled=true;


    /* description behavior button */
    this.onShowPrevBtnClick = function (e) {
        this.newArrSliders[this.currentSlideIndex].style.display = 'none';
        this.currentSlideIndex--;
        this.newArrSliders[this.currentSlideIndex].style.display = 'block';
        this.showNextBtn.disabled = false;
        if (this.currentSlideIndex === 0) {
            this.showPrevBtn.disabled = true;
        }
    };
    this.onShowNextBtnClick = function (e) {
        this.newArrSliders[this.currentSlideIndex].style.display = 'none';
        this.currentSlideIndex++;
        this.newArrSliders[this.currentSlideIndex].style.display = 'block';
        this.showPrevBtn.disabled = false;
        if (this.currentSlideIndex === (this.newArrSliders.length - 1)) {
            this.showNextBtn.disabled = true;
        }
    }
}