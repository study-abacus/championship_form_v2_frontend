import Controller from '@ember/controller';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @service session

  username = null
  password = null
  
  @dropTask loginTask = function *() {
    yield this.session.authenticate('authenticator:jwt', {
      username: this.username,
      password: this.password
    })
    this.transitionToRoute('index')
  }
}
