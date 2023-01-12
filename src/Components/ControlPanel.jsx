import React from 'react';

class ControlPanel extends React.Component {

    state = {
        //could enter animation speeds, array size lists here if I want to extend the application
    };

    render () {
        return (
            <div className="controlPanel" id="controlPanel">
                <label className="labelHeader"> Algorithm Visualiser  </label>
                <button id="randomise" onClick = {() => this.props.resetListOfNums()}>Generate New Array</button>
                <button id="BubbleSort" onClick = {() => this.props.bubbleSort()}>Bubble Sort</button>
                <button id="SelectionSort" onClick = {() => this.props.selectionSort()}>Selection Sort</button>
                <button id="testAlgs" onClick = {() => this.props.testAlgorithms()}>Test Algorithms</button>
            </div>
        );
    }

}

export default ControlPanel;