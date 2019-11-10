import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { action } from '@ember/object';

export default class ParticipantSearchView extends Component {
  @service store

  @alias('searchTeachersTask.lastSuccessful.value') teachers

  searchByFields = [
    { name: 'Name', value: 'name'},
    { name: 'Form Number', value: 'id'},
    { name: 'ID', value: 'studentId'},
    { name: 'CI', value: 'teacherId'}
  ]
  
  didReceiveAttrs() {
    this.set('searchQuery', this.query)
    this.set('selectedSearchField', this.by || this.searchByFields[0].value)
  }

  @restartableTask searchTeachersTask = function *(query = '') {
    yield timeout(500)
    return yield this.store.query('teacher', {
      filter: {
        name: {
          $iLike: `%${query}%`
        }
      }
    })
  }

  @action
  selectTeacher(teacher) {
    this.set('selectedTeacher', teacher)
    this.set('searchQuery', teacher.get('id'))
  }
}
