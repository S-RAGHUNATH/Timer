const DurationInput = document.querySelector('#duration');
const startTimer = document.querySelector('#startTime')
const stopTimer = document.querySelector('#stopTime');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r')* 2* Math.PI //perimeter of a circle = 2PIr
circle.setAttribute('stroke-dasharray', perimeter); 
//setting value for one of the circle methods say 'stroke-dasharray'

let duration;
let abc = new Timer(DurationInput, startTimer, stopTimer, {
    onstart(totalDuration){
        duration = totalDuration;
        console.log('timer started');
    },
    onTick(remainingDuration){
        currentOffset = (perimeter * remainingDuration)/ duration - perimeter; //formula to calcualte dashoffset value
        circle.setAttribute('stroke-dashoffset', currentOffset); 
        //setting value for one of the circle methods say 'stroke-dashoffset'
        currentOffset = currentOffset - 1;
        //to visualyy reduce the timing 
    },
    onComplete(){
        console.log('timer completed');
    }
});
