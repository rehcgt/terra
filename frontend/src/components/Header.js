import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <header>
                <div className="jumbotron p-4 p-md-5 text-white rounded bg-dark">
                    <div className="col-md-6 px-0">
                        <h1 className="display-4 font-italic">Torre.co Jobs Listing</h1>
                        <p className="lead my-3">On the grid below you'll find up to 1,000 jobs posted in <a href="https://torre.co/search/jobs" target="_blank" rel="noreferrer">torre.co</a> website.</p>                        
                    </div>
                </div>
            </header>
        )
    }
}
