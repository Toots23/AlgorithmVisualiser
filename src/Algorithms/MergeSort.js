// export const mergeSort = array => {
//     if (array.length == 1) return array;
//     const midPoint = Math.floor(array.legnth/2);
//     const first
// }

export function mergeSort(array) {
    const half = array.length / 2;
  
    // the base case is array length <=1
    if (array.length <= 1) {
      return array;
    }
  
    const left = array.splice(0, half); // the first half of the array
    const right = array;
    return merge(mergeSort(left), mergeSort(right));
  }



function merge(left, right) {
    let sortedArr = []; // the sorted elements will go here
  
    while (left.length && right.length) { //check youtube example here to make more readable/simple
      // insert the smallest element to the sortedArr
      if (left[0] < right[0]) {
        sortedArr.push(left.shift());
      } else {
        sortedArr.push(right.shift());
      }
    }

    return [...sortedArr, ...left, ...right];

  }