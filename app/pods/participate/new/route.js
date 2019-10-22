import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  model() {
    return this.store.createRecord('participant', {})
  }

  setupController(controller, model) {
    controller.set('participant', model)
  }
}
