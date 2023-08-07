import React,{memo, useCallback} from "react";
import { styled } from "styled-components";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../store/user-slice";
import CustomTable from "../components/CustomTable";


const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const GraphContainer = styled.div`
width: 100%;
margin-bottom: 16px;

@media screen and (max-width: 768px) {
    height: 300px;
  }
`; 

// const TableContainer = styled.div`
//   width: 100%;
//   margin-bottom: 16px;
//   @media screen and (max-width: 768px) {
//     height: 300px;
//   }
// `;

const GraphContent = styled.div`
  padding: 8px 0px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;


const StyledH2 = styled.h2`
  color: #5f6366;
`;

const TableContainer = styled.div`
  width: 100%;
  padding: 16px;
  margin-bottom: 16px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    padding: 8px;
    
  }
`;

const TableContent = styled.div`
  padding: 8px 0px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }

`;

const TableViewButton = styled.button`
  padding: 10px;
  margin: 0 4px;
  cursor: pointer;
  border: none;
  background-color: #0052cc;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  

  &:hover {
    background-color: #596780;
    color: #fff;
    text-decoration: none;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const TableEditButton = styled.button`
  padding: 10px;
  margin: 0 4px;
  cursor: pointer;
  border: none;
  background-color: #ef0065;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
 

  &:hover {
    background-color: #596780;
    color: #fff;
    text-decoration: none;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
const TableActionButtons = styled.button`
  padding: 10px;
  margin: 0 4px;
  cursor: pointer;
  border: none;
  background-color: #ebecf0;
  color: #596780;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  width:75px;

  &:hover {
    background-color: #596780;
    color: #ebecf0;
    text-decoration: none;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  /* Create the dropdown arrow using a pseudo-element */
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #596780;
  }

  &:hover::after {
    border-top-color: #f1f1f1;
  }
`;
const DropdownMenu = styled.div`
  display: ${(props) => (props.showDropdown ? "flex" : "none")};
  flex-direction: column;
  background-color: #fff;
  position: absolute;
  top: 56px;
  right: 16px;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  min-width: 150px;
  z-index: 1;

  a {
    color: #333;
    text-decoration: none;
    padding: 8px;
    border-bottom: 1px solid #f1f1f1;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #f1f1f1;
    }
  }
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  //const data = useSelector((state) => state.user.userList);
  const data = [
    {
      camera_id: 1,
      officer_name: "Pieter Watkiss",
      address: "8 Pond Terrace",
      attendance: 10,
      status: [12, 34, 58, 37, 25, 73, 80, 54, 88],
    },
    {
      camera_id: 2,
      officer_name: "Benny Gallichiccio",
      address: "36863 Atwood Pass",
      attendance: 89,
      status: [59, 59, 71, 95, 62, 39, 62, 66, 26, 18],
    },
    {
      camera_id: 3,
      officer_name: "Derward Crimpe",
      address: "16 Russell Junction",
      attendance: 46,
      status: [98, 23, 59, 91, 26, 33, 10, 2, 16, 22],
    },
    {
      camera_id: 4,
      officer_name: "Garvin Skey",
      address: "92 Del Mar Court",
      attendance: 26,
      status: [45, 1, 62],
    },
    {
      camera_id: 5,
      officer_name: "Belinda Le Barr",
      address: "98470 Mifflin Point",
      attendance: 33,
      status: [12, 14, 36, 38, 29, 20, 14, 33, 4, 7],
    },
    {
      camera_id: 6,
      officer_name: "Lucila McKmurrie",
      address: "6775 Sugar Trail",
      attendance: 92,
      status: [0, 85, 38, 3, 1, 99, 9],
    },
    {
      camera_id: 7,
      officer_name: "Laurice Bagnall",
      address: "8 David Alley",
      attendance: 82,
      status: [97, 28, 14, 47, 49, 31, 36, 7, 90, 55],
    },
    {
      camera_id: 8,
      officer_name: "Delilah Mirrlees",
      address: "314 Tomscot Hill",
      attendance: 97,
      status: [93, 6, 39, 78, 33, 40],
    },
    {
      camera_id: 9,
      officer_name: "Stoddard Dowrey",
      address: "33 Granby Terrace",
      attendance: 58,
      status: [97, 74, 49, 58],
    },
    {
      camera_id: 10,
      officer_name: "Emmett Danigel",
      address: "55 Ruskin Center",
      attendance: 9,
      status: [40, 89, 67, 58, 50],
    },
    {
      camera_id: 11,
      officer_name: "Emelen Labbez",
      address: "08 Red Cloud Center",
      attendance: 81,
      status: [96, 40, 56, 78, 17],
    },
    {
      camera_id: 12,
      officer_name: "Tracey Gumbrell",
      address: "9080 Dorton Terrace",
      attendance: 84,
      status: [97, 14, 20, 22, 22, 67],
    },
    {
      camera_id: 13,
      officer_name: "Deb Brideau",
      address: "10193 High Crossing Point",
      attendance: 63,
      status: [33, 29, 96, 69, 77],
    },
    {
      camera_id: 14,
      officer_name: "Graig Sirl",
      address: "82 Grim Avenue",
      attendance: 99,
      status: [29, 15, 85, 13, 88],
    },
    {
      camera_id: 15,
      officer_name: "Milena Veronique",
      address: "6 4th Crossing",
      attendance: 49,
      status: [87, 79, 98, 97, 64],
    },
    {
      camera_id: 16,
      officer_name: "Sapphire Conneely",
      address: "94959 Luster Park",
      attendance: 42,
      status: [13, 32, 52, 57, 29, 39, 30, 6, 98, 72],
    },
    {
      camera_id: 17,
      officer_name: "Xavier Basil",
      address: "2 Hanover Street",
      attendance: 72,
      status: [49, 28, 89, 26, 96, 9, 61, 39, 78],
    },
    {
      camera_id: 18,
      officer_name: "Porter Keene",
      address: "5 Hanson Way",
      attendance: 94,
      status: [85, 79, 25, 88, 63, 26, 21, 10, 74],
    },
    {
      camera_id: 19,
      officer_name: "Alberik Kyffin",
      address: "61 Waubesa Terrace",
      attendance: 64,
      status: [57, 18, 61, 48, 68, 10],
    },
    {
      camera_id: 20,
      officer_name: "Lindon Dory",
      address: "5559 Quincy Hill",
      attendance: 19,
      status: [42, 65, 85, 31, 16, 47, 66, 43],
    },
    {
      camera_id: 21,
      officer_name: "Jenda Barson",
      address: "4 Luster Crossing",
      attendance: 37,
      status: [50, 5, 28],
    },
    {
      camera_id: 22,
      officer_name: "Yorgos Barnwall",
      address: "30 Washington Plaza",
      attendance: 18,
      status: [54, 59, 14, 29],
    },
    {
      camera_id: 23,
      officer_name: "Tuckie Meineck",
      address: "151 Truax Avenue",
      attendance: 94,
      status: [0, 6, 95, 23, 67, 17, 54, 30],
    },
    {
      camera_id: 24,
      officer_name: "Frank Denacamp",
      address: "5781 Shelley Lane",
      attendance: 0,
      status: [73, 87, 48, 37, 32, 86, 59],
    },
    {
      camera_id: 25,
      officer_name: "Ulric Dunphy",
      address: "59533 Golden Leaf Park",
      attendance: 54,
      status: [51, 36, 1, 46, 46, 76, 48, 23, 96, 45],
    },
    {
      camera_id: 26,
      officer_name: "Andrea Lethley",
      address: "29 Northport Hill",
      attendance: 47,
      status: [30, 3, 40, 58, 54, 73, 3, 96, 44],
    },
    {
      camera_id: 27,
      officer_name: "Gibby Lanning",
      address: "34947 Sommers Point",
      attendance: 28,
      status: [17, 48, 10, 34, 69, 37, 1, 10, 76],
    },
    {
      camera_id: 28,
      officer_name: "Udell Guerrieri",
      address: "85262 Graceland Court",
      attendance: 100,
      status: [44, 77, 88, 57, 97, 9, 85],
    },
    {
      camera_id: 29,
      officer_name: "Leesa Fronks",
      address: "66 Artisan Crossing",
      attendance: 0,
      status: [74, 40, 80],
    },
    {
      camera_id: 30,
      officer_name: "Simeon Maskall",
      address: "76081 Dunning Avenue",
      attendance: 31,
      status: [96, 92, 52, 9],
    },
    {
      camera_id: 31,
      officer_name: "Euphemia Woodgate",
      address: "01 Tony Hill",
      attendance: 82,
      status: [59, 99, 65, 69, 14, 64, 29, 6, 38],
    },
    {
      camera_id: 32,
      officer_name: "Glenna Dadson",
      address: "7060 South Road",
      attendance: 12,
      status: [82, 31, 15, 73, 12, 82, 98, 5],
    },
    {
      camera_id: 33,
      officer_name: "Sancho Latch",
      address: "52 Grayhawk Parkway",
      attendance: 31,
      status: [46, 91, 15, 25, 47, 50],
    },
    {
      camera_id: 34,
      officer_name: "Babs Mattaus",
      address: "4 Scoville Junction",
      attendance: 9,
      status: [83, 97],
    },
    {
      camera_id: 35,
      officer_name: "Mill Hannent",
      address: "66 Manufacturers Road",
      attendance: 78,
      status: [49, 14, 9, 83],
    },
    {
      camera_id: 36,
      officer_name: "Greg Haylor",
      address: "82 Golf Alley",
      attendance: 88,
      status: [7, 71, 28, 28, 83, 46, 57, 63, 36],
    },
    {
      camera_id: 37,
      officer_name: "Dara Biagi",
      address: "30 Rowland Junction",
      attendance: 19,
      status: [42, 4],
    },
    {
      camera_id: 38,
      officer_name: "Kin Baguley",
      address: "48462 Colorado Crossing",
      attendance: 72,
      status: [65, 43, 3, 47],
    },
    {
      camera_id: 39,
      officer_name: "Wallie Bollen",
      address: "988 Buena Vista Road",
      attendance: 74,
      status: [2, 20, 42, 98],
    },
    {
      camera_id: 40,
      officer_name: "Marlon Attewill",
      address: "26 Division Crossing",
      attendance: 8,
      status: [4, 21, 65, 42, 80, 78, 29, 32],
    },
    {
      camera_id: 41,
      officer_name: "Guthrey Brachell",
      address: "4 Northland Lane",
      attendance: 54,
      status: [44, 70, 49, 89, 61, 79],
    },
    {
      camera_id: 42,
      officer_name: "Meier Davidowich",
      address: "28 Sutherland Avenue",
      attendance: 90,
      status: [11, 75, 83, 94, 9, 79, 64, 83],
    },
    {
      camera_id: 43,
      officer_name: "Mick De Antoni",
      address: "0 Brentwood Alley",
      attendance: 51,
      status: [3, 65, 60, 52, 18, 26, 78, 61, 84, 33],
    },
    {
      camera_id: 44,
      officer_name: "Isiahi Pitcaithley",
      address: "6 Forster Street",
      attendance: 43,
      status: [81, 42, 53, 83, 62, 15],
    },
    {
      camera_id: 45,
      officer_name: "Pip Relfe",
      address: "90 Eastlawn Center",
      attendance: 23,
      status: [100, 62, 92, 20, 15, 96],
    },
    {
      camera_id: 46,
      officer_name: "Rod Conrad",
      address: "3054 Hansons Place",
      attendance: 11,
      status: [8, 22, 36, 15, 97, 24],
    },
    {
      camera_id: 47,
      officer_name: "Corrinne Lintin",
      address: "83 Continental Drive",
      attendance: 53,
      status: [65, 12, 22, 8, 51],
    },
    {
      camera_id: 48,
      officer_name: "Nevsa Gheorghe",
      address: "6 Coleman Lane",
      attendance: 36,
      status: [91, 23, 56, 5, 17, 9, 49],
    },
    {
      camera_id: 49,
      officer_name: "Maurene Tonry",
      address: "4967 Scoville Road",
      attendance: 70,
      status: [67, 95, 64],
    },
    {
      camera_id: 50,
      officer_name: "Nellie Grigoli",
      address: "6 Kings Center",
      attendance: 23,
      status: [65, 47, 57, 36, 11],
    },
    {
      camera_id: 51,
      officer_name: "Yettie Lehrmann",
      address: "6 Gina Parkway",
      attendance: 71,
      status: [13],
    },
    {
      camera_id: 52,
      officer_name: "Hinze Fairhead",
      address: "10 Dottie Way",
      attendance: 21,
      status: [39, 86, 61],
    },
    {
      camera_id: 53,
      officer_name: "Tarrah Brekonridge",
      address: "512 Banding Plaza",
      attendance: 42,
      status: [19, 0, 14],
    },
    {
      camera_id: 54,
      officer_name: "Christabella Keyworth",
      address: "87 Merchant Lane",
      attendance: 88,
      status: [52, 30, 49, 22, 3, 93],
    },
    {
      camera_id: 55,
      officer_name: "Tansy Chillingworth",
      address: "0 Nancy Center",
      attendance: 40,
      status: [1, 97, 59, 8, 79, 26, 78, 30, 21],
    },
    {
      camera_id: 56,
      officer_name: "Vernor Simunek",
      address: "3392 Badeau Park",
      attendance: 15,
      status: [91, 21, 11, 49, 80, 43],
    },
    {
      camera_id: 57,
      officer_name: "Abel Pawlett",
      address: "15741 Quincy Junction",
      attendance: 30,
      status: [13, 62, 34, 97, 95, 12],
    },
    {
      camera_id: 58,
      officer_name: "Blythe Skipsey",
      address: "12782 Golden Leaf Crossing",
      attendance: 58,
      status: [70, 1, 62, 11, 24, 49, 81, 69],
    },
    {
      camera_id: 59,
      officer_name: "Merlina Barefoot",
      address: "4327 Sugar Avenue",
      attendance: 49,
      status: [95, 48, 81, 43],
    },
    {
      camera_id: 60,
      officer_name: "Fanni Amott",
      address: "8820 Sachtjen Parkway",
      attendance: 48,
      status: [27, 66, 74],
    },
    {
      camera_id: 61,
      officer_name: "Tandie Rosenkranc",
      address: "047 Forest Run Lane",
      attendance: 56,
      status: [68, 95, 5, 92],
    },
    {
      camera_id: 62,
      officer_name: "Samaria Glanz",
      address: "38119 Clove Avenue",
      attendance: 63,
      status: [57, 36, 44, 51, 78, 87, 73, 3],
    },
    {
      camera_id: 63,
      officer_name: "Nada Bennet",
      address: "9 Autumn Leaf Place",
      attendance: 100,
      status: [51, 47, 14, 73],
    },
    {
      camera_id: 64,
      officer_name: "Annissa Escalera",
      address: "04 Waxwing Place",
      attendance: 43,
      status: [31, 85, 83, 17, 74, 97],
    },
    {
      camera_id: 65,
      officer_name: "Dani Clapp",
      address: "810 Bashford Drive",
      attendance: 43,
      status: [57, 91, 14],
    },
    {
      camera_id: 66,
      officer_name: "Wilden Budgey",
      address: "60 Loftsgordon Court",
      attendance: 37,
      status: [12, 67, 72, 72, 23],
    },
    {
      camera_id: 67,
      officer_name: "Ruggiero Gruszecki",
      address: "77 Hanson Plaza",
      attendance: 59,
      status: [49, 82, 29, 79],
    },
    {
      camera_id: 68,
      officer_name: "Magnum Eickhoff",
      address: "3 Alpine Way",
      attendance: 81,
      status: [75, 66, 2, 92, 12, 54, 58, 13, 93],
    },
    {
      camera_id: 69,
      officer_name: "Loni Jiggen",
      address: "0097 Granby Lane",
      attendance: 100,
      status: [29, 55],
    },
    {
      camera_id: 70,
      officer_name: "Janice Bonson",
      address: "7 Bashford Trail",
      attendance: 26,
      status: [76, 1, 27, 38, 2, 16],
    },
    {
      camera_id: 71,
      officer_name: "Bird Howle",
      address: "05 Sherman Plaza",
      attendance: 77,
      status: [63, 65, 67, 77, 18],
    },
    {
      camera_id: 72,
      officer_name: "Linc Cotterill",
      address: "74 Coleman Road",
      attendance: 25,
      status: [100, 31, 77, 99, 35, 90],
    },
    {
      camera_id: 73,
      officer_name: "Fawn Yewdell",
      address: "56 Mayer Pass",
      attendance: 40,
      status: [60, 56, 29, 43],
    },
    {
      camera_id: 74,
      officer_name: "Zane Filipic",
      address: "1 Mifflin Lane",
      attendance: 43,
      status: [44, 35, 45, 76, 48, 28, 67],
    },
    {
      camera_id: 75,
      officer_name: "Eal Tinston",
      address: "9 Upham Alley",
      attendance: 43,
      status: [34, 89, 84, 22, 41, 35, 80],
    },
    {
      camera_id: 76,
      officer_name: "Karalee German",
      address: "495 Merrick Court",
      attendance: 54,
      status: [42, 7],
    },
    {
      camera_id: 77,
      officer_name: "Galvan Tytcomb",
      address: "5369 Hooker Terrace",
      attendance: 72,
      status: [34, 12, 20, 85, 13],
    },
    {
      camera_id: 78,
      officer_name: "Maurizio Concannon",
      address: "43 Melrose Hill",
      attendance: 70,
      status: [17, 97, 42, 82, 97, 5, 2, 54],
    },
    {
      camera_id: 79,
      officer_name: "Deedee McGettrick",
      address: "29767 Dayton Lane",
      attendance: 80,
      status: [29, 58, 67, 10, 87],
    },
    {
      camera_id: 80,
      officer_name: "Federica Temporal",
      address: "7900 Haas Park",
      attendance: 71,
      status: [27, 12, 92, 56, 25, 27, 55, 47, 65],
    },
    {
      camera_id: 81,
      officer_name: "Rodrick Kittley",
      address: "3 Beilfuss Avenue",
      attendance: 67,
      status: [71, 36, 36],
    },
    {
      camera_id: 82,
      officer_name: "Creigh Vogl",
      address: "52 Debs Parkway",
      attendance: 49,
      status: [78, 7, 65, 47, 11, 98, 14, 57, 50, 37],
    },
    {
      camera_id: 83,
      officer_name: "Gnni Shepperd",
      address: "92 Drewry Road",
      attendance: 96,
      status: [67, 36, 80, 17, 47, 71],
    },
    {
      camera_id: 84,
      officer_name: "Renell Grange",
      address: "4 Northland Pass",
      attendance: 90,
      status: [35, 49, 80, 30, 67, 21, 38, 93, 23],
    },
    {
      camera_id: 85,
      officer_name: "Alphonso Sussems",
      address: "0 Grover Circle",
      attendance: 60,
      status: [18, 21, 83, 73, 55, 54, 84],
    },
    {
      camera_id: 86,
      officer_name: "Mariann Chalfain",
      address: "847 Magdeline Trail",
      attendance: 55,
      status: [62],
    },
    {
      camera_id: 87,
      officer_name: "Sarge Daniells",
      address: "85827 Esch Hill",
      attendance: 68,
      status: [37, 60, 100],
    },
    {
      camera_id: 88,
      officer_name: "Vincenz Suller",
      address: "91 Trailsway Pass",
      attendance: 31,
      status: [29],
    },
    {
      camera_id: 89,
      officer_name: "Cherin Coolbear",
      address: "6640 Vidon Lane",
      attendance: 43,
      status: [20, 70, 23, 5, 13, 91, 79, 35, 42],
    },
    {
      camera_id: 90,
      officer_name: "Godiva Charte",
      address: "130 Nelson Circle",
      attendance: 20,
      status: [85, 1, 50, 94, 73],
    },
    {
      camera_id: 91,
      officer_name: "Pierrette Pulley",
      address: "70 Village Way",
      attendance: 7,
      status: [51, 56, 2, 62, 73],
    },
    {
      camera_id: 92,
      officer_name: "Shadow Schollar",
      address: "9 Gina Terrace",
      attendance: 91,
      status: [13, 100, 75, 57, 69, 74, 50, 69, 53],
    },
    {
      camera_id: 93,
      officer_name: "Derk Pidgen",
      address: "3085 Pepper Wood Junction",
      attendance: 25,
      status: [67, 9, 52, 33, 11, 20, 7, 65],
    },
    {
      camera_id: 94,
      officer_name: "Nettle Winram",
      address: "9389 Laurel Junction",
      attendance: 83,
      status: [56, 21, 15],
    },
    {
      camera_id: 95,
      officer_name: "Drusilla Zavattari",
      address: "0 Annamark Parkway",
      attendance: 47,
      status: [94, 21],
    },
    {
      camera_id: 96,
      officer_name: "Jeniffer Ismead",
      address: "57 Prairieview Alley",
      attendance: 44,
      status: [37, 94, 15, 69, 39, 57, 13],
    },
    {
      camera_id: 97,
      officer_name: "Lilla Neligan",
      address: "70 Melrose Place",
      attendance: 74,
      status: [46],
    },
    {
      camera_id: 98,
      officer_name: "Hal Manvelle",
      address: "2 Little Fleur Street",
      attendance: 28,
      status: [86, 52, 13, 77],
    },
    {
      camera_id: 99,
      officer_name: "Sallyann Livock",
      address: "982 North Way",
      attendance: 69,
      status: [79, 65, 4, 4, 15],
    },
    {
      camera_id: 100,
      officer_name: "Astra Matuszyk",
      address: "089 Lindbergh Park",
      attendance: 69,
      status: [93, 74, 2, 97],
    },
  ];
  
const getUserListCallback = useCallback(() => {
  //dispatch(getUserList());
}, [dispatch]);

useEffect(() => {
  getUserListCallback();
}, [getUserListCallback]);

  const columns = [
    {
      header: "Camera ID",
      accessorKey: "camera_id",
    },
    {
      header: "Officer Name",
      accessorKey: "officer_name",
    },
    {
      header: "Address",
      accessorKey: "address",
    },
    {
      header: "Attendance",
      accessorFn: (row) => row.attendance + "%",
    },
    {
      header: "Status",
      //accessorKey: "attendance",
    },
    {
      header: "Action",
      //accessorKey: "id",
      cell: () => (
        <div>
          <TableViewButton>View More</TableViewButton>
          <TableEditButton>Watch Live</TableEditButton>
          <TableActionButtons>More</TableActionButtons>
        </div>
      ),
    },
  ];
  
  console.log("data");
  return (
    <DashboardContainer>
      <GraphContainer>
        <GraphContent>
          <h2>Camera Analysis</h2>
          <div>sdfhbdsf</div>
        </GraphContent>
      </GraphContainer>
      <TableContainer>
        <TableContent>
          <h2>User List</h2>
          <CustomTable data={data} columns={columns} />
        </TableContent>
      </TableContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
