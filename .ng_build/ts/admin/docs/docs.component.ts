import { Component } from '@angular/core';

@Component({
    selector: 'jhi-docs',
    template: `
      <iframe src="swagger-ui/index.html" width="100%" height="900" seamless
          target="_top" title="Swagger UI" class="border-0"></iframe>
    `
})
export class JhiDocsComponent {
    constructor(
    ) {
    }
}
