import { RouterProvider , createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout.jsx';
import Home from './Components/Home/Home.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import { useContext, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import Cart from './Components/Cart/Cart.jsx';
import Price from './Components/Price/Price.jsx';
import AddTest from './Components/AddTest/AddTest.jsx';
import { UserContext } from './Context/UserContext.js';
import OrderLoggedUser from './Components/OrderLoggedUser/OrderLoggedUser.jsx';
import Order from './Components/Order/Order.jsx';
import OrderNewPatient from './Components/OrderNewPatient/OrderNewPatient.jsx';
import OrderOldPatient from './Components/OrderOldPatient/OrderOldPatient.jsx';
import SendInvoice from './Components/SendInvoice/SendInvoice.jsx';
import AllOrderLoggedUser from './Components/AllOrderLoggedUser/AllOrderLoggedUser.jsx';
import UpdateOldPatient from './Components/UpdateOldPatient/UpdateOldPatient.jsx';
import Contact from './Components/Contact/Contact.jsx';
import DashBoard from './Components/DashBoard/DashBoard/DashBoard.jsx';
import { jwtDecode } from 'jwt-decode';
import HomeDashboard from './Components/DashBoard/HomeDashboard/HomeDashboard.jsx';
import SpecificOrder from './Components/DashBoard/SpecificOrder/SpecificOrder.jsx';
import UserDashboard from './Components/DashBoard/UserDashboard/UserDashboard.jsx';
import SpecificUser from './Components/DashBoard/SpecificUser/SpecificUser.jsx';
import CompanyDashboard from './Components/DashBoard/CompanyDashboard/CompanyDashboard.jsx';
import SpecificCompany from './Components/DashBoard/SpecificCompany/SpecificCompany.jsx';
import AddCompany from './Components/DashBoard/AddCompany/AddCompany.jsx';
import UpdateCompany from './Components/DashBoard/UpdateCompany/UpdateCompany.jsx';
import ChangeImageCompany from './Components/DashBoard/ChangeImageCompany/ChangeImageCompany.jsx';
import TestDashboard from './Components/DashBoard/TestDashboard/TestDashboard.jsx';
import SpecificTest from './Components/DashBoard/SpecificTest/SpecificTest.jsx';
import UpdatePrice from './Components/DashBoard/UpdatePrice/UpdatePrice.jsx';
import UpdateTest from './Components/DashBoard/UpdateTest/UpdateTest.jsx';
import AddTestAdmin from './Components/DashBoard/AddTestAdmin/AddTestAdmin.jsx';
import PatientDashboard from './Components/DashBoard/PatientDashboard/PatientDashboard.jsx.jsx';
import SpecificPatient from './Components/DashBoard/SpecificPatient/SpecificPatient.jsx';
import AnalysisProfile from './Components/AnalysisProfile/AnalysisProfile.jsx';
import RadiologyProfile from './Components/RadiologyProfile/RadiologyProfile.jsx';
import HouseCall from './Components/HouseCall/HouseCall.jsx';
import MonthProfile from './Components/MonthProfile/MonthProfile.jsx';
import ReportDashboard from './Components/DashBoard/ReportDashboard/ReportDashboard.jsx';
import UserProfile from './Components/UserProfile/UserProfile.jsx';
import AddNewPrice from './Components/DashBoard/AddNewPrice/AddNewPrice.jsx';
import LoginOnlineSystem from './Components/OnlineSystem/LoginOnlineSystem/LoginOnlineSystem.jsx';
import LayoutOnlineSystem from './Components/OnlineSystem/LayoutOnlineSystem/LayoutOnlineSystem.jsx';
import TransportationOnline from './Components/OnlineSystem/TransportationOnline/TransportationOnline.jsx';
import ApprovedSearch from './Components/OnlineSystem/ApprovedSearch/ApprovedSearch.jsx';
import ShareWebsite from './Components/ShareWebsite/ShareWebsite.jsx';
import io from "../node_modules/socket.io/client-dist/socket.io.js"
import AddUserAdmin from './Components/DashBoard/AddUserAdmin/AddUserAdmin.jsx';
import UpdateUserRole from './Components/DashBoard/UpdateUserRole/UpdateUserRole.jsx';
const socket = io(process.env.REACT_APP_BASE_URL) ;
// const socket = io("https://fekrah-medical-vercel.vercel.app") ;
// const socket = io("http://localhost:5000") ;




let routers = createHashRouter([
// let routers = createBrowserRouter([
	{path:"" , element:<Layout socket={socket}/> , children:[
		{index:true , element:<Home/>} , 
		{path:"contact" , element:<Contact/>} , 
		{path:"login" , element:<Login />} , 
		{path:"register" , element:<Register/>} , 
		{path:"shareWebsite" , element:<ShareWebsite/>} , 
		
		{path:"userProfile" , element:<ProtectedRoute><UserProfile/></ProtectedRoute>} , 
		{path:"cart" , element:<ProtectedRoute><Cart/></ProtectedRoute>} , 
		{path:"price" , element:<ProtectedRoute><Price/></ProtectedRoute>} , 
		{path:"addTest/:id" , element:<ProtectedRoute><AddTest/></ProtectedRoute>} , 
		{path:"sendInvoice/:id" , element:<ProtectedRoute><SendInvoice/></ProtectedRoute>} , 
		{path:"allOrderLoggedUser" , element:<ProtectedRoute><AllOrderLoggedUser/></ProtectedRoute>} , 
		{path:"analysisProfile" , element:<ProtectedRoute><AnalysisProfile/></ProtectedRoute>} , 
		{path:"radiologyProfile" , element:<ProtectedRoute><RadiologyProfile/></ProtectedRoute>} , 
		{path:"houseCall" , element:<ProtectedRoute><HouseCall/></ProtectedRoute>} , 
		{path:"monthProfile" , element:<ProtectedRoute><MonthProfile/></ProtectedRoute>} , 

		{path:"order/" , element:<Order/> , children:[
			{index:true , element:<OrderLoggedUser  socket={socket}/>} , 
			{path:"newPatient" , element:<OrderNewPatient  socket={socket}/>} , 
			{path:"oldPatient" , element:<OrderOldPatient /> ,children:[
				{path:"updateOldPatient" , element:<UpdateOldPatient  socket={socket}/>} , 
			]}
		]} , 

		{path:"dashBoard/" , element:<ProtectedRoute><DashBoard/></ProtectedRoute> , children:[
			{index:true , element:<ProtectedRoute><HomeDashboard/></ProtectedRoute>} , 
			{path:"specificOrder/:id", element:<ProtectedRoute><SpecificOrder  socket={socket}/></ProtectedRoute>} , 
			{path:"companyDashboard", element:<ProtectedRoute><CompanyDashboard/></ProtectedRoute>} , 
			{path:"specificCompany/:id", element:<ProtectedRoute><SpecificCompany/></ProtectedRoute>} , 
			{path:"userDashboard", element:<ProtectedRoute><UserDashboard/></ProtectedRoute>} , 
			{path:"specificUser/:id", element:<ProtectedRoute><SpecificUser/></ProtectedRoute>} , 
			{path:"addCompany", element:<ProtectedRoute><AddCompany/></ProtectedRoute>} , 
			{path:"updateCompany", element:<ProtectedRoute><UpdateCompany/></ProtectedRoute>} , 
			{path:"changeImageCompany", element:<ProtectedRoute><ChangeImageCompany/></ProtectedRoute>} , 
			{path:"testDashboard", element:<ProtectedRoute><TestDashboard/></ProtectedRoute>} , 
			{path:"specificTest/:id", element:<ProtectedRoute><SpecificTest/></ProtectedRoute>} , 
			{path:"updateTest/:id", element:<ProtectedRoute><UpdateTest/></ProtectedRoute>} , 
			{path:"updatePrice/:testId/:priceId", element:<ProtectedRoute><UpdatePrice/></ProtectedRoute>} , 
			{path:"addTestAdmin", element:<ProtectedRoute><AddTestAdmin/></ProtectedRoute>} , 
			{path:"patientDashboard", element:<ProtectedRoute><PatientDashboard/></ProtectedRoute>} , 
			{path:"specificPatient/:id", element:<ProtectedRoute><SpecificPatient/></ProtectedRoute>} , 
			{path:"reportDashboard", element:<ProtectedRoute><ReportDashboard/></ProtectedRoute>} , 
			{path:"addUserAdmin", element:<ProtectedRoute><AddUserAdmin/></ProtectedRoute>} , 
			{path:"updateUserRole/:id", element:<ProtectedRoute><UpdateUserRole/></ProtectedRoute>} , 
			{path:"addNewPrice/:testId", element:<ProtectedRoute><AddNewPrice/></ProtectedRoute>} , 
		]} , 
		{path:"*" , element:<NotFound/>} , 
	]} ,
	
	{path:"onlineSystem/" , element:<LayoutOnlineSystem/> , children:[
		{index:true , element:<LoginOnlineSystem/>} , 
		{path:"transportation" , element:<TransportationOnline/>} , 
		{path:"approvedSearch" , element:<ApprovedSearch/>} , 
	]} ,

])






function App() {

	const {setUserToken , setLoggedUser , loggedUser , setModerator , setAdmin} = useContext(UserContext)


	useEffect(() => {

		//& Get Token in Local Storage And Save in Use State :
		if(localStorage.getItem("token") != null){
			setUserToken(localStorage.getItem("token")) ;

			//& Decoded Token :
			function decodedToken(){
				const token =  localStorage.getItem('token'); 
				let decoded = jwtDecode(token);
				return decoded.role
			}
	
			//& Check Admin Or Or Moderator Or User :
			if( decodedToken() === "admin"){
				setAdmin(true)
			}else if (decodedToken() === "moderator"){
				setModerator(true)
			}
		}
	
	
		if(localStorage.getItem("user") != null){
			setLoggedUser(JSON.parse(localStorage.getItem("user")))
		}
	}, [])

	useEffect(() => {
      socket.emit("newUser" , {email: loggedUser.email , role:loggedUser.role})
      socket.emit("all-Notification")
   }, [loggedUser])

	return (
		<>
			<RouterProvider router={routers} ></RouterProvider>
			<Toaster/>
		</>
	);
}

export default App;
