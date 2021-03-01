import React, { useState } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios'

const columns = [
  { field: 'company', headerName: 'Company Name', width: 300 },
  { field: 'description', headerName: 'Description', width: 450 },
  { field: 'min_salary', headerName: 'Min Salary', width: 150 },
  { field: 'max_salary', headerName: 'Max Salary', width: 150 },
  { field: 'deadline', headerName: 'Deadline', type: 'date', width: 150 },
  { field: 'remote', headerName: 'Is Remote?', width: 100 },
  { field: 'type', headerName: 'Type', width: 150 },
  {
    field: 'apply_url', headerName: 'Apply', width: 200, valueGetter: (params) => 
    `<a href="${params.getValue("id")}">${params.getValue("id")}</a>`
  }
];

export default class JobsDataGrid extends React.Component {
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
