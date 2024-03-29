import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdSpaceDashboard } from "react-icons/md";
import { RiDashboard2Fill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import scrollreveal from "scrollreveal";

import { Link } from "react-router-dom";

export default function Sidebar() {
  const [currentLink, setCurrentLink] = useState(1);
  const [navbarState, setNavbarState] = useState(false);
  const html = document.querySelector("html");
  html.addEventListener("click", () => setNavbarState(false));

  useEffect(() => {
    const sr = scrollreveal({
      origin: "left",
      distance: "80px",
      duration: 1000,
      reset: false,
    });
    
    sr.reveal(
      `orgas
          .brand,
          .links>ul>li:nth-of-type(1),
      .links>ul>li:nth-of-type(2),
      .links>ul>li:nth-of-type(3),
      .links>ul>li:nth-of-type(4),
      .links>ul>li:nth-of-type(5),
      .links>ul>li:nth-of-type(6),
      .links>ul>li:nth-of-type(7),
      .links>ul>li:nth-of-type(8),
      .logout
      `,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);

  return (
    <>
      <Section>
        <div className="top">
          <div className="brand">
            {/* <FaTaxi /> */}
            <span>KORGAS</span>
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu
                onClick={(e) => {
                  e.stopPropagation();
                  setNavbarState(true);
                }}
              />
            )}
          </div>
          <div className="links">
            <ul>
              <li
                className={currentLink === 1 ? "active" : "none"}
                onClick={() => setCurrentLink(1)}
              >
                <Link to="/subadmin">
                  <MdSpaceDashboard />
                  <span> Dashboard</span>
                </Link>
              </li>
              <li
                className={currentLink === 2 ? "active" : "none"}
                onClick={() => setCurrentLink(2)}
              >
                <Link to="/user">
                  <RiDashboard2Fill />
                  <span>User </span>
                  </Link>
              </li>
              <li
                className={currentLink === 3 ? "active" : "none"}
                onClick={() => setCurrentLink(3)}
              >
              <Link to="/kgs">
                  <RiDashboard2Fill />
                  <span>Kgs </span>
                </Link>
              </li>
              <li
                className={currentLink === 4 ? "active" : "none"}
                onClick={() => setCurrentLink(4)}
              >
                <Link to="/future">
                  <RiDashboard2Fill />
                  <span> Future customer</span>
                </Link>
              </li>
              <li
                className={currentLink === 5 ? "active" : "none"}
                onClick={() => setCurrentLink(5)}
              >
                <Link to="/tank">
                  <RiDashboard2Fill />
                  <span>Tank Stock</span>
                </Link>
              </li>
              <li
                className={currentLink === 6 ? "active" : "none"}
                onClick={() => setCurrentLink(6)}
              >
                <Link to="/treller">
                  <IoSettings />
                  <span> Treller</span>
                </Link>
              </li>
              <li
                className={currentLink === 7 ? "active" : "none"}
                onClick={() => setCurrentLink(7)}
              >
                <Link to="/client">
                  <IoSettings />
                  <span> Customer</span>
                </Link>
              </li>
       
              <li
                className={currentLink === 8 ? "active" : "none"}
                onClick={() => setCurrentLink(8)}
              >
                <Link to="/getkgs">
                  <IoSettings />
                  <span> Gas Kgs</span>
                </Link>
              </li>
              <li
                className={currentLink === 9 ? "active" : "none"}
                onClick={() => setCurrentLink(9)}
              >
                <Link to="/stock">
                  <IoSettings />
                  <span>Stock</span>
                </Link>
              </li>
              <li
                className={currentLink === 10 ? "active" : "none"}
                onClick={() => setCurrentLink(10)}
              >
                <Link to="/shop">
                  <IoSettings />
                  <span> Shops</span>
                </Link>
              </li>
              <li
                className={currentLink === 11 ? "active" : "none"}
                onClick={() => setCurrentLink(11)}
              >
                <Link to="/employee">
                  <IoSettings />
                  <span> Employees</span>
                </Link>
              </li>
              <li
                className={currentLink === 12 ? "active" : "none"}
                onClick={() => setCurrentLink(12)}
              >
                <Link to="/category">
                  <IoSettings />
                  <span>Category</span>
                </Link>
              </li>
              <li
                className={currentLink === 13 ? "active" : "none"}
                onClick={() => setCurrentLink(13)}
              >
                <Link to="/product">
                  <IoSettings />
                  <span>Product</span>
                </Link>
              </li>
              <li
                className={currentLink === 14 ? "active" : "none"}
                onClick={() => setCurrentLink(14)}
              >
                <Link to="/productcategory">
                  <IoSettings />
                  <span>Product Categpry</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="logout">
          <Link to="/logout">
          <FiLogOut />
            <span className="logout">Logout</span>
          </Link>
          

        </div>
      </Section>
      <ResponsiveNav state={navbarState} className={navbarState ? "show" : ""}>
        <div className="responsive__links">
        <ul>
              <li
                className={currentLink === 1 ? "active" : "none"}
                onClick={() => setCurrentLink(1)}
              >
                <Link to="/subadmin">
                  <MdSpaceDashboard />
                  <span> SubAdmin </span>
                </Link>
              </li>
              <li
                className={currentLink === 2 ? "active" : "none"}
                onClick={() => setCurrentLink(2)}
              >
               <Link to="/user">
                  <RiDashboard2Fill />
                  <span>User </span>
                  </Link>
              </li>
              <li
                className={currentLink === 3 ? "active" : "none"}
                onClick={() => setCurrentLink(3)}
              >
              <Link to="/kgs">
                <RiDashboard2Fill />
                <span>kgs </span>
              </Link>
              
              </li>
              <li
                className={currentLink === 4 ? "active" : "none"}
                onClick={() => setCurrentLink(4)}
              >
                  <Link to="/treller">
                  <RiDashboard2Fill />
                  <span> Treller</span>
                </Link>
              </li>
              <li
                className={currentLink === 5 ? "active" : "none"}
                onClick={() => setCurrentLink(5)}
              >
                 <Link to="/client">
                  <RiDashboard2Fill />
                  <span>Customer</span>
                </Link>
              </li>
              <li
                className={currentLink === 8 ? "active" : "none"}
                onClick={() => setCurrentLink(8)}
              >
                <Link to="/future">
                <FiLogOut />
                  <span> Futures</span>
                </Link>
              </li>
              <li
                className={currentLink === 9 ? "active" : "none"}
                onClick={() => setCurrentLink(9)}
              >
                <Link to="/getkgs">
                  <IoSettings />
                  <span>Gas kgs</span>
                </Link>
              </li>
              <li
                className={currentLink === 10 ? "active" : "none"}
                onClick={() => setCurrentLink(10)}
              >
                <Link to="/stock">
                  <IoSettings />
                  <span>Stock</span>
                </Link>
              </li>
              <li
                className={currentLink === 11 ? "active" : "none"}
                onClick={() => setCurrentLink(11)}
              >
                <Link to="/shops">
                  <IoSettings />
                  <span> Shops</span>
                </Link>
              </li>
              <li
                className={currentLink === 12 ? "active" : "none"}
                onClick={() => setCurrentLink(12)}
              >
                <Link to="/employee">
                  <IoSettings />
                  <span> Employees</span>
                </Link>
              </li>
              <li
                className={currentLink === 13 ? "active" : "none"}
                onClick={() => setCurrentLink(13)}
              >
                <Link to="/category">
                  <IoSettings />
                  <span>Category</span>
                </Link>
              </li>
              <li
                className={currentLink === 14 ? "active" : "none"}
                onClick={() => setCurrentLink(14)}
              >
                <Link to="/product">
                  <IoSettings />
                  <span>Product</span>
                </Link>
              </li>
              <li
                className={currentLink === 15 ? "active" : "none"}
                onClick={() => setCurrentLink(15)}
              >
                <Link to="/productcategory">
                  <IoSettings />
                  <span>Product Categpry</span>
                </Link>
              </li>
              <li
                className={currentLink === 16 ? "active" : "none"}
                onClick={() => setCurrentLink(16)}
              >
                <Link to="/logout">
                <FiLogOut />
                  <span> Logout</span>
                </Link>
              </li>
     
            </ul>
        </div>

      </ResponsiveNav>
    </>
  );
}
const Section = styled.section`
  position: fixed;
  left: 0;
  background-color: #212121;
  height: 100vh;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  overflow-y: auto;
  gap: 2rem;
  .top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    .toggle {
      display: none;
    }
    .brand {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      svg {
        color: #ffc107;
        font-size: 2rem;
      }
      span {
        font-size: 2rem;
        color: #ffc107;
        font-family: "Permanent Marker", cursive;
      }
    }
    .links {
      display: flex;
      justify-content: center;
      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        li {
          padding: 0.6rem 1rem;
          border-radius: 0.6rem;
          &:hover {
            background-color: #ffc107;
            a {
              color: black;
            }
          }
          a {
            text-decoration: none;
            display: flex;
            gap: 1rem;
            color: white;
          }
        }
        .active {
          background-color: #ffc107;
          a {
            color: black;
          }
        }
      }
    }
  }

  .logout {
    padding: 0.3rem 1rem;
    border-radius: 0.6rem;
    &:hover {
      background-color: #da0037;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
    overflow-y: auto;
    padding: 1rem;
    .top {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      .toggle {
        display: block;
        color: white;
        z-index: 99;
        svg {
          font-size: 1.4rem;
        }
      }
      .brand {
        gap: 1rem;
        justify-content: flex-start;
      }
    }
    .top > .links,
    .logout {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.div`
  position: fixed;
  right: -10vw;
  top: 0;
  z-index: 10;
  background-color: black;
  height: 100vh;
  width: ${({ state }) => (state ? "60%" : "0%")};
  transition: 0.4s ease-in-out;
  display: flex;
  opacity: 0;
  visibility: hidden;
  padding: 1rem;
  .responsive__links {
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 3rem;
      li {
        padding: 0.6rem 1rem;
        border-radius: 0.6rem;
        &:hover {
          background-color: #ffc107;
          a {
            color: black;
          }
        }
        a {
          text-decoration: none;
          display: flex;
          gap: 1rem;
          color: white;
        }
      }
      .active {
        background-color: #ffc107;
        a {
          color: black;
        }
      }
    }
  }
`;
