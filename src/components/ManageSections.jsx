import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import {addSection, deleteSection, updateSectionOrder} from "../actions";
import TextField from "@material-ui/core/TextField";

const headerStyle = {
    fontSize : '45px',
    marginBottom : '10px',
    marginTop: '30px',
    clear: 'both'
};

const alignRight = {
    float: 'right'
};

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

const DragHandle = SortableHandle(() => <span style={{cursor : "pointer"}} ><Icon>drag_indicator</Icon></span>);

const SortableItem = SortableElement(({idx, onRemove, value}) =>
    <ListItem style={{
        background:"white",
        marginBottom:"2px",
        userSelect:"none",
        WebkitUserSelect:"none"
    }}><DragHandle />
    <ListItemText>{value}</ListItemText>
        <Button onClick={() => onRemove(idx)} style={alignRight}>
            <Icon>delete_icon</Icon>
        </Button>
    </ListItem>
);

const SortableList = SortableContainer(({items, onRemove}) => {
    // For some reason we need to pass a new key (idx)
    // to pass the actual index of this sections so we
    // can process it later
    return (
        <List>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} idx={index} value={value.title} onRemove={onRemove} />
            ))}
        </List>
    );
});

class ManageSections extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            modal: false,
            title: ''
        };
    }

    componentDidMount() {

        let items = [];
        this.props.sections.forEach(function(s) {
            items.push(s);
        });

        this.setState({
            'items' : items
        })
    }
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
        this.props.updateSectionOrder(this.state.items);
    };

    handleAddModalOpen = () => {
        this.setState({
            modal: true,
            modalTitle : "Add section",
            modalContent : <TextField
            label="Section title"
            InputLabelProps={{
                shrink: true,
            }}
            onChange={ this.handleTitleChange }
            placeholder="Type your section title"
            fullWidth
            margin="normal"
            />,
            modalAction:'add'
        })

    };
    handleModalClose = () => {
        this.setState({
            modal: false
        });
    };
    handleTitleChange = event  => {
        this.setState({
            'title' : event.target.value
        })
    };
    handleRemoveModalOpen = (index) => {

        this.setState({
            modal:true,
            modalTitle : 'Delete section?',
            modalContent: <p>Testing</p>,
            modalAction: 'remove',
            sectionIndex: index
        });

    };
    addNewSection = () => {
        let items = this.state.items;
        items.push({
            title : this.state.title,
            content: ''
        });

        this.setState({
            items,
            modal: false
        });

        this.props.updateSectionOrder(this.state.items);
    };
    removeSection = () => {
        let sections = this.props.deleteSection(this.state.sectionIndex);

        this.setState({
            items: sections.sections,
            modal: false
        });
    };

    renderModal() {
        const { classes } = this.props;

        let action;
        if(this.state.modalAction==='add') {
            action = this.addNewSection
        }
        if(this.state.modalAction==='remove') {
            action = this.removeSection
        }

        return (
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.modal}
            onClose={this.handleModalClose}
        >
            <div style={getModalStyle()} className={classes.paper}>
                <Typography variant="title" id="modal-title">
                    {this.state.modalTitle}
                </Typography>
                {this.state.modalContent}
                <p>
                    <Button variant="contained" color="primary" onClick={action}>Accept</Button>&nbsp;
                    <Button variant="contained" color="secondary" onClick={this.handleModalClose}>Close</Button>
                </p>
            </div>
        </Modal>
        )
    }

    render() {

        return(
        <div>
            <Typography variant="headline">
                <div style={headerStyle}>Manage Sections</div>
                <div>
                    <p>
                        I created this as a bit of an experiment to see how we might
                        approach managing dynamic page content in React + Redux
                    </p>
                    <p>
                        The sections can be ordered by drag and drop and this is replicated
                        in the order of items in the navigation and throughout the site.
                    </p>
                    <p>
                        New sections can be created and deleted.
                    </p>
                </div>
            </Typography>
            <SortableList items={this.state.items} onSortEnd={this.onSortEnd} onRemove={(index) => this.handleRemoveModalOpen(index)} useDragHandle={true}/>
            <Button variant="contained" color="primary" onClick={this.handleAddModalOpen}>ADD NEW</Button>
            {this.renderModal()}
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        sections: state.manageSections
    }
}

export default connect(mapStateToProps, {addSection, deleteSection, updateSectionOrder})(withStyles(styles)(ManageSections));