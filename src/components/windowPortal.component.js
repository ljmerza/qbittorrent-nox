import { PureComponent } from 'react';
import ReactDOM from 'react-dom';

class WindowPortal extends PureComponent {
    constructor(props) {
        super(props);
        this.containerEl = document.createElement('div');
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.containerEl);
    }

    componentDidMount() {
        window.document.body.appendChild(this.containerEl);
    }

    componentWillUnmount() {
        window.document.body.removeChild(this.containerEl);
    }
}

export default WindowPortal;
