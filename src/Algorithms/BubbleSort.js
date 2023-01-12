export function getBubbleSort(array) {
    let animations = [];
    let helperArray = array.slice(); // gets a copy of the array passed in
    bubbleSort(helperArray,animations);
    array = helperArray;
    return [animations,array];
}



/*********** Idea to have animation array organised into groups of four came from the following tutorial:
 *  https://www.youtube.com/watch?v=pFXYym4Wbkc&ab_channel=Cl%C3%A9mentMihailescu ***********************/


//animations are done in groups of 4. First two activate and revert colours. Second two are the actual changes that need to be animated between a pair of bars. 
//-1 used to signal no change needed for the pair that was just compared.
function bubbleSort(helperArray,animations) {
    for (let i = 0; i < helperArray.length-1;i++) {
        //last index will be finalised first before incrementing down. This counter keeps track of which indexes we have finalised
        let counter = helperArray.length - i - 1;

        for (let j = 0; j<helperArray.length - i - 1;j++) {
            
            //push once to activate the 'focus' colour
            //push again to revert back to the original colour
            animations.push([j,j+1]);
            animations.push([j,j+1]);

            if (helperArray[j] > helperArray[j+1]) {
                
                //this checks to see if a final move has been made to an index so that we can change to show completed
                if (j+1 === counter) {
                    animations.push([j,helperArray[j+1]]);
                    animations.push([j+1,helperArray[j],'done']);
                    swap(helperArray,j,j+1);
                } else {
                    animations.push([j,helperArray[j+1]]);
                    animations.push([j+1,helperArray[j]]);
                    swap(helperArray,j,j+1);
                }
            //if already in right order but we have reached the next index to finalise then indicate that in the animations array. Else indicate no change needed (-1)
            } else {
                if (j+1 === counter) {
                    animations.push([j,helperArray[j]]);
                    animations.push([j+1,helperArray[j+1],'done']);
                } else {
                    //push -1 to avoid any animations in the final array
                    animations.push([-1, -1]);
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