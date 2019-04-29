import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import RefreshIcon from '@material-ui/icons/Refresh';
import Input from '@material-ui/core/Input';
import './TableToolbar.css';

export default class TableToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilterInput: false
        };
    }
    render() {
        const { tableTitle, onRefresh, onFilterHide } = this.props;

        const onFilterClick = () => {
            this.setState({ showFilterInput: !this.state.showFilterInput });
            onFilterHide();
        }

        return (
            <Toolbar
                className="root"
            >
                <div className="title">
                    <Typography variant="h6" id="tableTitle">
                        {tableTitle}
                    </Typography>
                </div>
                <div className="control-panel">
                    {this.state.showFilterInput
                        ?
                        <div className="filter-block">
                            <div className="filter-label">
                                <Typography variant="subtitle1">
                                    Filter by:
                            </Typography>
                            </div>
                            <div className="filter-input">
                                <Input onChange={this.props.onFilterChange} />
                            </div>
                        </div>
                        : null
                    }
                    <div className="actions">
                        <Tooltip title="Filter list" onClick={onFilterClick}>
                            <IconButton aria-label="Filter list">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Refresh list">
                            <IconButton aria-label="Refresh list" onClick={onRefresh}>
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </Toolbar>
        );
    }
};
