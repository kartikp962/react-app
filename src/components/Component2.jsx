import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';


// Hardcoded JSON data
const departmentsData = {
  departments: [
    {
      id: 1,
      name: 'customer_service',
      sub_departments: [
        { id: 11, name: 'support' },
        { id: 12, name: 'customer_success' }
      ],
    },
    {
      id: 2,
      name: 'design',
      sub_departments: [
        { id: 21, name: 'graphic_design' },
        { id: 22, name: 'product_design' },
        { id: 23, name: 'web_design' },
      ],
    },
  ]
};

function Component2() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Initialize the users state with the departments data
    setUsers(departmentsData.departments.map((department) => ({
      ...department,
      isChecked: false,
      sub_departments: department.sub_departments.map((subDepartment) => ({
        ...subDepartment,
        isChecked: false
      }))
    })));
  }, []);

  const handleDepartmentChange = (e) => {
    const { name, checked } = e.target;
    let tempUsers = users.map((user) => ({
      ...user,
      isChecked: user.name === name ? checked : user.isChecked, // Update isChecked only for the clicked department
      sub_departments: user.sub_departments.map((subDepartment) => ({
        ...subDepartment,
        isChecked: user.name === name ? checked : subDepartment.isChecked // Update isChecked for sub-departments only if their parent department is clicked
      }))
    }));
    setUsers(tempUsers);
  };
  

  const handleSubDepartmentChange = (e, departmentName) => {
    const { name, checked } = e.target;
    let tempUsers = users.map((user) => ({
      ...user,
      isChecked:
        user.name === departmentName &&
        user.sub_departments.every((subDepartment) =>
          subDepartment.name === name ? checked : subDepartment.isChecked
        ),
      sub_departments: user.sub_departments.map((subDepartment) => ({
        ...subDepartment,
        isChecked: subDepartment.name === name ? checked : subDepartment.isChecked
      }))
    }));
    setUsers(tempUsers);
  };
  

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <Checkbox
            type="checkbox"
            name={user.name}
            checked={
              user.isChecked ||
              user.sub_departments.filter((subDepartment) => !subDepartment.isChecked)
                .length === 0
            }
            onChange={handleDepartmentChange}
          />
          <span>{user.name}</span>
          <ul style={{ listStyleType: 'none' }}>
            {user.sub_departments.map((subDepartment) => (
              <li key={subDepartment.id}>
                <Checkbox
                  type="checkbox"
                  name={subDepartment.name}
                  checked={subDepartment.isChecked}
                  onChange={(e) => handleSubDepartmentChange(e, user.name)}
                />
                <span>{subDepartment.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Component2;
