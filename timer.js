class Timer {

    constructor(DurationInput, startTimer, stopTimer, callbacks) {
        this.DurationInput = DurationInput;
        this.startTimer = startTimer;
        this.stopTimer = stopTimer;
        if(callbacks){
            this.onstart = callbacks.onstart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startTimer.addEventListener('click', this.start.bind(this));
        // not "this.start()" as it ll execute directly without clicking
        //the first argument of bind(), call(), apply() is 'this'

        this.stopTimer.addEventListener('click', this.pause);
        //using arrow function for pause instead of using .bind() here
    }

    start() {

        if(this.onstart) this.onstart(this.timeRemaining);
           //this.timeRemaining is passed as an argument to this.onstart as we need starting time
        this.tick // first tick shd not have interval of 1 sec hence called it once before using it inside setInterval
        this.interval = setInterval(this.tick.bind(this), 50);  //reducing from 1000ms to 50ms for smooth animation
        //setting it to the object "this.interval" rather than the variable "interval" so u can use it in other methods
    }
    //start = () => console.log(this).  //no need to use bind() for a arrow func

    tick() {
        if (this.timeRemaining <= 0){
            this.pause();
            if(this.onComplete) this.onComplete();
        }
        else{
            this.timeRemaining = this.timeRemaining - 0.05; //0.05=50ms
            if(this.onTick) this.onTick(this.timeRemaining);
            //this.timeRemaining is passed as an argument to this.onTick as we need remaining time
        }
        //this.timeRemaining is not a func. Instead getter and setter is called here
    }

    pause = () => {
        clearInterval(this.interval);  //clearInterval - to stop setInterval running
    }

    get timeRemaining() {  //getter - so can use it across mthds
        return parseFloat(this.DurationInput.value);
    }

    set timeRemaining(time){   //setter - so can use it across mthds
        this.DurationInput.value = time.toFixed(2);  //toFixed(2) >> roundoff to 2
    }
    
}