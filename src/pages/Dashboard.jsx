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

// const TableContent = styled.div`
//   padding: 8px 0px;

//   @media screen and (max-width: 768px) {
//     font-size: 14px;
//   }
// `;

const StyledH2 = styled.h2`
  color: #5f6366;
`;

const TableContainer = styled.div`
  width: 100%;
  padding: 16px;
  overflow: hidden; /* Hide table border overflow */

  @media screen and (max-width: 768px) {
    padding: 8px; /* Reduce padding on smaller screens */
  }
`;

const TableContent = styled.div`
  /* Add padding to the content inside the table container */
  padding: 8px 0px;

  /* Add responsive styles for the content inside the table container */
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }

  table {
    width: 100%;
    table-layout: auto;

    th,
    td {
      padding: 8px;
      text-align: center;
    }

    th {
      text-align: center;
      font-weight: bold;
    }
  }

  /* Style pagination buttons */
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
  }

  button {
    padding: 8px;
    margin: 0 4px;
    cursor: pointer;
    border: none;
    background-color: #6469ff;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;

    &:hover {
      background-color: #4a4fff;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;

  /* Hide pagination on smaller screens */
  @media screen and (max-width: 768px) {
    display: none;
  }

  span {
    margin: 0 4px;
    font-size: 14px;
  }
`;

const PaginationButton = styled.button`
  padding: 4px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;


const Dashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.userList);
  
const getUserListCallback = useCallback(() => {
  dispatch(getUserList());
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
      accessorKey: "attendance",
    },
    // {
    //   header: "Status",
    //   accessorKey: "attendance",
    // },
    {
      header: "Action",
      //accessorKey: "id",
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {/* {console.log("1>>>>", headerGroup)} */}
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {/* {console.log(header)} */}
                      {header.column.columnDef.header}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {/* {console.log(cell)} */}
                      {cell.getValue(cell.column.columnDef.id)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <PaginationContainer>
              <PaginationButton onClick={() => table.setPageIndex(0)}>
                {"<<"}
              </PaginationButton>
              <PaginationButton onClick={() => table.previousPage()}>
                {"<"}
              </PaginationButton>
              {/* <span>
                Page {table.state.pageIndex + 1} of{" "}
                {table.state.pageOptions.length}
              </span> */}
              <PaginationButton onClick={() => table.nextPage()}>
                {">"}
              </PaginationButton>
              <PaginationButton
                onClick={() =>
                  table.setPageIndex(table.state.pageOptions.length - 1)
                }
              >
                {">>"}
              </PaginationButton>
            </PaginationContainer>
            {/* <button onClick={() => table.setPageIndex(0)}>First page</button>
            <button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              Previous page
            </button>
            <button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Next page
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              Last page
            </button> */}
          </div>
        </TableContent>
      </TableContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
