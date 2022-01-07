import { AuthStore } from "../../store/auth.store";

const validateRoute = (route) => {
  const loggedIn = !!AuthStore.user;

  if (route.meta.loggedIn && route.meta.loggedIn !== loggedIn) {
    return { pass: false, redirect: "/" };
  } else if (!route.meta.loggedIn && route.meta.loggedIn !== loggedIn) {
    return { pass: false, redirect: "/explorer" };
  } else {
    return { pass: true };
  }
};

export default validateRoute;
