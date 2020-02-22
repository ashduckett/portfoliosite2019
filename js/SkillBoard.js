class Skill {
    constructor(label, percent) {
        this.label = label;
        this.percent = percent;
    }
}

class SkillView {

}




class SkillBoard {
    constructor(canvas) {
        console.log(canvas);
        this.canvas = canvas;
        this.data = [
            {
                label: 'HTML',
                percent: 96
            },
            {
                label: 'CSS',
                percent: 87
            },
            {
                label: 'SASS',
                percent: 81
            },
            {
                label: 'PHP',
                percent: 78
            },
            {
                label: 'Laravel',
                percent: 35
            },
            {
                label: 'JavaScript',
                percent: 79
            },
            {
                label: 'ES6',
                percent: 77
            },
            {
                label: 'Vue',
                percent: 66
            },
            {
                label: 'UI Design',
                percent: 50
            },
            {
                label: 'Swift',
                percent: 69
            },
            {
                label: 'SQL',
                percent: 77
            }
        ];
    }

    render() {
        // We need an element for each skill
        for (let skill of this.data) {

            // Create a new container for the current skill
            const skillContainer = document.createElement('div');
            skillContainer.classList.add('skill-container');

            const skillLabel = document.createElement('div');
            skillLabel.classList.add('skill-label');

            skillLabel.innerHTML = skill.label;



            // Now the percent bar
            const skillPercentBar = document.createElement('div');
            skillPercentBar.style.width = '10px';
            skillPercentBar.style.height = '100%';
            skillPercentBar.style.backgroundColor = '#00A1A7';
            

            
            // Create an element to show the %
            const skillPercentageLabel = document.createElement('div');
            skillPercentageLabel.style.height = '100%';
            skillPercentageLabel.style.position = 'absolute';
            skillPercentageLabel.style.top = '0';
            skillPercentageLabel.style.left = '100%';
            skillPercentageLabel.style.transform = 'translateX(-100%)';
            skillPercentageLabel.style.display = 'flex';
            // skillPercentageLabel.style.backgroundColor = 'red';
            skillPercentageLabel.style.alignItems = 'center';
            skillPercentageLabel.style.paddingRight = '15px';
            skillPercentageLabel.innerHTML = skill.percent + '%';
            skillPercentageLabel.style.fontFamily = "Raleway";
            skillPercentageLabel.style.fontSize = '0.9rem';
            skillPercentageLabel.style.color = '#666';
            skillContainer.appendChild(skillPercentageLabel);


            skillContainer.appendChild(skillLabel);
            skillContainer.appendChild(skillPercentBar);
            this.canvas.appendChild(skillContainer);

            // Get the total width of the container
            const containerWidth = skillContainer.offsetWidth;

            // Remove the width of the label to the left
            const widthOfRemainingArea = containerWidth - 110;


            // Now assume a percentage of 50 and work out what width the percent area should take up
            console.log(this.data.percent)
            const percentArea = widthOfRemainingArea / 100 * skill.percent;
            skillPercentBar.style.width = percentArea + 'px';


        }

    }
}