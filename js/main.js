document.addEventListener('DOMContentLoaded', () => {



    const el = document.getElementsByClassName('skills');
    console.log(el)


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
});