import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/home/layout/layout.component';
import { LandingComponent } from './pages/home/landing/landing.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: LandingComponent
            }
        ]
    }
];
