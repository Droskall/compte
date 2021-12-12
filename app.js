let id = 0;

class CountDown {
    constructor(){
        this.time = document.getElementById("inputSec").value * 1000;
        this.display = document.getElementById('id' + id);
        this.intervalID = null;
        this.pause = false;
        this.start();
    }

    // Countdown function !
    timer(){
        this.display.innerHTML = this.getHours() +':'+this.getMinutes() +':'+ this.getSeconds()+':'+ this.getMilliSeconds();

        if (this.time > 0){
            this.time -= 100;
        }
        else{
            this.display.style.color = "red";
            this.display.innerHTML = "Fini";
            clearInterval(this.intervalID);
        }
    }

    //Function to initiate the countdown
    start(){
        this.intervalID = setInterval(this.timer.bind(this), 100);
        return this.intervalID;
    }

    //Time recovery
    getHours(){
        let hour = Math.floor((this.time / (1000 * 60 * 60)));
        return hour < 10 ? '0' + hour : hour ;
    }

    //Minute recovery
    getMinutes(){
        let min = Math.floor((this.time / (1000 * 60)) % 60 );
        return min < 10 ? '0' + min : min;
    }

    //Recovery of seconds
    getSeconds(){
        let sec = Math.floor((this.time / 1000) % 60);
        return sec < 10 ? '0' + sec : sec;
    }

    //Milliseconds recovery
    getMilliSeconds(){
        let mSec = Math.floor((this.time / 100) % 10);
        return mSec < 10 ? '0' + mSec : mSec;
    }

    //Function to pause the countdown
    stop(){
        if(this.pause){
            clearInterval(this.intervalID);
        }else{
            this.start();

        }
    }
}

// Function to create countdowns
function createEl(){
    let elementContent = document.createElement('div');
    elementContent.id = "content" + id;
    document.getElementById("container").append(elementContent);

    let element = document.createElement("div");
    element.id = "id" + id;
    element.className = "create";
    elementContent.append(element);

    let btnPause = document.createElement("button");
    btnPause.id = "btnPause" + id;
    btnPause.innerHTML = "Pause";
    elementContent.append(btnPause);

    let btnReset = document.createElement("button");
    btnReset.id = "btnReset" + id;
    btnReset.innerHTML = "Reset";
    elementContent.append(btnReset);
}

// Button to create a countdown when clicking
document.getElementById('createBtn').addEventListener('click', () => {
    createEl();
    let compteur = new CountDown();

    //Button that calls the object's pause function
    document.getElementById('btnPause' + id).addEventListener('click', () => {
        compteur.pause ?  compteur.pause = false : compteur.pause = true;
        compteur.stop();
    });

    //Button that resets the countdown
    document.getElementById('btnReset' + id).addEventListener('click', () => {
        clearInterval(compteur.intervalID);
        compteur.display.parentElement.remove();
    });

    //Incrementation of the id for the creation of the elements !
    id++;
});