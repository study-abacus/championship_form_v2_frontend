import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr(),
  username: DS.attr(),
  role: DS.attr()
});
