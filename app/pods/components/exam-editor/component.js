import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask, dropTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { action } from '@ember/object';

export default class ExamEditor extends Component {
  @service api
  @service store

  @alias('fetchSubjectTasks.lastSuccessful.value.subjects') subjects
  @alias('fetchLevelsTasks.lastSuccessful.value') exams

  didReceiveAttrs() {
    this.fetchSubjectTasks.perform()
  }

  @dropTask saveParticipationTask = function *() {
    this.participation.set('exam', this.store.peekRecord('exam', this.selectedExamId))
    yield this.participation.save()
    this.set('editing', false)
  }
  @restartableTask fetchSubjectTasks = function *() {
    return yield this.api.request('/exams/subjects', {
      method: 'GET'
    })
  }
  @restartableTask fetchLevelsTasks = function *() {
    return yield this.store.query('exam', {
      filter: {
        subject: this.selectedSubject
      }
    })
  }

  @action
  selectSubject(subject) {
    this.set('selectedSubject', subject)
    this.set('selectedLevel', null)
    this.fetchLevelsTasks.perform()
  }
  @action
  deleteParticipation() {
    this.participation.destroyRecord()
  }
}
