import React from "react";
import './Visualiser.css';
import { getBubbleSort } from "../Algorithms/BubbleSort";
import { getSelectionSort } from "../Algorithms/SelectionSort";
import ControlPanel from "../Components/ControlPanel.jsx";


/*********** Intial concept of visualier and testing method came from the following tutorial:
 *  https://www.youtube.com/watch?v=pFXYym4Wbkc&ab_channel=Cl%C3%A9mentMihailescu ***********************/

class Visualiser extends React.Component {
    constructor(props) {
        super (props);

        this.state = {
            listOfNums: [],
        };
    }

    //when page loads/renders, refresh everything
    componentDidMount () {
        this.resetListOfNums();
    }

    resetListOfNums= async () => {
        const listOfNums = [];
        for (let i = 0; i <10; i++) { //limited the array size to 10 for simplicity with the mvp
            listOfNums.push(randomNumGenerator (5,500)) // numbers are between 5  and 500 so that bars are neither too big or too small on screen.
        }
        this.setState({listOfNums});

        //to reset the bars back to the default colour
        const numBars = document.getElementsByClassName('numBar');
        for (let i = 0; i<numBars.length; i++) {
          numBars[i].style.backgroundColor = '#b8b8c7';
        }     
        
        const numBarLabels = document.getElementsByClassName('numBarLabel');
        for (let i = 0; i<numBarLabels.length; i++) {
          numBarLabels[i].innerHTML = listOfNums[i];
        } 
    }


    bubbleSort = async () => {
      let [animations] = getBubbleSort(this.state.listOfNums);
      var test = getBubbleSort(this.state.listOfNums);
      var test1 = test[1];
      // console.log(test1);//  FOR DEBUGGING

      for (let i = 0; i<animations.length; i++) {
        //animation array is organised into groups of 4
        //the first two entries highlight a comparison of a pari, then revert that pair back to a normal state.
        const isColourChange = (i % 4 === 0 ) || (i % 4 === 1);
        const numBars = document.getElementsByClassName('numBar');
        const numBarLabels = document.getElementsByClassName('numBarLabel');
        if (isColourChange === true) {
          const color = (i % 4 === 0) ? 'red' : '#b8b8c7';
          const [bard1Index, bar2Index] = animations[i];
          const bar1Style = numBars[bard1Index].style;
          const bar2Style = numBars[bar2Index].style;
          
          setTimeout(() => { //comparing two bars
            bar1Style.backgroundColor = color;
            bar2Style.backgroundColor = color;
          }, i * 200);

          //if not in one of the first two (of four) animation entries, then must either be a swap of that pair, or an indication to ignore
        } else {
          const [barIndex, newHeight] = animations[i];
          if (barIndex === -1) {
            continue;
          }
          const barStyle = numBars[barIndex].style;
          const barLabel = numBarLabels[barIndex];
          setTimeout(() => {
            barStyle.height = `${newHeight}px`;
            barLabel.innerHTML = newHeight;

            //marks bars as done if necessary
            if (animations[i].length === 3 || i === animations.length - 2) {
              barStyle.backgroundColor = 'green';
            }

          },i * 200);
      }

    }
  }

    selectionSort= async () => {
      let [animations] = getSelectionSort(this.state.listOfNums);
      var test = getSelectionSort(this.state.listOfNums);
      var test1 = test[1];
      // console.log(test1);//  FOR DEBUGGING
      // console.log(test[0]);
      var complete = true;
      const numBars = document.getElementsByClassName('numBar');
      const numBarLabels = document.getElementsByClassName('numBarLabel');

      //animation array is organised into groups of 4
      //the first two entries highlight a comparison of a pari, then revert that pair back to a normal state.
      for (let i = 0; i<animations.length; i++) {
        const isColourChange = (i % 4 === 0 ) || (i % 4 === 1);
        if (isColourChange === true) {
          const color = (i % 4 === 0) ? 'red' : '#b8b8c7';
          const [bard1Index, bar2Index] = animations[i];
          const bar1Style = numBars[bard1Index].style;
          const bar2Style = numBars[bar2Index].style;
          setTimeout(() => { //comparing two bars
            bar1Style.backgroundColor = color;
            bar2Style.backgroundColor = color;
          }, i * 200);

        //if not in one of the first two (of four) animation entries, then must either be a swap of that pair, or an indication to ignore
        } else { //making changes to a bar once used for comparison
          const [barIndex, newHeight] = animations[i];
          if (barIndex === -1) {
            continue;
          }
          const barStyle = numBars[barIndex].style;
          const barLabel = numBarLabels[barIndex];
          
          setTimeout(() => {
            barStyle.height = `${newHeight}px`;
            barLabel.innerHTML = newHeight;
            if (complete) {
              barStyle.backgroundColor = 'green';
              complete = false;
            } else {
              complete = true;
            }        
          },i * 200);
      }
    }
  }


    testAlgorithms= async () =>{
      for (let i = 0; i < 1000; i++) { //number of tests
        const listOfNums = [];
        const length = randomNumGenerator(1,100) //randomly generates the length of an array between 1 and 100
        for (let i = 0; i<length; i++) {
          listOfNums.push(randomNumGenerator(5,500)) //puts numbers into the test array between 5 and 500.
        }
        const defaultSortedArray = listOfNums.slice().sort((a,b) => a - b);

        const BSInput = getBubbleSort(listOfNums.slice());
        const BubbleSortedArray = BSInput[1];

        const SSInput = getSelectionSort(listOfNums.slice());
        const SelectionSortedArray = SSInput[1];

        if (checkEqual(defaultSortedArray, BubbleSortedArray) === true &&
        checkEqual(defaultSortedArray, SelectionSortedArray) === true) {
          console.log('All tests have passed');
        } else {
          console.log('Tests failed!');
          console.log('Expected array: ' + defaultSortedArray);
          console.log('Bubble sorted array: ' + BubbleSortedArray);
          console.log('Selection sorted array: ' + SelectionSortedArray);
        }    
      }
    }


    render() {
        const {listOfNums} = this.state;

        return (

          <React.Fragment>

            <ControlPanel             
              bubbleSort = {this.bubbleSort}
              resetListOfNums = {this.resetListOfNums}
              selectionSort = {this.selectionSort}
              testAlgorithms = {this.testAlgorithms}
            />
              

            <div className="numsContainer">
              {listOfNums.map((value, index) => (
                  <div 
                  className="numBar" 
                  key={index}
                  style = {{height: `${value}px`}}> <label className="numBarLabel"> {value}  </label></div> //had {value}
              ))}
            </div>
          </React.Fragment>
        );
    }
}


function randomNumGenerator (min,max) {
    return Math.floor((Math.random() * max) + min); //could change this to just be max!
}

function checkEqual (array1, array2) {
  if (array1.length !== array2.length) return false;
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
}


export default Visualiser;