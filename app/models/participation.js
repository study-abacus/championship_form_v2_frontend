import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  participant: DS.belongsTo('participant'),
  exam: DS.belongsTo('exam'),
  accepted: DS.attr()
});
