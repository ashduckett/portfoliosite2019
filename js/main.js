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
    ts.delete(20);
    ts.write('iOS developer.');
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
            demoUrl: 'https://divingthailand.co.uk/'
        },
        {
            images: ['woodramModal1.png'],
            headerText: 'Woodram Construction',
            subheaderText: 'Getting a Construction Company Online',
            detail: 'Woodram offer a range of different services in the construction industry.',
            demoUrl: 'https://www.woodramconstruction.co.uk/'
                      
        },
        {
            images: ['10Radio.png'],
            headerText: '10 Radio',
            subheaderText: 'Promotion of a local radio station',
            detail: 'Giving something back to a community, this local radio station based in Wiveliscome needed some promotion.',
            demoUrl: '#'
                      
        }

    ];

    // let i = 0;

    for (let i = 0; i < learnMoreButtons.length; i++) {
        learnMoreButtons[i].addEventListener('click', (evt) => {
            evt.preventDefault();
            console.log(i)            
        
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

});