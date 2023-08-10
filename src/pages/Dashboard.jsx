import React, { useCallback, useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../store/user-slice";
import CustomTable from "../components/CustomTable";
import CustomGraph from "../components/CustomGraph";
import CustomTitle from "../components/CustomTitle";
import CustomErrorCard from "../components/CustomErrorCard";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const GraphContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const GraphContent = styled.div`
  padding: 8px 0px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  padding: 16px;
  margin-bottom: 16px;
  overflow: hidden;
  overflow-x: auto;

  @media screen and (max-width: 768px) {
    padding: 8px;
  }
`;

const TableContent = styled.div`
  padding: 8px 0px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
    width: 100%;
  }
`;

const TableButton = styled.button`
  padding: 10px;
  margin: 5px 4px;
  cursor: pointer;
  border: none;
  background-color: ${(props) => (props?.$view ? "#0052cc" : " #ef0065")};
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
  margin: 5px 4px;
  cursor: pointer;
  border: none;
  background-color: #ebecf0;
  color: #596780;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  width: 75px;

  &:hover {
    background-color: #596780;
    color: #ebecf0;
    text-decoration: none;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

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
  display: ${(props) => (props?.$showDropdown ? "flex" : "none")};
  flex-direction: column;
  background-color: #fff;
  position: absolute;
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
`;

const DropdownOption = styled.button`
  background-color: #f9f9f9;
  border: none;
  width: 100%;
  padding: 8px 10px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const StyledStatusConainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e8e9ed;
  padding: 5px;
`;

const StyledStatusBar = styled.div`
  background-color: ${(props) => props?.$bgColor};
  width: 20px;
  height: 20px;
  margin-right: 0px;
  border: 1px solid #e8e9ed;
`;

const StyledInput = styled.input`
  border: 2px solid #d9d9d9;
  width: 150px;
  padding: 10px;
  font-size: inherit;
`;

const EditButton = ({ indeterminate, selected, ...rest }) => {
  const ref = useRef();
  useEffect(() => {
    if (indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <DropdownOption ref={ref} {...rest}>
      {selected ? "Save" : "Edit"}
    </DropdownOption>
  );
};

const defaultColumn = {
  cell: ({ getValue, row, column: { id }, table }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);
    const onBlur = () => {
      table.options.meta?.updateData(row.index, id, value);
    };
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return row.getIsSelected() ? (
      <StyledInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    ) : (
      value
    );
  },
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [openDropdownRow, setOpenDropdownRow] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const userData = useSelector((state) => state.user.userList);
  const userDataError = useSelector((state) => state.user.userListError);
  const [rowSelection, setRowSelection] = React.useState({});
  const getUserListCallback = useCallback(() => {
    dispatch(getUserList());
  }, [dispatch]);

  useEffect(() => {
    getUserListCallback();
  }, [getUserListCallback]);

  useEffect(() => {
    if (userData.length > 0) {
      setData(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (userDataError?.error) {
      setErrorMessage(true);
    }
  }, [userDataError]);

  const toggleDropdown = (rowId) => {
    if (rowId === openDropdownRow) {
      setOpenDropdownRow(null);
    } else {
      setOpenDropdownRow(rowId);
    }
  };
  const getStatusColor = (val) => {
    const colors = ["#FFFFFF", "#C6F1F1", "#63D9D9", "#022121"];
    if (val >= 0 && val <= 10) {
      return colors[0];
    } else if (val >= 11 && val <= 29) {
      return colors[1];
    } else if (val >= 30 && val <= 79) {
      return colors[2];
    } else if (val >= 80 && val <= 100) {
      return colors[3];
    }
  };

  const columns = [
    {
      header: "Camera ID",
      accessorKey: "camera_id",
      cell: (info) => info.getValue(),
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
      cell: (info) => info.getValue(),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ cell }) => {
        return (
          <StyledStatusConainer>
            {cell?.getValue()?.map((statusValue, index) => {
              const bgColor = getStatusColor(statusValue?.y);
              console.log(bgColor);
              return <StyledStatusBar key={statusValue.x} $bgColor={bgColor} />;
            })}
          </StyledStatusConainer>
        );
      },
    },
    {
      header: "Action",
      cell: ({ row, table }) => {
        const isDropdownOpen = row.id === openDropdownRow;
        const handleDelete = (rowId) => {
          table.options.meta?.deleteData(rowId);
          setOpenDropdownRow(null);
        };
        const handleRefresh = () => {
          setOpenDropdownRow(null);
          dispatch(getUserList());
        };
        return (
          <div>
            <TableButton $view={true}>View More</TableButton>
            <TableButton $view={false}>Watch Live</TableButton>
            <TableActionButtons onClick={() => toggleDropdown(row.id)}>
              More
            </TableActionButtons>
            <DropdownMenu $showDropdown={isDropdownOpen}>
              <EditButton
                {...{
                  disabled: !row.getCanSelect(),
                  indeterminate: row.getIsSomeSelected(),
                  onClick: row.getToggleSelectedHandler(),
                  selected: row.getIsSelected(),
                }}
              />
              <DropdownOption
                onClick={() => handleDelete(row?.original?.camera_id)}
              >
                Delete
              </DropdownOption>
              <DropdownOption onClick={handleRefresh}>
                Refresh Data
              </DropdownOption>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
  return (
    <DashboardContainer>
      {errorMessage ? (
        <CustomErrorCard
          title={userDataError?.error?.name}
          message={userDataError?.error?.message}
        />
      ) : (
        <>
          <GraphContainer>
            <GraphContent>
              <CustomTitle title="Camera Analysis" />
              <CustomGraph data={data} />
            </GraphContent>
          </GraphContainer>
          <TableContainer>
            <TableContent>
              <CustomTitle title="User List" />
              <CustomTable
                data={data}
                setData={setData}
                columns={columns}
                defaultColumn={defaultColumn}
                setRowSelection={setRowSelection}
                rowSelection={rowSelection}
              />
            </TableContent>
          </TableContainer>
        </>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
