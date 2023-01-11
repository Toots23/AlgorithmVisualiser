export function getBubbleSort(array) {
    let animations = [];
    let helperArray = array.slice();
    bubbleSort(helperArray,animations);
    array = helperArray;
    return [animations,array];
}
//counter here?
function bubbleSort(helperArray,animations) {
    for (let i = 0; i < helperArray.length-1;i++) {
        let counter = helperArray.length - i - 1;
        for (let j = 0; j<helperArray.length - i - 1;j++) { //get comments for below from other video!! Will explain why pushing twice
            
            //push once to activate the 'focus' colour
            //push again to revert back to the original colour
            animations.push([j,j+1]);
            animations.push([j,j+1]);
            if (helperArray[j] > helperArray[j+1]) {
                
                //this checks to see if a final move has been made to an index so that we can change the colour to green,
                if (j+1 === counter) {
                    animations.push([j,helperArray[j+1]]);
                    animations.push([j+1,helperArray[j],'done']);
                    swap(helperArray,j,j+1);
                } else {
                    animations.push([j,helperArray[j+1]]);
                    animations.push([j+1,helperArray[j]]);
                    swap(helperArray,j,j+1);
                }
            //need a check here!
            } else {
                if (j+1 === counter) {
                    animations.push([j,helperArray[j]]);
                    animations.push([j+1,helperArray[j+1],'done']);
                } else {
                    //push -1 to avoid any animations in the final array
                    animations.push([-1, -1]); //????
                    animations.push([-1,-1]);
                }
                
            }
        }
    }
}


function swap (array, index1, index2) {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}