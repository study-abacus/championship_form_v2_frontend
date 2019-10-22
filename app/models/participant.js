import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr(),
  studentId: DS.attr(),
  tShirtSize: DS.attr(),
  teacher: DS.belongsTo('teacher'),
  exams: DS.belongsTo('exam'),
});
