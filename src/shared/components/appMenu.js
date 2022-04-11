import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const AppMenu = () => {
  return (
    <div>
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <a class="brand-link" style={{textDecoration: "none"}}>
          <span class="brand-text font-weight-light">PANAPO | Coordinador</span>
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
              <li class="nav-item">
                <Link to={"/projectRD"} className="nav-link">
                  <i class="nav-icon far fa-image"></i>
                  <p>
                    Gestión de proyectos RD
                  </p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to={"/projectrape"} className="nav-link">
                  <i class="nav-icon far fa-image"></i>
                  <p>
                    Gestión de proyectos RAPE
                  </p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to={"/personal"} className="nav-link">
                  <i class="nav-icon far fa-calendar-alt"></i>
                  <p>
                    Gestión de personal
                  </p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to={"/user"} className="nav-link">
                  <i class="nav-icon far fa-calendar-alt"></i>
                  <p>
                    Gestión de usuarios
                  </p>
                </Link>
              </li><li class="nav-item">
                <Link to={"/direction"} className="nav-link">
                  <i class="nav-icon far fa-calendar-alt"></i>
                  <p>
                    Gestión de usuarios de alta dirección
                  </p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to={"/client"} className="nav-link">
                  <i class="nav-icon far fa-calendar-alt"></i>
                  <p>
                    Gestión de clientes
                  </p>
                </Link>
              </li>
              <li class="nav-item">
              <Link to={"/role"} className="nav-link">
                  <i class="nav-icon far fa-image"></i>
                  <p>
                    Gestión de roles
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
