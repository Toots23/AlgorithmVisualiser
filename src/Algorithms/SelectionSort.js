export function getSelectionSort(array) {
    let animations = [];
    let helperArray = array.slice(); //gets a copy of the array passed in
    SelectionSort(helperArray,animations);
    array = helperArray;
    return [animations,array];
}

//animations are done in groups of 4. First two activate and revert colours of pair. Second two are the actual changes that need to be animated between a pair of bars. 
//-1 used to signal no change needed for the pair that was just compared.
function SelectionSort(helperArray,animations) {
    for (let i = 0; i < helperArray.length;i++) {
        let min_index = i;
        //push once for focus colour, push again to revert back to the original colour
        for (let j = i+1; j<helperArray.length;j++) {      
            animations.push([min_index,j]);
            animations.push([min_index,j]);
            
            if (helperArray[j] < helperArray[min_index]) {
                min_index = j;
            }
            //if at the last index position but not at the end of "group of 4" animations, insert -1 to complete the group of 4 before i moves to new position and starts next group
            if (animations.length %4 !== 0 && j < helperArray.length -1) {
                animations.push([-1, -1]); 
                animations.push([-1,-1]); 
            }
        }
        //to make sure the last index is included in the ainamation change
        if (i === helperArray.length-1) {
            animations.push([i,i ]); 
            animations.push([i,i]); 
        }
        //takes the minimum for that round/iteration and adds to the list of animations (switches place with value at index i)
        animations.push([i,helperArray[min_index]]);
        animations.push([min_index,helperArray[i]]);
        swap(helperArray,i,min_index);
            
        
        
    }
}

function swap (array, index1, index2) {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}