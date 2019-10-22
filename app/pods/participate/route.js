import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'championship-frontend/mixins/authenticated-route-mixin';
const AuthenticatedRoute = Route.extend(AuthenticatedRouteMixin)

export default class Participate extends AuthenticatedRoute {}
