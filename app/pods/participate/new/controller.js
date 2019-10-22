import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @action
  onAfterSave() {
    this.transitionToRoute('participate.id', this.participant.id)
  }
}
