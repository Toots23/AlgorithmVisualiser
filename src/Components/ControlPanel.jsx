import React from 'react';

class ControlPanel extends React.Component {

    state = {
        Algorithms: [
			{ value: 1, type: 'Bubble Sort' },
			{ value: 2, type: 'Selection Sort' },
		],
		lengths: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
		speeds: [0.50, 0.75, 1.00, 2.00, 4.00]
    };

    render () {
        return (
            <div className="controlPanel" id="controlPanel">
                <label className="labelHeader"> Algorithm Visualiser  </label>
                <button id="randomise" onClick = {() => this.props.resetListOfNums()}>Generate New Array</button>
                <button id="BubbleSort" onClick = {() => this.props.bubbleSort()}>Bubble Sort</button>
                <button id="SelectionSort" onClick = {() => this.props.selectionSort()}>Selection Sort</button>
                <button id="testAlgs" onClick = {() => this.props.testAlgorithms()}>Test Algorithms</button>
                {/* <Algorithms 
                    onChange = {this.props.onChange}
                    algorithms = {this.state.Algorithms}
                />
                <Size 
                    onChange = {this.props.onChange}
                    lengths = {this.state.lengths}
                />
                <Speed 
                    onChange = {this.props.onChange}
                    speeds = {this.state.speeds}
                /> */}
            </div>
        );
    }

}

export default ControlPanel;