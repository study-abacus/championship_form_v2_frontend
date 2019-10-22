import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class ParticipantSearchView extends Component {
  @service store

  @alias('searchTask.lastSuccessful.value') participants

  searchByFields = [
    { name: 'Name', value: 'name'},
    { name: 'Form Number', value: 'id'},
    { name: 'ID', value: 'studentId'},
    { name: 'CI', value: 'teacherId'}
  ]
  selectedSearchField = this.searchByFields[0].value

  didReceiveAttrs() {
    this.searchTask.perform()
  }

  @restartableTask searchTask = function *(query = '') {
    timeout(500)
    const filter = {}
    filter[this.selectedSearchField] = {
      $iLike: `%${query}%`
    }
    return yield this.store.query('participant', {
      include: 'teacher',
      sort: '-id',
      filter
    })
  }
}
