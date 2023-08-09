import React from 'react';

export default function AppNav() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Lynx</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/post">Post</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/test">test</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/count">Count Page</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/reg">Registration</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/auth">Auth</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
