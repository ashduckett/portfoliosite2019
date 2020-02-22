function ModalModel(data) {
    this.currentSlide = 0;
    this.data = data;
    this.images = data.images;
}

ModalModel.prototype.getImages = function() {
    return this.images;
};

ModalModel.prototype.getHeaderText = function() {
    return this.data.headerText;
};

ModalModel.prototype.getSubheaderText = function() {
    return this.data.subheaderText;
};

ModalModel.prototype.getDemoUrl = function() {
    return this.data.demoUrl;
};

function ModalView(controller) {
    this.currentSlide = controller.getCurrentSlide();
    this.controller = controller;

    const imagesArray = controller.getImages();
    this.slides = [];
    this.modalElement = document.createElement('div');
    this.modalElement.style.height = '714px';
    this.modalElement.style.width = '700px';
    this.modalElement.style.backgroundColor = 'red';
    this.modalElement.style.position = 'fixed';
    this.modalElement.style.overflow = 'hidden';
    this.modalElement.style.display = 'flex';
    this.modalElement.style.flexDirection = 'column';
    this.modalElement.style.zIndex = '1';
    this.modalElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.4)';

    document.body.appendChild(this.modalElement);

    this.modalElement.style.left = document.documentElement.clientWidth / 2 - this.modalElement.clientWidth / 2 + 'px';
    this.modalElement.style.top = document.documentElement.clientHeight / 2 - this.modalElement.clientHeight / 2 + 'px';

    const topSection = document.createElement('div');
    topSection.style.height = '450px';
    topSection.style.width = '100%';
    topSection.style.backgroundColor = 'purple';
    topSection.style.position = 'relative';
    this.modalElement.appendChild(topSection);


    

    const leftArrowContainer = document.createElement('div');
    leftArrowContainer.style.height = '66px';
    leftArrowContainer.style.width = '66px';
    leftArrowContainer.style.backgroundColor = 'black';
    leftArrowContainer.style.top = '100%';
    leftArrowContainer.style.transform = 'translateY(-100%)';
    leftArrowContainer.style.position = 'absolute';
    leftArrowContainer.style.zIndex = '1';

    leftArrowContainer.style.display = 'flex';
    leftArrowContainer.style.justifyContent = 'center';
    leftArrowContainer.style.alignItems = 'center';
    leftArrowContainer.style.fontSize = '16pt';
    leftArrowContainer.style.color = 'white';
    leftArrowContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    leftArrowContainer.innerHTML = '<i class="fas fa-chevron-left"></i>';
    leftArrowContainer.style.cursor = 'pointer';

    topSection.appendChild(leftArrowContainer);

    const rightArrowContainer = document.createElement('div');
    rightArrowContainer.style.height = '66px';
    rightArrowContainer.style.width = '66px';
    rightArrowContainer.style.backgroundColor = 'black';
    rightArrowContainer.style.top = '100%';
    rightArrowContainer.style.left = '100%';
    rightArrowContainer.style.transform = 'translateY(-100%) translateX(-100%)';
    rightArrowContainer.style.position = 'absolute';
    rightArrowContainer.style.zIndex = '1';

    rightArrowContainer.innerHTML = '<i class="fas fa-chevron-right"></i>';
    rightArrowContainer.style.display = 'flex';
    rightArrowContainer.style.justifyContent = 'center';
    rightArrowContainer.style.alignItems = 'center';
    rightArrowContainer.style.fontSize = '16pt';
    rightArrowContainer.style.color = 'white';
    rightArrowContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    rightArrowContainer.style.cursor = 'pointer';

    topSection.appendChild(rightArrowContainer);

    for (let image of imagesArray) {

        const r = Math.random() * 255;
        const g = Math.random() * 255;
        const b = Math.random() * 255;

        const slide = document.createElement('div');
        slide.style.backgroundColor = `RGB(${r}, ${g}, ${b})`;
        slide.style.height = '100%';
        slide.style.width = '100%';
        slide.style.position = 'absolute';
        slide.style.display = 'none';
//        slide.classList.add('slide-' + index);
        slide.classList.add('slide');
        slide.style.backgroundImage = 'url(img/' + image + ')'
        slide.style.backgroundSize = '100%';
        this.slides.push(slide);
        topSection.appendChild(slide);
  //      index++;
    }

    this.slides[0].style.left = '0';
    this.slides[0].style.display = 'block';
    

    if (this.slides.length === 1) {
        leftArrowContainer.style.display = 'none';
        rightArrowContainer.style.display = 'none';
    }
    

    leftArrowContainer.onclick = () => {
        // Ensure that this stuff is set explicitly for the current slide.
        this.slides[this.controller.getCurrentSlide()].style.transition = 'none';
        this.slides[this.controller.getCurrentSlide()].style.left = '0';   
    
        setTimeout(() => {
            // Now shift it to the right to hide it, but animate this
            this.slides[this.controller.getCurrentSlide()].style.transition = 'left 1s linear'; 
            this.slides[this.controller.getCurrentSlide()].style.left = '100%';     

        }, 4);

        // Get hold of the next slide.
        const nextSlideIndex = this.controller.getCurrentSlide() === 0 ? this.slides.length - 1 : this.controller.getCurrentSlide() - 1;

        // Grab the next slide, and ensure it is on the right side.
        this.slides[nextSlideIndex].style.transition = 'none';
        this.slides[nextSlideIndex].style.left = '-100%';   
        this.slides[nextSlideIndex].style.display = 'block';

        setTimeout(() => {
            // Now shift it to the left to display it, but animate this
            this.slides[nextSlideIndex].style.transition = 'left 1s linear'; 
            this.slides[nextSlideIndex].style.left = '0';     
            
            if (this.controller.getCurrentSlide() !== 0) {
                this.controller.decrementSlideIndex();
            } else {
                // this.controller.zeroCurrentSlideIndex();
                this.controller.modalModel.currentSlide = this.slides.length - 1;
            }
        }, 4);
    };



    rightArrowContainer.onclick = () => {
        this.slides[this.controller.getCurrentSlide()].style.transition = 'none';
        this.slides[this.controller.getCurrentSlide()].style.left = '0';   
        
        setTimeout(() => {
            // Now shift it to the left to display it, but animate this
            this.slides[this.controller.getCurrentSlide()].style.transition = 'left 1s linear'; 
            this.slides[this.controller.getCurrentSlide()].style.left = '-100%';     

        }, 4);

        const nextSlideIndex = this.controller.getCurrentSlide() === this.slides.length - 1 ? 0 : this.controller.getCurrentSlide() + 1;

        // Grab the next slide, and ensure it is on the right side.
        this.slides[nextSlideIndex].style.transition = 'none';
        this.slides[nextSlideIndex].style.left = '100%';   
        this.slides[nextSlideIndex].style.display = 'block';


        setTimeout(() => {
            // Now shift it to the left to display it, but animate this
            this.slides[nextSlideIndex].style.transition = 'left 1s linear'; 
            this.slides[nextSlideIndex].style.left = '0';     
            
            if (this.controller.getCurrentSlide() !== this.slides.length - 1) {
                this.controller.incrementSlideIndex();
            } else {
                this.controller.zeroCurrentSlideIndex();
            }
        }, 4);
    }

    // Modal footer
    const footer = document.createElement('div');
    footer.style.height = '100px';
    footer.style.width = '100%';
    footer.style.backgroundColor = 'white';
    footer.style.paddingLeft = '25px';
    footer.style.paddingTop = '35px';
    footer.style.paddingRight = '60px';
    footer.style.flexGrow = '1';


    footer.classList.add('modal-footer');
    this.modalElement.appendChild(footer);


    const footerHeader = document.createElement('h1');
    footerHeader.textContent = this.controller.getHeaderText();
    footerHeader.style.fontFamily = 'Raleway';
    footerHeader.style.fontSize = '22pt';
    footerHeader.style.color = 'RGB(68, 68, 68)';
    footer.appendChild(footerHeader);

    const footerSubHeader = document.createElement('h1');
    footerSubHeader.textContent = this.controller.getSubheaderText();
    footerSubHeader.style.fontFamily = 'Raleway';
    footerSubHeader.style.fontSize = '11pt';
    footerSubHeader.style.textTransform = 'uppercase';
    footerSubHeader.style.color = '#c0c0c0';
    footerSubHeader.style.fontWeight = '800';
    footerSubHeader.style.paddingBottom = '15px';
    footerSubHeader.style.borderBottom = 'rgba(0, 0, 0, 0.1) solid 1px';
    footer.appendChild(footerSubHeader);

    const footerDetail = document.createElement('p');
    footerDetail.textContent = this.controller.modalModel.data.detail;
    footerDetail.style.fontSize = '11pt';
    footerDetail.style.fontFamily = 'Raleway';
    footerDetail.style.paddingTop = '15px';
    footerDetail.style.paddingBottom = '60px';
    footer.appendChild(footerDetail);

    const footerBottomStrip = document.createElement('div');
    // footerBottomStrip.style.height = '10px';
    footerBottomStrip.style.width = '100%';
    footerBottomStrip.style.backgroundColor = 'white';
    footerBottomStrip.style.paddingLeft = '25px';
    footerBottomStrip.style.paddingBottom = '20px';
    footerBottomStrip.style.display = 'flex';
    footerBottomStrip.style.justifyContent = 'space-between';
    footerBottomStrip.style.alignItems = 'center';
    this.modalElement.appendChild(footerBottomStrip)

    // Create button
    const viewDemo = document.createElement('a');
    viewDemo.innerHTML = 'View Site';
    viewDemo.href = this.controller.getDemoUrl();

    if (this.controller.getDemoUrl() === '#') {
        viewDemo.addEventListener('click', (e) => {
            e.preventDefault();
        });
    }



    viewDemo.setAttribute('target', '_blank');
    viewDemo.style.fontSize = '10pt';
    viewDemo.style.fontWeight = '600';
    viewDemo.style.textTransform = 'uppercase';
    viewDemo.style.padding = '11px 30px';
    viewDemo.style.backgroundColor = '#e31b6d';
    viewDemo.style.textDecoration = 'none';
    viewDemo.style.color = 'white';
    viewDemo.style.fontFamily = 'Raleway';
    footerBottomStrip.appendChild(viewDemo);
    
    // Close button
    const closeButton = document.createElement('a');
    closeButton.href = '#';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.style.padding = '0 30px';
    closeButton.style.fontSize = '20pt';
    closeButton.style.color = '#bbb';

    // Close button just needs to remove the modal from the DOM.
    closeButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.modalElement.parentNode.removeChild(this.modalElement)
    });

    footerBottomStrip.appendChild(closeButton);
}

function Modal(data) {
    this.modalModel = new ModalModel(data);
    this.modalView = new ModalView(this);
    this.slides = [];
};

Modal.prototype.getCurrentSlide = function() {
    return this.modalModel.currentSlide;
};

Modal.prototype.incrementSlideIndex = function() {
    this.modalModel.currentSlide++;
};

Modal.prototype.decrementSlideIndex = function() {
    this.modalModel.currentSlide--;
};

Modal.prototype.zeroCurrentSlideIndex = function() {
    this.modalModel.currentSlide = 0;
};

Modal.prototype.getImages = function() {
    return this.modalModel.getImages();
};

Modal.prototype.getHeaderText = function() {
    return this.modalModel.getHeaderText();
};

Modal.prototype.getSubheaderText = function() {
    return this.modalModel.getSubheaderText();
};

Modal.prototype.getDemoUrl = function() {
    return this.modalModel.getDemoUrl();
};
