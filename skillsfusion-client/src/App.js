// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Hero from './components/Hero';
// import ExploreServices from './components/ExploreServices';
// import ReviewSection from './components/ReviewSection';
// import LoginPage from './components/LoginPage';
// import SignupPage from './components/SignupPage';
// import PremiumSection from './components/PremiumSection';
// import DevelopmentPage from './components/DevelopmentPage';
// import DesignPage from './components/DesignPage';
// import MarketingAndSales from './components/MarketingAndSales';
// import AIServices from './components/AIServices';
// import EngineeringPage from './components/EngineeringPage';
// import ProfilePage from './components/ProfilePage';
// import WebDevelopmentPage from './components/WebDevelopmentPage';
// import './i18n';
// import ClientProjectForm from './components/ClientProjectForm';
// import MobileAppDevelopmentPage from './MobileDevelopmentPage';
// import BackendDevelopmentPage from './components/BackendDevelopmentPage';
// import CategoryProjectList from './CategoryProjectList';
// import ApplicationForm from './components/ApplicationForm';
// import ChatPage from './components/ChatPage';
// import ClientViewApplicants from './components/ChatViewApplicants';
// import ClientChatList from './components/ClientChatList';
// function App() {
//   return (
//     <Router>
//       {/* <Navbar /> */}

//       <Routes>
//         {/* Home Page Route */}
//         <Route
//           path="/"
//           element={
//             <>
//             <Navbar />
//               <Hero />
//               <ExploreServices />
//               <ReviewSection />
//               <Footer />
//             </>
//           }
//         />

//         {/* Auth Routes */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />

//         {/* Service Routes */}
//         <Route path="/premium" element={<PremiumSection />} />
//          <Route path="/explore" element={<ExploreServices />} />
//         <Route path="/development" element={<DevelopmentPage />} />
//         <Route path="/design" element={<DesignPage />} />
//         <Route path="/market" element={<MarketingAndSales />} />
//         <Route path="/aiservices" element={<AIServices />} />
//          <Route path="/engineer" element={<EngineeringPage />} />
//          <Route path="/profile" element={<ProfilePage />}/>
//          <Route path="/clientpro" element={<ClientProjectForm />}/>
//          <Route path="/development/web" element={<WebDevelopmentPage />}/>
//          <Route path="/development/mobile" element={<MobileAppDevelopmentPage />}/>
//          <Route path="/development/backend" element={<BackendDevelopmentPage />}/>
//          <Route path="/categorydetails" element={<CategoryProjectList />} />
//           <Route path="/apply/:projectId" element={<ApplicationForm />} />
//           <Route path="/chat" element={<ChatPage />} />
//           <Route path="/chatlist" element={<ClientChatList />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ExploreServices from './components/ExploreServices';
import ReviewSection from './components/ReviewSection';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PremiumSection from './components/PremiumSection';
import DevelopmentPage from './components/DevelopmentPage';
import DesignPage from './components/DesignPage';
import MarketingAndSales from './components/MarketingAndSales';
import AIServices from './components/AIServices';
import EngineeringPage from './components/EngineeringPage';
import ProfilePage from './components/ProfilePage';
import WebDevelopmentPage from './components/WebDevelopmentPage';
import './i18n';
import ClientProjectForm from './components/ClientProjectForm';
import MobileAppDevelopmentPage from './MobileDevelopmentPage';
import BackendDevelopmentPage from './components/BackendDevelopmentPage';
import CategoryProjectList from './CategoryProjectList';
import ApplicationForm from './components/ApplicationForm';

//import ClientViewApplicants from './components/Applicants/ClientViewApplicants';
import ClientChatList from './components/ClientChatList';
import FreelancerChatList from './components/FreelancerChatList';
import ChatPage from './components/ChatPage';
import ClientProjectList from './components/ClientProjectList';
//import FreelancerViewApplications from './components/FreelancerViewApplications';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <ExploreServices />
              <ReviewSection />
              <Footer />
            </>
          }
        />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Service Routes */}
        <Route path="/premium" element={<PremiumSection />} />
        <Route path="/explore" element={<ExploreServices />} />
        <Route path="/development" element={<DevelopmentPage />} />
        <Route path="/design" element={<DesignPage />} />
        <Route path="/market" element={<MarketingAndSales />} />
        <Route path="/aiservices" element={<AIServices />} />
        <Route path="/engineer" element={<EngineeringPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/clientpro" element={<ClientProjectForm />} />
        <Route path="/development/web" element={<WebDevelopmentPage />} />
        <Route path="/development/mobile" element={<MobileAppDevelopmentPage />} />
        <Route path="/development/backend" element={<BackendDevelopmentPage />} />
        <Route path="/categorydetails" element={<CategoryProjectList />} />

        {/* Application Routes */}
        <Route path="/apply/:projectId" element={<ApplicationForm />} />
        <Route path="/chat" element={<ChatPage />} />
        {/*<Route path="/my-applicants" element={<ClientViewApplicants />} />
        <Route path="/my-client-applicants" element={<FreelancerViewApplications />} />*/}

        {/* Chat Lists */}
        <Route path="/Clientchatlist" element={<ClientChatList />} />
        <Route path="/freelancerchatlist" element={<FreelancerChatList />} />
          <Route path="/myprojects" element={<ClientProjectList />} />
        {/* Role-based Chat List Redirect */}
        <Route
          path="/chatlist"
          element={
            localStorage.getItem('userRole') === 'CLIENT' ? (
              <ClientChatList />
            ) : localStorage.getItem('userRole') === 'FREELANCER' ? (
              <FreelancerChatList />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;