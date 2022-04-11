import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const AppMenuRAPE = () => {
  return (
    <div>
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <a class="brand-link" style={{"text-decoration": "none"}}>
          <span class="brand-text font-weight-light">PANAPO | RAPE</span>
        </a>
        <div class="sidebar">
          <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

              <li class="nav-item">
                <Link to={"/"} className="nav-link">
                  <i class="nav-icon far fa-calendar-alt"></i>
                  <p>
                    Panel de proyectos
                  </p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to={"/project"} className="nav-link">
                  <i class="nav-icon far fa-image"></i>
                  <p>
                    Gestión de proyectos
                  </p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  )
}
