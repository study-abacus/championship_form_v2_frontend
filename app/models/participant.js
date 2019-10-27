import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr(),
  studentId: DS.attr('number'),
  tShirtSize: DS.attr('number'),
  teacher: DS.belongsTo('teacher'),
  participations: DS.hasMany('participations'),
});
