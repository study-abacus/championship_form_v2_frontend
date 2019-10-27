import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class Dashboard extends Component {
  @service api

  @alias('fetchStatsTask.lastSuccessful.value') stats

  didReceiveAttrs() {
    this.fetchStatsTask.perform()
  }

  @restartableTask fetchStatsTask = function *() {
    return yield this.api.request('dashboard/stats')
  }
}
