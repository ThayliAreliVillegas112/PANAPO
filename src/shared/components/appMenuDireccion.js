import { Link, useNavigate } from 'react-router-dom';
import React from 'react'

export const AppMenuDireccion = () => {
  return (
    <div>
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <a class="brand-link" style={{"text-decoration": "none"}}>
          <span class="brand-text font-weight-light">PANAPO | Alta dirección</span>
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
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  )
}
