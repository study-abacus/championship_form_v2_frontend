import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  queryParams = ['query', 'by', 'offset']
  
  @action
  onSearch(by, query) {
    this.set('by', by)
    this.set('query', query)
  }

  @action
  setOffset(offset) {
    this.set('offset', offset)
  }
}
