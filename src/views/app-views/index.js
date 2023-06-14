import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {

  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/home/clients/list/edit-profile/:id`} component={lazy(() => import(`./clients/EditProfile`))} />
        <Route path={`${APP_PREFIX_PATH}/home/clients/list`} component={lazy(() => import(`./clients`))} />
        <Route path={`${APP_PREFIX_PATH}/home/planner`} component={lazy(() => import(`./planner`))} />
        <Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);