import DS from 'ember-data';
import env from 'championship-frontend/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  session: service(),
  host: env.apiHost,
  namespace: env.namespace,
  authorize(xhr) {
    const { jwt } = this.get('session.data.authenticated');
    if (isPresent(jwt)) {
      xhr.setRequestHeader('Authorization', `JWT ${jwt}`);
    }
  },
});
