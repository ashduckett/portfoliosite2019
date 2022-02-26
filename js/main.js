document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementsByClassName('skills');

    const skillBoard = new SkillBoard(document.getElementsByClassName('skills')[0]);
    skillBoard.render();

    const canvas = document.getElementById('paper');
    canvas.width = 1000;
    canvas.height = 160;

    // Typing sim additions
    const ts = new TypingSimulator();

    ts.setTextAlign('center');
    ts.start();
    ts.write('Hello. My name is Ash.');
    ts.enter();
    ts.write('I am a front-end developer.')
    ts.delete(20);
    ts.write('fullstack developer.');
    ts.delete(21);
    ts.write('n iOS developer.');
    ts.delete(14);
    ts.write('all-round coding ninja.');

    // Sort out the learn buttons.
    const learnMoreButtons = document.getElementsByClassName('btn-learn');
    console.log(document.getElementsByClassName('btn-learn').length);

    const buttonData = [
        {
            images: ['diveModal1.png', 'diveModal2.png', 'diveModal3.png', 'diveModal4.png'],
            headerText: 'Dive Thailand',
            subheaderText: 'A promotional website for diving adventures',
            detail: 'Dive Thailand offer diving adventures for the tourist industry. The site involved matching a design precisely, making the site dynamic so it could be updated and building a basic CMS from scratch.',
            demoUrl: 'http://ashduckett.com/divethailand/'
        },
        {
            images: ['woodramModal1.png'],
            headerText: 'Woodram Construction',
            subheaderText: 'Getting a Construction Company Online',
            detail: 'Woodram offer a range of different services in the construction industry.',
            demoUrl: 'http://www.ashduckett.com/woodram/'
                      
        },
        {
            images: ['10Radio.png'],
            headerText: '10 Radio',
            subheaderText: 'Promotion of a local radio station',
            detail: 'Giving something back to a community, this local radio station based in Wiveliscome needed some promotion.',
            demoUrl: '#',
            medium: 'android'
                      
        }

    ];

    for (let i = 0; i < learnMoreButtons.length; i++) {
        learnMoreButtons[i].addEventListener('click', (evt) => {
            evt.preventDefault();
           
            if (i === 0) {
                modal = new Modal(buttonData[0]);
            } else if (i === 1) {

                modal = new Modal(buttonData[1]);
            } else {
                modal = new Modal(buttonData[2]);
            }
        });
    }


    // for (button of learnMoreButtons) {



    //     button.addEventListener('click', function(evt) {
    //         evt.preventDefault();
    //         console.log(i)
    //         // let modal = null;

    //         // if (i === 0) {
    //         //     modal = new Modal(buttonData[0]);
    //         // } else if (i === 1) {
    //         //     console.log('i was 1')
    //         //     modal = new Modal(buttonData[1]);
    //         // } else {
    //         //     modal = new Modal(buttonData[0]);
    //         // }
            
            
    //         // const modal = new Modal(buttonData[0]);
            
    //     });
    //     i++;
    // }

    const arrowScroll = (evt) => {
        evt.preventDefault();
        const top = document.querySelector('.section-intro').offsetTop;
        
        window.scroll({
            top: top,
            left: 0, 
            behavior: 'smooth'
        });
    };

    document.querySelector('.header__centerpiece__link').addEventListener('click', arrowScroll);
    document.querySelector('.header__scroll-arrow').addEventListener('click', arrowScroll);

    // Click event for submit button
    const submitButton = document.querySelector('.submit');
    
    submitButton.addEventListener('click', (evt) => {
        evt.preventDefault();

        const name = document.querySelector('.name').value;
        const email = document.querySelector('.email').value;
        const enquiry = document.querySelector('.enquiry').value;

        let fd = new FormData();
        fd.append('name', name);
        fd.append('email', email);
        fd.append('enquiry', enquiry);

        if (name && email && enquiry) {
            evt.target.innerHTML = 'Submit <i class="fas fa-spinner fa-pulse"></i>';
            fetch('http:/www.ashduckett.com/sendEmail.php', {
                method: 'POST',
                cors: 'no-cors',
                body: fd
            }).then(() => {
                evt.target.innerHTML = 'Submit';
                const thanks = document.querySelector('.thank-you');
                thanks.style.opacity = 1;

                setTimeout(() => {
                    thanks.style.opacity = 0;
                    document.querySelector('.name').value = '';
                    document.querySelector('.email').value = '';
                    document.querySelector('.enquiry').value = '';

                }, 5000);
            });
        }
        
    });

    window.addEventListener('scroll', () => {
        const menuItems = document.querySelectorAll('.nav__menu-item');

        if (window.scrollY === 0) {
            menuItems.forEach((menuItem) => {
                menuItem.classList.remove('nav__menu-item--hidden');
                menuItem.classList.add('nav__menu-item--show');
            });
            document.querySelector('.hamburger').classList.remove('hamburger--visible');
            document.querySelector('.nav__menu').classList.remove('nav__menu--hidden');
            
        } else {
            menuItems.forEach((menuItem) => {
                menuItem.classList.add('nav__menu-item--hidden');
                menuItem.classList.remove('nav__menu-item--show');
            });
            document.querySelector('.hamburger').classList.add('hamburger--visible');
            document.querySelector('.nav__menu').classList.remove('nav__menu--hidden');
            
        }
    });

    document.querySelector('.hamburger').addEventListener('click', () => {
        document.querySelector('.hamburger').classList.toggle('isActive');
        document.querySelector('.hamburger__altMenuContainer').classList.toggle('hamburger__altMenuContainer--show');
        document.querySelector('.altMenuItems').classList.toggle('altMenuItems--shown');
    });

    const relatedLocations = ['.header', '.section-intro', '.projects', '.contact'];
    // Get all of the mobile options
    const mobileOptions = document.querySelectorAll('.nav__mobileMenuItem a');

    for (let i = 0; i < mobileOptions.length; i++) {
        const mOption = mobileOptions[i];
        mOption.addEventListener('click', (evt) => {
            evt.preventDefault();
        
            // Now we just need to know which one was clicked.
            document.querySelector('.hamburger').classList.toggle('isActive');
            document.querySelector('.hamburger__altMenuContainer').classList.toggle('hamburger__altMenuContainer--show');
            document.querySelector('.altMenuItems').classList.toggle('altMenuItems--shown');
            let top = document.querySelector(relatedLocations[i]).offsetTop;
            window.scroll({top: top, left: 0, behavior: 'smooth'});
        });
    }

    // Now the same for the non-mobile bits
    const desktopOptions = document.querySelectorAll('.nav__menu-item-link');

    for (let i = 0; i < desktopOptions.length; i++) {
        const mOption = desktopOptions[i];
    
        mOption.addEventListener('click', (evt) => {
            evt.preventDefault();
            let top = document.querySelector(relatedLocations[i]).offsetTop;
            window.scroll({top: top, left: 0, behavior: 'smooth'});
        });
    }


    
});