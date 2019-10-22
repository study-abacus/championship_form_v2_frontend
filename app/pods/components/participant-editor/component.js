import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class ParticipantEditor extends Component {
  @service store

  @alias('fetchTeachersTask.lastSuccessful.value') teachers

  didReceiveAttrs() {
    this.fetchTeachersTask.perform()
  }

  @restartableTask fetchTeachersTask = function *(query = '') {
    yield timeout(500)
    return yield this.store.query('teacher', {
      filter: {
        name: {
          $iLike: `%${query}%`
        }
      }
    })
  }
  @restartableTask saveParticipantTask = function *() {
    yield this.participant.save()
    if (this.onAfterSave) {
      this.onAfterSave()
    }
  }
}
