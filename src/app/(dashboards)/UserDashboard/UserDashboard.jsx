"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  InboxIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { MdOutlineImportContacts } from "react-icons/md";
import { LuWarehouse } from "react-icons/lu";
import { BiSolidBusiness } from "react-icons/bi";
import { RiCustomerServiceFill } from "react-icons/ri";
import Logo from "../../../../public/sf-logo.png";
import Logo2 from "../../../../public/sf-logo-2.png";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCodeBranch } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";
import { HomeContextProvider } from "@/components/HomeProvider/HomeProvider";

const UserDashboard = ({ view, toggle }) => {
  const [open, setOpen] = React.useState(0);
  const [activeItem, setActiveItem] = useState();
  const { hamburger, setHamburger } = useContext(HomeContextProvider);
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === "/UserDashboard/UserHome") {
      setActiveItem("dashboard");
    } else if (pathName === "/Dashboard/Businesses") {
      setActiveItem("businesses");
    } else if (pathName === "/Dashboard/Addresses") {
      setActiveItem("addresses");
    } else if (pathName === "/UserDashboard/Customers") {
      setActiveItem("customers");
    } else if (pathName === "/UserDashboard/Suppliers") {
      setActiveItem("suppliers");
    } else if (pathName === "/UserDashboard/Warehouses") {
      setActiveItem("warehouses");
    } else if (pathName === "/Dashboard/Branch") {
      setActiveItem("branch");
    } else if (pathName === "/Dashboard/Product") {
      setActiveItem("products");
    } else {
      setActiveItem("");
    }
  }, [pathName]);

  const hidden = toggle ? "hidden" : "";

  useEffect(() => {
    const savedOpenState = localStorage.getItem("accordionOpenState");
    if (savedOpenState) {
      setOpen(Number(savedOpenState));
    }
  }, []);

  const handleOpen = (value) => {
    const newValue = open === value ? 0 : value;
    setOpen(newValue);
    localStorage.setItem("accordionOpenState", newValue);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const getActiveClass = (item) =>
    activeItem === item && "!bg-[#6c5ce7] text-white";

  return (
    <div
      className={`fixed md:relative transition 
     ${
       hamburger ? "left-0" : "left-[-30rem]"
     } md:left-0 z-[30] transition-all duration-500`}
    >
      <Card className="h-screen no-scrollbar transition-all overflow-y-scroll py-2 shadow-xl shadow-blue-gray-900/5 bg-primary rounded-none">
        <div className="flex items-center justify-between">
          <div className="mb-2 mt-3 pl-5">
            <Typography variant="h5" color="white">
              {!toggle ? (
                <Image src={Logo} alt="Admin" className="w-[100px] h-[50px]" />
              ) : (
                <Image
                  src={Logo2}
                  alt="Admin"
                  className="w-[40px] h-[25px] mt-1 object-cover"
                />
              )}
            </Typography>
          </div>
          {view === "mobile" && hamburger && (
            <div className="block lg:hidden">
              <button onClick={() => setHamburger(!hamburger)}>
                <RxCross1
                  size={24}
                  className="bg-cyan-800 py-1 px-1 rounded-md text-white"
                />
              </button>
            </div>
          )}
        </div>
        <List className="mt-2">
          <Link href={"/UserDashboard/UserHome"}>
            <ListItem
              className={`hover:bg-[#6c5ce7]   ${getActiveClass("dashboard")} `}
              selected={activeItem === "dashboard"}
              onClick={() => handleItemClick("dashboard")}
            >
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography color="white" className={hidden}>
                Dashboard
              </Typography>
            </ListItem>
          </Link>


          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 text-white transition-transform ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className={`p-0 hover:bg-[#6c5ce7] `}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <div className="flex items-center gap-x-[2px]">
                    <ShoppingBagIcon className="h-5 w-5 text-white" />
                    <div>
                      {toggle && (
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`mx-auto h-3 text-white w-3 transition-transform ${
                            open === 1 ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </div>
                </ListItemPrefix>
                <Typography
                  color="white"
                  className={`mr-auto font-normal ${hidden}`}
                >
                  Products
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link href={"/Dashboard/ErpCategory"}>
                  <ListItem
                    className={`hover:bg-[#6c5ce7]   ${getActiveClass(
                      "erp-category"
                    )}`}
                    selected={activeItem === "erp-category"}
                    onClick={() => handleItemClick("erp-category")}
                  >
                    <ListItemPrefix>
                      <ChevronRightIcon className="h-4 w-4 text-white" />
                    </ListItemPrefix>
                    <Typography color="white" className={hidden}>
                  Categories
                    </Typography>
                  </ListItem>
                </Link>
                <Link href={"/Dashboard/Brand"}>
                  <ListItem
                    className={`hover:bg-[#6c5ce7]  ${getActiveClass(
                      "brands"
                    )}`}
                    selected={activeItem === "brands"}
                    onClick={() => handleItemClick("brands")}
                  >
                    <ListItemPrefix>
                      <ChevronRightIcon className="h-4 w-4 text-white" />
                    </ListItemPrefix>
                    <Typography color="white" className={hidden}>
                      Brands
                    </Typography>
                  </ListItem>
                </Link>
                <Link href={"/Dashboard/Product"}>
                  <ListItem
                    className={`hover:bg-[#6c5ce7]  ${getActiveClass(
                      "products"
                    )}`}
                    selected={activeItem === "products"}
                    onClick={() => handleItemClick("products")}
                  >
                    <ListItemPrefix>
                      <ChevronRightIcon className="h-4 w-4 text-white" />
                    </ListItemPrefix>
                    <Typography color="white" className={hidden}>
                      Products
                    </Typography>
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>

          <Link href={"/Dashboard/Addresses"}>
            <ListItem
              className={`hover:bg-[#6c5ce7] ${getActiveClass("addresses")}`}
              selected={activeItem === "addresses"}
              onClick={() => handleItemClick("addresses")}
            >
              <ListItemPrefix>
                <FaAddressCard className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography color="white" className={hidden}>
                Addresses
              </Typography>
            </ListItem>
          </Link>

          <Link href={"/UserDashboard/Customers"}>
            <ListItem
              className={`hover:bg-[#6c5ce7] ${getActiveClass("customers")}`}
              selected={activeItem === "customers"}
              onClick={() => handleItemClick("customers")}
            >
              <ListItemPrefix>
                <RiCustomerServiceFill className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography color="white" className={hidden}>
                Customers
              </Typography>
            </ListItem>
          </Link>

          <Link href={"/UserDashboard/Suppliers"}>
            <ListItem
              className={`hover:bg-[#6c5ce7] ${getActiveClass("suppliers")}`}
              selected={activeItem === "suppliers"}
              onClick={() => handleItemClick("suppliers")}
            >
              <ListItemPrefix>
                <MdOutlineImportContacts className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography color="white" className={hidden}>
              Suppliers
              </Typography>
            </ListItem>
          </Link>

          <Link href={"/UserDashboard/Warehouses"}>
            <ListItem
              className={`hover:bg-[#6c5ce7] ${getActiveClass("warehouses")}`}
              selected={activeItem === "warehouses"}
              onClick={() => handleItemClick("warehouses")}
            >
              <ListItemPrefix>
                <LuWarehouse className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography color="white" className={hidden}>
                Warehouses
              </Typography>
            </ListItem>
          </Link>

          <Link href={"/Dashboard/Branch"}>
            <ListItem
              className={`hover:bg-[#6c5ce7]  ${getActiveClass("branch")}`}
              selected={activeItem === "branch"}
              onClick={() => handleItemClick("branch")}
            >
              <ListItemPrefix>
                <FaCodeBranch className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography color="white" className={hidden}>
                Branch
              </Typography>
            </ListItem>
          </Link>
        </List>
      </Card>
    </div>
  );
};

export default UserDashboard;
