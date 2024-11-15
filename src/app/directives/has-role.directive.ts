import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[hasRole]',
  standalone: true,
  exportAs: 'hasRole'
})
export class HasRoleDirective {
  @Input('hasRole') roles: string[] = [];
  private hasView = false;
  private subscription?: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.getRoles().subscribe(userRoles => {
      const hasRole = this.roles.some(role => userRoles.includes(role));
      
      if (hasRole && !this.hasView) {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!hasRole && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
