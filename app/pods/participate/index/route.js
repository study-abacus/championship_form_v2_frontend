import Route from '@ember/routing/route';

export default class Index extends Route {
  queryParams = { 
    query: {
      refreshModel: true
    },
    by: {
      refreshModel: true
    },
    offset: {
      refreshModel: true
    }
  }
  query = ''

  model(params) {
    let filter = {}
    switch(params.by) {
      case 'name':
        filter[params.by] = {
          $iLike: `%${params.query}%`
        }
        break
      case 'id':
      case 'studentId':
        filter[params.by] = params.query
        break
      case 'teacherId':
        filter[params.by] = params.query
        break
    }
    return this.store.query('participant', {
      include: 'teacher',
      sort: '-id',
      page: {
        offset: params.offset
      },
      filter
    })
  }

  setupController(controller, model) {
    controller.set('participants', model)
  }
}
