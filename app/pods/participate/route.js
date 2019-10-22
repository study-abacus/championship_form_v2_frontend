import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'championship-frontend/mixins/authenticated-route-mixin';
const AuthenticatedRoute = Route.extend(AuthenticatedRouteMixin)

export default class Participate extends AuthenticatedRoute {
  model() {
    return this.store.createRecord('participant', {})
  }

  setupController(controller, model) {
    controller.set('participant', model)
  }
}
