import React, { Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css';

import '../assests/css/components.css';
import '../assests/css/style.css';
import '../assests/css/style-responsive.css';
import '../assests/css/custom.css';
import '../assests/css/themes/blue.css';
import '../assests/css/themes/gray.css';
import '../assests/css/themes/green.css';
import '../assests/css/themes/orange.css';
import '../assests/css/themes/red.css';
import '../assests/css/themes/turquoise.css';

import Header from './Dashboard/header/Header';
import Footer from '../Components/Dashboard/footer/Footer';
import Notfound from '../Components/notfound';

import Dashboard from '../Views/Dashboard/Dashboard';
import Comment from '../Views/Dashboard/Comment';
import Detail from '../Views/Dashboard/Detail';

import BusinessOwnerLogin from '../Views/Users/BusinessOwnerLogin';
import InspectorLogin from '../Views/Users/InspectorLogin';
import Complaint from '../Views/Users/Complaint';
import ComplaintList from '../Views/Users/complaint-list';
import UserProfile from '../Views/Users/UserProfile';
import ForgetPassword from '../Views/Users/ForgetPassword';
import ResetPassword from '../Views/Users/reset-password';

import ScheduleList from '../Views/Schedules/ScheduleList';
import CurrentSchedule from '../Views/Schedules/CurrentSchedule';
import ActivityList from '../Views/Schedules/activity-list';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SnackbarComponent from '../Components/snackbar-component';
import '../i18n';
import {
   DASHBOARD
   ,RESETPASSWORD
   ,CURRENTSCHEDULE
   ,SCHEDULELIST
   ,USERPROFILE
   ,ACTIVITYLIST
   ,COMPLAINTLIST
   ,BUSINESSOWNERLOGIN   
} from '../Helpers/app-const'

const App = (props) => {

      return (
         <div>
            <SnackbarComponent/>
            <Suspense fallback={null}>
            <BrowserRouter >
               <Header />
               <Switch>
                  {/* Public routes */}
                  <Route path='/' exact component={() => <Dashboard />} />
                  <Route path={`/${DASHBOARD}`} exact component={() => <Dashboard />} />
                  <Route path={'/Detail/:id'} exact component={ Detail } />
                  <Route path={'/Comment'} exact component={ () => <Comment />} />
                  <Route path={`/${BUSINESSOWNERLOGIN}`} exact component={() => <BusinessOwnerLogin />} />
                  <Route path={'/InspectorLogin'} exact component={() => <InspectorLogin />} />

                  {/* After login routes */}
                  { props.isAuthorized && <Route path={`/${RESETPASSWORD}`} exact component={ () => <ResetPassword />} /> }
                  { props.isAuthorized && <Route path={`/${CURRENTSCHEDULE}`} exact component={ () => <CurrentSchedule /> } /> }
                  { props.isAuthorized && <Route path={`/${SCHEDULELIST}`} exact component={ () => <ScheduleList/>} /> }
                  { props.isAuthorized && <Route path={`/${USERPROFILE}`} exact component={ () => <UserProfile />} /> }
                  { props.isAuthorized && <Route path={`/${ACTIVITYLIST}`} exact component={ () => <ActivityList /> } /> }
                  { props.isAuthorized && <Route path={`/${COMPLAINTLIST}`} exact component={ () => <ComplaintList /> } /> }

                  {/* TBD */}
                  <Route path={'/Complaint'} exact component={ () => <Complaint />} />
                  <Route path={'/ForgetPassword'} exact component={ () => <ForgetPassword /> } />
                  <Route path="*" component={() => <Notfound />} />
               </Switch>
              <Footer/>
           </BrowserRouter>
           </Suspense>
         </div>
    );
}
export default App;