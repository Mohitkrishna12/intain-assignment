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
import CustomGraph from "../components/CustomGraph";


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
      officer_name: "Daveen Simmonite",
      address: "475 Anthes Parkway",
      attendance: 92,
      status: [
        {
          x: "9:00 am",
          y: 5,
        },
        {
          x: "9:30 am",
          y: 67,
        },
        {
          x: "10:00 am",
          y: 5,
        },
        {
          x: "10:30 am",
          y: 1,
        },
        {
          x: "11:00 am",
          y: 86,
        },
        {
          x: "11:30 am",
          y: 33,
        },
        {
          x: "12:00 pm",
          y: 83,
        },
        {
          x: "12:30 pm",
          y: 52,
        },
        {
          x: "1:00 pm",
          y: 27,
        },
        {
          x: "1:30 pm",
          y: 51,
        },
        {
          x: "2:00 pm",
          y: 49,
        },
        {
          x: "2:30 pm",
          y: 57,
        },
        {
          x: "3:00 pm",
          y: 1,
        },
        {
          x: "3:30 pm",
          y: 18,
        },
        {
          x: "4:00 pm",
          y: 12,
        },
        {
          x: "4:30 pm",
          y: 46,
        },
        {
          x: "5:00 pm",
          y: 75,
        },
        {
          x: "5:30 pm",
          y: 2,
        },
        {
          x: "6:00 pm",
          y: 79,
        },
        {
          x: "6:30 pm",
          y: 53,
        },
        {
          x: "7:00 pm",
          y: 51,
        },
        {
          x: "7:30 pm",
          y: 16,
        },
      ],
    },
    {
      camera_id: 2,
      officer_name: "Wylie Westhofer",
      address: "09633 Vera Place",
      attendance: 35,
      status: [
        {
          x: "9:00 am",
          y: 6,
        },
        {
          x: "9:30 am",
          y: 75,
        },
        {
          x: "10:00 am",
          y: 88,
        },
        {
          x: "10:30 am",
          y: 2,
        },
        {
          x: "11:00 am",
          y: 4,
        },
        {
          x: "11:30 am",
          y: 63,
        },
        {
          x: "12:00 pm",
          y: 31,
        },
        {
          x: "12:30 pm",
          y: 24,
        },
        {
          x: "1:00 pm",
          y: 19,
        },
        {
          x: "1:30 pm",
          y: 55,
        },
        {
          x: "2:00 pm",
          y: 41,
        },
        {
          x: "2:30 pm",
          y: 66,
        },
        {
          x: "3:00 pm",
          y: 96,
        },
        {
          x: "3:30 pm",
          y: 10,
        },
        {
          x: "4:00 pm",
          y: 79,
        },
        {
          x: "4:30 pm",
          y: 59,
        },
        {
          x: "5:00 pm",
          y: 71,
        },
        {
          x: "5:30 pm",
          y: 96,
        },
        {
          x: "6:00 pm",
          y: 13,
        },
        {
          x: "6:30 pm",
          y: 49,
        },
        {
          x: "7:00 pm",
          y: 14,
        },
        {
          x: "7:30 pm",
          y: 21,
        },
      ],
    },
    {
      camera_id: 3,
      officer_name: "Athene Mayou",
      address: "90045 Mifflin Lane",
      attendance: 100,
      status: [
        {
          x: "9:00 am",
          y: 17,
        },
        {
          x: "9:30 am",
          y: 76,
        },
        {
          x: "10:00 am",
          y: 41,
        },
        {
          x: "10:30 am",
          y: 1,
        },
        {
          x: "11:00 am",
          y: 71,
        },
        {
          x: "11:30 am",
          y: 73,
        },
        {
          x: "12:00 pm",
          y: 42,
        },
        {
          x: "12:30 pm",
          y: 14,
        },
        {
          x: "1:00 pm",
          y: 5,
        },
        {
          x: "1:30 pm",
          y: 91,
        },
        {
          x: "2:00 pm",
          y: 14,
        },
        {
          x: "2:30 pm",
          y: 60,
        },
        {
          x: "3:00 pm",
          y: 82,
        },
        {
          x: "3:30 pm",
          y: 45,
        },
        {
          x: "4:00 pm",
          y: 70,
        },
        {
          x: "4:30 pm",
          y: 95,
        },
        {
          x: "5:00 pm",
          y: 24,
        },
        {
          x: "5:30 pm",
          y: 45,
        },
        {
          x: "6:00 pm",
          y: 3,
        },
        {
          x: "6:30 pm",
          y: 43,
        },
        {
          x: "7:00 pm",
          y: 80,
        },
        {
          x: "7:30 pm",
          y: 16,
        },
      ],
    },
    {
      camera_id: 4,
      officer_name: "Abey Deacock",
      address: "1413 Eliot Way",
      attendance: 2,
      status: [
        {
          x: "9:00 am",
          y: 58,
        },
        {
          x: "9:30 am",
          y: 50,
        },
        {
          x: "10:00 am",
          y: 11,
        },
        {
          x: "10:30 am",
          y: 10,
        },
        {
          x: "11:00 am",
          y: 27,
        },
        {
          x: "11:30 am",
          y: 74,
        },
        {
          x: "12:00 pm",
          y: 86,
        },
        {
          x: "12:30 pm",
          y: 24,
        },
        {
          x: "1:00 pm",
          y: 25,
        },
        {
          x: "1:30 pm",
          y: 90,
        },
        {
          x: "2:00 pm",
          y: 44,
        },
        {
          x: "2:30 pm",
          y: 71,
        },
        {
          x: "3:00 pm",
          y: 25,
        },
        {
          x: "3:30 pm",
          y: 81,
        },
        {
          x: "4:00 pm",
          y: 71,
        },
        {
          x: "4:30 pm",
          y: 17,
        },
        {
          x: "5:00 pm",
          y: 61,
        },
        {
          x: "5:30 pm",
          y: 83,
        },
        {
          x: "6:00 pm",
          y: 46,
        },
        {
          x: "6:30 pm",
          y: 36,
        },
        {
          x: "7:00 pm",
          y: 45,
        },
        {
          x: "7:30 pm",
          y: 11,
        },
      ],
    },
    {
      camera_id: 5,
      officer_name: "Delmore Frango",
      address: "97706 Nova Alley",
      attendance: 84,
      status: [
        {
          x: "9:00 am",
          y: 1,
        },
        {
          x: "9:30 am",
          y: 45,
        },
        {
          x: "10:00 am",
          y: 31,
        },
        {
          x: "10:30 am",
          y: 67,
        },
        {
          x: "11:00 am",
          y: 2,
        },
        {
          x: "11:30 am",
          y: 66,
        },
        {
          x: "12:00 pm",
          y: 81,
        },
        {
          x: "12:30 pm",
          y: 87,
        },
        {
          x: "1:00 pm",
          y: 67,
        },
        {
          x: "1:30 pm",
          y: 82,
        },
        {
          x: "2:00 pm",
          y: 99,
        },
        {
          x: "2:30 pm",
          y: 67,
        },
        {
          x: "3:00 pm",
          y: 59,
        },
        {
          x: "3:30 pm",
          y: 5,
        },
        {
          x: "4:00 pm",
          y: 90,
        },
        {
          x: "4:30 pm",
          y: 90,
        },
        {
          x: "5:00 pm",
          y: 51,
        },
        {
          x: "5:30 pm",
          y: 13,
        },
        {
          x: "6:00 pm",
          y: 63,
        },
        {
          x: "6:30 pm",
          y: 61,
        },
        {
          x: "7:00 pm",
          y: 12,
        },
        {
          x: "7:30 pm",
          y: 37,
        },
      ],
    },
    {
      camera_id: 6,
      officer_name: "Kassia Somerton",
      address: "993 Golf Course Way",
      attendance: 47,
      status: [
        {
          x: "9:00 am",
          y: 81,
        },
        {
          x: "9:30 am",
          y: 76,
        },
        {
          x: "10:00 am",
          y: 32,
        },
        {
          x: "10:30 am",
          y: 5,
        },
        {
          x: "11:00 am",
          y: 65,
        },
        {
          x: "11:30 am",
          y: 76,
        },
        {
          x: "12:00 pm",
          y: 7,
        },
        {
          x: "12:30 pm",
          y: 71,
        },
        {
          x: "1:00 pm",
          y: 9,
        },
        {
          x: "1:30 pm",
          y: 61,
        },
        {
          x: "2:00 pm",
          y: 40,
        },
        {
          x: "2:30 pm",
          y: 89,
        },
        {
          x: "3:00 pm",
          y: 34,
        },
        {
          x: "3:30 pm",
          y: 41,
        },
        {
          x: "4:00 pm",
          y: 77,
        },
        {
          x: "4:30 pm",
          y: 62,
        },
        {
          x: "5:00 pm",
          y: 39,
        },
        {
          x: "5:30 pm",
          y: 76,
        },
        {
          x: "6:00 pm",
          y: 20,
        },
        {
          x: "6:30 pm",
          y: 72,
        },
        {
          x: "7:00 pm",
          y: 64,
        },
        {
          x: "7:30 pm",
          y: 23,
        },
      ],
    },
    {
      camera_id: 7,
      officer_name: "Giordano Fudger",
      address: "61 Elmside Trail",
      attendance: 91,
      status: [
        {
          x: "9:00 am",
          y: 80,
        },
        {
          x: "9:30 am",
          y: 11,
        },
        {
          x: "10:00 am",
          y: 26,
        },
        {
          x: "10:30 am",
          y: 37,
        },
        {
          x: "11:00 am",
          y: 70,
        },
        {
          x: "11:30 am",
          y: 16,
        },
        {
          x: "12:00 pm",
          y: 52,
        },
        {
          x: "12:30 pm",
          y: 34,
        },
        {
          x: "1:00 pm",
          y: 32,
        },
        {
          x: "1:30 pm",
          y: 33,
        },
        {
          x: "2:00 pm",
          y: 80,
        },
        {
          x: "2:30 pm",
          y: 80,
        },
        {
          x: "3:00 pm",
          y: 71,
        },
        {
          x: "3:30 pm",
          y: 7,
        },
        {
          x: "4:00 pm",
          y: 79,
        },
        {
          x: "4:30 pm",
          y: 83,
        },
        {
          x: "5:00 pm",
          y: 93,
        },
        {
          x: "5:30 pm",
          y: 6,
        },
        {
          x: "6:00 pm",
          y: 80,
        },
        {
          x: "6:30 pm",
          y: 78,
        },
        {
          x: "7:00 pm",
          y: 94,
        },
        {
          x: "7:30 pm",
          y: 38,
        },
      ],
    },
    {
      camera_id: 8,
      officer_name: "Barbara-anne Atcock",
      address: "609 Old Gate Parkway",
      attendance: 71,
      status: [
        {
          x: "9:00 am",
          y: 26,
        },
        {
          x: "9:30 am",
          y: 17,
        },
        {
          x: "10:00 am",
          y: 3,
        },
        {
          x: "10:30 am",
          y: 31,
        },
        {
          x: "11:00 am",
          y: 67,
        },
        {
          x: "11:30 am",
          y: 98,
        },
        {
          x: "12:00 pm",
          y: 92,
        },
        {
          x: "12:30 pm",
          y: 2,
        },
        {
          x: "1:00 pm",
          y: 97,
        },
        {
          x: "1:30 pm",
          y: 29,
        },
        {
          x: "2:00 pm",
          y: 8,
        },
        {
          x: "2:30 pm",
          y: 34,
        },
        {
          x: "3:00 pm",
          y: 2,
        },
        {
          x: "3:30 pm",
          y: 59,
        },
        {
          x: "4:00 pm",
          y: 7,
        },
        {
          x: "4:30 pm",
          y: 84,
        },
        {
          x: "5:00 pm",
          y: 16,
        },
        {
          x: "5:30 pm",
          y: 78,
        },
        {
          x: "6:00 pm",
          y: 26,
        },
        {
          x: "6:30 pm",
          y: 60,
        },
        {
          x: "7:00 pm",
          y: 43,
        },
        {
          x: "7:30 pm",
          y: 47,
        },
      ],
    },
    {
      camera_id: 9,
      officer_name: "Haydon Nias",
      address: "6729 Rusk Trail",
      attendance: 16,
      status: [
        {
          x: "9:00 am",
          y: 23,
        },
        {
          x: "9:30 am",
          y: 50,
        },
        {
          x: "10:00 am",
          y: 3,
        },
        {
          x: "10:30 am",
          y: 48,
        },
        {
          x: "11:00 am",
          y: 25,
        },
        {
          x: "11:30 am",
          y: 47,
        },
        {
          x: "12:00 pm",
          y: 57,
        },
        {
          x: "12:30 pm",
          y: 100,
        },
        {
          x: "1:00 pm",
          y: 7,
        },
        {
          x: "1:30 pm",
          y: 66,
        },
        {
          x: "2:00 pm",
          y: 96,
        },
        {
          x: "2:30 pm",
          y: 82,
        },
        {
          x: "3:00 pm",
          y: 90,
        },
        {
          x: "3:30 pm",
          y: 8,
        },
        {
          x: "4:00 pm",
          y: 85,
        },
        {
          x: "4:30 pm",
          y: 70,
        },
        {
          x: "5:00 pm",
          y: 77,
        },
        {
          x: "5:30 pm",
          y: 70,
        },
        {
          x: "6:00 pm",
          y: 23,
        },
        {
          x: "6:30 pm",
          y: 24,
        },
        {
          x: "7:00 pm",
          y: 33,
        },
        {
          x: "7:30 pm",
          y: 43,
        },
      ],
    },
    {
      camera_id: 10,
      officer_name: "Evangelin Luetkemeyer",
      address: "12415 Brentwood Parkway",
      attendance: 23,
      status: [
        {
          x: "9:00 am",
          y: 10,
        },
        {
          x: "9:30 am",
          y: 84,
        },
        {
          x: "10:00 am",
          y: 24,
        },
        {
          x: "10:30 am",
          y: 42,
        },
        {
          x: "11:00 am",
          y: 57,
        },
        {
          x: "11:30 am",
          y: 4,
        },
        {
          x: "12:00 pm",
          y: 55,
        },
        {
          x: "12:30 pm",
          y: 88,
        },
        {
          x: "1:00 pm",
          y: 76,
        },
        {
          x: "1:30 pm",
          y: 4,
        },
        {
          x: "2:00 pm",
          y: 43,
        },
        {
          x: "2:30 pm",
          y: 54,
        },
        {
          x: "3:00 pm",
          y: 17,
        },
        {
          x: "3:30 pm",
          y: 14,
        },
        {
          x: "4:00 pm",
          y: 19,
        },
        {
          x: "4:30 pm",
          y: 88,
        },
        {
          x: "5:00 pm",
          y: 73,
        },
        {
          x: "5:30 pm",
          y: 35,
        },
        {
          x: "6:00 pm",
          y: 85,
        },
        {
          x: "6:30 pm",
          y: 3,
        },
        {
          x: "7:00 pm",
          y: 19,
        },
        {
          x: "7:30 pm",
          y: 68,
        },
      ],
    },
  ];

  
const getUserListCallback = useCallback(() => {
  //dispatch(getUserList());
}, [dispatch]);

useEffect(() => {
  getUserListCallback();
}, [getUserListCallback]);

  const getStatusColor = (statusValue) => {
    console.log(statusValue)
    const colors = [
      "#ff0000",
      "#ff3300",
      "#ff6600",
      "#ff9900",
      "#ffcc00",
      "#ffff00",
      "#ccff00",
      "#99ff00",
      "#66ff00",
      "#33ff00",
    ];

    const colorIndex = Math.floor((statusValue / 100) * 10); // Determine the color index based on the array value
    return colors[colorIndex];
  };

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
      accessorKey: "status",
      cell: ( {cell} ) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {cell?.getValue()?.map((statusValue, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: getStatusColor(statusValue.y),
                  width: "10px",
                  height: "10px",
                  marginRight: "2px",
                }}
              />
            ))}
          </div>
        );
      },
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
  
 // console.log("data");
  return (
    <DashboardContainer>
      <GraphContainer>
        <GraphContent>
          <h2>Camera Analysis</h2>
          <CustomGraph data={data} />
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
