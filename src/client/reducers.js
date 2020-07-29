import { combineReducers } from "redux";
import AppReducer from "./components/App/reducer";
import RegisterReducer from "./components/Register/reducer";
import LoginReducer from "./components/LoginPage/reducer";
// import RestaurantReducer from "./components/Restaurant/reducer";
// import SearchReducer from "./components/Search/reducer";
// import RestaurantReviewReducer from "./components/RestaurantReview/reducer";
// import ReviewViewReducer from "./components/ReviewView/reducer";
// import UserEditReducer from "./components/UserEdit/reducer";
import MemberReducer from "./components/Member/reducer";
import ClassListReducer from "./components/ClassList/reducer";
// import UserViewReducer from "./components/UserView/reducer";
// import RestaurantViewReducer from "./components/RestaurantView/reducer";
// import ReviewEditReducer from "./components/ReviewEdit/reducer";

export default combineReducers({
  app: AppReducer,
  register: RegisterReducer,
  login: LoginReducer,
  member: MemberReducer,
  classList: ClassListReducer,

  // restaurant: RestaurantReducer,
  // search: SearchReducer,
  // review: RestaurantReviewReducer,
  // reviewView: ReviewViewReducer,
  // userEdit: UserEditReducer,
  // userView: UserViewReducer,
  // restaurantView: RestaurantViewReducer,
  // reviewEdit: ReviewEditReducer
});
