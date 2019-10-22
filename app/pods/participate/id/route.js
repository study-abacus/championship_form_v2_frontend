import Route from '@ember/routing/route';

export default class IdController extends Route {
  model(params) {
    return this.store.findRecord('participant', params.id, {
      include: 'teacher'
    })
  }

  setupController(controller, model) {
    controller.set('participant', model)
  }
}
