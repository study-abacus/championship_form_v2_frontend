import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ParticipationEditor extends Component {
  @service store

  @computed('participant.participations.@each')
  get participations() {
    return this.participant.get('participations')
  }

  @action
  addNewExam() {
    return this.store.createRecord('participation', {
      participant: this.participant,
      accepted: true
    })
  }
}
