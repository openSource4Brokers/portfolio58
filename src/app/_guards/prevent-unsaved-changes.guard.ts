import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberPage } from '../pages/member/member.page';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberPage> {
  canDeactivate(component: MemberPage) {
    if (component.editForm.dirty) {
      return confirm(
        'Are you sure you want to continue?  Any unsaved changes will be lost'
      );
    }
    return true;
  }
}
