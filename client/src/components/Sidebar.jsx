import React from "react";
import {
  MdDashboard,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
  MdOutlineAlarm,
  MdOutlineAssessment
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";
import Logo from "../assets/images/logo3.png";

const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "To Do",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Overdue",
    link: "overdue/overdue",
    icon: <MdOutlineAlarm />,
  },
   {
    label: "Daily Report",
    link: "dailyreport",
    icon: <MdOutlineAssessment />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "Trash",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 8);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {

    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-700 text-base hover:bg-red-500",
          path === el.link.split("/")[0] ? "bg-red-600 text-neutral-100" : ""
        )}
      >
        {el.icon}
        <span className='hover:text-[#ffffff]'>{el.label}</span>
      </Link>
    );
  };

  return (
    <div className='w-ful h-full flex flex-col gap-6 p-5'>

      <img className="w-67 mt-1" src={Logo} alt="Nizcare-Logo" />

      <div className='flex-1 flex flex-col gap-y-5 py-8'>
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      {/* <div className=''>
        <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800'>
          <MdSettings />
          <span>Settings</span>
        </button>
      </div> */}
    </div>
  );

};

export default Sidebar;
