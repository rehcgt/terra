import React, { Component } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios'
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const columns = [
  { field: 'company', headerName: 'Company Name', width: 300 },
  { field: 'description', headerName: 'Description', width: 550 },
  { field: 'min_salary', headerName: 'Min Salary', width: 150 },
  { field: 'max_salary', headerName: 'Max Salary', width: 150 },
  { field: 'deadline', headerName: 'Deadline', type: 'date', width: 150 },
  {
    field: 'remote', headerName: 'Is Remote?', width: 130,
    renderCell: (params) => (params.getValue("remote") === true ? <CheckIcon /> : <ClearIcon />)
  },
  { field: 'type', headerName: 'Type', width: 180 },
  {
    field: 'apply_url', headerName: 'Apply', width: 300,
    renderCell: (params) => (<a target="_blank" rel="noreferrer" href={params.getValue("apply_url")}>{params.getValue("apply_url")}</a>)
  }
];

export default class JobsDataGrid extends Component {
  state = {
    rows: []
  }

  componentDidMount() {
    axios.get('https://asi.com.gt/api/jobs/')
      .then(res => {
        console.log(res.data);
        const rows = res.data;
        this.setState({ rows });
      })
  }

  render() {
    return (
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid rows={this.state.rows} columns={columns} pageSize={50} checkboxSelection={false} />
      </div>
    )
  }
}
