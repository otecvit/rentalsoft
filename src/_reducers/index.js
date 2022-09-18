import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { customers } from './customers.reducer';
import { category } from './category.reducer';
import { tariffs } from './tariffs.reducer';
import { alert } from './alert.reducer';
import { support } from './support.reducer';
import { inventory } from './inventory.reducer';
import { consumables } from './consumables.reducer';
import { services } from './services.reducer';
import { bundles } from './bundles.reducer';
import { taxes } from './taxes.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    customers,
    category,
    tariffs,
    support,
    alert,
    inventory,
    consumables,
    services,
    bundles,
    taxes
});

export default rootReducer;