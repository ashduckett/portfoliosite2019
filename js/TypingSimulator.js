class TypingSimulator {

    constructor() {
        this.finalString = [];
        this.currentChar = 0;
        this.string = '';
        this.shouldAddUnderscore = false;
        this.textAlign = null;
        this.time = new Date();
        this.underscoreTime = new Date();
        this.textSize = 30;
        this.textXLocation = document.getElementById('paper').width / 2;
        this.textYLocation = document.getElementById('paper').height / 2;

        document.getElementById('paper').width = document.body.clientWidth;
        document.getElementById('paper').height = innerHeight;

        if (innerWidth < 530) {
            this.textSize = 16;
        }


        // Change text location on window resize
        window.addEventListener('resize', () => {
            this.textXLocation = document.getElementById('paper').width / 2;
            this.textYLocation = document.getElementById('paper').height / 2;

            document.getElementById('paper').width = document.body.clientWidth;
            document.getElementById('paper').height = innerHeight;

            if (innerWidth < 530) {
                this.textSize = 16;
            } else {
                this.textSize = 30;
            }

        });
    }

    setTextAlign(alignment) {
        this.textAlign = alignment;
    }

    start() {
        requestAnimationFrame(this.draw.bind(this));
    }

    write(string) {
        this.finalString = this.finalString.concat(string.split(''));
    }

    delete(count) {
        for (var i = 0; i < count; i++) {
            this.finalString = this.finalString.concat([TypingSimulator.DeleteKey]);
        }
    }

    enter() {
        this.finalString = this.finalString.concat([TypingSimulator.EnterKey]);
    }

    draw() {
        // Get this fresh each frame.
        let currentTime = new Date().getTime();
 
        if (currentTime - this.underscoreTime.getTime() >= 250) {
            this.shouldAddUnderscore = !this.shouldAddUnderscore;
            this.underscoreTime = new Date();
        }
    
        const randomDelay = Math.floor(Math.random() * 1000);
        

        if (currentTime - this.time.getTime() >= randomDelay) {
            if (this.currentChar < this.finalString.length) {

                if (typeof this.finalString[this.currentChar] === 'string') {
                    this.string += this.finalString[this.currentChar];
                } else {
                    switch (this.finalString[this.currentChar]) {
                        case TypingSimulator.DeleteKey:
                            this.string = this.string.substring(0, this.string.length - 1); 
                            break;
                        case TypingSimulator.EnterKey:
                            this.string += '\n';
                            break;
                    }
                }
                this.currentChar++;
            } else {
                // Loops for now, unconditionally. I doubt anybody else will use this thing so I don't care right now.
                // this.currentChar = 0;
                // this.string = '';
                this.shouldRun = false;
            }
            this.time = new Date();
        }

        // Render
        var c = document.getElementById('paper');
        // c.width = document.body.clientWidth;
        // c.height = document.body.clientHeight
        this.textXLocation = document.getElementById('paper').width / 2;
        this.textYLocation = document.getElementById('paper').height / 2;

        document.getElementById('paper').width = document.body.clientWidth;
        document.getElementById('paper').height = innerHeight;
 
        var ctx = c.getContext("2d");
        ctx.font = this.textSize + "px Courier New";
        ctx.fillStyle = 'white';

        // Now break up the text into separate lines
        const strings = this.string.split('\n');
        //ctx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
        let currentY = this.textYLocation;

        // How do I know when not to show the underscore?

        let shouldAppendUnderscore = false;

        for (var i = 0; i < strings.length; i++) {

            if (i === strings.length - 1) {
                shouldAppendUnderscore = true;
            } else {
                shouldAppendUnderscore = false;
            }

            if (this.textAlign !== null) {
                ctx.textAlign = this.textAlign;
            }

            ctx.fillText((i > 0 ? '' : '>') + strings[i] + (this.shouldAddUnderscore && shouldAppendUnderscore ? '_' : ' '), this.textXLocation, currentY);    

            currentY += 50;
        }
        
        
        
        requestAnimationFrame(this.draw.bind(this));
    }
}

TypingSimulator.DeleteKey = 0;
TypingSimulator.EnterKey = 1;
TypingSimulator.AlignCentre = 3;