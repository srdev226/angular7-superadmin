import { Injectable } from '@angular/core';
@Injectable()
export class LoadScriptsService {
  constructor() { }

  loadScripts(page = '') {
    switch (page) {
        case 'customer-details':
            this.formatHead(customerDetailsScripts);
            break;
        case 'header':
            this.formatHead(headerScripts);
            break;
        case 'sidebar':
            this.formatHead(sidebarScripts);
            break;
        default:
            this.formatHead(allScripts);
    }
  }

  formatHead(scripts) {
    scripts.forEach(script => {
        const head = document.getElementsByTagName('head')[0];
        const scr = document.createElement('script');
        scr.src = script;
        head.appendChild(scr);
    });
  }
}

const allScripts = [
    '../assets/global/plugins/jquery.min.js',
    '../assets/global/plugins/bootstrap/js/popper.min.js',
    '../assets/global/plugins/bootstrap/js/bootstrap.min.js',
    '../assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js',
    '../assets/global/plugins/jquery-ui/jquery-ui.min.js',
    '../assets/global/plugins/select2/js/select2.full.min.js',
    '../assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
    // '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
    '../assets/global/scripts/app.min.js',
    '../assets/pages/scripts/components-select2.min.js',
    '../assets/pages/scripts/components-bootstrap-select.min.js',
    // '../assets/pages/scripts/components-date-time-pickers.min.js',
    '../assets/global/plugins/star-multiselect/js/star-multiselect.js',
    '../assets/global/plugins/owl-carousel/js/owl.carousel.js',
    '../assets/global/plugins/dragscroll.js',
    '../assets/layouts/layout/scripts/field-star.min.js',
];

const headerScripts = [

];

const sidebarScripts = [

    // '../assets/global/plugins/jquery.min.js',
    // '../assets/global/plugins/bootstrap/js/popper.min.js',
    // '../assets/global/plugins/bootstrap/js/bootstrap.min.js',
    // '../assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js',
    // '../assets/global/plugins/jquery-ui/jquery-ui.min.js',
    // '../assets/global/plugins/select2/js/select2.full.min.js',
    // '../assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
    // '../assets/global/scripts/app.min.js',
    // '../assets/pages/scripts/components-select2.min.js',
    // '../assets/pages/scripts/components-bootstrap-select.min.js',
    // '../assets/global/plugins/star-multiselect/js/star-multiselect.js',
    // '../assets/global/plugins/owl-carousel/js/owl.carousel.js',
    // '../assets/global/plugins/dragscroll.js',
    // '../assets/layouts/layout/scripts/field-star.min.js',
];

const customerDetailsScripts = [
    '../assets/pages/scripts/components-select2.min.js',
    '../assets/layouts/layout/scripts/field-star.min.js',
];
