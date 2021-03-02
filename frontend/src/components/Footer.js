import React, { Component } from 'react'
import GitHubIcon from '@material-ui/icons/GitHub';

export default class Footer extends Component {
    render() {
        return (
            <footer class="py-6 mt-auto">
                <div className="container text-muted">
                    <span>This page was elaborated by Raul Hernandez</span>
                <a class="float-right" href="https://github.com/rehcgt/torre" target="_blank" rel="noreferrer"><GitHubIcon /></a>
                </div>
            </footer>
        )
    }
}