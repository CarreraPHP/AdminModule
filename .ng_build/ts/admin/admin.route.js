import { auditsRoute, configurationRoute, docsRoute, healthRoute, logsRoute, metricsRoute, userMgmtRoute, userDialogRoute } from './';
import { UserRouteAccessService } from '../shared';
const /** @type {?} */ ADMIN_ROUTES = [
    auditsRoute,
    configurationRoute,
    docsRoute,
    healthRoute,
    logsRoute,
    ...userMgmtRoute,
    metricsRoute
];
export const /** @type {?} */ adminState = [{
        path: '',
        data: {
            authorities: ['ROLE_ADMIN']
        },
        canActivate: [UserRouteAccessService],
        children: ADMIN_ROUTES
    },
    ...userDialogRoute
];
//# sourceMappingURL=admin.route.js.map