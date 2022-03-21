// import {
// 	AiOutlineHome,
// 	// AiOutlineUsergroupAdd,
// } from "react-icons/ai";

// import {
// 	RiUserLine,
// 	RiUserFollowLine,
// 	RiHealthBookLine,
// } from "react-icons/ri";

// import {
// 	BiClinic,
// 	BiPackage,
// 	BiWallet,
// } from "react-icons/bi";

// import {
// 	FaUserNurse,
// } from "react-icons/fa";

// import {
// 	VscPackage,
// 	VscAccount,
// } from "react-icons/vsc";

// import {
// 	HiOutlineClipboardList,
// } from "react-icons/hi";

// import {
// 	ImProfile,
// } from "react-icons/im";

// import strings from "../resources/strings";
// import api from "../resources/api";

// const useMainRoutes = (adminUser: api.AdminUser | null) => {
// 	const adminClinicUser = adminUser && adminUser.clinic;
// 	const commonRoutes = [
// 		{
// 			Icon: AiOutlineHome,
// 			text: strings.nav.home,
// 			path: "/dashboard",
// 		},
// 		{
// 			Icon: RiUserFollowLine,
// 			text: strings.nav.adminClinicUsers,
// 			path: "/dashboard/adminclinicUsers",
// 		},
// 		!adminClinicUser &&
// 			{
// 				Icon: RiUserFollowLine,
// 				text: strings.nav.adminUsers,
// 				path: "/dashboard/adminUsers",
// 			},
// 		!adminClinicUser &&
// 			{
// 				Icon: RiUserLine,
// 				text: strings.nav.users,
// 				path: "/dashboard/users",
// 			},
// 		!adminClinicUser &&
// 			{
// 				Icon: BiClinic,
// 				text: strings.nav.clinics,
// 				path: "/dashboard/clinics",
// 			},
// 		!adminClinicUser &&
// 			{
// 				Icon: FaUserNurse,
// 				text: strings.nav.professionals,
// 				path: "/dashboard/professionals",
// 			},
// 		!adminClinicUser &&
// 			{
// 				Icon: RiHealthBookLine,
// 				text: strings.nav.medicalProcedures,
// 				path: "/dashboard/medicalProcedures",
// 			},
// 		adminClinicUser &&
// 			{
// 				Icon: ImProfile,
// 				text: strings.nav.clinicProfessionals,
// 				path: "/dashboard/clinicProfessionals",
// 			},
// 		{
// 			Icon: VscPackage,
// 			text: strings.nav.packages,
// 			path: "/dashboard/packages",
// 		},
// 		{
// 			Icon: HiOutlineClipboardList,
// 			text: strings.nav.orders,
// 			path: "/dashboard/orders",
// 		},
// 		adminClinicUser &&
// 			{
// 				Icon: BiPackage,
// 				text: strings.nav.clinicPackages,
// 				path: "/dashboard/clinicPackages",
// 			},
// 		adminClinicUser &&
// 			{
// 				Icon: VscAccount,
// 				text: strings.nav.clinicProfile,
// 				path: `/dashboard/clinicProfile/${adminClinicUser.id}`,
// 			},
// 		adminClinicUser &&
// 			{
// 				Icon: BiWallet,
// 				text: strings.nav.clinicWallet,
// 				path: `/dashboard/clinicWallet/${adminClinicUser.id}`,
// 			},
// 	];

// 	return commonRoutes;
// };

// export default useMainRoutes;
