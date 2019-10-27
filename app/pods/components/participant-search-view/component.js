import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class ParticipantSearchView extends Component {
  @service store

  @alias('searchTask.lastSuccessful.value') participants
  @alias('searchTeachersTask.lastSuccessful.value') teachers

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
  @restartableTask searchTask = function *(query = '') {
    yield timeout(500)
    let filter = {}
    switch(this.selectedSearchField) {
      case 'name':
        filter[this.selectedSearchField] = {
          $iLike: `%${query}%`
        }
        break
      case 'id':
      case 'studentId':
        filter[this.selectedSearchField] = query
        break
      case 'teacherId':
        filter[this.selectedSearchField] = this.selectedTeacher.id
        break
    }
    return yield this.store.query('participant', {
      include: 'teacher',
      sort: '-id',
      filter
    })
  }
}
