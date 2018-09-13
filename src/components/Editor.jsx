import React, { Component} from 'react';
import RichTextEditor from 'react-rte';

class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: RichTextEditor.createValueFromString(props.content, 'html')
        }

        this.onChange = this.onChange.bind(this);

    }

    onChange(value) {
        this.setState({value: value});
        if (this.props.onChange) {
            this.props.onChange(value.toString('html'));
        }
    }

    render () {
        return (
            <RichTextEditor
                value={this.state.value}
                onChange={this.onChange}
            />
        );
    }
}

export default Editor;