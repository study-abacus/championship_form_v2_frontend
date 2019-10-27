import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import env from 'championship-frontend/config/environment';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
    session: service(),
    host: env.apiHost,
    contentType: 'application/json; charset=utf-8',
    namespace: env.namespace,
    headers: computed ('session.data.authenticated.jwt', function () {
        let headers = {};
        const jwt = this.get('session.data.authenticated.token');
        if (jwt) {
            headers['Authorization'] = `JWT ${jwt}`;
          }
        return headers;
    })
});
